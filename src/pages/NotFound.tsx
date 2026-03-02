import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import cubeImg from "@/assets/404-cube.png";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Cube image */}
        <img
          src={cubeImg}
          alt="404 illustration"
          className="w-64 h-64 md:w-80 md:h-80 object-contain mb-8 animate-float"
        />

        {/* 404 text */}
        <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient mb-4">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Oh no! Page not found
        </h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-8 py-3 text-sm font-medium text-foreground hover:bg-accent transition-all duration-300"
        >
          Back Home
        </a>

        <ArrowDown className="w-5 h-5 text-muted-foreground mt-16 animate-bounce" />
      </div>
    </div>
  );
};

export default NotFound;
