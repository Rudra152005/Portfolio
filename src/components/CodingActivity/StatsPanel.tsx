import React, { useEffect, useState } from "react";
import { Flame, Target, BarChart3 } from "lucide-react";

interface StatsPanelProps {
    streak: number;
    maxStreak: number;
    total: number;
}

const StatItem = ({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
            stepCount++;
            current += increment;
            if (stepCount >= steps) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`} />
            <Icon className="w-5 h-5 mb-3 opacity-30 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl font-bold tracking-tighter mb-1 font-display">{displayValue}</span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-muted-foreground opacity-60">{label}</span>
        </div>
    );
};

const StatsPanel = ({ streak, maxStreak, total }: StatsPanelProps) => {
    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            <StatItem
                label="Current Streak"
                value={streak}
                icon={Flame}
                color="from-orange-500/20"
            />
            <StatItem
                label="Longest Streak"
                value={maxStreak}
                icon={Target}
                color="from-emerald-500/20"
            />
            <StatItem
                label="Total Ops"
                value={total}
                icon={BarChart3}
                color="from-blue-500/20"
            />
        </div>
    );
};

export default StatsPanel;
