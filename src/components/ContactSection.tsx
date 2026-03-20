import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Send, MapPin, ExternalLink, Clock, MessageSquare, User, AtSign, CheckCircle2 } from "lucide-react";

// --- Types & Constants ---
const CONTACT_INFO = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "rudra152005@gmail.com",
    href: "mailto:rudra152005@gmail.com",
    color: "from-blue-500/20 to-indigo-500/20",
    accent: "text-blue-400"
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/rudra-tiwari05",
    href: "https://www.linkedin.com/in/rudra-tiwari05/",
    color: "from-blue-600/20 to-blue-400/20",
    accent: "text-blue-500"
  },
  {
    id: "github",
    icon: Github,
    label: "GitHub",
    value: "github.com/Rudra152005",
    href: "https://github.com/Rudra152005",
    color: "from-gray-600/20 to-gray-400/20",
    accent: "text-gray-300"
  },
  {
    id: "twitter",
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" {...props} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 3.974H5.078z" />
      </svg>
    ),
    label: "X (Twitter)",
    value: "@tiwar95562",
    href: "https://x.com/tiwar95562",
    color: "from-blue-400/20 to-blue-300/20",
    accent: "text-blue-300"
  }
];

const MESSAGES = [
  "I have a project idea...",
  "Let's collaborate on...",
  "I'd like to hire you for...",
  "Just wanted to say hi!",
  "Are you available for..."
];

// --- Components ---

const StatusBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md mb-6"
  >
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
    </div>
    <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">Available for new opportunities</span>
  </motion.div>
);

const ContactCard = ({ info, index }: { info: typeof CONTACT_INFO[0]; index: number }) => (
  <motion.a
    href={info.href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -5, x: 5 }}
    className="group relative flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    
    <div className="relative z-10 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <info.icon className={`w-5 h-5 ${info.accent}`} />
    </div>

    <div className="relative z-10 flex-1">
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-0.5">{info.label}</p>
      <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors lowercase">{info.value}</p>
    </div>

    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
      <ExternalLink className="w-4 h-4 text-white/40" />
    </div>
  </motion.a>
);

const FormInput = ({ label, id, type = "text", icon: Icon, value, onChange, placeholder }: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <label 
        htmlFor={id}
        className={`absolute left-12 transition-all duration-300 pointer-events-none z-10 
          ${isFocused || value ? "-top-2.5 text-[10px] font-bold text-indigo-400 bg-[#050505] px-2" : "top-4 text-sm text-white/30"}`}
      >
        {label}
      </label>
      
      <div className={`relative flex items-center rounded-xl bg-white/[0.02] border transition-all duration-300 overflow-hidden
        ${isFocused ? "border-indigo-500/50 bg-white/[0.04] shadow-[0_0_20px_rgba(99,102,241,0.1)]" : "border-white/5"}`}
      >
        <div className={`flex items-center justify-center px-4 transition-colors duration-300 ${isFocused ? "text-indigo-400" : "text-white/20"}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        {type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-transparent border-none py-4 pr-4 text-sm text-white placeholder-white/5 outline-none resize-none min-h-[120px]"
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? "" : placeholder}
            className="w-full bg-transparent border-none py-4 pr-4 text-sm text-white placeholder-white/5 outline-none"
          />
        )}
      </div>
    </div>
  );
};

const ConnectionLines = () => (
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden z-0 hidden lg:block opacity-10">
    <svg width="100%" height="400" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <motion.path
        d="M0 100 C 300 100 700 300 1000 300"
        stroke="url(#gradient-line)"
        strokeWidth="1"
        strokeDasharray="8 12"
        animate={{ strokeDashoffset: [0, -40] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0 300 C 300 300 700 100 1000 100"
        stroke="url(#gradient-line)"
        strokeWidth="1"
        strokeDasharray="8 12"
        animate={{ strokeDashoffset: [0, 40] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <defs>
        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(99,102,241,0.5)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  // Typing animation for message placeholder
  const [placeholder, setPlaceholder] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const currentMsg = MESSAGES[msgIdx];
    if (charIdx < currentMsg.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(prev => prev + currentMsg[charIdx]);
        setCharIdx(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholder("");
        setCharIdx(0);
        setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, msgIdx]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 5000);
      setName("");
      setEmail("");
      setMessage("");
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-32 bg-background overflow-hidden">
      <ConnectionLines />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT SIDE: Info & Cards */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <StatusBadge />
                
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                  Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500">Touch</span>
                </h2>
                
                <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed">
                  Open to opportunities, collaborations, and meaningful conversations about the future of tech.
                </p>

                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                  <Clock className="w-3.5 h-3.5" />
                  Usually responds within 24 hours
                </div>
              </div>

              <div className="space-y-4">
                {CONTACT_INFO.map((info, i) => (
                  <ContactCard key={info.id} info={info} index={i} />
                ))}
              </div>

              {/* Extra Location item */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.01] border border-white/5 w-fit"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Location</p>
                  <p className="text-sm font-bold text-white/60">Kanpur, India</p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: Interactive Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 overflow-hidden"
              >
                {/* Visual texture */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[100px] pointer-events-none" />
                
                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormInput 
                      id="name" 
                      label="Your Name" 
                      icon={User} 
                      value={name} 
                      onChange={setName} 
                      placeholder="e.g. John Doe" 
                    />
                    <FormInput 
                      id="email" 
                      label="Email Address" 
                      type="email" 
                      icon={AtSign} 
                      value={email} 
                      onChange={setEmail} 
                      placeholder="e.g. john@example.com" 
                    />
                  </div>

                  <FormInput 
                    id="message" 
                    label="How can I help?" 
                    type="textarea" 
                    icon={MessageSquare} 
                    value={message} 
                    onChange={setMessage} 
                    placeholder={placeholder} 
                  />

                  <div className="flex items-center justify-between gap-6 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || isDone}
                      className="group relative flex-1 sm:flex-none"
                    >
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-400 rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
                      
                      <div className={`relative flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 min-w-[200px]
                        ${isDone ? "bg-emerald-500 text-white" : "bg-[#050505] text-white group-hover:bg-white/5 border border-white/10 group-hover:border-white/20"}`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : isDone ? (
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Sent Successfully</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </button>
                    
                    <p className="hidden md:block text-[10px] text-white/20 font-medium max-w-[140px] leading-relaxed uppercase tracking-widest">
                      Your data is safe and never shared.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
