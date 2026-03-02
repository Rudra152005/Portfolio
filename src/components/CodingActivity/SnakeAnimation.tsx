import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface SnakeAnimationProps {
    days: { date: Date; count: number }[];
}

const SnakeAnimation = ({ days }: SnakeAnimationProps) => {
    // 1. Calculate and memoize the path of active points
    const { path, segments } = useMemo(() => {
        const activeIdxs = days
            .map((d, i) => (d.count > 0 ? i : -1))
            .filter(i => i !== -1);

        if (activeIdxs.length < 2) return { path: [] as { x: number; y: number }[], segments: 0 };

        // Constants based on HeatmapGrid: 14px cell + 3.5px gap = 17.5px step
        // We'll use a slightly safer base if md:w-3.5 is 14px. 
        // Let's use 18px as the approximate step to align with the grid.
        const STEP = 18;
        const points = activeIdxs.map(idx => ({
            x: Math.floor(idx / 7) * STEP,
            y: (idx % 7) * STEP
        }));

        // Loop back to start for infinite smoothness
        return {
            path: [...points, points[0]],
            segments: points.length
        };
    }, [days]);

    if (path.length < 2) return null;

    const pathX = path.map(p => p.x);
    const pathY = path.map(p => p.y);

    // Dynamic duration based on path length (0.3s per jump)
    const duration = Math.max(8, segments * 0.3);

    return (
        <div className="absolute inset-0 pointer-events-none z-30 ml-1 mt-1">
            {/* Snake Body Segments */}
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: pathX,
                        y: pathY,
                        opacity: [0, 1, 1, 0.8, 0],
                        scale: [0.5, 1, 1, 0.9, 0.7],
                    }}
                    transition={{
                        duration: duration,
                        ease: "linear",
                        repeat: Infinity,
                        delay: i * 0.12, // Staggered tail
                    }}
                    className={`absolute w-3 h-3 rounded-[3px] shadow-2xl ${i === 0
                        ? "bg-white shadow-[0_0_20px_#10b981,0_0_40px_#10b981] z-50"
                        : "bg-emerald-400/80 shadow-[0_0_12px_#10b981] z-40"
                        }`}
                    style={{
                        filter: `blur(${i * 0.5}px)`,
                    }}
                />
            ))}

            {/* Subtle trail path */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                <motion.path
                    d={`M ${path.map(p => `${p.x + 6} ${p.y + 6}`).join(' L ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                />
            </svg>
        </div>
    );
};

export default SnakeAnimation;
