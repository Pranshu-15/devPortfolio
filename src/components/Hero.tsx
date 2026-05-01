"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} style={{ height: "500vh" }} className="relative w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrollyCanvas progress={scrollYProgress} />
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
}
