"use client";

import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119
const FRAMES_DIR = "/sequence/frame_";
const FRAME_EXT = "_delay-0.066s.png";

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `${FRAMES_DIR}${paddedIndex}${FRAME_EXT}`;
};

export default function ScrollyCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const frameIndex = useTransform(progress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0 || !images[index]) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark background under images just in case
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      renderFrame(Math.floor(latest));
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (loaded) {
      renderFrame(0);

      const handleResize = () => renderFrame(Math.floor(frameIndex.get()));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [loaded, frameIndex]);

  return (
    <>
      <canvas ref={canvasRef} className="block h-full w-full object-cover" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50">
          <div className="text-white/50 animate-pulse text-sm uppercase tracking-widest">
            Loading Portfolio...
          </div>
        </div>
      )}
    </>
  );
}
