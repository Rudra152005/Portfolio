import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Activity, Calendar } from "lucide-react";
import StatsPanel from "./StatsPanel";
import HeatmapGrid from "./HeatmapGrid";
import SnakeAnimation from "./SnakeAnimation";

interface LeetCodeHeatmapProps {
    calendar: Record<string, number>;
    streak: number;
    maxStreak: number;
}

const LeetCodeHeatmap = ({ calendar, streak, maxStreak }: LeetCodeHeatmapProps) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const activityMap = useMemo(() => {
        const map = new Map<string, number>();
        if (!calendar) return map;
        Object.entries(calendar).forEach(([ts, count]) => {
            const date = new Date(parseInt(ts) * 1000);
            const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
            map.set(key, count);
        });
        return map;
    }, [calendar]);

    const days = useMemo(() => {
        const isCurrentYear = currentYear === new Date().getFullYear();
        const endDay = isCurrentYear ? new Date() : new Date(currentYear, 11, 31);

        const dateArray = [];
        let current = new Date(Date.UTC(endDay.getFullYear(), endDay.getMonth(), endDay.getDate()));

        // Align to end of week (Sat)
        const endDayOfWeek = current.getUTCDay();
        current.setUTCDate(current.getUTCDate() + (6 - endDayOfWeek));

        for (let i = 0; i < 371; i++) {
            const d = new Date(current);
            const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;
            dateArray.unshift({
                date: d,
                count: activityMap.get(key) || 0
            });
            current.setUTCDate(current.getUTCDate() - 1);
        }
        return dateArray;
    }, [currentYear, activityMap]);

    const months = useMemo(() => {
        const labels: { name: string; weekIndex: number }[] = [];
        let lastMonth = -1;
        for (let i = 0; i < days.length; i += 7) {
            const month = days[i].date.getUTCMonth();
            if (month !== lastMonth) {
                labels.push({ name: days[i].date.toLocaleString('default', { month: 'short', timeZone: 'UTC' }), weekIndex: i / 7 });
                lastMonth = month;
            }
        }
        return labels;
    }, [days]);

    return (
        <div className="w-full p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 relative overflow-hidden group backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            {/* Massive Background Glow */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50 transition-opacity group-hover:opacity-100" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none opacity-30 transition-opacity group-hover:opacity-80" />

            {/* Header Layout */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/40 transition-colors shadow-inner">
                        <Activity className="w-7 h-7 text-primary animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                            Consistency Engine
                        </h3>
                        <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground">Neural Persistence Map</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <StatsPanel
                        streak={streak}
                        maxStreak={maxStreak}
                        total={days.reduce((acc, d) => acc + d.count, 0)}
                    />
                </div>
            </div>

            {/* Heatmap Section */}
            <div className="relative py-8 px-4 rounded-3xl bg-black/40 border border-white/5 shadow-inner group-hover:border-white/10 transition-colors">
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="w-max mx-auto px-4">
                        <div className="relative py-4">
                            <HeatmapGrid days={days} />
                            <SnakeAnimation days={days} />
                        </div>

                        {/* Month Labels */}
                        <div className="relative h-4 mt-4">
                            {months.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="absolute text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] transition-colors group-hover:text-muted-foreground/60"
                                    style={{ left: `${(m.weekIndex * 21.5)}px` }} // Aligned with the new STEP (18 + gaps)
                                >
                                    {m.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Control Bar */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white/10' : i === 4 ? 'bg-primary' : 'bg-primary/' + (i * 20)}`} />
                            ))}
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Intensity Index</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 p-1 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setCurrentYear(v => v - 1)}
                        className="p-2 hover:bg-white/5 hover:text-primary rounded-xl transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <div className="px-6 flex flex-col items-center">
                        <span className="text-xs font-black tracking-widest">{currentYear}</span>
                        <span className="text-[8px] uppercase font-bold text-muted-foreground leading-none">Activity Year</span>
                    </div>
                    <button
                        onClick={() => setCurrentYear(v => v + 1)}
                        className="p-2 hover:bg-white/5 hover:text-primary rounded-xl transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeetCodeHeatmap;
