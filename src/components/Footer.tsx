import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // HLS Video in Footer (flipped vertically, darker overlay)
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

  // GSAP Infinite Marquee Animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }, marquee);

    return () => ctx.revert();
  }, []);

  const marqueeText = "BUILDING THE FUTURE • ";
  const repeatedText = Array(15).fill(marqueeText).join("");

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden border-t border-stroke/20"
    >
      {/* Background Video (Flipped Vertically) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-50"
          muted
          loop
          playsInline
          autoPlay
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* GSAP Marquee */}
        <div
          ref={marqueeRef}
          className="w-full overflow-hidden border-y border-stroke/50 bg-black/40 backdrop-blur-sm py-4 md:py-6 select-none pointer-events-none mb-20"
        >
          <div className="flex whitespace-nowrap w-[200%] marquee-inner">
            <span className="text-xl md:text-3xl font-display italic font-semibold uppercase tracking-wider text-text-primary/70">
              {repeatedText}
            </span>
            <span className="text-xl md:text-3xl font-display italic font-semibold uppercase tracking-wider text-text-primary/70">
              {repeatedText}
            </span>
          </div>
        </div>

        {/* CTA Area */}
        <div className="max-w-2xl text-center px-6 mb-24 flex flex-col items-center">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-light text-text-primary tracking-tight mb-8">
            Let's create something <span className="font-display italic text-text-primary/90 font-medium">timeless</span>
          </h2>

          {/* Email button with gradient hover border */}
          <a
            href="mailto:hello@michaelsmith.com"
            className="relative px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase text-text-primary transition-all duration-300 hover:scale-105 group cursor-pointer focus:outline-none"
          >
            {/* Background/Border container */}
            <span className="absolute inset-0 rounded-full p-[1.5px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300">
              <span className="block w-full h-full bg-surface rounded-full group-hover:bg-surface/90" />
            </span>
            {/* Label */}
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted group-hover:text-text-primary transition-colors duration-300" />
              hello@michaelsmith.com
            </span>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/50">
          {/* Status availability dot */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-muted font-light">Available for projects</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { name: "Twitter", url: "https://twitter.com" },
              { name: "LinkedIn", url: "https://linkedin.com" },
              { name: "Dribbble", url: "https://dribbble.com" },
              { name: "GitHub", url: "https://github.com" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary transition-colors duration-300 font-light"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <span className="text-[10px] text-muted font-light">
            © {new Date().getFullYear()} Michael Smith. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
