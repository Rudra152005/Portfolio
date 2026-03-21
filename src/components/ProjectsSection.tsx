import { ExternalLink, Globe, Github, Info, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    name: "StartupLift",
    url: "https://startup-lift.vercel.app/",
    tech: ["React", "Node.js", "Tailwind CSS"],
    description: "Startup growth and launch platform helping founders validate and scale ideas.",
    status: "Live",
    accent: "orange",
    caseStudy: "/workflow/startuplift",
    github: "https://github.com/Rudra152005/StartupLift",
  },
  {
    name: "Inkdrop",
    url: "https://inkdrop-v2-0.onrender.com/",
    tech: ["React", "Node.js", "Tailwind CSS"],
    description: "Digital book library platform with admin dashboard and authentication system.",
    status: "Live",
    accent: "blue",
    caseStudy: "/workflow/inkdrop",
    github: "https://github.com/Rudra152005/Inkdrop",
  },
  {
    name: "Listique",
    url: "https://listique-eight.vercel.app/",
    tech: ["HTML", "PHP", "Tailwind CSS"],
    description: "Modern wishlist and item tracking platform.",
    status: "Live",
    accent: "green",
    caseStudy: "/workflow/listique",
    github: "https://github.com/Rudra152005/Listique",
  },
];

const colorMap: Record<string, { main: string; glow: string; bg: string; border: string; dot: string; ping: string; btn: string }> = {
  orange: { main: "text-orange-400", glow: "shadow-orange-500/20", bg: "bg-orange-500/10", border: "border-orange-500/20", dot: "bg-orange-500", ping: "bg-orange-400", btn: "from-orange-500 via-orange-600 to-orange-400" },
  blue: { main: "text-blue-400", glow: "shadow-blue-500/20", bg: "bg-blue-500/10", border: "border-blue-500/20", dot: "bg-blue-500", ping: "bg-blue-400", btn: "from-blue-500 via-blue-600 to-blue-400" },
  green: { main: "text-emerald-400", glow: "shadow-emerald-500/20", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-500", ping: "bg-emerald-400", btn: "from-emerald-500 via-emerald-600 to-emerald-400" },
};

const BrowserFrame = ({ url, name, accent }: { url: string; name: string; accent: string }) => {
  const colors = colorMap[accent] || colorMap.blue;
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className={`group relative w-full h-[400px] rounded-xl overflow-hidden bg-[#050505] border border-white/5 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:${colors.glow}`}>
      {/* macOS style title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02] relative z-20">
        <div className="flex gap-1.5 focus-within:ring-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 text-center pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-white/30 truncate max-w-[200px]">
            <Globe className="w-3 h-3" />
            {url.replace("https://", "").replace("http://", "")}
          </div>
        </div>
      </div>

      {/* Iframe content */}
      <div className="relative w-full h-full overflow-hidden bg-[#050505]">
        <AnimatePresence>
            {isLoading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0a0a0f]"
                >
                    <Loader2 className={`w-8 h-8 ${colors.main} animate-spin`} />
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Initializing Preview...</p>
                </motion.div>
            )}
        </AnimatePresence>

        <iframe
          src={url}
          title={name}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full border-none pointer-events-none sm:pointer-events-auto transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-90 group-hover:opacity-100'}`}
          style={{ height: "calc(100% - 48px)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 bg-background overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Featured Works</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
            Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500">Masterpieces</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Exploring the intersection of design and technology through live, interactive experiences.
          </p>
        </div>

        <div className="space-y-40">
          {projects.map((project, i) => {
            const colors = colorMap[project.accent] || colorMap.blue;
            
            return (
              <div
                key={project.name}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 lg:gap-20 items-center`}
              >
                {/* Left: Iframe Preview */}
                <div className="w-full lg:w-[58%]">
                  <BrowserFrame url={project.url} name={project.name} accent={project.accent} />
                </div>

                {/* Right: Project Details */}
                <div className="w-full lg:w-[42%] space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight`}>
                        {project.name}
                      </h3>
                      <Badge variant="secondary" className={`${colors.bg} ${colors.main} ${colors.border} px-3 py-1 text-[10px] font-bold uppercase tracking-widest`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mr-2`} />
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-white/40 text-base md:text-lg leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-bold text-white/50 uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center"
                    >
                      <div className={`absolute -inset-1.5 bg-gradient-to-r ${colors.btn} rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500 pointer-events-none`}></div>
                      <span className="relative inline-flex items-center gap-2 rounded-full bg-[#050505] border border-white/5 px-8 py-4 text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all duration-300 group-hover:bg-white/5">
                        <span className="relative flex h-2 w-2">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.ping} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`}></span>
                        </span>
                        Live Site
                      </span>
                    </a>
                    
                    <a
                      href={project.caseStudy}
                      className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      <Info className="w-4 h-4" />
                      Detail View
                    </a>
                    
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/[0.03] border border-white/5 text-white/30 hover:text-white transition-all duration-300"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
