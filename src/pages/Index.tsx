import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProblemSolvingDashboard from "@/components/CodingActivity/ProblemSolvingDashboard";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ScrollingProfileImage from "@/components/ScrollingProfileImage";
import { useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";

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
        <SkillsSection />
        <ProblemSolvingDashboard />
        <ProjectsSection />
        <EducationSection />
        <CertificatesSection />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
