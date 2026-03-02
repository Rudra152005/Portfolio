import { Github, Linkedin, Mail } from "lucide-react";
import contactBg from "@/assets/contact-bg.png";
import portrait from "@/assets/portrait.png";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
  </svg>
);

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 section-fade">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Follow me on social media to stay up-to-date on my portfolio and digital trends
          </p>

          {/* Social */}
          <div className="flex justify-center gap-4 mt-6">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/in/rudra-tiwari05/" },
              { Icon: XIcon, href: "https://x.com/tiwar95562" },
              { Icon: Github, href: "https://github.com/Rudra152005" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-lg border border-border bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Image row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 section-fade animate-delay-200">
          {/* Portrait card */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-500">
            <div className="h-80 overflow-hidden">
              <img
                src={portrait}
                alt="Developer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center 15%" }}
              />
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            {/* Name badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white tracking-wide">Rudhra Tiwari</p>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Full Stack Developer</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            </div>
          </div>

          {/* Workspace card */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-500">
            <div className="h-80 overflow-hidden">
              <img
                src={contactBg}
                alt="Workspace"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>

        {/* Contact info */}
        <div className="text-center space-y-4 section-fade animate-delay-300">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span className="text-lg font-display">rudra152005@gmail.com</span>
          </div>
          <p className="text-sm text-muted-foreground">📍 Kanpur, India</p>
          <a
            href="mailto:rudra152005@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300 hover:scale-105"
          >
            Send a Message
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
