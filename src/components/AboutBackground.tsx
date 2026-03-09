import { motion } from "framer-motion";

const AboutBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Animated Grid Pattern */}
            <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
                animate={{
                    backgroundPosition: ['0px 0px', '40px 40px'],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`part-${i}`}
                    className="absolute w-1 h-1 bg-primary/20 rounded-full blur-[1px]"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: Math.random() * 0.5 + 0.1,
                    }}
                    animate={{
                        y: ["-5%", "105%"],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5,
                    }}
                />
            ))}

            {/* Glowing Blobs */}
            <motion.div
                className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"
                animate={{
                    x: [0, 30, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
    );
};

export default AboutBackground;
