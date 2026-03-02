import { ArrowRight, PenTool, Layers, Lightbulb } from "lucide-react";
import heroScene from "@/assets/hero-scene.png";

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
            <div className="flex-1 text-center lg:text-left space-y-6 section-fade">
              <p className="text-base md:text-lg text-muted-foreground font-light italic tracking-wide">
                Building Scalable Web Applications & Solving Real Problems
              </p>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight">
                <span className="text-foreground">Building Real-World</span>
                <br />
                <span className="text-muted-foreground">Full Stack Systems</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto lg:mx-0">
                Passion &amp; Precision in{" "}
                <span className="text-foreground font-medium">Design, Code &amp; Innovation.</span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 pb-12">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-lg min-h-[48px]"
                  style={{ boxShadow: '0 0 30px hsl(0 0% 100% / 0.1)' }}
                >
                  Explore My Work
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/30 backdrop-blur-sm px-8 py-4 text-sm font-medium text-foreground hover:bg-secondary/60 transition-all duration-300 min-h-[48px]"
                >
                  About Me
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
