import React from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  desc: string;
}

const STATS: StatItem[] = [
  {
    value: "20+",
    label: "Years Experience",
    desc: "Refining visual crafts and leading software architectures.",
  },
  {
    value: "95+",
    label: "Projects Done",
    desc: "Delivered premium bespoke digital solutions globally.",
  },
  {
    value: "200%",
    label: "Satisfied Clients",
    desc: "Exceeding expectations by focusing on subtle nuances.",
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-24 md:py-32 border-t border-stroke/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-stroke">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col pt-8 md:pt-0 md:px-8 first:pt-0 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Stat Value */}
              <span className="text-6xl md:text-7xl lg:text-8xl font-display font-medium text-text-primary tracking-tighter mb-4 accent-gradient bg-clip-text text-transparent w-fit">
                {stat.value}
              </span>

              {/* Stat Label */}
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-[0.2em] mb-2">
                {stat.label}
              </h4>

              {/* Stat Description */}
              <p className="text-xs md:text-sm text-muted font-light leading-relaxed max-w-[280px]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
