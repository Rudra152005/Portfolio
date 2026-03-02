import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeatmapGridProps {
    days: { date: Date; count: number }[];
}

const HeatmapGrid = ({ days }: HeatmapGridProps) => {
    const getIntensity = (count: number) => {
        if (count === 0) return "bg-white/[0.05]"; // Subtle empty state
        if (count < 3) return "bg-emerald-900/40"; // Light green
        if (count < 6) return "bg-emerald-700/60"; // Medium green
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"; // Bright green with glow
    };

    return (
        <div className="grid grid-flow-col grid-rows-7 gap-[3.5px] relative z-20">
            <TooltipProvider delayDuration={100}>
                {days.map((day, i) => (
                    <Tooltip key={i}>
                        <TooltipTrigger asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (i % 53) * 0.005 }}
                                whileHover={{ scale: 1.3, zIndex: 50 }}
                                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] ${getIntensity(day.count)} transition-all duration-300 relative cursor-crosshair border border-white/[0.02] hover:border-white/20`}
                            />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-black/90 border border-white/10 text-[10px] p-2.5 rounded-xl backdrop-blur-2xl shadow-2xl z-[100] animate-in fade-in zoom-in duration-200">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getIntensity(day.count)}`} />
                                <span className="font-black text-white">{day.count} Submissions</span>
                            </div>
                            <p className="text-white/40 font-medium mt-1 uppercase tracking-tighter text-[8px]">
                                {day.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>
        </div>
    );
};

export default HeatmapGrid;
