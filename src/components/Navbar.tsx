import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X, Github, Linkedin, Send, Cpu, Layout, User, Code2, GraduationCap, Award, Zap, MessageSquare } from "lucide-react";
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

const Logo = () => (
  <motion.a
    href="#home"
    className="flex items-center gap-3 group px-2 py-1"
    whileHover={{ scale: 1.02 }}
  >
    <div className="relative">
      <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center p-[1px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
        <div className="relative z-20 w-full h-full bg-[#030014] rounded-[11px] flex items-center justify-center">
          <Cpu className="w-5 h-5 text-white animate-pulse" />
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-white text-lg font-black tracking-tighter uppercase leading-none">
        Rudhra
      </span>
      <span className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase opacity-80">
        Neural Portfolio
      </span>
    </div>
  </motion.a>
);

const NavItem = ({ link, isActive, onClick, isScrolled }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const dX = useSpring(mouseX, springConfig);
  const dY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.35);
    mouseY.set(y * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      href={link.href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dX, y: dY }}
      className={cn(
        "relative px-2.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 flex items-center gap-2",
        isActive ? "text-white" : "text-white/50 hover:text-white"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <link.icon className={cn("w-3.5 h-3.5 relative z-10", isActive && "text-primary")} />
      <span className="relative z-10">{link.label}</span>

      {/* Light sweep effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-shine pointer-events-none"
      />
    </motion.a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  const navWidth = useTransform(scrollY, [0, 100], ["90%", "fit-content"]);
  const navPadding = useTransform(scrollY, [0, 100], ["20px 60px", "8px 12px"]);
  const navY = useTransform(scrollY, [0, 100], [24, 15]);
  const navRadius = useTransform(scrollY, [0, 100], ["28px", "100px"]);
  const navBgOpacity = useTransform(scrollY, [0, 100], [0.1, 0.85]);
  const navBorderOpacity = useTransform(scrollY, [0, 100], [0.03, 0.2]);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothWidth = useSpring(navWidth, springConfig);
  const smoothY = useSpring(navY, springConfig);

  const socialOpacity = useTransform(scrollY, [0, 25], [1, 0]);
  const socialScale = useTransform(scrollY, [0, 25], [1, 0.9]);
  const socialDisplay = useTransform(scrollY, [0, 26], ["flex", "none"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "activity", "certificates", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: smoothWidth,
          y: smoothY,
          padding: navPadding,
          borderRadius: navRadius,
          backgroundColor: `rgba(0, 0, 0, ${navBgOpacity.get()})`,
          borderColor: `rgba(255, 255, 255, ${navBorderOpacity.get()})`,
          maxWidth: "1400px" // Global safety constraint
        }}
        className={cn(
          "fixed top-0 left-1/2 z-[100]",
          "backdrop-blur-3xl border flex items-center shadow-[0_8px_40px_rgba(0,0,0,0.5)]",
          "overflow-hidden"
        )}
      >
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

        {/* Subtle Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* --- 3-COLUMN FLEX LAYOUT --- */}

        {/* Column 1: Logo (Left) */}
        <div className="flex-1 flex items-center justify-start min-w-max lg:min-w-[150px]">
          <Logo />
        </div>

        {/* Column 2: Center Menu (Fixed centered core) */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] shrink-0 mx-6 lg:mx-10 whitespace-nowrap">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              isActive={activeSection === link.href.substring(1)}
              onClick={() => setIsOpen(false)}
              isScrolled={scrollY.get() > 50}
            />
          ))}
        </div>

        {/* Column 3: Actions (Right) */}
        <div className="flex-1 flex items-center justify-end gap-5 min-w-max lg:min-w-[150px]">
          {/* Social Cluster - Hides on scroll - Fade out even EARLIER and add more right margin */}
          <motion.div
            style={{ opacity: socialOpacity, scale: socialScale, display: socialDisplay }}
            className="hidden xl:flex items-center gap-6 border-r border-white/10 pr-10 mr-2 ml-8 lg:ml-12"
          >
            <motion.a
              href="https://github.com/Rudra152005"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.2, color: "rgba(255,255,255,1)" }}
              className="text-white/40 hover:text-white transition-all duration-300"
            >
              <Github className="w-4.5 h-4.5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/rudra-tiwari05/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.2, color: "rgba(255,255,255,1)" }}
              className="text-white/40 hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </motion.a>
          </motion.div>

          {/* Say Hello Button - Ultra Premium Neural Style */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden whitespace-nowrap shrink-0 transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="relative z-20 flex items-center gap-2">
              <span>Say Hello</span>
              <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </div>

            {/* Pulsing Neon Ring (Neural Glow) */}
            <div className="absolute -inset-[2px] rounded-full border border-primary/50 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500 blur-[2px]" />

            {/* Inner Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
          </motion.a>

          {/* Mobile Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-3xl md:hidden flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
                    <link.icon className="w-6 h-6 text-white/50 group-hover:text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                      Navigate to {link.label}
                    </span>
                  </div>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 left-10 right-10 flex flex-col gap-6"
            >
              <div className="h-[1px] bg-white/10 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                  Neural.Protocol v3.0
                </span>
                <div className="flex gap-4">
                  <Github className="w-5 h-5 text-white/20" />
                  <Linkedin className="w-5 h-5 text-white/20" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
