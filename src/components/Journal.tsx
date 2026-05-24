import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

const ENTRIES: JournalEntry[] = [
  {
    id: 1,
    title: "The power of micro-animations in UX design",
    date: "May 12, 2026",
    readTime: "4 min read",
    image: "/images/automotive.png",
  },
  {
    id: 2,
    title: "Structuring Design Systems for large scale applications",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    image: "/images/brand.png",
  },
  {
    id: 3,
    title: "Why dark mode has taken over modern web interfaces",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    image: "/images/architecture.png",
  },
  {
    id: 4,
    title: "Exploring 3D graphics in browser-based interactions",
    date: "Feb 02, 2026",
    readTime: "9 min read",
    image: "/images/perspective.png",
  },
];

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-20 md:py-28 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-4">
              Recent <span className="font-display italic text-text-primary/90 font-medium">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted font-light leading-relaxed">
              Sharing thoughts on craft, design systems, technology, and human interaction.
            </p>
          </div>

          {/* Desktop View All Button */}
          <button className="hidden md:inline-flex items-center gap-2 group relative px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-text-primary overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none">
            <span className="absolute inset-0 rounded-full p-[1px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-2">
              View all entries <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Journal Entries List */}
        <div className="flex flex-col gap-5 max-w-4xl mx-auto">
          {ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke/70 transition-all duration-300 cursor-pointer group hover:scale-[1.01]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
                {/* Image Thumbnail */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-stroke/50">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text Info */}
                <div className="min-w-0">
                  <h3 className="text-sm md:text-lg font-light text-text-primary group-hover:text-[#89AACC] transition-colors duration-300 truncate pr-4">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] md:text-xs text-muted">
                    <span>{entry.date}</span>
                    <span className="w-1 h-1 bg-stroke rounded-full" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-stroke bg-bg/50 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-black transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
