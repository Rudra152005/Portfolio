import { Code, Palette, Database, Globe, Smartphone, Zap, GitBranch, Layers } from "lucide-react";

const skills = [
  { icon: Code, label: "React / Next.js", level: 95 },
  { icon: Globe, label: "TypeScript", level: 90 },
  { icon: Palette, label: "UI/UX Design", level: 88 },
  { icon: Database, label: "Node.js / Express", level: 85 },
  { icon: Smartphone, label: "React Native", level: 82 },
  { icon: Layers, label: "Tailwind CSS", level: 92 },
  { icon: GitBranch, label: "Git / CI/CD", level: 87 },
  { icon: Zap, label: "Performance Opt.", level: 80 },
];

const tools = [
  "Figma", "VS Code", "Docker", "AWS", "MongoDB", "PostgreSQL", "Redis", "GraphQL",
  "Framer", "Vercel", "Storybook", "Jest",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 section-fade">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit honed through years of building digital products
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {skills.map((skill, i) => (
            <div
              key={skill.label}
              className={`glass-card glow-border p-5 group hover:scale-[1.02] transition-all duration-300 section-fade animate-delay-${(i % 4) + 1}00`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent transition-colors">
                  <skill.icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">{skill.label}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-muted-foreground to-foreground transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2 block">{skill.level}%</span>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="text-center section-fade">
          <h3 className="font-display text-xl font-semibold text-foreground mb-6">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
