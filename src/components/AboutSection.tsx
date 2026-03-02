import portrait from "@/assets/portrait.png";
import { Download } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Portrait */}
          <div className="flex justify-center section-fade">
            <div className="relative w-64 md:w-72 lg:w-80">
              {/* Portrait frame */}
              <div className="relative rounded-2xl overflow-hidden glow-border" style={{ aspectRatio: "3/4" }}>
                <img
                  src={portrait}
                  alt="Developer portrait"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-secondary border border-border flex items-center justify-center animate-float shadow-lg">
                <span className="text-xl md:text-2xl">💻</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6 section-fade animate-delay-200 text-center lg:text-left">
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-foreground">
              About Me
            </h2>
            <h3 className="font-display text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground">
              Creating Immersive Digital Experiences
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              I'm a skilled digital designer and developer specializing in innovative
              and engaging websites, apps and digital products. With a passion for
              pixel-perfect design transitions using the latest technologies, I bring ideas to deliver
              impactful digital solutions.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300 hover:scale-105 min-h-[44px]">
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
