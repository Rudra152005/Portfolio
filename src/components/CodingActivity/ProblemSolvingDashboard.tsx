import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SkillTags from "./SkillTags";
import DSAUsage from "./DSAUsage";
import AchievementBadges from "./AchievementBadges";
import ActivityCharts from "./ActivityCharts";
import LeetCodeHeatmap from "./LeetCodeHeatmap";
import { Loader2, AlertCircle, Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GITHUB_USERNAME = "Rudra152005";
const LEETCODE_USERNAME = "RudraTiwari";

const ProblemSolvingDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch LeetCode Data from Proxy
                const leetcodeRes = await fetch(`http://localhost:3001/api/user-stats/${LEETCODE_USERNAME}`);
                if (!leetcodeRes.ok) throw new Error("LeetCode proxy offline. Start server/index.js");
                const lcData = await leetcodeRes.json();

                // Fetch GitHub Data from Proxy
                const githubRes = await fetch(`http://localhost:3001/api/github-stats/${GITHUB_USERNAME}`);
                let ghUser = null;
                let ghRepos = [];
                let ghSyncError = null;

                if (githubRes.ok) {
                    const ghData = await githubRes.json();
                    if (ghData.status === 'success') {
                        ghUser = ghData.user;
                        ghRepos = Array.isArray(ghData.repos) ? ghData.repos : [];
                    } else {
                        ghSyncError = "GitHub Rate Limit: Try again in 1 hour.";
                    }
                } else {
                    ghSyncError = "GitHub Sync Offline";
                }

                // Process Data
                let totalStars = 0;
                let deployedCount = 0;
                const languages: Record<string, number> = {};

                if (Array.isArray(ghRepos)) {
                    ghRepos.forEach((repo: any) => {
                        totalStars += repo.stargazers_count;
                        if (repo.homepage) deployedCount++;
                        if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1;
                    });
                }

                const sortedLangs = Object.entries(languages)
                    .map(([name, value]) => ({ name, value }))
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 5);

                setData({
                    stats: {
                        leetcodeSolved: lcData.totalSolved,
                        leetcodeStreak: lcData.streak || 0,
                        leetcodeMaxStreak: lcData.maxStreak || 0,
                        githubRepos: ghUser?.public_repos || 0,
                        githubStars: totalStars,
                        deployedProjects: deployedCount,
                    },
                    leetcodeDifficulty: [
                        { name: "Easy", value: lcData.easySolved, color: "#10b981" },
                        { name: "Medium", value: lcData.mediumSolved, color: "#f59e0b" },
                        { name: "Hard", value: lcData.hardSolved, color: "#ef4444" },
                    ],
                    githubLanguages: sortedLangs,
                    leetcodeCalendar: lcData.submissionCalendar || {},
                    topics: [
                        { name: "Arrays & Lists", count: Math.floor(lcData.totalSolved * 0.35) },
                        { name: "Trees & Graphs", count: Math.floor(lcData.totalSolved * 0.20) },
                        { name: "Dynamic Logic", count: Math.floor(lcData.totalSolved * 0.15) },
                        { name: "System Design", count: 8 },
                        { name: "Backend Core", count: 14 },
                    ],
                    ghRepoPreview: Array.isArray(ghRepos) ? ghRepos[0] : null,
                    ghSyncError
                });

                setLoading(false);
            } catch (err: any) {
                console.error("Dashboard Error:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[600px] flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse rounded-full" />
                </div>
                <p className="text-muted-foreground animate-pulse font-medium tracking-widest text-xs uppercase">
                    Synchronizing Neural Activity...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 text-center px-6">
                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <div className="max-w-md">
                    <h3 className="text-xl font-bold mb-2">Sync Interrupted</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all"
                    >
                        Retry Sync
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section id="activity" className="relative py-32 overflow-hidden bg-background">
            {/* Background ambient glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[200px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[180px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-6">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <Badge className="mb-4 bg-emerald-500/10 text-emerald-500 border-none px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 inline-block" />
                        Live Engine Status: Optimal
                    </Badge>
                    <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Problem Solving &{" "}
                        <span className="text-primary italic">Contributions</span>
                    </h2>
                    {data.ghSyncError && (
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full w-fit">
                            <AlertCircle size={12} /> {data.ghSyncError}
                        </div>
                    )}
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Real-time monitoring of algorithmic performance, system design proficiency,
                        and global open-source activity.
                    </p>
                </motion.div>

                {/* ── Tier 1: Stat Cards ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <AchievementBadges stats={data.stats} />
                </motion.div>

                {/* ── Tier 2: Heatmap + GitHub Card ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <LeetCodeHeatmap
                            calendar={data.leetcodeCalendar}
                            streak={data.stats.leetcodeStreak}
                            maxStreak={data.stats.leetcodeMaxStreak}
                        />
                    </motion.div>

                    {/* GitHub Hero Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 relative overflow-hidden group backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-500"
                    >
                        <div className="absolute top-0 right-0 p-8 text-white/[0.04] group-hover:text-primary/10 transition-colors duration-500">
                            <Github size={120} />
                        </div>

                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase text-white/40">GitHub Hero</span>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
                                    {data.ghRepoPreview?.name || "Portfolio Engine"}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                                    {data.ghRepoPreview?.description || "High-performance portfolio engine built with React and Tailwind."}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-2xl font-black">{data.stats.githubStars}</p>
                                        <p className="text-[9px] uppercase font-black tracking-widest text-white/30">Stars</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black">{data.stats.githubRepos}</p>
                                        <p className="text-[9px] uppercase font-black tracking-widest text-white/30">Repos</p>
                                    </div>
                                </div>
                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ── Tier 3: Two Charts in One Row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <ActivityCharts leetcodeData={data.leetcodeDifficulty} githubData={data.githubLanguages} />
                </motion.div>

                {/* ── Tier 4: "Number of questions graph" (DSA Usage) Below the Charts ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-10"
                >
                    <DSAUsage topics={data.topics} maxCount={Math.max(...data.topics.map((t: any) => t.count))} />
                </motion.div>

                {/* ── Tier 4: Skills Grid ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[3px] w-8 rounded-full bg-gradient-to-r from-primary to-primary/30" />
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Skills & Tools</h3>
                    </div>
                    <SkillTags />
                </motion.div>

                {/* ── Footer Accent ── */}
                <div className="mt-20 flex justify-center">
                    <div className="flex gap-12 items-center text-[9px] font-black tracking-[0.4em] uppercase text-white/15">
                        <div className="flex items-center gap-2"><Calendar size={10} /> Live Sync</div>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <div className="flex items-center gap-2"><Code2 size={10} /> Pro-Level DSA</div>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <div className="flex items-center gap-2"><Github size={10} /> OS Contributor</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSolvingDashboard;
