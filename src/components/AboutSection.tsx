import React, { forwardRef, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/portrait.png";
import { Download, Code2, Cpu, Globe, Database, Layout, Zap, Fingerprint } from "lucide-react";
import AboutBackground from "./AboutBackground";

const techStack = [
  { name: "React", icon: Globe, color: "text-blue-400" },
  { name: "Node.js", icon: Code2, color: "text-indigo-500" },
  { name: "TypeScript", icon: Cpu, color: "text-blue-400" },
  { name: "Next.js", icon: Layout, color: "text-white" },
  { name: "MongoDB", icon: Database, color: "text-indigo-600" },
  { name: "Tailwind", icon: Zap, color: "text-blue-400" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={(node: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as any).current = node;
        }
        (containerRef as any).current = node;
      }}
      id="about"
      className="relative h-screen flex flex-col justify-center overflow-hidden"
    >
      <AboutBackground />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: circular profile image (Hybrid approach) */}
          <div className="flex justify-center items-center w-full">
            {/* MOBILE ONLY: Static Profile Image with parallax */}
            <motion.div
              style={{ y, scale }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group w-[240px] h-[240px] md:w-[340px] md:h-[340px] lg:hidden rounded-full p-[2px]"
            >
              {/* Subtle ambient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/10 opacity-50 group-hover:opacity-100 blur-[40px] transition-opacity duration-700 pointer-events-none" />

              {/* Floating Image Container */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
              >
                <img
                  src={portrait}
                  alt="Rudra Tiwari"
                  className="w-full h-full object-cover object-top brightness-105 contrast-[1.02] group-hover:brightness-110 transition-all duration-700"
                />
              </motion.div>
            </motion.div>

            {/* DESKTOP ONLY: Invisible Spacer for scrolling 3D Image */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -30]) }}
              id="about-profile-spacer"
              className="hidden lg:block w-[380px] h-[380px] rounded-full shrink-0"
            />
          </div>

          {/* RIGHT: content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black text-white/50 tracking-[0.3em] uppercase">Identity Profile</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-2">
                Engineering
              </h2>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500">
                  Digital Excellence
                </span>
              </h2>
              <p className="text-lg md:text-xl font-medium text-white/50 mt-3">
                Full-Stack Developer &amp; UI Architect
              </p>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0">
              I specialize in complex, high-performance web applications that bridge the gap
              between human experience and technical power. Clean code, futuristic design,
              relentless problem-solving.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/20 hover:bg-white/[0.06] transition-all duration-200"
                >
                  <tech.icon className={`w-3.5 h-3.5 ${tech.color}`} />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="/Mycv1.pdf"
                download="Rudra_Tiwari_Resume.pdf"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex group"
              >
                {/* Split white/blue glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-white/50 via-blue-900/30 to-blue-600/80 rounded-full blur-md opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

                {/* Pure dark button */}
                <span className="relative inline-flex items-center gap-3 rounded-full bg-[#050505] border border-white/5 px-7 py-3 text-[11px] font-bold text-white uppercase tracking-widest transition-all duration-300">
                  <Download className="w-4 h-4" /> Get Detailed Resume
                </span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
