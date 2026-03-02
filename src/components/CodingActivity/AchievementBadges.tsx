import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Trophy, Flame, Github, Code2 } from "lucide-react";

interface AchievementStats {
    leetcodeSolved: number;
    leetcodeStreak: number;
    githubRepos: number;
    githubStars: number;
    githubCommits: number;
    deployedProjects: number;
}

interface AchievementBadgesProps {
    stats: AchievementStats;
}

// Smooth spring counter
const Counter = ({ value, className }: { value: number; className?: string }) => {
    const spring = useSpring(0, { mass: 0.8, stiffness: 60, damping: 15 });
    const display = useTransform(spring, (v) => Math.floor(v).toString());
    useEffect(() => { spring.set(value); }, [value, spring]);
    return <motion.span className={className}>{display}</motion.span>;
};

const BADGES = (stats: AchievementStats) => [
    {
        value: stats.leetcodeSolved,
        label: "Problems Solved",
        icon: Trophy,
        gradient: "from-amber-400 to-orange-500",
        shadow: "shadow-orange-500/20",
    },
    {
        value: stats.leetcodeStreak,
        label: "Current Streak",
        icon: Flame,
        gradient: "from-rose-400 to-red-500",
        shadow: "shadow-red-500/20",
    },
    {
        value: stats.githubRepos,
        label: "Repositories",
        icon: Github,
        gradient: "from-blue-500 to-violet-500",
        shadow: "shadow-violet-500/20",
    },
    {
        value: stats.githubStars + stats.githubRepos * 10,
        label: "Activity Score",
        icon: Code2,
        gradient: "from-emerald-400 to-teal-500",
        shadow: "shadow-teal-500/20",
    },
];

const AchievementBadges = ({ stats }: AchievementBadgesProps) => {
    const badges = BADGES(stats);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
                <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="relative group p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/30 transition-all duration-300 z-10"
                >
                    {/* Hover colored blur blob */}
                    <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${badge.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 pointer-events-none`} />

                    {/* Dark inner card */}
                    <div className="h-full w-full rounded-2xl bg-[#0a0a0f] p-6 flex flex-col items-center justify-center gap-3 text-center overflow-hidden">

                        {/* Shimmer top line for extra depth on hover */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Top: Icon Ring */}
                        <div className={`p-[1px] rounded-full bg-gradient-to-br ${badge.gradient} shadow-lg mb-1 group-hover:scale-110 transition-transform duration-300`}>
                            <div className="w-12 h-12 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                                <badge.icon className="w-5 h-5 text-white/90 drop-shadow-md" />
                            </div>
                        </div>

                        {/* Bottom: Number + Label */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center gap-0.5 leading-none mb-2">
                                <Counter
                                    value={badge.value}
                                    className="text-4xl font-black tracking-tighter text-white"
                                />
                                <span className="text-xl font-bold text-white/40 mb-1">+</span>
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/40 group-hover:text-white/70 transition-colors">
                                {badge.label}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AchievementBadges;
