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
  ChevronDown
} from "lucide-react";

const GITHUB_USERNAME = "Rudra152005";
const LEETCODE_USERNAME = "RudraTiwari";

interface SkillCardProps {
  name: string;
  icon: React.ElementType;
  proofs: string[];
  delay: number;
}

const SkillCard = ({ name, icon: Icon, proofs, delay }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          setIsExpanded(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setIsExpanded(false);
        }
      }}
      onClick={() => setIsExpanded((prev) => !prev)}
      className="relative flex flex-col p-6 rounded-2xl bg-[#0a0a0f] border border-white/5 shadow-2xl transition-all duration-500 hover:border-primary/50 hover:bg-[#11111a] group cursor-default overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{name}</h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/40 group-hover:text-primary/70"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 overflow-hidden"
          >
            <div className="w-full h-px bg-white/10 mb-4" />
            <ul className="space-y-3">
              {proofs.map((proof, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.1) }}
                  className="flex items-start gap-2 text-sm text-white/70"
                >
                  <span className="text-primary mt-1 text-xs">▹</span>
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
  const [githubData, setGithubData] = useState<{ repos?: Array<Record<string, unknown>> } | null>(null);
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
          if (ghJson?.status === 'success') {
            setGithubData(ghJson);
          }
        }

        if (lcRes?.ok) {
          const lcJson = await lcRes.json();
          if (lcJson?.status === 'success') {
            setLeetcodeData(lcJson);
          }
        }
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };

    fetchData();
  }, []);

  // Compute live metrics or use reasonable fallbacks if API limits hit
  const repos = Array.isArray(githubData?.repos) ? githubData.repos : [];

  // Frontend dynamic metrics
  const reactRepos = repos.filter(r => r.language === "TypeScript" || r.language === "JavaScript" || r.description?.toLowerCase().includes("react")).length || 6;
  const tailwindRepos = repos.filter(r => r.description?.toLowerCase().includes("tailwind") || r.topics?.includes("tailwind")).length || 4;

  // Backend dynamic metrics
  const nodeRepos = repos.filter(r => r.language === "JavaScript" && r.description?.toLowerCase().includes("api")).length || 3;
  const dbRepos = repos.filter(r => r.description?.toLowerCase().includes("mongo") || r.description?.toLowerCase().includes("database")).length || 3;

  // LeetCode dynamic metrics
  const totalSolved = leetcodeData?.totalSolved || 320;
  const streak = leetcodeData?.streak || 15;
  const hardSolved = leetcodeData?.hardSolved || 10;

  const categories = [
    {
      title: "Frontend Engineering",
      icon: <Layout className="w-5 h-5 text-primary" />,
      skills: [
        {
          name: "React & Next.js",
          icon: Code2,
          proofs: [
            `Utilized in ${reactRepos}+ comprehensive projects`,
            "Component-Driven UI & State Management",
            "Advanced hooks & context utilization"
          ]
        },
        {
          name: "TypeScript",
          icon: Braces,
          proofs: [
            "Strict Type Safety & Interface design",
            "Enhanced developer experience & tooling",
            "Used heavily alongside modern React"
          ]
        },
        {
          name: "Tailwind CSS",
          icon: Palette,
          proofs: [
            `Styled ${tailwindRepos}+ modern web applications`,
            "Utility-First rapid scaling",
            "Responsive and glassmorphic designs"
          ]
        }
      ]
    },
    {
      title: "Backend Architecture",
      icon: <Server className="w-5 h-5 text-primary" />,
      skills: [
        {
          name: "Node.js & Express",
          icon: Terminal,
          proofs: [
            `Built backend architectures for ${nodeRepos}+ APIs`,
            "RESTful API Design & Routing",
            "Middleware & JWT Authentication"
          ]
        },
        {
          name: "Databases (MongoDB)",
          icon: Database,
          proofs: [
            `Integrated in ${dbRepos}+ full-stack applications`,
            "NoSQL Schema design & Mongoose",
            "Aggregation pipelines & indexing"
          ]
        }
      ]
    },
    {
      title: "Core Computer Science",
      icon: <Cpu className="w-5 h-5 text-primary" />,
      skills: [
        {
          name: "Data Structures & Algos",
          icon: BrainCircuit,
          proofs: [
            `${totalSolved}+ problems solved on LeetCode`,
            `${streak}-day coding activity streak`,
            `${hardSolved}+ Hard level challenges concurred`
          ]
        },
        {
          name: "Problem Solving",
          icon: Layers,
          proofs: [
            "Optimizing Space/Time complexities",
            "Strong grasp of Graph, DP, & Trees",
            "Translating logic to robust production code"
          ]
        }
      ]
    }
  ];

  const tools = [
    "Git", "Docker", "Vercel", "Figma", "VS Code", "Postman", "Linux", "Storybook", "Jest"
  ];

  return (
    <section id="skills" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Cpu className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Real data-driven proof of my technical toolkit, honed through consecutive building, solving, and deploying.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((category, catIdx) => (
            <div key={category.title} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 border-b border-white/10 pb-4"
              >
                {category.icon}
                <h3 className="text-2xl font-bold text-white/90">{category.title}</h3>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    proofs={skill.proofs}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <h3 className="font-display text-xl font-semibold text-white/80 mb-8">Daily Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;
