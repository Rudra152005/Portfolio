import { ArrowLeft, ExternalLink, Github, CheckCircle2, Server, Layout, Database, ShieldCheck, Rocket, Zap, Globe, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const StartupLiftCaseStudy = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-foreground font-sans selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                            Live Project
                        </Badge>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            StartupLift
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-primary mb-6">
                            Full Stack Startup Growth Platform
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                            A comprehensive platform designed to help founders validate, launch, and scale their startup ideas with data-driven insights and a streamlined workflow.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-primary text-primary-foreground hover:scale-105 transition-all">
                                <a href="https://startup-lift.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <Rocket className="w-4 h-4 mr-2" />
                                    Live Site
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5 transition-all text-white">
                                <a href="https://github.com/Rudra152005/StartupLift" target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    GitHub Code
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Overview Stats */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                        {[
                            { label: "Role", value: "Lead Developer" },
                            { label: "Duration", value: "3 Months" },
                            { label: "Deliverable", value: "Web App" },
                            { label: "Status", value: "Production" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{stat.label}</p>
                                <p className="text-lg font-semibold text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Problem & Solution */}
                <section className="container mx-auto px-6 mb-32 grid md:grid-cols-2 gap-24">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight">The Problem</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Early-stage founders often struggle with fragmentation. Validating an idea, finding the right tools for growth, and tracking progress happens across dozens of disconnected platforms. This "context switching" costs precious time and often leads to stalled momentum.
                        </p>
                        <div className="pt-4 space-y-4">
                            {["Information Overload", "Lack of Structured Validation", "Siloed Growth Metrics"].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight">The Solution</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            StartupLift provides a centralized command center. By integrating validation frameworks, growth checklists, and a custom dashboard, it empowers founders to focus on execution rather than organization.
                        </p>
                        <div className="pt-4 space-y-4">
                            {["Unified Dashboard", "Structured Growth Path", "Founder-Centric UX"].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Architecture */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold mb-4">System Architecture</h3>
                        <p className="text-muted-foreground">A clean, scalable full-stack implementation</p>
                    </div>
                    <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-12">
                        {[
                            { icon: Layout, label: "React Frontend", tech: "Vite, Tailwind" },
                            { icon: Cpu, label: "Express API", tech: "Node.js Server" },
                            { icon: Database, label: "MongoDB", tech: "Atlas Cloud" },
                        ].map((step, i, arr) => (
                            <>
                                <div key={step.label} className="w-64 p-8 rounded-2xl bg-white/[0.03] border border-white/5 text-center group hover:bg-white/[0.05] transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <step.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="font-bold mb-1">{step.label}</p>
                                    <p className="text-xs text-muted-foreground">{step.tech}</p>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="hidden md:block">
                                        <Zap className="w-6 h-6 text-muted-foreground/20 animate-pulse" />
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="container mx-auto px-6 mb-32">
                    <h3 className="text-3xl font-bold mb-12 text-center">Modern Tech Stack</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Frontend", items: ["React", "Tailwind CSS", "Framer Motion"], bg: "bg-blue-500/5", border: "border-blue-500/10", text: "text-blue-400" },
                            { title: "Backend", items: ["Node.js", "Express", "RESTful API"], bg: "bg-emerald-500/5", border: "border-emerald-500/10", text: "text-emerald-400" },
                            { title: "Database", items: ["MongoDB", "Mongoose", "Aggregation"], bg: "bg-green-500/5", border: "border-green-500/10", text: "text-green-400" },
                            { title: "Auth", items: ["JWT", "bcrypt", "HTTP-only Cookies"], bg: "bg-purple-500/5", border: "border-purple-500/10", text: "text-purple-400" },
                            { title: "Infrastructure", items: ["Vercel", "GitHub Actions", "ESLint"], bg: "bg-orange-500/5", border: "border-orange-500/10", text: "text-orange-400" },
                            { title: "State Management", items: ["Zustand", "React Query"], bg: "bg-pink-500/5", border: "border-pink-500/10", text: "text-pink-400" },
                        ].map((stack) => (
                            <div key={stack.title} className={`${stack.bg} ${stack.border} border p-8 rounded-2xl`}>
                                <h4 className={`font-bold mb-4 ${stack.text}`}>{stack.title}</h4>
                                <div className="space-y-3">
                                    {stack.items.map((item) => (
                                        <div key={item} className="text-sm text-foreground/60 flex items-center gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 opacity-20" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Key Features */}
                <section className="container mx-auto px-6 mb-32 py-24 border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-3xl mb-16">
                        <h3 className="text-4xl font-bold mb-6 tracking-tight">Core Functionalities</h3>
                        <p className="text-muted-foreground text-lg">Every feature built with user intent and performance in mind.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Secure Auth", desc: "Rigorous JWT-based authentication with encrypted data storage." },
                            { icon: Layout, title: "Modern Dashboard", desc: "Intuitive UI for managing multiple startup projects simultaneously." },
                            { icon: Rocket, title: "Validation Engine", desc: "Proprietary algorithm for testing startup viability market-fit." },
                            { icon: Zap, title: "Real-time Metrics", desc: "Instantly track user engagement and growth statistics." },
                            { icon: Globe, title: "SEO Optimized", desc: "Server-side rendering principles applied for maximum search visibility." },
                            { icon: Cpu, title: "Batch Processing", desc: "Automated tasks for data cleanup and report generation." },
                        ].map((f) => (
                            <div key={f.title} className="group p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-all">
                                <f.icon className="w-8 h-8 text-primary mb-6 transition-transform group-hover:scale-110" />
                                <h4 className="text-xl font-bold mb-3">{f.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Challenges & Solutions */}
                <section className="container mx-auto px-6 mb-32 max-w-4xl">
                    <h3 className="text-3xl font-bold mb-12 text-center">Engineering Challenges</h3>
                    <div className="space-y-12">
                        {[
                            {
                                challenge: "Cross-Origin Resource Sharing (CORS) Issues",
                                solution: "Implemented a robust CORS whitelist mechanism within the Express middleware to allow only specific production and development origins, while maintaining secure cookie handling."
                            },
                            {
                                challenge: "Persistent Authentication Flow",
                                solution: "Designed a multi-layered auth system using Refresh Tokens stored in HTTP-only cookies and shorter-lived Access Tokens to ensure security without sacrificing UX."
                            },
                            {
                                challenge: "Complex MongoDB Aggregations",
                                solution: "Optimized dashboard queries using Mongoose aggregation pipelines to compute complex growth metrics on the database level, significantly reducing API response times."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative pl-8 border-l border-primary/20">
                                <div className="absolute top-0 left-[-1px] w-[1px] h-full bg-gradient-to-b from-primary to-transparent" />
                                <h4 className="text-xl font-bold mb-2">Challenge: {item.challenge}</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    <span className="text-primary/80 font-medium">Solution:</span> {item.solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Results */}
                <section className="container mx-auto px-6 mb-32 text-center">
                    <div className="max-w-3xl mx-auto p-12 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10">
                        <h3 className="text-3xl font-bold mb-6">The Outcome</h3>
                        <p className="text-xl text-muted-foreground mb-8">
                            A production-ready platform that serves as a testament to clean architecture, secure practices, and professional full-stack integration.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            {["100% Responsive", "Secure JWT Flow", "SEO Integrated", "CI/CD Pipeline"].map((tag) => (
                                <Badge key={tag} variant="outline" className="text-emerald-400 border-emerald-400/20 bg-emerald-400/5">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What I Learned */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold mb-8">What I Learned</h3>
                        <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
                            <p>
                                Developing StartupLift deepened my understanding of the delicate balance between security and user convenience. Implementing a secure JWT flow taught me how to handle tokens responsibly across the client and server.
                            </p>
                            <p>
                                The project also honed my architectural thinking—structuring a Node.js API to be modular and scalable while ensuring the React frontend remains performant and maintainable through clean component design.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">View another project?</h3>
                    <p className="text-muted-foreground mb-12">Or jump back to the home page to see the full overview.</p>
                    <div className="flex justify-center gap-4">
                        <Button asChild variant="outline" className="rounded-full px-8">
                            <Link to="/">Exit Case Study</Link>
                        </Button>
                        <Button asChild className="rounded-full px-8">
                            <Link to="/#projects">Next Project</Link>
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} StartupLift Case Study. All Rights Reserved.
            </footer>
        </div>
    );
};

export default StartupLiftCaseStudy;
