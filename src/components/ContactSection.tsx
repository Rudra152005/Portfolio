import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Send, MapPin, ExternalLink, Code2, Cpu, Globe, Clock } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
  </svg>
);

const TypingHeading = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight min-h-[1.2em]">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-12 md:h-16 bg-primary ml-1 align-middle"
      />
    </h2>
  );
};

const FloatingIcon = ({ Icon, delay, x, y }: { Icon: any; delay: number; x: string; y: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      scale: [1, 1.1, 1],
      x: [0, 10, -10, 0],
      y: [0, -15, 15, 0]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute text-primary/20 pointer-events-none"
    style={{ left: x, top: y }}
  >
    <Icon size={48} />
  </motion.div>
);

const ContactCard = ({ icon: Icon, title, value, href, delay }: { icon: any; title: string; value: string; href: string; delay: number }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
    </div>
    <h3 className="relative z-10 text-white/50 text-sm font-medium uppercase tracking-widest mb-2">{title}</h3>
    <p className="relative z-10 text-white font-display text-lg group-hover:text-primary transition-colors duration-300">{value}</p>
    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ExternalLink size={16} className="text-primary" />
    </div>
  </motion.a>
);

const ContactSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contact" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />

        <FloatingIcon Icon={Code2} delay={0} x="10%" y="20%" />
        <FloatingIcon Icon={Cpu} delay={2} x="85%" y="15%" />
        <FloatingIcon Icon={Globe} delay={4} x="15%" y="70%" />
        <FloatingIcon Icon={Send} delay={1} x="80%" y="75%" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 section-fade">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md mb-8 group/status"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_hsl(var(--primary))]"></span>
            </div>
            <div className="flex items-center gap-2 border-l border-emerald-500/20 pl-3">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Available for work</span>
              <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
              <span className="text-white/40 text-[10px] font-medium font-mono uppercase tracking-tighter flex items-center gap-1 group-hover/status:text-emerald-400 transition-colors">
                <Clock className="w-3 h-3" /> {currentTime}
              </span>
            </div>
          </motion.div>

          <TypingHeading text="Get In Touch" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed mt-6"
          >
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </motion.p>
        </div>

        {/* Contact cards grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          <ContactCard
            icon={Mail}
            title="Email Me"
            value="rudra152005@gmail.com"
            href="mailto:rudra152005@gmail.com"
            delay={0.2}
          />
          <ContactCard
            icon={Linkedin}
            title="LinkedIn"
            value="Rudhra Tiwari"
            href="https://www.linkedin.com/in/rudra-tiwari05/"
            delay={0.4}
          />
          <ContactCard
            icon={Github}
            title="GitHub"
            value="@Rudra152005"
            href="https://github.com/Rudra152005"
            delay={0.6}
          />
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center space-y-8"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-muted-foreground group hover:border-white/20 transition-all duration-300">
              <MapPin className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-lg">Kanpur, India</span>
            </div>

            <div className="flex gap-6">
              {[
                { Icon: XIcon, href: "https://x.com/tiwar95562" },
                { Icon: Github, href: "https://github.com/Rudra152005" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/rudra-tiwari05/" }
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.a
            href="mailto:rudra152005@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <span className="relative inline-flex items-center gap-2 rounded-full bg-[#0a0a0f] px-10 py-4 text-sm font-bold text-white transition-all duration-300">
              Send a Message <Send size={16} />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
