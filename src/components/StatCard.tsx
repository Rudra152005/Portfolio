import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    delay?: number;
}

const StatCard = ({ label, value, suffix = "+", delay = 0 }: StatCardProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const count = useMotionValue(0);
    const rounded = useSpring(count, { damping: 30, stiffness: 60 });

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    const displayText = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        return rounded.on("change", (latest) => {
            if (displayText.current) {
                displayText.current.textContent = Math.floor(latest).toString();
            }
        });
    }, [rounded]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
            className="group relative p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden backdrop-blur-md"
        >
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />

            <div className="relative z-10 text-center lg:text-left">
                <div className="flex items-baseline justify-center lg:justify-start gap-1 mb-2">
                    <span ref={displayText} className="text-4xl font-display font-black text-white tracking-tighter">0</span>
                    <span className="text-primary font-black text-xl">{suffix}</span>
                </div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.25em] whitespace-nowrap">{label}</p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
    );
};

export default StatCard;
