import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Menu, X, Github, Linkedin, Send, Cpu, Layout, User, Code2, GraduationCap, Award, Zap, MessageSquare, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Zap },
  { label: "Projects", href: "#projects", icon: Layout },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Activity", href: "#activity", icon: Code2 },
  { label: "Certificates", href: "#certificates", icon: Award },
  { label: "Contact", href: "#contact", icon: MessageSquare },
];

/* ─── Logo ─────────────────────────────────────────────────────── */
const Logo = () => (
  <motion.a
    href="#home"
    whileHover={{ scale: 1.03 }}
    className="flex items-center gap-3 group shrink-0"
  >
    {/* Icon mark */}
    <div className="relative">
      <div className="absolute -inset-1.5 bg-indigo-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative w-9 h-9 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 to-[#050f08] flex items-center justify-center shadow-[inset_0_1px_0_rgba(129,140,248,0.15)]">
        <Terminal className="w-4 h-4 text-indigo-400" />
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent rounded-xl"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </div>
    </div>

    {/* Wordmark */}
    <div className="flex flex-col leading-none">
      <span className="text-white text-[15px] font-black tracking-tight uppercase">
        Rudhra
      </span>
      <span className="text-indigo-500 text-[9px] font-bold tracking-[0.25em] uppercase opacity-75 mt-0.5">
        .dev
      </span>
    </div>
  </motion.a>
);

/* ─── Nav Item ──────────────────────────────────────────────────── */
const NavItem = ({ link, isActive, onClick }: { link: typeof navLinks[0]; isActive: boolean; onClick?: () => void }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 25 });
  const sy = useSpring(my, { stiffness: 300, damping: 25 });

  return (
    <motion.a
      href={link.href}
      onClick={onClick}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.3);
        my.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x: sx, y: sy }}
      className={cn(
        "relative px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 select-none",
        isActive ? "text-white" : "text-white/40 hover:text-white/80"
      )}
    >
      {/* Active pill background */}
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute inset-0 rounded-lg bg-white/[0.07] border border-white/10"
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}

      {/* Active emerald dot at bottom */}
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
          style={{ boxShadow: "0 0 6px rgba(129,140,248,0.8)" }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
        />
      )}

      <link.icon className={cn("w-3 h-3 relative z-10 shrink-0", isActive && "text-indigo-400")} />
      <span className="relative z-10">{link.label}</span>
    </motion.a>
  );
};

/* ─── Main Navbar ───────────────────────────────────────────────── */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Scroll state
  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  // Active section tracking
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "education", "activity", "certificates", "contact"];
    const handle = () => {
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 140 && r.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      {/* ── Floating Top Bar ─────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-[100] flex justify-center px-4 pt-4"
      >
        <motion.div
          animate={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
            backgroundColor: scrolled ? "rgba(5,8,6,0.88)" : "rgba(5,8,6,0.55)",
          }}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative w-full max-w-6xl flex items-center gap-4 px-4 py-2.5 rounded-2xl border transition-colors duration-400",
            scrolled
              ? "border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_0.5px_rgba(255,255,255,0.06)]"
              : "border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
          )}
        >
          {/* Top glow line */}
          <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          {/* ── Logo ── */}
          <Logo />

          {/* ── Divider ── */}
          <div className="hidden md:block w-px h-6 bg-white/[0.08] mx-1 shrink-0" />

          {/* ── Nav Links ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                link={link}
                isActive={activeSection === link.href.substring(1)}
              />
            ))}
          </div>

          {/* ── Right Actions ─────────────────────── */}
          <div className="flex items-center gap-3 ml-auto shrink-0">
            {/* GitHub - hidden on small nav */}
            <motion.a
              href="https://github.com/Rudra152005"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -1 }}
              className="hidden lg:flex w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.07] items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/rudra-tiwari05/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -1 }}
              className="hidden lg:flex w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.07] items-center justify-center text-white/40 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-200"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </motion.a>

            {/* Divider */}
            <div className="hidden lg:block w-px h-5 bg-white/[0.08]" />

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex group"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-white/50 via-blue-900/30 to-blue-600/80 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
              <span className="relative inline-flex items-center gap-2 rounded-xl bg-[#050505] border border-white/5 px-5 py-2 text-[11px] font-bold text-white uppercase tracking-widest transition-all duration-300">
                Say Hello <Send className="w-3 h-3 ml-0.5" />
              </span>
            </motion.a>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-4 h-4" /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-4 h-4" /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-[76px] z-[99] rounded-2xl border border-white/10 bg-[#050d07]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden md:hidden"
          >
            {/* Top accent */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <nav className="p-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    activeSection === link.href.substring(1)
                      ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  <link.icon className={cn("w-4 h-4", activeSection === link.href.substring(1) ? "text-indigo-400" : "text-white/30")} />
                  <span>{link.label}</span>
                  {activeSection === link.href.substring(1) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Rudhra.dev</span>
              <div className="flex gap-3">
                <a href="https://github.com/Rudra152005" className="text-white/30 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/in/rudra-tiwari05/" className="text-white/30 hover:text-indigo-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
