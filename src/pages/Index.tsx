import React, { useState, useRef, lazy, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Loader from "@/components/Loader";
import ScrollingProfileImage from "@/components/ScrollingProfileImage";

// Lazy load off-screen components
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProblemSolvingDashboard = lazy(() => import("@/components/CodingActivity/ProblemSolvingDashboard"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const CertificatesSection = lazy(() => import("@/components/CertificatesSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.05 : 1
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen bg-background overflow-clip"
      >
        <Navbar />
        <div ref={containerRef} className="relative w-full">
          {!isLoading && <ScrollingProfileImage progress={scrollYProgress} />}
          <HeroSection />
          <AboutSection />
        </div>
        
        <Suspense fallback={<div className="h-20" />}>
          <SkillsSection />
          <ProblemSolvingDashboard />
          <ProjectsSection />
          <EducationSection />
          <CertificatesSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </motion.div>
    </>
  );
};

export default Index;
