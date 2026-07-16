import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const file = await readFile(
    path.join(process.cwd(), "public", "Aizat-Taqqiyudin-CV.pdf")
  );
  const base64 = file.toString("base64");
  return Response.json({ data: `data:application/pdf;base64,${base64}` });
}
