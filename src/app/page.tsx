import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Contact />
      
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm z-50 relative bg-[#121212]">
        <p>© {new Date().getFullYear()} Pranshu Agrawal. All rights reserved.</p>
      </footer>
    </main>
  );
}
