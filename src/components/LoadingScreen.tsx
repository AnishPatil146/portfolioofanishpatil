import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter animation using requestAnimationFrame over 2700ms
  useEffect(() => {
    const duration = 2700;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate count (0 to 100)
      const currentCount = Math.floor(progress * 100);
      setCount(currentCount);

      // Update word index every 900ms (2700ms / 3 words)
      const currentWordIndex = Math.min(Math.floor(progress * 3), 2);
      setWordIndex(currentWordIndex);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Reached 100, trigger onComplete after 400ms delay
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-16 select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Top Left Label */}
      <div className="flex items-start">
        <motion.span
          className="text-xs text-muted uppercase tracking-[0.3em]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Portfolio
        </motion.span>
      </div>

      {/* Center Rotating Words */}
      <div className="flex justify-center items-center h-40">
        <AnimatePresence mode="wait">
          <motion.h1
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {WORDS[wordIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Bottom Row: Counter & Progress */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-baseline">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter">
            {String(count).padStart(3, "0")}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full h-[3px] bg-stroke/50 overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 h-full accent-gradient origin-left transition-transform duration-75 ease-out"
            style={{
              width: "100%",
              transform: `scaleX(${count / 100})`,
              boxShadow: "0 0 12px rgba(137, 170, 204, 0.6)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
