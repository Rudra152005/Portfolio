import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProblemSolvingDashboard from "@/components/CodingActivity/ProblemSolvingDashboard";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProblemSolvingDashboard />
      <ProjectsSection />
      <ArticlesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
