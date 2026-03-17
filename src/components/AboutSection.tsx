import { motion, Variants } from "framer-motion";
import myCv from "@/assets/Mycv1.pdf";
import { Download, Code2, Cpu, Globe, Fingerprint, Database, Layout, Zap } from "lucide-react";
import AboutBackground from "./AboutBackground";
import StatCard from "./StatCard";
import ProfileImage from "./ProfileImage";

const AboutSection = () => {
  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const techStack = [
    { name: "React", icon: <Globe className="w-5 h-5" />, color: "text-blue-400" },
    { name: "Node.js", icon: <Code2 className="w-5 h-5" />, color: "text-green-500" },
    { name: "TypeScript", icon: <Cpu className="w-5 h-5" />, color: "text-blue-600" },
    { name: "Next.js", icon: <Layout className="w-5 h-5" />, color: "text-white" },
    { name: "MongoDB", icon: <Database className="w-5 h-5" />, color: "text-green-600" },
    { name: "Tailwind", icon: <Zap className="w-5 h-5" />, color: "text-cyan-400" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Multi-layered Animated Background */}
      <AboutBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-24"
        >
          <div className="inline-flex items-center justify-center space-x-3 mb-6 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl group cursor-default hover:border-primary/40 transition-all duration-500">
            <Fingerprint className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-white/70 tracking-[0.3em] uppercase group-hover:text-white transition-colors">Identity Profile</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-bold text-white tracking-tighter leading-none">
            About <span className="text-primary italic">Me</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mt-8 opacity-30 blur-[1px]" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
          {/* Portrait Column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center order-2 lg:order-1"
          >
            <ProfileImage />
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left order-1 lg:order-2">
            {/* Heading & Intro */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                Engineering <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient">
                  Digital Excellence
                </span>
              </h2>
              <h3 className="text-xl md:text-2xl font-medium text-white/60">
                Full-Stack Developer & UI Architect
              </h3>
            </motion.div>

            {/* Description Reveal */}
            <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I specialize in building complex, high-performance web applications that bridge the gap between human experience and technical power.
              My philosophy is rooted in clean code, futuristic design, and relentless problem-solving
              to drive impactful digital solutions.
            </motion.p>

            {/* Tech Stack Horizontal List */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              {techStack.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -8, scale: 1.05 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 },
                    default: { duration: 0.3 }
                  }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 transition-colors hover:border-primary/40 group cursor-default backdrop-blur-sm shadow-lg overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className={`${tech.color} group-hover:scale-110 transition-transform duration-500 relative z-10 font-bold`}>
                    {tech.icon}
                  </span>
                  <span className="text-[10px] font-black text-white/50 group-hover:text-white transition-colors uppercase tracking-[0.2em] relative z-10">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated Stat Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              <StatCard label="Projects Completed" value={10} delay={0.3} />
              <StatCard label="Core Tech Stack" value={15} delay={0.4} />
              <StatCard label="Learning Progress" value={95} suffix="%" delay={0.5} />
            </div>

            {/* Action CTA */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start pt-10">
              <div className="neon-border-container group">
                {/* Moving Neon Border - Toned down for elegance */}
                <div className="neon-border-gradient opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                <motion.a
                  href={myCv}
                  download="Rudra_Tiwari_Resume.pdf"
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 15px 35px -10px hsl(var(--glow-blue) / 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center gap-4 rounded-full bg-white/[0.02] border border-white/10 px-10 py-5 text-[11px] font-black text-white/70 hover:text-white transition-all duration-500 overflow-hidden uppercase tracking-[0.3em] backdrop-blur-xl shadow-2xl"
                >
                  {/* Shimmer Effect */}
                  <div className="shimmer-overlay" />

                  <motion.div
                    variants={{
                      hover: {
                        y: [0, 4, 0],
                        transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                      }
                    }}
                    whileHover="hover"
                  >
                    <Download className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </motion.div>

                  <span>Get Detailed Resume</span>

                  {/* Inner shadow & Highlights for depth */}
                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] rounded-full" />
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.a>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Subtle Gradient Fog Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default AboutSection;
