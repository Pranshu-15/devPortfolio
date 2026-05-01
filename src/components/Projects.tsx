"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  desc: string;
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live: string;
  image: string;
};

const projectsData: Project[] = [
  {
    id: "axiom",
    title: "Axiom AI Chatbot",
    category: "MERN + AI",
    desc: "A hybrid AI chatbot combining Google Dialogflow ES intent recognition with Groq Llama 3 LLMs via real-time SSE streaming. Supports image vision analysis, debounced autocomplete, smart follow-up suggestions, and persistent MongoDB chat history with auto-generated conversation titles. Features dark/light theming, markdown rendering, and syntax-highlighted code blocks.",
    github: "https://github.com/Pranshu-15/orion",
    live: "https://orion-rgh5.onrender.com",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e" 
  },
  {
    id: "ai-assistant",
    title: "AI Virtual Assistant",
    category: "MERN + AI",
    desc: "A futuristic voice-controlled AI assistant built on the MERN stack. Uses wake-word activation, the Groq Llama 3 API for intent classification, and the Web Speech API for real-time speech recognition and synthesis. Features a glassmorphism UI with GSAP animations, customizable assistant identity, Cloudinary avatar uploads, and MongoDB-backed command history.",
    github: "https://github.com/Pranshu-15/virtualAssistant",
    live: "https://virtualassistant-il4w.onrender.com",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  },
  {
    id: "dev-tinder",
    title: "devTinder",
    category: "MERN",
    desc: "A Tinder-style developer networking platform built on the MERN stack. Users swipe through a paginated developer feed, send and accept connection requests, and manage their profile with photo uploads. Features JWT cookie auth, Redux state management, DaisyUI dark theme, and smooth swipe animations with LIKE/NOPE stamps.",
    githubFrontend: "https://github.com/Pranshu-15/tinder-dev-frontend",
    githubBackend: "https://github.com/Pranshu-15/tinder-dev",
    live: "https://tinder-dev-frontend.vercel.app",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356"
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    category: "MERN + AI",
    desc: "A full-stack expense management app with full CRUD for expenses and custom categories, monthly analytics, and spending trend reports. Integrates Google Gemini AI for smart financial summaries. Secured with JWT auth, bcrypt password hashing, Helmet headers, and rate limiting.",
    githubFrontend: "https://github.com/Pranshu-15/expense-tracker-frontend",
    githubBackend: "https://github.com/Pranshu-15/expense-tracker-backend",
    live: "https://expense-tracker-frontend-edq3.onrender.com",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f"
  },
  {
    id: "cravora",
    title: "Cravora",
    category: "MERN",
    desc: "A full-stack multi-role food delivery platform for Customers, Restaurant Owners, and Delivery Partners. Features real-time order tracking on an interactive map via Socket.io and Leaflet, Razorpay payment integration, OTP-verified handoffs, Cloudinary menu photo uploads, business analytics with Recharts, and Firebase Google OAuth — all wrapped in a mobile-first glassmorphism UI.",
    github: "https://github.com/Pranshu-15/cravora",
    live: "https://cravora-0f4t.onrender.com",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },
  {
    id: "linkedin",
    title: "ProConnect",
    category: "MERN",
    desc: "A full-stack LinkedIn-inspired professional networking platform built with MERN and Socket.io. Features real-time chat, a dynamic activity feed, user connections, JWT authentication, Cloudinary media uploads, and a responsive glassmorphism UI powered by React, Tailwind CSS, and Framer Motion.",
    githubFrontend: "https://github.com/Pranshu-15/linkedinFrontend",
    githubBackend: "https://github.com/Pranshu-15/linkedinBackend",
    live: "https://linkedinfrontend-31xu.onrender.com/login",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
  },
  {
    id: "podcast",
    title: "Podcast Platform",
    category: "React",
    desc: "A full-stack MERN podcast platform with a dark glassmorphism UI. Creators can upload audio episodes and cover art via Cloudinary, while listeners enjoy a persistent global audio player with custom controls that syncs seamlessly across pages. Features JWT auth, Redux state management, and GSAP animations.",
    github: "https://github.com/Pranshu-15/podcastPlatform",
    live: "https://podcastplatform-69qv.onrender.com",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
  },
  {
    id: "news",
    title: "News Portal",
    category: "React",
    desc: "A modern responsive news aggregator built with React and Redux. Fetches categorized articles via external APIs with search, favorites, pagination, and detailed article views. Includes an animated landing page powered by GSAP and a custom animated loader.",
    github: "https://github.com/Pranshu-15/news-portal",
    live: "https://news-portal-ivory-iota.vercel.app/",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeModal = () => setSelectedProject(null);

  return (
    <section className="bg-[#121212] py-32 px-4 md:px-12 w-full relative z-20" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Works</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-white to-white/10 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-50 group-hover:opacity-30"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent opacity-90" />

              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end h-full">
                <p className="text-white/60 text-sm font-medium mb-2 uppercase tracking-widest">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-white group-hover:text-white/80 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Visual indicator for clickability */}
                <div className="w-10 h-10 mt-6 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            // Z-50 Ensures the modal sits above absolutely everything on the page
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Stop click from propagating up to backdrop wrapper and closing modal
              className="relative w-full max-w-5xl bg-[#121212] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-[45%] h-64 md:h-auto min-h-[300px] md:min-h-[500px] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedProject.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121212] to-transparent opacity-80 md:opacity-100" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-gradient-to-bl from-[#1a1a1a] to-[#121212]">
                <span className="text-white/50 text-sm tracking-widest uppercase font-semibold mb-4 block">
                  {selectedProject.category}
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-white/70 text-lg mb-10 leading-relaxed font-light">
                  {selectedProject.desc}
                </p>

                <div className="flex flex-wrap gap-4 mt-auto">
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    View Live Project <ArrowUpRight size={18} />
                  </a>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 active:scale-95"
                    >
                      Source Code <Code size={18} />
                    </a>
                  )}
                  {selectedProject.githubFrontend && (
                    <a
                      href={selectedProject.githubFrontend}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 active:scale-95"
                    >
                      Frontend Code <Code size={18} />
                    </a>
                  )}
                  {selectedProject.githubBackend && (
                    <a
                      href={selectedProject.githubBackend}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 active:scale-95"
                    >
                      Backend Code <Code size={18} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
