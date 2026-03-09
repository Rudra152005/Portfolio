import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";
import { Zap, Terminal } from "lucide-react";

const ProfileImage = () => {
    return (
        <div className="relative group perspective-[1000px]">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-blue-500/10 to-primary/30 rounded-[2.5rem] blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-pulse" />

            {/* Main Image Container with Tilt & Floating */}
            <motion.div
                className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
            >
                <img
                    src={portrait}
                    alt="Rudra Tiwari Portrait"
                    className="w-full h-auto grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 brightness-110"
                />

                {/* Modern Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </motion.div>

            {/* Interactive Floater Badges */}
            <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/40 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg group-hover:border-primary/40 transition-colors"
                animate={{
                    y: [0, 8, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Zap className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.div
                className="absolute -bottom-4 -right-4 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-secondary/40 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg group-hover:border-primary/40 transition-colors"
                animate={{
                    y: [0, -8, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <Terminal className="w-7 h-7 text-primary" />
            </motion.div>
        </div>
    );
};

export default ProfileImage;
