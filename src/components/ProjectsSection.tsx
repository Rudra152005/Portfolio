import { ExternalLink, Globe, Github, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    name: "StartupLift",
    url: "https://startup-lift.vercel.app/",
    tech: ["React", "Node.js", "Tailwind CSS"],
    description: "Startup growth and launch platform helping founders validate and scale ideas.",
    status: "Live",
    caseStudy: "/workflow/startuplift",
    github: "https://github.com/Rudra152005/StartupLift",
  },
  {
    name: "Inkdrop",
    url: "https://inkdrop-v2-0.onrender.com/",
    tech: ["React", "Node.js", "Tailwind CSS"],
    description: "Digital book library platform with admin dashboard and authentication system.",
    status: "Live",
    caseStudy: "/workflow/inkdrop",
    github: "https://github.com/Rudra152005/Inkdrop",
  },
  {
    name: "Listique",
    url: "https://listique-eight.vercel.app/",
    tech: ["HTML", "PHP", "Tailwind CSS"],
    description: "Modern wishlist and item tracking platform.",
    status: "Live",
    caseStudy: "/workflow/listique",
    github: "https://github.com/Rudra152005/Listique",
  },
];

const BrowserFrame = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="group relative w-full h-[400px] rounded-xl overflow-hidden bg-background border border-border shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20">
      {/* macOS style title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-background/50 border border-border text-[10px] text-muted-foreground truncate max-w-[200px]">
            <Globe className="w-3 h-3" />
            {url.replace("https://", "")}
          </div>
        </div>
      </div>

      {/* Iframe content */}
      <div className="relative w-full h-full overflow-hidden bg-white">
        <iframe
          src={url}
          title={name}
          className="w-full h-full border-none pointer-events-none sm:pointer-events-auto"
          style={{ height: "calc(100% - 44px)" }}
          loading="lazy"
        />
        {/* Overlay to catch clicks and prevent interaction if needed, or just for styling */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 bg-primary/5 text-primary">
            Featured Projects
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Digital <span className="text-primary">Masterpieces</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Exploring the intersection of design and technology through live, interactive experiences.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
            >
              {/* Left: Iframe Preview */}
              <div className="w-full lg:w-3/5">
                <BrowserFrame url={project.url} name={project.name} />
              </div>

              {/* Right: Project Details */}
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-3xl font-bold text-foreground">
                      {project.name}
                    </h3>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="bg-muted/50">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live Site
                  </a>
                  <a
                    href={project.caseStudy}
                    className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium border border-border transition-all hover:bg-muted active:scale-95"
                  >
                    <Info className="w-4 h-4" />
                    📚 Case Study
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-muted/50 text-foreground px-4 py-3 rounded-xl font-medium border border-border transition-all hover:bg-muted active:scale-95"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-32 p-12 rounded-3xl bg-primary/5 border border-primary/10">
          <h3 className="text-2xl font-bold mb-4">Interested in collaboration?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            I'm always open to discussing new projects and creative opportunities.
          </p>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

