import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import {
  profile,
  about,
  experience,
  skills,
  projects,
  education,
  extracurricular,
} from "@/lib/data";

const client = new Anthropic();

function buildSystemPrompt(): string {
  const expText = experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}, ${e.duration}): ${e.highlights.join("; ")}`
    )
    .join("\n");

  const skillsText = skills
    .map((g) => `${g.label}: ${g.items.join(", ")}`)
    .join("\n");

  const projectsText = projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}): ${p.description} Tech: ${p.tech.join(", ")}.${p.url ? ` Live: ${p.url}` : ""}${p.github ? ` GitHub: ${p.github}` : ""}`
    )
    .join("\n");

  const educationText = education
    .map(
      (e) =>
        `- ${e.degree} — ${e.school} (${e.period})${e.award ? `, ${e.award}` : ""}`
    )
    .join("\n");

  return `You are an AI assistant on ${profile.name}'s personal portfolio website. Answer questions about ${profile.firstName} based only on the information below. Be friendly, concise, and professional. If asked something not covered here, say you don't have that information but visitors can reach ${profile.firstName} directly at ${profile.email}.

## Profile
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Email: ${profile.email}
Phone: ${profile.phone}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Current Company: ${profile.currentCompany}
Tagline: ${profile.tagline}

## About
${about.paragraphs.join("\n\n")}

## Experience
${expText}

## Skills
${skillsText}

## Projects
${projectsText}

## Education
${educationText}

## Extracurricular
${extracurricular.join(", ")}`;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = client.messages.stream({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: buildSystemPrompt(),
          messages,
        });

        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
            );
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
