import { memo, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import portrait from "@/assets/portrait.png";
import heroScene from "@/assets/hero-scene.png";

const XLogo = (props: any) => (
  <svg viewBox="0 0 24 24" {...props} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
  </svg>
);

const HeroBackground = memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Base Ambient Scene */}
    <img
      src={heroScene}
      alt=""
      loading="eager"
      className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
    />
    
    {/* Subtle ambient glows */}
    <div className="absolute top-[0%] left-[0%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
    <div className="absolute bottom-[0%] right-[0%] w-[40%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full" />

    {/* Softer gradients to let the image show through */}
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(3,7,18,0.8))]" />
  </div>
));

const stats = [
  { label: "Projects Built", value: "10+", icon: Github },
  { label: "Active Learner", value: "100%", icon: Linkedin },
  { label: "Creative Solutions", value: "Custom", icon: XLogo }
];

const HeroSection = memo(() => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 18);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section id="home" className="relative h-screen flex flex-col justify-center overflow-hidden bg-background">
      <HeroBackground />
 
      {/* ── Main content ── */}
      <div className="relative z-20 w-full pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT: text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center text-center lg:text-left w-full"
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-none">
                Hi, I'm <span className="text-indigo-400 italic">Rudra</span>
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-bold mb-6 tracking-wide">
                Full Stack Developer
              </h2>

              <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
                Crafting high-performance digital experiences that bridge the gap between
                imagination and technical excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex group"
                >
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-white/50 via-blue-900/30 to-blue-600/80 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                  <span className="relative inline-flex items-center gap-3 rounded-full bg-[#050505] border border-white/5 px-8 py-4 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300">
                    View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.a>

                <motion.a
                  href="/Mycv1.pdf"
                  download="Rudra_Tiwari_Resume.pdf"
                  target="_blank"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] px-8 py-4 text-sm font-black text-white/80 hover:text-white transition-all duration-300 uppercase tracking-widest backdrop-blur-md"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT: Profile region */}
            <div className="flex justify-center items-center w-full">
              {/* MOBILE ONLY: Static fallback */}
              <div className="lg:hidden relative">
                <div className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border border-white/10">
                   <img src={portrait} alt="Rudra" className="w-full h-full object-cover object-top" />
                </div>
              </div>

              {/* DESKTOP ONLY: Spacer for 3D overlay */}
              <div id="hero-profile-spacer" className="hidden lg:block w-[380px] h-[380px] rounded-full shrink-0" />
            </div>

          </div>
        </div>
      </div>

      {/* Stats bar — absolute to avoid shifting the center */}
      <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-wrap justify-between items-center gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-indigo-400" />
                 </div>
                 <div>
                    <div className="text-xl font-bold text-white leading-none mb-1">{stat.value}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-black">{stat.label}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
