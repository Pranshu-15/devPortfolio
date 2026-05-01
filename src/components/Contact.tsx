"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionTemplate } from "framer-motion";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases:
  // 0.00 - 0.25: Envelope Flap Opens Upwards
  // 0.25 - 0.60: Letter Glides Out of the Pocket completely
  // 0.60 - 0.85: Letter Scales Up to become usable
  // 0.85 - 1.00: Resting state

  // Top Flap Rotation (0 is closed down over front, -180 is hinged open up)
  const flapRotateX = useTransform(scrollYProgress, [0, 0.25], [0, -180]);
  
  // To avoid clipping into the letter as it hinges, we snap the z-index behind the letter once it passes 90 degrees (at 0.125 progress).
  // Default z-indexes: Back (10), Letter (20), Pocket (30), Flap Closed (40) -> Flap Open (15).
  const flapZIndex = useTransform(scrollYProgress, (val) => (val < 0.125 ? 40 : 15));

  // Letter Y Translation (Starts tucked inside the pocket [250px down], translates completely up out of the envelope)
  const letterY = useTransform(scrollYProgress, [0.25, 0.6], ["60%", "-50%"]);
  
  // Scale the letter up to focus on the form once it's fully out
  const letterScale = useTransform(scrollYProgress, [0.6, 0.85], [1, 1.25]);

  // Fade out the envelope components so ONLY the form remains immediately after it glides out
  const envelopeOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);

  // Chromium bug fallback: if opacity fails to completely hide drop-shadow envelopes, literally throw it out of the screen.
  const envelopeOffscreenY = useTransform(scrollYProgress, [0.65, 0.66], ["0vh", "200vh"]);

  // Dynamically manage a strict crop box around the envelope. 
  // Initially, clips ANYTHING below the envelope 0px baseline. 
  // It smoothly releases the crop bounds downwards once the letter is already safely out, 
  // allowing the letter to scale up without its bottom getting cropped later!
  const clipBottomNum = useTransform(scrollYProgress, [0.4, 0.6], [0, -2000]);
  const letterClipPath = useMotionTemplate`inset(-200vh -200vw ${clipBottomNum}px -200vw)`;

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#121212]" id="contact">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1500px]">
        
        {/* Title above envelope */}
        <div className="absolute top-24 md:top-32 text-center w-full z-0 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let&apos;s Make Contact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Scroll to open
          </motion.p>
        </div>

        {/* CSS 3D Environment Wrapper for Envelope */}
        <div className="relative w-[300px] sm:w-[450px] h-[200px] sm:h-[300px] mt-32 md:mt-24" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Back of Envelope (Inside Face) */}
          <motion.div 
            style={{ opacity: envelopeOpacity, y: envelopeOffscreenY }}
            className="absolute inset-0 bg-[#2a2a2a] rounded-lg shadow-2xl z-10 border border-white/5" 
          />

          {/* Wrapper that acts as a physical barrier for the letter sticking out the bottom */}
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none" 
            style={{ clipPath: letterClipPath }}
          >
            {/* The Letter (Contact Form) */}
            <motion.div 
              style={{ y: letterY, scale: letterScale }}
              className="absolute left-[4%] right-[4%] top-[10%] h-[380px] sm:h-[450px] bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-t-xl rounded-b-md shadow-2xl flex flex-col p-4 sm:p-8 border border-white/10 pointer-events-auto"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Send A Message</h3>
              
              {!isSuccess ? (
                <form className="flex flex-col gap-3 sm:gap-4 h-full" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setErrorMessage("");
                  
                  const formData = new FormData(e.currentTarget);
                  formData.append("access_key", "2023976f-5c4d-4f2d-a251-77b2d4d8e16d");
                  formData.append("subject", "New Contact from Portfolio!");

                  try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: formData
                    });

                    const data = await response.json();

                    if (data.success) {
                      setIsSuccess(true);
                    } else {
                      setErrorMessage(data.message || "Failed to submit form. Please try later.");
                    }
                  } catch {
                    setErrorMessage("Network error occurred. Please try again.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm sm:text-base text-white outline-none focus:border-emerald-400 transition-colors" 
                  />
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Email Address" 
                    className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm sm:text-base text-white outline-none focus:border-emerald-400 transition-colors" 
                  />
                  <textarea 
                    name="message"
                    required
                    placeholder="Your Message..." 
                    className="w-full h-24 sm:h-auto sm:flex-1 bg-white/5 border border-white/10 rounded-md p-3 text-sm sm:text-base text-white outline-none focus:border-emerald-400 transition-colors resize-none" 
                  />
                  
                  {errorMessage && (
                    <div className="text-red-400 text-sm font-medium">{errorMessage}</div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-[#121212] font-bold py-3 rounded-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-[#121212]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : "Launch Message"}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-1 h-full text-center px-4"
                >
                  <div className="w-16 h-16 bg-emerald-400/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Received!</h4>
                  <p className="text-white/60">I&apos;ll get back to you as soon as possible.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Front Pocket of Envelope (Folds bridging from side to center) */}
          <motion.div 
            style={{ opacity: envelopeOpacity, y: envelopeOffscreenY }}
            className="absolute inset-0 z-30 pointer-events-none drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]"
          >
            {/* Base block using clip-path to simulate standard envelope backing */}
            <div 
              className="absolute inset-0 bg-[#3a3a3a] rounded-b-lg border border-white/10"
              style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)" }}
            />
            {/* Inner shadows to highlight the flap creases */}
            <div 
              className="absolute inset-0 opacity-40 bg-gradient-to-tr from-black/80 via-transparent to-black/80"
              style={{ clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)" }}
            />
          </motion.div>

          {/* Top Flap of Envelope */}
          <motion.div 
            style={{ 
              rotateX: flapRotateX, 
              zIndex: flapZIndex, 
              opacity: envelopeOpacity,
              y: envelopeOffscreenY,
              transformOrigin: "top" 
            }}
            // z-index transitions from 40 to 15 mid-rotation via Framer Motion useTransform (above)
            className="absolute top-0 left-0 w-full h-[65%] pointer-events-none"
          >
            <div 
              className="w-full h-full bg-[#444] border-b border-black/40 drop-shadow-2xl"
              style={{ 
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                // Gives a slight physical "paper" curvature highlight
                background: "linear-gradient(to bottom, #4a4a4a, #333)"
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
