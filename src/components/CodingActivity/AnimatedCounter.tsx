import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    className?: string;
}

const AnimatedCounter = ({ value, duration = 2, className }: AnimatedCounterProps) => {
    const spring = useSpring(0, {
        mass: 0.8,
        stiffness: 75,
        damping: 15,
    });

    const displayValue = useTransform(spring, (current) => Math.floor(current));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return (
        <motion.span className={className}>
            {displayValue}
        </motion.span>
    );
};

export default AnimatedCounter;
