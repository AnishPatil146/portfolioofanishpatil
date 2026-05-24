import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Navbar } from "./Navbar";

const ROLES = ["Full-Stack Developer", "Software Engineer", "Data Analyst", "Data Scientist"];

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycling roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // HLS Video Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.log("Video play interrupted:", err));
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.log("Video play interrupted:", err));
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, stagger: 0.1 },
        "-=0.9"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-bg flex flex-col justify-center items-center px-4"
    >
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
          muted
          loop
          playsInline
          autoPlay
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* 3. Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-16">
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          I BUILD PRODUCTS THAT THINK.
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="name-reveal text-6xl md:text-8xl lg:text-[110px] font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none"
        >
          Anish Patil
        </h1>

        {/* Cycling role line */}
        <div className="blur-in text-lg md:text-2xl text-muted font-light mb-4 flex items-center justify-center gap-2 h-10 select-none">
          <span>A</span>
          <span className="relative inline-block w-44 md:w-56 text-center font-display italic text-text-primary font-medium">
            <span
              key={roleIndex}
              className="absolute inset-0 animate-role-fade-in block"
            >
              {ROLES[roleIndex]}
            </span>
          </span>
          <span>studying at IIT Madras.</span>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="blur-in text-sm md:text-base text-muted max-w-lg mb-10 leading-relaxed font-light"
        >
          IIT Madras · Building AI-powered products, data pipelines, and scalable web systems.
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="blur-in flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          {/* See Works */}
          <button
            onClick={scrollToWork}
            className="relative w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 group cursor-pointer focus:outline-none"
          >
            {/* Background/Border container */}
            <span className="absolute inset-0 rounded-full p-[1px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-text-primary text-bg rounded-full group-hover:bg-bg transition-colors duration-300" />
            </span>
            {/* Label */}
            <span className="relative z-10 text-bg group-hover:text-text-primary transition-colors duration-300">
              View My Work
            </span>
          </button>

          {/* Contact */}
          <button
            onClick={scrollToContact}
            className="relative w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 group cursor-pointer focus:outline-none"
          >
            {/* Background/Border container */}
            <span className="absolute inset-0 rounded-full p-[1.5px] bg-stroke group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            {/* Label */}
            <span className="relative z-10 text-text-primary">
              Get in touch
            </span>
          </button>
        </div>
      </div>

      {/* 4. Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none z-10 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em]">SCROLL</span>
        <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#89AACC] to-[#4E85BF] animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
