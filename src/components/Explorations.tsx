import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ExplorationItem {
  id: number;
  title: string;
  image: string;
  rotation: string;
}

const ITEMS: ExplorationItem[] = [
  // Left Column
  { id: 1, title: "Velocity Render", image: "/images/automotive.png", rotation: "-rotate-3" },
  { id: 3, title: "Spatial Rhythm", image: "/images/architecture.png", rotation: "rotate-6" },
  { id: 5, title: "Organic System", image: "/images/brand.png", rotation: "-rotate-2" },
  // Right Column
  { id: 2, title: "Brutal Concrete", image: "/images/architecture.png", rotation: "rotate-3" },
  { id: 4, title: "Chroma Shift", image: "/images/perspective.png", rotation: "-rotate-6" },
  { id: 6, title: "Mono Grid", image: "/images/brand.png", rotation: "rotate-2" },
];

export const Explorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [activeImage, setActiveImage] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;

    if (!container || !content || !leftCol || !rightCol) return;

    // Pin the center content layer without adding spacing, allowing other layers to scroll past
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: content,
      pinSpacing: false,
    });

    // Parallax on Left Column (scrolls up a bit faster)
    const leftAnim = gsap.fromTo(
      leftCol,
      { y: "15vh" },
      {
        y: "-15vh",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    // Parallax on Right Column (scrolls up slower / starts lower)
    const rightAnim = gsap.fromTo(
      rightCol,
      { y: "35vh" },
      {
        y: "-35vh",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    return () => {
      pinTrigger.kill();
      leftAnim.scrollTrigger?.kill();
      leftAnim.kill();
      rightAnim.scrollTrigger?.kill();
      rightAnim.kill();
    };
  }, []);

  const leftItems = ITEMS.filter((_, idx) => idx % 2 === 0);
  const rightItems = ITEMS.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden border-t border-stroke/20"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={contentRef}
        className="absolute inset-0 w-full h-screen flex flex-col justify-center items-center z-10 pointer-events-none select-none"
      >
        <div className="text-center px-4 max-w-lg pointer-events-auto">
          {/* Eyebrow */}
          <div className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
            Explorations
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-4">
            Visual <span className="font-display italic text-text-primary/90 font-medium">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm text-muted font-light leading-relaxed mb-8">
            A dump of daily renders, motion sketches, and experimental brand systems.
          </p>

          {/* Dribbble Button */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group relative px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-text-primary overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none"
          >
            <span className="absolute inset-0 rounded-full p-[1px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-2">
              Browse dribbble <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute) */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full h-full relative">
          {/* Left Parallax Column */}
          <div
            ref={leftColRef}
            className="absolute left-[8%] md:left-[12%] top-[10vh] flex flex-col gap-[35vh] md:gap-[40vh]"
          >
            {leftItems.map((item) => (
              <motion.div
                key={item.id}
                className={`relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-surface rounded-2xl border border-stroke overflow-hidden cursor-pointer shadow-2xl pointer-events-auto ${item.rotation} group`}
                whileHover={{ scale: 1.03, rotate: 0 }}
                onClick={() => setActiveImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-text-primary uppercase tracking-wider font-light">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Parallax Column */}
          <div
            ref={rightColRef}
            className="absolute right-[8%] md:right-[12%] top-[35vh] flex flex-col gap-[35vh] md:gap-[40vh]"
          >
            {rightItems.map((item) => (
              <motion.div
                key={item.id}
                className={`relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 bg-surface rounded-2xl border border-stroke overflow-hidden cursor-pointer shadow-2xl pointer-events-auto ${item.rotation} group`}
                whileHover={{ scale: 1.03, rotate: 0 }}
                onClick={() => setActiveImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-text-primary uppercase tracking-wider font-light">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-muted hover:text-text-primary bg-stroke/50 hover:bg-stroke p-2 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl w-full flex flex-col items-center gap-4 cursor-default"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full max-h-[75vh] object-contain rounded-xl border border-stroke"
              />
              <div className="text-center mt-2">
                <span className="text-xs text-muted uppercase tracking-wider font-mono">
                  Visual Study 0{activeImage.id}
                </span>
                <h3 className="text-xl font-light text-text-primary mt-1 font-display italic">
                  {activeImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
