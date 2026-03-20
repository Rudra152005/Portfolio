import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
    "Initializing Portfolio...",
    "Fetching GitHub Data...",
    "Loading LeetCode Stats...",
    "Preparing Dashboard...",
    "System Ready ✓",
];

const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [currentLine, setCurrentLine] = useState(0);

    // Terminal Text Effect
    useEffect(() => {
        if (currentLine < terminalLines.length - 1) {
            const timeout = setTimeout(() => {
                setCurrentLine((prev) => prev + 1);
            }, 450); // Speed of each line appearing
            return () => clearTimeout(timeout);
        } else {
            // Finish loading exactly at 3 seconds roughly
            const finishTimeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(finishTimeout);
        }
    }, [currentLine, onComplete]);

    // Prevent scrolling while loader is active
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Smooth cinematic exit
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
            >
                {/* Subtle radial background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">

                    {/* Terminal Console */}
                    <div className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg p-6 shadow-2xl mb-12 relative overflow-hidden backdrop-blur-sm">
                        {/* OSX Style Window Dots */}
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-indigo-500/80" />
                        </div>

                        <div className="font-mono text-sm sm:text-base text-primary/80 space-y-2 min-h-[140px] flex flex-col justify-end">
                            {terminalLines.map((line, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={
                                        idx <= currentLine
                                            ? { opacity: 1, x: 0 }
                                            : { opacity: 0, x: -10 }
                                    }
                                    transition={{ duration: 0.2 }}
                                    className={`${idx > currentLine ? 'hidden' : 'block'} ${idx === terminalLines.length - 1 ? 'text-white font-bold' : ''}`}
                                >
                                    <span className="text-white/40 mr-2">{">"}</span>
                                    {line}
                                    {idx === currentLine && idx !== terminalLines.length - 1 && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Mini Github Heatmap Grid */}
                    <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
                        {Array.from({ length: 70 }).map((_, i) => {
                            // Create a random pattern of active squares
                            const isPreActive = Math.random() > 0.7;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                        scale: 0.8,
                                        opacity: 0
                                    }}
                                    animate={{
                                        backgroundColor: isPreActive ? [
                                            "rgba(255, 255, 255, 0.03)",
                                            "hsl(var(--primary) / 0.8)",
                                            "hsl(var(--primary) / 0.4)"
                                        ] : "rgba(255, 255, 255, 0.05)",
                                        scale: 1,
                                        opacity: 1
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: (i % 10) * 0.05 + Math.floor(i / 10) * 0.02,
                                        ease: "easeOut"
                                    }}
                                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm"
                                    style={{
                                        boxShadow: isPreActive ? '0 0 10px 1px hsl(var(--primary) / 0.2)' : 'none'
                                    }}
                                />
                            );
                        })}
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Loader;
