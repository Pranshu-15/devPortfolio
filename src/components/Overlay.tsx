"use client";

import { useTransform, motion, MotionValue } from "framer-motion";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  // Section 1 (0% scroll): "My Name. Creative Developer." (Center)
  const opacity1 = useTransform(progress, [0, 0.05, 0.15], [1, 1, 0]);
  const y1 = useTransform(progress, [0, 0.15], [0, -150]); // Parallax speed

  // Section 2 (30% scroll): "I build digital experiences." (Left aligned)
  const opacity2 = useTransform(progress, [0.15, 0.3, 0.35, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(progress, [0.15, 0.3, 0.45], [150, 0, -150]);

  // Section 3 (60% scroll): "Bridging design and engineering." (Right aligned)
  const opacity3 = useTransform(progress, [0.45, 0.6, 0.65, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(progress, [0.45, 0.6, 0.8], [150, 0, -150]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="relative w-full h-full max-w-7xl mx-auto px-4">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center w-full"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            Pranshu Agrawal
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            M.E.R.N Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center w-full max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            I build digital experiences.
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end justify-center text-right w-full max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            Bridging design and engineering.
          </h2>
          <div className="h-1 w-24 bg-gradient-to-l from-emerald-400 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
        </motion.div>

      </div>
    </div>
  );
}
