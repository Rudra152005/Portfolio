import { FileText, Monitor, Zap, ChevronDown } from "lucide-react";
import heroWorkspace from "@/assets/hero-workspace.png";

const features = [
  { icon: FileText, text: "Elegant Content Platforms" },
  { icon: Monitor, text: "Visual Digital Creations" },
  { icon: Zap, text: "Performance Optimized Features" },
];

const ArticlesSection = () => {
  return (
    <section id="articles" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8 section-fade">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Articles
            </h2>
            <p className="text-muted-foreground max-w-md">
              Insights & tips on design, development and the latest digital trends.
            </p>

            <div className="space-y-4">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300">
              Send a Message
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Right image */}
          <div className="section-fade animate-delay-200">
            <div className="glass-card glow-border overflow-hidden rounded-2xl">
              <img
                src={heroWorkspace}
                alt="Articles workspace"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
