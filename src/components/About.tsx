"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { FileText } from "lucide-react";

interface IconProps {
  size?: number;
  className?: string;
}

const GithubIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function About(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="relative w-full bg-[#121212] py-24 md:py-40 px-4 md:px-12 z-20" ref={ref}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Side: Animated Text Content */}
        <motion.div 
          className="flex-1 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span variants={itemVariants} className="text-emerald-400 font-mono text-sm md:text-base tracking-widest uppercase mb-4 block">
            About Me
          </motion.span>
          <motion.div variants={itemVariants} className="mb-6 cursor-default">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight inline-block hover:scale-110 hover:text-white hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] transition-all duration-300 origin-left">
              I am a
            </h2>
            <br />
            <h2 className="text-4xl md:text-6xl font-bold leading-tight inline-block hover:scale-105 transition-all duration-500 origin-left text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-cyan-300 hover:to-emerald-400 hover:drop-shadow-[0_0_25px_rgba(52,211,153,0.8)] mt-1">
              MERN Stack Developer.
            </h2>
          </motion.div>
          
          <motion.p variants={itemVariants} className="text-white/70 text-lg md:text-xl leading-relaxed mb-6 font-light hover:text-white hover:translate-x-2 transition-all duration-300 cursor-default border-l-2 border-transparent hover:border-emerald-400 pl-0 hover:pl-4">
            I specialize in engineering dynamic, high-performance web applications using MongoDB, Express.js, React, and Node.js. 
          </motion.p>
          
          <motion.p variants={itemVariants} className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 font-light hover:text-white hover:translate-x-2 transition-all duration-300 cursor-default border-l-2 border-transparent hover:border-cyan-400 pl-0 hover:pl-4">
            My approach bridges the gap between aesthetically pleasing frontend interfaces and infinitely scaleable backend architectures. I focus on creating seamless digital experiences that look beautiful and perform effortlessly under the hood.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {["HTML","CSS","JavaScript","MongoDB", "Express", "React", "Node", "Next.JS", "TailwindCSS", "Framer Motion", "Git", "GitHub","GSAP", "AI Tools"].map((tech) => (
              <span key={tech} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 hover:text-white hover:bg-emerald-400/10 hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] hover:-translate-y-1 scale-100 hover:scale-105 transition-all duration-300 cursor-pointer">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
            <a 
              href="https://github.com/Pranshu-15" 
              target="_blank" 
              rel="noreferrer"
              className="group px-7 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              <GithubIcon size={20} className="group-hover:-translate-y-0.5 transition-transform" /> 
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/pranshu-agrawal-069607155/" 
              target="_blank" 
              rel="noreferrer"
              className="group px-7 py-3 bg-[#0A66C2] text-white rounded-full font-bold hover:bg-[#0A66C2]/90 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(10,102,194,0.3)] hover:shadow-[0_0_25px_rgba(10,102,194,0.6)]"
            >
              <LinkedinIcon size={20} className="group-hover:-translate-y-0.5 transition-transform" /> 
              LinkedIn
            </a>
            <a 
              href="/Resume.pdf" 
              download="Pranshu_Agrawal_Resume.pdf"
              className="group px-7 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:scale-105 hover:border-white/40 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <FileText size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: 3D Interactive Image */}
        <div className="flex-1 w-full flex justify-center" style={{ perspective: "1000px" }}>
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[320px] sm:max-w-sm aspect-[4/5] rounded-2xl cursor-crosshair group"
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1, type: "spring" }}
          >
            {/* Real 3D physical layers */}
            {/* Back drop shadow layer */}
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500"
              style={{ transform: "translateZ(-20px)" }}
            />
            {/* The actual image floating forward */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-cover bg-center transition-transform duration-300"
              style={{ 
                transform: "translateZ(50px)",
                backgroundImage: "url('/sequence/frame_000_delay-0.066s.png')"
              }}
            />
            {/* Glass reflection layer floating even further forward */}
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none transition-transform duration-300"
              style={{ transform: "translateZ(60px)" }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
