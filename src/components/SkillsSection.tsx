import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Server,
  Terminal,
  BrainCircuit,
  Cpu,
  Layers,
  Braces,
  Layout,
  ChevronDown,
  GitBranch,
  Box,
  Triangle,
  Send,
  Figma,
  BookOpen,
  TestTube,
  Code,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Cloud,
  Network,
  Binary,
  Workflow,
  MousePointer2,
  Accessibility,
  Unplug,
  HardDrive,
  Shapes,
  LineChart,
  Repeat,
  Wind
} from "lucide-react";

const GITHUB_USERNAME = "Rudra152005";
const LEETCODE_USERNAME = "RudraTiwari";

interface GithubRepo {
  language?: string;
  description?: string;
  topics?: string[];
}

interface SkillCardProps {
  name: string;
  icon: React.ElementType;
  proofs: string[];
  delay: number;
  accent: string;
}

const SkillCard = ({ name, icon: Icon, proofs, delay, accent }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map accent to Tailwind color classes
  const colorMap: Record<string, { border: string; bg: string; text: string; glow: string; bullet: string; icon: string; iconBg: string; iconBorder: string }> = {
    orange: { border: "hover:border-orange-500/50", bg: "bg-orange-500/10", text: "group-hover:text-orange-400", glow: "from-orange-500/5", bullet: "text-orange-500", icon: "text-orange-400", iconBg: "bg-orange-500/10", iconBorder: "border-orange-500/20" },
    blue: { border: "hover:border-blue-500/50", bg: "bg-blue-500/10", text: "group-hover:text-blue-400", glow: "from-blue-500/5", bullet: "text-blue-500", icon: "text-blue-400", iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20" },
    green: { border: "hover:border-emerald-500/50", bg: "bg-emerald-500/10", text: "group-hover:text-emerald-400", glow: "from-emerald-500/5", bullet: "text-emerald-500", icon: "text-emerald-400", iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20" },
    purple: { border: "hover:border-purple-500/50", bg: "bg-purple-500/10", text: "group-hover:text-purple-400", glow: "from-purple-500/5", bullet: "text-purple-500", icon: "text-purple-400", iconBg: "bg-purple-500/10", iconBorder: "border-purple-500/20" },
  };

  const colors = colorMap[accent] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsExpanded(false);
      }}
      onClick={() => setIsExpanded((prev) => !prev)}
      className={`relative flex flex-col p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 shadow-2xl transition-all duration-500 group cursor-default overflow-hidden ${colors.border} hover:bg-[#11111a]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center ${colors.icon} group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={`text-base font-bold text-white transition-colors leading-tight ${colors.text}`}>{name}</h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-white/40 ${colors.text}/70`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 overflow-hidden"
          >
            <div className="w-full h-px bg-white/10 mb-3" />
            <ul className="space-y-2">
              {proofs.map((proof, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.1) }}
                  className="flex items-start gap-2 text-xs text-white/50"
                >
                  <span className={`${colors.bullet} mt-0.5`}>▹</span>
                  <span>{proof}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [githubData, setGithubData] = useState<{ repos?: GithubRepo[] } | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<{ totalSolved?: number; streak?: number; hardSolved?: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const [ghRes, lcRes] = await Promise.all([
          fetch(`${API_URL}/api/github-stats/${GITHUB_USERNAME}`).catch(() => null),
          fetch(`${API_URL}/api/user-stats/${LEETCODE_USERNAME}`).catch(() => null)
        ]);

        if (ghRes?.ok) {
          const ghJson = await ghRes.json();
          if (ghJson?.status === 'success') setGithubData(ghJson);
        }

        if (lcRes?.ok) {
          const lcJson = await lcRes.json();
          if (lcJson?.status === 'success') setLeetcodeData(lcJson);
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };
    fetchData();
  }, []);

  const totalSolved = leetcodeData?.totalSolved || 320;
  const hardSolved = leetcodeData?.hardSolved || 10;

  const categories = [
    {
      title: "Frontend Engineering",
      icon: <Layout className="w-5 h-5" />,
      accent: "green",
      skills: [
        { name: "React & Next.js", icon: Code2, proofs: ["Component-Driven UI & SSR/ISR Architecture", "Advanced State Management & Performance Hooks", "Honed in 10+ scalable web applications"] },
        { name: "JavaScript (ES6+)", icon: Braces, proofs: ["Deep understanding of Closures, Proxies, & Async", "Functional Programming patterns & Modular JS", "Modern DOM APIs & Event Loop optimization"] },
        { name: "Redux / Zustand", icon: Layers, proofs: ["Global state management for complex logic", "Immutability patterns & Flux architecture", "Middlewares & efficient derived state selectors"] },
        { name: "HTML5 & CSS3", icon: Braces, proofs: ["Semantic HTML for SEO & accessibility", "Modern Flexbox/Grid layouts", "Custom CSS Variables & Keyframe animations"] },
        { name: "Responsive Design", icon: Globe, proofs: ["Mobile-first development approach", "Complex cross-browser compatibility", "Pixel-perfect implementation across all viewports"] },
        { name: "Framer Motion", icon: Wind, proofs: ["Cinematic 3D scrolling & entrance effects", "Complex layout animations & gestures", "Physics-based spring interactions"] },
        { name: "ShadCN / MUI", icon: Shapes, proofs: ["Accessible component system integration", "High-level theme customization (Light/Dark)", "Focus on headless UI patterns (Radix)"] },
        { name: "Web Performance", icon: Zap, proofs: ["Core Web Vitals optimization (LCP, CLS)", "Bundle splitting & lazy loading", "Image optimization & memoization strategies"] },
        { name: "Accessibility (a11y)", icon: Accessibility, proofs: ["W3C WCAG 2.1 standard compliance", "Screen reader optimization & ARIA labels", "Keyboard navigation & focus management"] }
      ]
    },
    {
      title: "Backend Architecture",
      icon: <Server className="w-5 h-5" />,
      accent: "blue",
      skills: [
        { name: "Node.js & Express", icon: Terminal, proofs: ["Developing scalable RESTful backends", "Event-driven architecture & cluster modules", "Production-grade error handling & logging"] },
        { name: "REST API Dev", icon: Braces, proofs: ["Clean resource-based routing", "Versioning, Pagination, & Filtering logic", "Structured JSON response standards"] },
        { name: "GraphQL", icon: Workflow, proofs: ["Efficient data fetching & Typed schemas", "Mutations, Queries, & Subscriptions", "Apollo Server/Client integration"] },
        { name: "Authentication", icon: Lock, proofs: ["JWT (JSON Web Tokens) & Refresh strategies", "OAuth2 & Social Login integration", "Secure session & cookie management"] },
        { name: "WebSockets", icon: Unplug, proofs: ["Real-time bidirectional communication", "Socket.io rooms & event handling", "Efficient broadcasting & low-latency data"] },
        { name: "File Management", icon: Cloud, proofs: ["Cloudinary & AWS S3 integration", "Multer middleware for stream processing", "Media compression & secure delivery"] },
        { name: "Microservices", icon: Box, proofs: ["Decoupled system architecture", "Inter-service communication (REST/Event)", "Scalable service independence"] },
        { name: "API Security", icon: ShieldCheck, proofs: ["Rate limiting & CORS policies", "Helmet.js & SQL Injection prevention", "Input validation & XSS protection"] }
      ]
    },
    {
      title: "Databases & Storage",
      icon: <Database className="w-5 h-5" />,
      accent: "blue",
      skills: [
        { name: "MongoDB / Mongoose", icon: HardDrive, proofs: ["NoSQL Schema design & ODM mapping", "Complex aggregation pipelines", "Indexing & data consistency management"] },
        { name: "SQL (PostgreSQL)", icon: Database, proofs: ["Relational schema design & Normalization", "Complex joins & ACID transactions", "Foreign key constraints & stored procedures"] },
        { name: "Firebase", icon: Zap, proofs: ["Realtime Firestore database implementation", "Serverless authentication & storage", "Cloud functions for backend triggers"] },
        { name: "Redis (Caching)", icon: LineChart, proofs: ["High-speed key-value caching", "Session storage & leaderboard logic", "Reducing DB load with cached query results"] }
      ]
    },
    {
      title: "Core Computer Science",
      icon: <Cpu className="w-5 h-5" />,
      accent: "orange",
      skills: [
        { name: "Operating Systems", icon: Cpu, proofs: ["Process mgmt, threads & scheduling", "Memory allocation & paging concepts", "File system architecture & I/O logic"] },
        { name: "Computer Networks", icon: Network, proofs: ["OSI Model & TCP/IP suite", "HTTP/HTTPS protocols & DNS", "Load balancing & Network security"] },
        { name: "OOPs Concepts", icon: Braces, proofs: ["Inheritance, Polymorphism, Abstraction", "Encapsulation & SOLID principles", "Clean code & Design Patterns"] },
        { name: "System Design", icon: Layers, proofs: ["Horizontal/Vertical scaling", "Availability vs Consistency (CAP)", "Caching & Database sharding basics"] },
        { name: "Complexity Analysis", icon: LineChart, proofs: ["Big O, Theta, and Omega notation", "Optimization of space/time execution", "Evaluation of algorithm efficiency"] }
      ]
    },
    {
      title: "Problem Solving (DSA)",
      icon: <BrainCircuit className="w-5 h-5" />,
      accent: "orange",
      skills: [
        { name: "Problem Solving", icon: Code, proofs: [`${totalSolved}+ LeetCode challenges solved`, `${hardSolved}+ Hard level problems mastered`, "Consistently solving weekly contests"] },
        { name: "Dynamic Programming", icon: Repeat, proofs: ["Optimal substructure identification", "Memoization & Tabulation techniques", "State transition logic optimization"] },
        { name: "Graph Algorithms", icon: Network, proofs: ["BFS/DFS traversal & tree logic", "Shortest path algorithms (Dijkstra)", "Cycle detection & connectivity analysis"] },
        { name: "Backtracking", icon: LineChart, proofs: ["Pruning & state space searching", "Recursion & decision tree exploration", "Solving complex constraint problems"] }
      ]
    },
    {
      title: "DevOps & Deployment",
      icon: <Workflow className="w-5 h-5" />,
      accent: "purple",
      skills: [
        { name: "Git & GitHub", icon: GitBranch, proofs: ["GitFlow, branch mgmt & PR reviews", "Merge conflict resolution & Versioning", "Automated workflows via SSH/HTTPS"] },
        { name: "Docker", icon: Box, proofs: ["Containerization of local environments", "Writing Multi-stage Dockerfiles", "Orchestration with Docker Compose"] },
        { name: "CI/CD Actions", icon: Repeat, proofs: ["Automated testing & build pipelines", "Continuous deployment via GH Actions", "Workflow optimization for rapid shipping"] },
        { name: "Linux (Nginx)", icon: Terminal, proofs: ["Shell scripting & environment config", "Nginx reverse filtering & Load balancing", "Secure server setup & firewall management"] },
        { name: "Deployment (Cloud)", icon: Triangle, proofs: ["Hosting on Vercel, Netlify, & AWS", "SSL certification & Domain mgmt", "Serverless function deployment"] }
      ]
    }
  ];

  const colorStyles: Record<string, string> = {
    orange: "text-orange-400 bg-orange-500/5 border-orange-500/20",
    blue: "text-blue-400 bg-blue-500/5 border-blue-500/20",
    green: "text-emerald-400 bg-emerald-500/5 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/5 border-purple-500/20",
  };

  return (
    <section id="skills" className="relative py-32 bg-background overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/20 backdrop-blur-sm">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-black text-indigo-400 tracking-[0.2em] uppercase">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white mb-6 tracking-tighter">
            Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500">Expertise</span>
          </h2>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real data-driven proof of my technical toolkit, honed through consecutive building, solving, and deploying.
          </p>
        </motion.div>

        <div className="space-y-24">
          {categories.map((category, catIdx) => (
            <div key={category.title} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 border-b border-white/5 pb-6`}
              >
                <div className={`p-2 rounded-lg border ${colorStyles[category.accent]}`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight">{category.title}</h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    proofs={skill.proofs}
                    delay={index * 0.1}
                    accent={category.accent}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/5 blur-[100px] pointer-events-none" />
          <h3 className="font-display text-3xl font-black text-white mb-6 tracking-tight">Ecosystem & Workflow</h3>
          <div className="flex flex-wrap justify-center gap-3">
             {[
               { name: "VS Code", icon: Code }, { name: "Docker", icon: Box },
               { name: "Git", icon: GitBranch }, { name: "Postman", icon: Send },
               { name: "Terminal", icon: Terminal }, { name: "Figma", icon: Figma },
               { name: "Vercel", icon: Triangle }, { name: "Jest", icon: TestTube },
               { name: "Netlify", icon: Globe }, { name: "Cloudinary", icon: Cloud }
             ].map((tool, i) => (
               <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/60 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-default">
                  <tool.icon className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{tool.name}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
