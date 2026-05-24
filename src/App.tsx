import { useState, useEffect, useRef } from "react";
import {
  Code2,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Bot,
  Building2,
  LineChart,
  Mail,
  Phone
} from "lucide-react";
import { motion } from "motion/react";

// Custom SVG Icons for GitHub and LinkedIn matching Lucide style
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Project Cards Data (Restored original project names and metadata)
const projectCards = [
  {
    title: "Autovate",
    icon: Bot,
    delay: 0.1,
    category: "AI / Automation",
    description: "SaaS marketplace to deploy 60+ AI workflows on n8n — WhatsApp bots, CRM enrichers, and real-time analytics.",
    tags: ["Next.js", "n8n", "SaaS", "Supabase"],
    gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
    url: "https://autovate-ashy.vercel.app/"
  },
  {
    title: "Company Handler",
    icon: Building2,
    delay: 0.2,
    category: "Enterprise SaaS",
    description: "Operations platform with multi-role access control, task management, and command center terminal dashboards.",
    tags: ["React", "RBAC", "PostgreSQL", "Auth"],
    gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
    url: "https://companyhandler-saas.vercel.app/"
  },
  {
    title: "Assetura",
    icon: LineChart,
    delay: 0.3,
    category: "FinTech / Data Science",
    description: "AI-powered trading terminal for crypto and stocks with real-time charting, signals, and AI financial advisors.",
    tags: ["React", "FinTech", "WebSockets", "AI"],
    gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
    url: "https://asseturatapp.vercel.app/"
  }
];

// Skills Data with Gradients for Glowing Card Borders
const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    gradient: 'linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)'
  },
  {
    title: 'Backend & APIs',
    skills: ['Node.js', 'Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'REST APIs'],
    gradient: 'linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)'
  },
  {
    title: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Matplotlib', 'Jupyter'],
    gradient: 'linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)'
  },
  {
    title: 'Tools & DevOps',
    skills: ['n8n', 'Git', 'Vercel', 'Figma', 'VS Code', 'Linux'],
    gradient: 'linear-gradient(137deg, #10B981 0%, #6EE7B7 45%, #059669 100%)'
  }
];

// Reusable FeatureCard Component with Entrance Animations and Hover Motions
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  category: string;
  tags: string[];
  gradient: string;
  delay: number;
  url: string;
}

export function FeatureCard({ title, description, icon: Icon, category, tags, gradient, delay, url }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative flex flex-col justify-start items-start w-full max-w-[260px] md:max-w-[300px] group mx-auto"
    >
      {/* Glow Background (Crucial) */}
      <div
        className="absolute inset-0 w-full h-[260px] md:h-[300px] opacity-60 rounded-[40px] pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-85"
        style={{
          background: gradient,
          filter: "blur(45px)"
        }}
      />

      {/* Foreground Card with Gradient Border (Crucial) */}
      <div
        className="relative z-10 self-stretch h-[260px] md:h-[300px] rounded-[40px] overflow-hidden transition-all duration-300"
        style={{
          border: "8px solid transparent",
          background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`
        }}
      >
        {/* Content Inner Layout */}
        <div className="w-full h-full p-6 flex flex-col justify-between select-none">
          {/* Top content */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] text-white/40 uppercase font-mono tracking-wider">{category}</span>
              <div className="text-white/90 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon size={24} strokeWidth={2.2} />
              </div>
            </div>
            <h3 className="text-white font-medium text-xl tracking-tight mb-2">{title}</h3>
            <p className="text-gray-400 text-[13px] leading-[1.5] font-normal selection:bg-white/20 line-clamp-3">
              {description}
            </p>
          </div>

          {/* Bottom content */}
          <div>
            <div className="flex flex-wrap gap-1 mb-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors w-fit"
            >
              Live Demo <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  // Typewriter Terminal effect for Section 2
  const [terminalText, setTerminalText] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const fullTerminalScript =
    `anish@iitm:~$ whoami
> Anish Patil — Builder, Analyst, Engineer
anish@iitm:~$ skills --top
> React · Python · SQL · n8n · ML
anish@iitm:~$ status
> Open to internships & projects ✓`;

  useEffect(() => {
    let index = 0;
    let timer: any;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        clearInterval(timer);
        setTerminalText("");
        index = 0;
        timer = setInterval(() => {
          setTerminalText(fullTerminalScript.slice(0, index));
          index++;
          if (index > fullTerminalScript.length) {
            clearInterval(timer);
          }
        }, 18);
      }
    }, { threshold: 0.1 });

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (sectionId: string, label: string) => {
    setActiveSection(label);
    setMobileMenuOpen(false);
    setProjectsDropdownOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#0A0A0B] text-white selection:bg-white/10 selection:text-white min-h-screen flex flex-col font-sans">

      {/* SECTION 1 — HERO & NAVBAR */}
      <section id="hero" className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_230229_7c9bc431-46cf-489a-948d-e8144d8eb5d4.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Navbar */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 sm:px-8 py-5">
          {/* Logo Left */}
          <div
            onClick={() => handleNavClick('hero', 'Home')}
            className="flex items-center gap-2 text-white font-medium text-base cursor-pointer hover:opacity-85 transition-opacity"
          >
            <Code2 size={22} strokeWidth={1.5} />
            <span>Anish Patil</span>
          </div>

          {/* Central Nav Pill (Desktop) */}
          <nav className="hidden md:flex liquid-glass items-center gap-1 rounded-xl px-2 py-2">
            <button
              onClick={() => handleNavClick('hero', 'Home')}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${activeSection === 'Home' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
                }`}
            >
              Home
            </button>

            {/* Projects Dropdown button */}
            <div className="relative">
              <button
                onClick={() => setProjectsDropdownOpen(!projectsDropdownOpen)}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${activeSection === 'Projects' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
                  }`}
              >
                <span>Projects</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${projectsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Projects Dropdown Options */}
              {projectsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl liquid-glass p-1.5 flex flex-col gap-1 shadow-2xl z-50 border border-white/5 animate-in fade-in duration-200">
                  {projectCards.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => {
                        handleNavClick('projects', 'Projects');
                        setProjectsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {card.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('skills', 'Skills')}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${activeSection === 'Skills' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
                }`}
            >
              Skills
            </button>

            <button
              onClick={() => handleNavClick('contact', 'Contact')}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${activeSection === 'Contact' ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('about', 'About')}
              className="liquid-glass text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => handleNavClick('contact', 'Contact')}
              className="bg-white text-black text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden liquid-glass text-white p-2 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="absolute top-[72px] left-4 right-4 z-30 liquid-glass rounded-2xl p-4 flex flex-col gap-1 border border-white/5 shadow-2xl animate-in fade-in duration-300">
              <button
                onClick={() => handleNavClick('hero', 'Home')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors text-white"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('projects', 'Projects')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors text-white"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavClick('skills', 'Skills')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors text-white"
              >
                Skills
              </button>
              <button
                onClick={() => handleNavClick('contact', 'Contact')}
                className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-white/5 transition-colors text-white"
              >
                Contact
              </button>

              {/* Mobile CTA Row */}
              <div className="flex gap-2 mt-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleNavClick('about', 'About')}
                  className="flex-1 liquid-glass text-white text-center text-xs font-semibold py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Resume
                </button>
                <button
                  onClick={() => handleNavClick('contact', 'Contact')}
                  className="flex-1 bg-white text-black text-center text-xs font-semibold py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Hire Me
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 z-20 px-6 sm:px-12 pb-10 sm:pb-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight mb-4">
              Full-Stack Engineer, Data Scientist & Builder.
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mb-7 max-w-md font-light">
              BS Data Science & Applications student at IIT Madras. I build AI-powered web products, trading platforms, and automation systems — shipping real software across full-stack, data, and ML.
            </p>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleNavClick('projects', 'Projects')}
                className="bg-white text-black text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/90 transition-colors cursor-pointer"
              >
                View Projects
              </button>
              <button
                onClick={() => handleNavClick('contact', 'Contact')}
                className="liquid-glass text-white text-sm sm:text-base font-medium px-6 sm:px-7 py-3 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT */}
      <section id="about" className="px-6 sm:px-12 py-24 bg-[#0A0A0B] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="flex flex-col gap-5">
            <h2 className="text-white text-3xl font-medium tracking-tight">About Me</h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light">
              I'm Anish Patil, a BS Data Science & Applications student at IIT Madras — one of India's most competitive programs. I build full-stack web apps, AI automation systems, and data science pipelines. I sit at the intersection of engineering and product — caring as much about UX and business impact as clean code and system design.
            </p>
          </div>

          {/* Right Terminal Card */}
          <div
            ref={terminalRef}
            className="bg-[#1A1A1C] rounded-2xl p-6 font-mono text-sm border border-white/5 shadow-2xl min-h-[180px] flex flex-col justify-start"
          >
            <div className="flex gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Terminal typewriter output */}
            <div className="text-emerald-400 leading-relaxed whitespace-pre-wrap flex-1">
              {terminalText}
              <span className="inline-block w-1.5 h-4 bg-emerald-400 ml-1 align-middle cursor-blink" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROJECTS */}
      <section id="projects" className="bg-[#0A0A0B] min-h-screen flex flex-col items-center justify-center p-6 md:p-12 border-t border-white/5">
        {/* Section labels */}
        <div className="text-center">
          <p className="text-white/40 text-xs font-medium tracking-widest uppercase mb-3">Selected Work</p>
          <h2 className="text-white text-3xl sm:text-4xl font-medium mb-12">Projects</h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-3 lg:gap-3 w-full max-w-[936px]">
          {projectCards.map((card) => (
            <FeatureCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              category={card.category}
              tags={card.tags}
              gradient={card.gradient}
              delay={card.delay}
              url={card.url}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4 — SKILLS */}
      <section id="skills" className="bg-[#0A0A0B] px-6 sm:px-12 py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl font-medium mb-1">Tech Stack</h2>
          <p className="text-white/40 text-sm mb-12">Tools I use to build, analyze, and ship</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="relative flex flex-col justify-start items-stretch w-full group"
              >
                {/* Glow Background */}
                <div
                  className="absolute inset-0 w-full h-full opacity-60 rounded-[32px] pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                  style={{
                    background: category.gradient,
                    filter: "blur(35px)"
                  }}
                />

                {/* Foreground Card */}
                <div
                  className="relative z-10 self-stretch rounded-[32px] overflow-hidden transition-all duration-300"
                  style={{
                    border: "6px solid transparent",
                    background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${category.gradient} border-box`
                  }}
                >
                  <div className="w-full h-full p-6 flex flex-col justify-start min-h-[180px]">
                    <span className="text-white/40 text-xs uppercase tracking-widest mb-4 font-semibold font-mono block">
                      {category.title}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/8 text-white/70 font-light border border-white/[0.02]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CONTACT */}
      <section id="contact" className="bg-[#0A0A0B] px-6 sm:px-12 py-24 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-white text-3xl font-medium mb-2">Let's Build Something</h2>
          <p className="text-white/40 text-sm mb-10">Open to internships, freelance, and collaborations.</p>

          {/* Contact details cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* Email card */}
            <div className="relative flex flex-col justify-start items-stretch w-full group">
              {/* Glow Background */}
              <div
                className="absolute inset-0 w-full h-full opacity-60 rounded-[32px] pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                style={{
                  background: "linear-gradient(137deg, #FFB1CE 0%, #F43F5E 50%, #BE123C 100%)",
                  filter: "blur(35px)"
                }}
              />
              <a
                href="mailto:anishpatil146@gmail.com"
                className="relative z-10 self-stretch rounded-[32px] overflow-hidden transition-all duration-300 flex items-center gap-3 p-5"
                style={{
                  border: "6px solid transparent",
                  background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, linear-gradient(137deg, #FFB1CE 0%, #F43F5E 50%, #BE123C 100%) border-box`
                }}
              >
                <div className="text-white/70 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/30">Email Me</span>
                  <span className="text-xs sm:text-sm font-medium text-white/90">anishpatil146@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Phone card */}
            <div className="relative flex flex-col justify-start items-stretch w-full group">
              {/* Glow Background */}
              <div
                className="absolute inset-0 w-full h-full opacity-60 rounded-[32px] pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                style={{
                  background: "linear-gradient(137deg, #6EE7B7 0%, #10B981 50%, #047857 100%)",
                  filter: "blur(35px)"
                }}
              />
              <a
                href="tel:+919096861443"
                className="relative z-10 self-stretch rounded-[32px] overflow-hidden transition-all duration-300 flex items-center gap-3 p-5"
                style={{
                  border: "6px solid transparent",
                  background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, linear-gradient(137deg, #6EE7B7 0%, #10B981 50%, #047857 100%) border-box`
                }}
              >
                <div className="text-white/70 bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/30">Call Me</span>
                  <span className="text-xs sm:text-sm font-medium text-white/90">+91 9096861443</span>
                </div>
              </a>
            </div>
          </div>

          {/* Social Row */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <a
              href="https://github.com/anishpatil146"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href="https://linkedin.com/in/anishpatil146"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0B] border-t border-white/5 py-8 text-center mt-auto">
        <p className="text-white/30 text-sm">Designed & built by Anish Patil · IIT Madras · 2025</p>
        <p className="text-white/20 text-xs mt-1">anishpatil146@gmail.com</p>
      </footer>
    </div>
  );
}
