import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import portrait from "@/assets/portrait.png";
import { useEffect } from "react";

interface ScrollingProfileImageProps {
  progress: any; // Accept motion value from parent
}

const ScrollingProfileImage = ({ progress }: ScrollingProfileImageProps) => {
  // TRANSITION RANGE: 0 to 0.5 (Hero to About midpoint)
  const prog = useTransform(progress, [0, 0.5], [0, 1], { clamp: true });

  // Shared layout constants matching Hero/About sections
  const gridWidth = "min(100vw - 6rem, 74rem)";
  const gap = "4rem"; // lg:gap-16

  // Transition logic: move image from right column center (Hero) to left column center (About)
  // Distance between centers = (ColumnWidth + Gap) = (GridWidth + Gap) / 2
  const distance = `calc((${gridWidth} + ${gap}) / 2)`;
  const xTranslate = useTransform(prog, [0, 1], ["0px", `calc(-1 * ${distance})`]);

  // 3D Pathing & Morphing
  const scale = useTransform(prog, [0, 0.5, 1], [1, 0.85, 0.85]);
  const rotateY = useTransform(prog, [0, 1], [0, 360]);
  const rotateX = useTransform(prog, [0, 0.5, 1], [0, 25, 0]);

  // Cinematic effects
  const blur = useTransform(prog, [0, 0.5, 1], ["0px", "8px", "0px"]);
  const opacity = useTransform(progress, [0, 1], [1, 1]); // Keep visible for this demo range

  // Parallax mouse tracking — spring-smoothed
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const parallaxX = useTransform(springMouseX, [-0.5, 0.5], [-12, 12]);
  const parallaxY = useTransform(springMouseY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none z-[60] hidden lg:block perspective-[2000px] h-[200vh]">
      {/* Sticky container that stays in view during both Hero and About */}
      <div className="sticky top-0 w-full h-screen flex items-center pt-20">

        {/* Mirror the section container EXACTLY */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

          {/* Mirror the section grid EXACTLY */}
          <div className="grid grid-cols-2 lg:gap-16 items-center">

            {/* Column 1: Spacer on Hero (Hidden), Text on About */}
            <div className="flex justify-center items-center order-1" />

            {/* Column 2: Profile Image starts here for Hero */}
            <div className="flex justify-center items-center relative order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  x: useTransform([xTranslate, parallaxX], ([v1, v2]) => `calc(${v1} + ${v2}px)`),
                  y: useTransform(parallaxY, (v) => `${v}px`),
                  scale,
                  rotateY,
                  rotateX,
                  borderRadius: "50%",
                  opacity,
                  filter: useTransform(blur, (v) => `blur(${v})`),
                  transformStyle: "preserve-3d",
                  boxShadow: useTransform(prog, [0, 0.5, 1], [
                    "0 20px 60px rgba(37,99,235,0.15), 0 0 0 1.5px rgba(255,255,255,0.06)",
                    "0 40px 100px rgba(37,99,235,0.25)",
                    "0 15px 35px rgba(0,0,0,0.5)"
                  ])
                }}
                className="relative w-[380px] h-[380px] aspect-square overflow-hidden bg-[#050505] flex items-center justify-center pointer-events-auto cursor-pointer group rounded-full"
              >
                {/* Floating Animation Loop */}
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    y: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Subtle glass tint for 3D depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-blue-500/10 opacity-60 z-10 pointer-events-none" />

                  <img
                    src={portrait}
                    alt="Rudra Tiwari"
                    className="w-full h-full object-cover object-top brightness-105 contrast-[1.02] transition-all duration-700 group-hover:brightness-110"
                  />

                  {/* Soft bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/40 to-transparent z-20 pointer-events-none" />
                </motion.div>

                {/* Subtle inset border */}
                <motion.div
                  className="absolute inset-0 z-30 pointer-events-none rounded-full"
                  style={{ borderRadius: "50%" }}
                  animate={{
                    boxShadow: [
                      "inset 0 0 0 1px rgba(255,255,255,0.05)",
                      "inset 0 0 0 1.5px rgba(255,255,255,0.1)",
                      "inset 0 0 0 1px rgba(255,255,255,0.05)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Hover Glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-white/5 via-blue-900/10 to-blue-600/20 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Bevel reflection */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_15px_rgba(255,255,255,0.04)] rounded-[inherit] z-40" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingProfileImage;
