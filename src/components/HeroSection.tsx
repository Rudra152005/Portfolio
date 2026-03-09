import { ArrowRight, PenTool, Layers, Lightbulb } from "lucide-react";
import heroScene from "@/assets/hero-scene.png";
import HeroBackground from "./HeroBackground";

const stats = [
  { icon: PenTool, value: "10+", label: "Projects Built" },
  { icon: Layers, value: "100%", label: "Active Learner" },
  { icon: Lightbulb, value: "Creative", label: "Solutions" },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-20 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <img
          src={heroScene}
          alt=""
          className="w-full h-full object-cover object-center"
        />

        {/* Animated Background Layers */}
        <HeroBackground />

        {/* Dark overlay — stronger on mobile for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to right,
              hsl(220 20% 4% / 0.95) 0%,
              hsl(220 20% 4% / 0.85) 40%,
              hsl(220 20% 4% / 0.5) 70%,
              hsl(220 20% 4% / 0.3) 100%
            )`,
          }}
        />
        {/* Bottom gradient for stats */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `linear-gradient(to top, hsl(220 20% 4% / 0.95), transparent)`,
          }}
        />
        {/* Top glow — desktop only for performance */}
        <div
          className="absolute top-0 left-1/4 w-1/2 h-64 pointer-events-none hidden lg:block"
          style={{
            background: `radial-gradient(ellipse at center, hsl(210 100% 60% / 0.06), transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* LEFT: Text content */}
            <div className="flex-1 text-center lg:text-left flex flex-col justify-center section-fade">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
                Hi, I'm Rudra
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-2xl text-gray-300 font-medium mb-6 mt-1">
                Full Stack Developer
              </h2>

              <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto lg:mx-0 mb-8">
                Building modern web applications.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pb-12 mt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/10 transition-all duration-300"
                >
                  View Projects
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-lg bg-transparent border border-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/5 transition-all duration-300"
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* RIGHT: spacer / image shown on large screens only */}
            <div className="flex-1 hidden lg:block" aria-hidden="true" />

          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:flex md:items-center md:gap-0 md:justify-between gap-5 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary/40 backdrop-blur-sm border border-border/30 flex items-center justify-center shrink-0">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-base font-display font-bold text-foreground">{stat.value}</span>
                  <p className="text-[11px] text-muted-foreground leading-tight">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden md:block w-px h-10 bg-border/40 ml-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
