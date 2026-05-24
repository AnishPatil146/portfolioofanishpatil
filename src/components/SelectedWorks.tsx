import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  span: string;
  ratio: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Automotive Motion",
    category: "CGI & Motion Design",
    image: "/images/automotive.png",
    span: "md:col-span-7",
    ratio: "aspect-[16/10] md:aspect-auto md:h-[480px]",
  },
  {
    id: 2,
    title: "Urban Architecture",
    category: "3D Visualization",
    image: "/images/architecture.png",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-auto md:h-[480px]",
  },
  {
    id: 3,
    title: "Human Perspective",
    category: "Creative Direction",
    image: "/images/perspective.png",
    span: "md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-auto md:h-[480px]",
  },
  {
    id: 4,
    title: "Brand Identity",
    category: "Design System",
    image: "/images/brand.png",
    span: "md:col-span-7",
    ratio: "aspect-[16/10] md:aspect-auto md:h-[480px]",
  },
];

export const SelectedWorks: React.FC = () => {
  return (
    <section id="work" className="bg-bg py-20 md:py-28">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-4">
              Featured <span className="font-display italic text-text-primary/90 font-medium">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted font-light leading-relaxed">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* Desktop View All Button */}
          <button className="hidden md:inline-flex items-center gap-2 group relative px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-text-primary overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none">
            {/* Gradient border ring */}
            <span className="absolute inset-0 rounded-full p-[1px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-2">
              View all work <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl cursor-pointer ${project.span} ${project.ratio}`}
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Halftone Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />

              {/* Default Label (Bottom Left - subtle) */}
              <div className="absolute bottom-6 left-6 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <span className="text-[10px] text-muted uppercase tracking-[0.2em]">{project.category}</span>
                <h3 className="text-xl font-light text-text-primary mt-1">{project.title}</h3>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md flex flex-col justify-between p-8">
                {/* Top Info */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-muted uppercase tracking-[0.2em]">{project.category}</span>
                    <h3 className="text-2xl font-light text-text-primary mt-1">{project.title}</h3>
                  </div>
                  <span className="text-xs text-muted font-mono">0{project.id}</span>
                </div>

                {/* Hover Label Button (Center) */}
                <div className="self-center my-auto">
                  <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-2xl">
                    {/* Animated gradient ring */}
                    <div
                      className="absolute inset-0 accent-gradient animate-gradient-shift"
                      style={{ backgroundSize: "200% 200%" }}
                    />
                    {/* Inner content */}
                    <div className="relative bg-white text-black font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full flex items-center gap-1.5">
                      <span>View —</span>
                      <span className="font-display italic text-sm font-bold capitalize select-none">
                        {project.title.toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom details */}
                <div className="flex justify-between items-end border-t border-stroke/50 pt-4">
                  <span className="text-[11px] text-muted font-light">Explore Case Study</span>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-text-primary transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
