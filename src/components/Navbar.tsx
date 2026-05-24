import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Active link calculation based on scroll position
      const sections = ["home", "about", "skills", "work", "education", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2 py-2 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-lg shadow-black/30 bg-surface/90 border-white/15" : "shadow-md shadow-black/10"
        }`}
      >
        {/* 1. Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="relative flex items-center justify-center w-9 h-9 rounded-full cursor-pointer focus:outline-none"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          {/* Animated gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full accent-gradient"
            animate={{ rotate: isLogoHovered ? -360 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          {/* Inner ring */}
          <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary font-bold">AP</span>
          </div>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav links */}
        <div className="flex items-center gap-1">
          {[
            { label: "Home", id: "home" },
            { label: "About", id: "about" },
            { label: "Skills", id: "skills" },
            { label: "Projects", id: "work" },
            { label: "Education", id: "education" },
          ].map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-text-primary bg-stroke/70 font-medium"
                    : "text-muted hover:text-text-primary hover:bg-stroke/40"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* 5. Say hi button */}
        <button
          onClick={() => scrollToSection("contact")}
          className="relative text-xs sm:text-sm rounded-full px-4 py-2 text-text-primary cursor-pointer group focus:outline-none"
        >
          {/* Hover accent gradient border */}
          <span className="absolute inset-0 rounded-full p-[1px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
            <span className="block w-full h-full bg-surface rounded-full group-hover:bg-surface/90" />
          </span>

          <span className="relative z-10 flex items-center gap-1">
            Say hi <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
};
