import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Circle, Network, Repeat2, Server, Globe } from "lucide-react";

interface Topic {
    name: string;
    count: number;
}

interface DSAUsageProps {
    topics: Topic[];
    maxCount: number;
}

const TOPIC_META: Record<string, { icon: any; color: string; bg: string }> = {
    "Arrays & Lists": { icon: Circle, color: "#f59e0b", bg: "from-amber-500 to-orange-500" },
    "Trees & Graphs": { icon: Network, color: "#10b981", bg: "from-emerald-500 to-teal-500" },
    "Dynamic Logic": { icon: Repeat2, color: "#60a5fa", bg: "from-blue-500 to-indigo-500" },
    "System Design": { icon: Server, color: "#a78bfa", bg: "from-violet-500 to-purple-500" },
    "Backend Core": { icon: Globe, color: "#34d399", bg: "from-cyan-500 to-emerald-500" },
};

const DSABar = ({ topic, maxCount, index }: { topic: Topic; maxCount: number; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const percent = maxCount > 0 ? Math.round((topic.count / maxCount) * 100) : 0;
    const meta = TOPIC_META[topic.name] ?? { icon: Circle, color: "#fff", bg: "from-white/40 to-white/20" };
    const Icon = meta.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 100, damping: 18 }}
            viewport={{ once: true }}
            className="group flex items-center gap-4"
        >
            {/* Icon */}
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br ${meta.bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
                <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>

            {/* Content (Text + Progress Bar) */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* Stats Row */}
                <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors truncate">{topic.name}</span>
                    <div className="flex flex-shrink-0 items-baseline gap-1">
                        <span className="text-xs font-black tabular-nums" style={{ color: meta.color }}>{topic.count}</span>
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">solved</span>
                        <span className="text-[9px] text-white/20 ml-1">({percent}%)</span>
                    </div>
                </div>

                {/* Track */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${percent}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 + 0.2 }}
                        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${meta.bg}`}
                        style={{ boxShadow: `0 0 12px ${meta.color}55` }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

const DSAUsage = ({ topics, maxCount }: DSAUsageProps) => {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/70">DSA Coverage</h4>
                    <p className="text-[10px] text-white/30 font-medium mt-0.5">Topic Mastery Index</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                    Live
                </div>
            </div>

            <div className="space-y-5">
                {topics.map((topic, i) => (
                    <DSABar key={topic.name} topic={topic} maxCount={maxCount} index={i} />
                ))}
            </div>
        </div>
    );
};

export default DSAUsage;
