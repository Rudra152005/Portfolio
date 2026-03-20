import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const HeroBackground = () => {
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 500], [0, 150]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const particles = Array.from({ length: 40 });
    const rings = Array.from({ length: 3 });

    return (
        <motion.div
            style={{ y: bgY }}
            className="absolute inset-0 overflow-hidden pointer-events-none z-[5]"
        >
            {/* Floating Particles Layer */}
            {particles.map((_, i) => (
                <motion.div
                    key={`p-${i}`}
                    className="absolute w-1 h-1 bg-primary/20 rounded-full blur-[1px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.2,
                    }}
                    animate={{
                        y: ["-10%", "110%"],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10,
                    }}
                    style={{
                        translateX: (mousePosition.x * (Math.random() * 0.5 + 0.2)),
                        translateY: (mousePosition.y * (Math.random() * 0.5 + 0.2)),
                    }}
                />
            ))}

            {/* Orbiting Glass Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                {rings.map((_, i) => (
                    <motion.div
                        key={`r-${i}`}
                        className="absolute rounded-full border border-primary/10"
                        style={{
                            width: `${(i + 1) * 30}%`,
                            height: `${(i + 1) * 30}%`,
                            rotateX: i * 45,
                            rotateY: i * 30,
                        }}
                        animate={{
                            rotateZ: [0, 360],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            rotateZ: {
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        {/* Orbiting Dot on Ring */}
                        <motion.div
                            className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full blur-[2px] shadow-[0_0_10px_#6366f1]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* 3D Wireframe Shapes (Decorative SVGs) */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-[20%] right-[15%] w-64 h-64 opacity-20"
                    animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 360],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        perspective: "1000px",
                        translateX: mousePosition.x * 0.8,
                        translateY: mousePosition.y * 0.8,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                        <path d="M50 5 L90 30 L90 70 L50 95 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M50 5 L50 95 M10 30 L90 30 M10 70 L90 70" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
                    </svg>
                </motion.div>

                <motion.div
                    className="absolute bottom-[25%] left-[10%] w-48 h-48 opacity-10"
                    animate={{
                        rotateZ: [0, -360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        translateX: mousePosition.x * -0.5,
                        translateY: mousePosition.y * -0.5,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                        <path d="M20 20 L80 80 M80 20 L20 80" fill="none" stroke="currentColor" strokeWidth="0.3" />
                    </svg>
                </motion.div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        </motion.div>
    );
};

export default HeroBackground;
