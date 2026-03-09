import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, Github, Linkedin, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Magnetic button values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Section detection
      const sections = navLinks.map(link => link.href.substring(1));
      let current = activeSection;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6",
          isScrolled ? "md:top-6" : "md:top-0"
        )}
      >
        <div
          className={cn(
            "max-w-6xl mx-auto flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-full border border-transparent",
            isScrolled ? "bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent py-6"
          )}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background font-black text-xl overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="relative z-10">R</span>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20" />
            </div>
            <span className="hidden sm:block font-display text-lg font-black tracking-tighter text-white uppercase group-hover:text-primary transition-colors">
              Portfolio
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 rounded-full p-1.5 backdrop-blur-sm relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 z-10",
                    isActive ? "text-background" : "text-white/50 hover:text-white"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden sm:flex items-center gap-3 mr-2">
              <motion.a
                href="https://github.com/Rudra152005"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/rudra-tiwari05/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>

            <motion.a
              href="#contact"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: magneticX, y: magneticY }}
              className="group relative hidden md:inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-[10px] font-black text-black shadow-lg hover:shadow-white/10 transition-all duration-300 uppercase tracking-[0.2em] overflow-hidden"
            >
              <div className="absolute inset-0 w-[400%] h-full bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-shine" />
              <Send className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span>Say Hello</span>
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white/70 p-2 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-10"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-10 right-10 p-3 rounded-full bg-white text-black shadow-xl"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display font-black tracking-tighter text-white/50 hover:text-white transition-colors flex items-baseline gap-4 group"
                >
                  <span className="text-xs font-black text-white/20 group-hover:text-primary transition-colors">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-auto mb-20 p-8 rounded-3xl border border-white/5 bg-white/[0.02]"
            >
              <p className="text-xs font-black text-white/30 uppercase tracking-[0.3em] mb-6">Social Connect</p>
              <div className="flex gap-6">
                <a
                  href="https://github.com/Rudra152005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rudra-tiwari05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
