import { motion } from "framer-motion";
import {
    Code2, Server, Layout, Cloud, Database, GitBranch,
    Terminal, Cpu, Globe, Box, Layers, Activity
} from "lucide-react";

const SKILLS = [
    {
        category: "Core Skills",
        color: "from-amber-500 to-orange-500",
        glow: "rgba(245,158,11,0.15)",
        border: "border-amber-500/20 hover:border-amber-500/50",
        items: [
            { name: "Data Structures", icon: Cpu },
            { name: "Algorithms", icon: Activity },
            { name: "System Design", icon: Layers },
            { name: "Problem Solving", icon: Code2 },
        ],
    },
    {
        category: "Backend",
        color: "from-blue-500 to-indigo-500",
        glow: "rgba(99,102,241,0.15)",
        border: "border-blue-500/20 hover:border-blue-500/50",
        items: [
            { name: "Node.js", icon: Server },
            { name: "Express", icon: Terminal },
            { name: "MongoDB", icon: Database },
            { name: "REST APIs", icon: Globe },
        ],
    },
    {
        category: "Frontend",
        color: "from-emerald-500 to-teal-500",
        glow: "rgba(16,185,129,0.15)",
        border: "border-emerald-500/20 hover:border-emerald-500/50",
        items: [
            { name: "React", icon: Layout },
            { name: "TypeScript", icon: Code2 },
            { name: "Tailwind", icon: Box },
            { name: "Framer Motion", icon: Activity },
        ],
    },
    {
        category: "DevOps",
        color: "from-violet-500 to-purple-500",
        glow: "rgba(139,92,246,0.15)",
        border: "border-violet-500/20 hover:border-violet-500/50",
        items: [
            { name: "Git", icon: GitBranch },
            { name: "Docker", icon: Box },
            { name: "Vercel", icon: Cloud },
            { name: "CI/CD", icon: Activity },
        ],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 120, damping: 18 } },
};

const SkillCategory = ({ cat, idx }: { cat: typeof SKILLS[0]; idx: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1, type: "spring", stiffness: 100, damping: 20 }}
        className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden
                   hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1"
        style={{ boxShadow: `0 0 0 0px ${cat.glow}` }}
    >
        {/* Corner glow blob */}
        <div
            className={`absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br ${cat.color} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 rounded-full`}
        />

        {/* Category Header */}
        <div className="flex items-center gap-3 mb-5">
            <div className={`h-[3px] w-6 rounded-full bg-gradient-to-r ${cat.color}`} />
            <span className={`text-xs font-black uppercase tracking-[0.25em] bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.category}
            </span>
        </div>

        {/* Skill Pills */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
        >
            {cat.items.map(({ name, icon: Icon }) => (
                <motion.div
                    key={name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.04 }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.04] border ${cat.border}
                               transition-all duration-300 cursor-default`}
                >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-bold text-white/60 group-hover:text-white/90 transition-colors truncate">
                        {name}
                    </span>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
);

const SkillTags = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {SKILLS.map((cat, i) => (
            <SkillCategory key={cat.category} cat={cat} idx={i} />
        ))}
    </div>
);

export default SkillTags;
