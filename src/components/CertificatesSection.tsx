import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { Award, ChevronRight, ExternalLink, BookOpen, Code, ShieldCheck, Globe, Trophy, Star, Target, Users, BookMarked, Terminal, X, MonitorPlay } from "lucide-react";

interface Certificate {
    id: number;
    title: string;
    organization: string;
    icon: React.ElementType;
    year?: string;
    description: string;
    skills: string[];
    link: string;
    category: string;
}

const categories = ["All", "Programming", "Web Development", "Cloud / DevOps", "Security", "AI / ML", "Workshops"];

const certificates: Certificate[] = [
    {
        id: 1,
        title: "Java Programming",
        organization: "Lovely Professional University",
        icon: Code,
        year: "2023",
        description: "Comprehensive study of Java fundamentals, object-oriented concepts and advanced programming techniques.",
        skills: ["Java", "OOP", "Data Structures"],
        link: "https://drive.google.com/file/d/1i8bFimtrc5AMRGbmwAbbzGpqPTn9gWXc/view",
        category: "Programming"
    },
    {
        id: 2,
        title: "Cryptography and Network Security",
        organization: "NPTEL",
        icon: ShieldCheck,
        year: "2024",
        description: "Specialized training in data encryption, network protocols, and cybersecurity frameworks.",
        skills: ["Cryptography", "Network Security", "Encryption"],
        link: "https://drive.google.com/file/d/1q8UZuiRl8Rs1xseB1Z9Jo6-fOAcebNBi/view",
        category: "Security"
    },
    {
        id: 3,
        title: "Data Structures and Algorithm",
        organization: "Lovely Professional University",
        icon: BookOpen,
        year: "2023",
        description: "Advanced course on algorithmic efficiency, complexity analysis, and complex data structures.",
        skills: ["DSA", "Algorithms", "System Design"],
        link: "https://drive.google.com/file/d/1EF4BYgS9ip2mTmKM7IbvxhHY-Snc4TMS/view",
        category: "Programming"
    },
    {
        id: 4,
        title: "Responsive Web Design",
        organization: "freeCodeCamp",
        icon: Globe,
        year: "2023",
        description: "Certification in modern web design principles, CSS Flexbox, Grid, and accessibility.",
        skills: ["HTML5", "CSS3", "Responsive Design"],
        link: "https://www.freecodecamp.org/certification/fcc299aa5de-905f-4388-ab80-28251a6ebcac/responsive-web-design",
        category: "Web Development"
    },
    {
        id: 5,
        title: "Introduction to DevOps",
        organization: "Coursera",
        icon: Target,
        year: "2024",
        description: "Foundations of DevOps culture and modern automated CI/CD pipelines.",
        skills: ["CI/CD", "Docker", "Agile"],
        link: "#",
        category: "Cloud / DevOps"
    },
    {
         id: 6,
        title: "AI & ML Workshop",
        organization: "Google Developer Groups",
        icon: Users,
        year: "2024",
        description: "Intensive 3-day workshop on modern AI tools and machine learning basics.",
        skills: ["Machine Learning", "TensorFlow", "Python"],
        link: "#",
        category: "Workshops"
    },
    {
        id: 7,
        title: "Hack Quest - 24 Hours CTF Challenge",
        organization: "Lovely Professional University & upGrad Campus",
        icon: Terminal,
        year: "2024",
        description: "Participated in a 24-hour Capture The Flag cybersecurity challenge under Concoction 2024.",
        skills: ["Cybersecurity", "CTF", "Problem Solving"],
        link: "/hackquest-certificate.png",
        category: "Security"
    }
];



// Map category to gradient colors matching the analytics dashboard palette
const CATEGORY_GRADIENTS: Record<string, { gradient: string; shadow: string }> = {
    "Programming":      { gradient: "from-amber-400 to-orange-500",  shadow: "shadow-orange-500/20" },
    "Web Development":  { gradient: "from-blue-400 to-indigo-500",   shadow: "shadow-blue-500/20" },
    "Cloud / DevOps":   { gradient: "from-teal-400 to-cyan-500",     shadow: "shadow-cyan-500/20" },
    "Security":         { gradient: "from-rose-400 to-red-500",      shadow: "shadow-red-500/20" },
    "AI / ML":          { gradient: "from-violet-400 to-purple-500", shadow: "shadow-purple-500/20" },
    "Workshops":        { gradient: "from-emerald-400 to-green-500", shadow: "shadow-green-500/20" },
};
const DEFAULT_GRADIENT = { gradient: "from-primary/60 to-primary", shadow: "shadow-primary/20" };

const CertificateCard = ({ certificate, index, onSelect }: { certificate: Certificate, index: number, onSelect: (cert: Certificate) => void }) => {
    const { gradient, shadow } = CATEGORY_GRADIENTS[certificate.category] ?? DEFAULT_GRADIENT;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05, type: "spring", stiffness: 280, damping: 24 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative group p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/25 transition-all duration-300 z-10 shadow-lg ${shadow} hover:shadow-2xl flex flex-col h-full`}
        >
            {/* Colored hover blur blob — matches AchievementBadges exactly */}
            <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 pointer-events-none`} />

            {/* Dark inner card */}
            <div className="h-full w-full rounded-2xl bg-[#0a0a0f] p-6 flex flex-col gap-4 overflow-hidden relative">

                {/* Shimmer top line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ── Top: Icon ring + Title ── */}
                <div className="flex items-center gap-4">
                    {/* Gradient ring icon — same pattern as AchievementBadges */}
                    <div className={`p-[1px] rounded-full bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-12 h-12 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                            <certificate.icon className="w-5 h-5 text-white/90 drop-shadow-md" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white leading-tight group-hover:text-white/95 transition-colors line-clamp-2">
                            {certificate.title}
                        </h3>
                        <span className={`inline-block mt-1 text-[9px] font-black uppercase tracking-[0.15em] bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                            {certificate.category}
                        </span>
                    </div>
                </div>

                {/* ── Middle: Org / year / desc ── */}
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/35 mb-1">
                        {certificate.organization} · {certificate.year}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                        {certificate.description}
                    </p>
                </div>

                {/* ── Bottom: Skills + Button ── */}
                <div className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-wrap gap-1.5">
                        {certificate.skills.map((skill) => (
                            <motion.span
                                key={skill}
                                whileHover={{ scale: 1.08, y: -1 }}
                                className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 group-hover:border-white/20 group-hover:text-white/80 transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSelect(certificate)}
                        className={`w-full py-2.5 rounded-xl text-sm font-bold text-white/70 border border-white/10 relative overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:text-white flex items-center justify-center gap-2`}
                    >
                        {/* Sweep gradient shine on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                        View Certificate
                        <ExternalLink className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};


// Animated Stats Component styled like a dashboard metric
const MetricCard = ({ value, label, prefix = "", suffix = "", icon: Icon }: { value: number, label: string, prefix?: string, suffix?: string, icon: React.ElementType }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useSpring(count, { damping: 40, stiffness: 50 });
    
    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    const displayText = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        return rounded.on("change", (latest) => {
            if (displayText.current) {
                displayText.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [rounded]);

    return (
        <motion.div
             ref={ref}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative flex items-center gap-5 p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 shadow-2xl transition-all duration-300 hover:border-primary/50 hover:bg-[#11111a] group overflow-hidden"
        >
            <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors pointer-events-none" />
            
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-7 h-7" />
            </div>

            <div className="flex flex-col z-10">
                 <p className="text-xs text-white/50 font-bold uppercase tracking-wider mb-1">{label}</p>
                 <div className="flex items-baseline gap-1 text-3xl font-black font-display text-white group-hover:text-primary transition-colors duration-300">
                    {prefix && <span>{prefix}</span>}
                    <span ref={displayText}>0</span>
                    {suffix && <span>{suffix}</span>}
                </div>
            </div>
        </motion.div>
    );
}




const getCertificateImageUrl = (link: string) => {
    if (!link || link === "#") return null;
    
    // Handle Google Drive links
    const driveMatch = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
    }
    
    return link;
}


const CertificatesSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    const filteredCertificates = certificates.filter(cert => 
        activeCategory === "All" || cert.category === activeCategory
    );

    return (
        <section id="certificates" className="relative py-24 bg-transparent overflow-hidden">
             {/* Background decorations matching SkillsSection */}
             <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
             <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Subtle Grid Overlay with animated particles/glow feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />


            <div className="container mx-auto px-6 relative z-10">
                {/* Dashboard-style Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <Terminal className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary tracking-wide uppercase">Credentials</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Professional Certifications
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Technical credentials earned through continuous learning and specialization.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
                    <MetricCard icon={BookMarked} value={10} label="Total Certifications Earned" suffix="+" />
                    <MetricCard icon={Globe} value={10} label="Platforms Completed" suffix="+" />
                    <MetricCard icon={Code} value={15} label="Skill Areas Covered" suffix="+" />
                    <MetricCard icon={MonitorPlay} value={300} label="Learning Hours Invested" prefix="~" suffix="+" />
                </div>

                {/* Dashboard Main Panels Matrix */}
                <div className="max-w-6xl mx-auto flex flex-col gap-8 lg:gap-12 relative">
                    
                    {/* Left Column: Certifications Filter & Grid */}
                    <div className="w-full flex flex-col">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                            <Award className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-bold text-white/90">Verified Credentials</h3>
                        </div>

                        {/* Smart Filter Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveCategory(category)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg outline-none
                                        ${activeCategory === category 
                                            ? 'text-white bg-primary/10 border border-primary/30' 
                                            : 'text-white/50 bg-transparent border border-transparent hover:text-white/80 hover:bg-white/5'
                                        }`}
                                >
                                    {category}
                                    {activeCategory === category && (
                                         <motion.div 
                                            layoutId="activeTabBadge"
                                            className="absolute -bottom-px left-2 right-2 h-0.5 bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(var(--primary),0.8)]"
                                         />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Certificates Grid Layout */}
                        <motion.div 
                            layout 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[400px]"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredCertificates.map((cert, index) => (
                                    <CertificateCard key={cert.id} certificate={cert} index={index} onSelect={setSelectedCert} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                </div>

            </div>

             {/* Certificate Preview Modal */}
             <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative"
                        >
                            {/* Modal Header / Banner Image */}
                            <div className="relative h-48 sm:h-64 bg-primary/5 flex items-center justify-center border-b border-white/10 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent z-10" />
                                <selectedCert.icon className="w-32 h-32 text-primary/10 absolute -right-4 -bottom-4 transform rotate-12 transition-transform duration-700 group-hover:rotate-0" />
                                
                                <img 
                                    src={getCertificateImageUrl(selectedCert.link) || "/placeholder.svg"} 
                                    alt={selectedCert.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-105 group-hover:scale-100"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none"><rect width="800" height="400" fill="%2311111a"/><text x="400" y="200" font-family="sans-serif" font-size="24" fill="%23ffffff50" text-anchor="middle" dominant-baseline="middle">Certificate Preview</text></svg>';
                                    }}
                                />
                                
                                <button 
                                    onClick={() => setSelectedCert(null)}
                                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-sm transition-all border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* Modal Content Details */}
                            <div className="p-6 sm:p-8 relative z-20 -mt-12">
                                <div className="flex items-end gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0a0a0f] border border-white/10 shadow-xl flex items-center justify-center text-primary">
                                        <selectedCert.icon className="w-8 h-8" />
                                    </div>
                                    <div className="pb-1">
                                        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">{selectedCert.title}</h3>
                                        <p className="text-primary font-medium tracking-wide text-sm mt-1">{selectedCert.organization} • {selectedCert.year}</p>
                                    </div>
                                </div>
                                
                                <p className="text-white/70 mb-8 leading-relaxed text-sm sm:text-base">
                                    {selectedCert.description}
                                </p>
                                
                                <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/5">
                                    <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-4">Verified Skills & Technologies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCert.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 rounded-lg bg-[#0a0a0f] border border-white/10 text-sm text-white/80 font-medium whitespace-nowrap">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.open(selectedCert.link, '_blank')}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary/80 to-primary text-white font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:shadow-primary/40 transition-all group"
                                >
                                    Verify Credential
                                    <ExternalLink className="w-5 h-5 group-hover:-mt-1 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default CertificatesSection;
