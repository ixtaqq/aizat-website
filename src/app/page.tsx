import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content" className="page" tabIndex={-1}>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </main>
      <ChatAssistant />
    </>
  );
}
