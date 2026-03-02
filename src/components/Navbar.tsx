import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4">
          <a href="#" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-foreground">▲</span> Rudra
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/Rudra152005" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/rudra-tiwari05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="ml-3 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
            >
              Say Hello
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary/40 transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-xs bg-background/95 backdrop-blur-xl border-l border-border flex flex-col transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <span className="font-display text-xl font-bold text-foreground">
            <span>▲</span> Rudra
          </span>
          <button
            onClick={close}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 space-y-2">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={close}
              className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-3 border-b border-border/20 last:border-0"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-8 py-8 space-y-4 border-t border-border/40">
          <a
            href="#contact"
            onClick={close}
            className="w-full flex items-center justify-center rounded-full border border-border bg-secondary px-6 py-3.5 text-sm font-medium text-foreground hover:bg-accent transition-colors min-h-[44px]"
          >
            Say Hello
          </a>
          <div className="flex items-center justify-center gap-6">
            <a href="https://github.com/Rudra152005" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/rudra-tiwari05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
