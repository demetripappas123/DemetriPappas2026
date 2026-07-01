import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SocialSidebarDock from "@/components/SocialSidebarDock";
import { SocialDockProvider } from "@/components/SocialDockContext";
import Tools from "@/components/Tools";

export default function Home() {
  return (
    <SocialDockProvider>
      <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-28 pb-16 sm:px-8">
          <Hero />
          <Education />
          <Experience />
          <Projects />
          <Tools />
          <Contact />
        </main>
        <SocialSidebarDock />
      </div>
    </SocialDockProvider>
  );
}
