import { ArrowLeft, ExternalLink, Github, CheckCircle2, Shield, Users, BookOpen, Layers, Zap, LayoutDashboard, Database, Server, Cpu, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InkdropCaseStudy = () => {
    return (
        <div className="min-h-screen bg-[#030303] text-foreground font-sans selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
                            SaaS Platform
                        </Badge>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                            Inkdrop
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-blue-500 mb-6 font-display uppercase tracking-widest">
                            Full-Stack Digital Book Library & Management System
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                            A high-performance SaaS platform built to streamline digital book distribution, featuring robust admin controls, secure user environments, and real-time management.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                <a href="https://inkdrop-v2-0.onrender.com/" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Preview
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5 transition-all text-white">
                                <a href="https://github.com/Rudra152005/Inkdrop" target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    Source Code
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="p-12 rounded-[2.5rem] bg-red-500/5 border border-red-500/10">
                            <h3 className="text-3xl font-bold mb-6 text-red-100 italic">The Struggle</h3>
                            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                                Managing digital collections across various formats often leads to a chaotic user experience. Most libraries lack a centralized system for admin approval, resulting in unverified content and a disjointed request flow.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Disconnected User/Admin workflows",
                                    "Manual and slow request approvals",
                                    "No auditing for download activities"
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-red-200/60">
                                        <Zap className="w-4 h-4 text-red-500/50" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-4xl font-bold tracking-tight">Redefining Digital Libraries</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Inkdrop was conceived as a solution to bridge the gap between complex file management and an elegant user interface. The goal was to build a system that feels light yet acts as a powerful backend engine for digital distribution.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="p-16 rounded-[3rem] bg-primary/[0.03] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                        <div className="relative z-10 grid md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-3xl font-bold mb-8">A Unified Ecosystem</h3>
                                <div className="space-y-8">
                                    {[
                                        { title: "Role-Based Access", desc: "Granular control for Admins and Users, ensuring secure data separation." },
                                        { title: "Real-time Orchestration", desc: "Admin actions reflect instantly across the entire platform via state syncing." },
                                        { title: "Automated Workflows", desc: "Request management system that handles book approvals with zero friction." }
                                    ].map((s) => (
                                        <div key={s.title} className="group">
                                            <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" />
                                                {s.title}
                                            </h4>
                                            <p className="text-muted-foreground">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-6">
                                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                                    <LayoutDashboard className="w-12 h-12 text-primary mb-6" />
                                    <h4 className="text-xl font-bold mb-2">Dual Dashboard System</h4>
                                    <p className="text-sm text-muted-foreground">Purpose-built interfaces for both consumption and management.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold mb-4 italic">The Blueprint</h3>
                        <p className="text-muted-foreground">Architected for scale and security</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                                Frontend Stack
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Framework</span>
                                    <span className="text-blue-400 font-medium">React 18</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Styling</span>
                                    <span className="text-blue-400 font-medium">Tailwind CSS</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">State</span>
                                    <span className="text-blue-400 font-medium">Context API</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                                Backend Stack
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Runtime</span>
                                    <span className="text-emerald-400 font-medium">Node.js</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">API</span>
                                    <span className="text-emerald-400 font-medium">Express</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Auth</span>
                                    <span className="text-emerald-400 font-medium">JWT</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                                Database & Ops
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Database</span>
                                    <span className="text-violet-400 font-medium">MongoDB</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Hosting</span>
                                    <span className="text-violet-400 font-medium">Render / Vercel</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Security</span>
                                    <span className="text-violet-400 font-medium">Helmet / CORS</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* High-Level Architecture */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="relative max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 py-20 px-10 rounded-[4rem] bg-primary/[0.02] border border-primary/10">
                        {[
                            { icon: Users, label: "Users / Admins" },
                            { icon: Globe, label: "Cloudfront / Edge" },
                            { icon: LayoutDashboard, label: "Inkdrop Client" },
                            { icon: Server, label: "Express Server" },
                            { icon: Database, label: "MongoDB Atlas" }
                        ].map((node, i) => (
                            <div key={node.label} className="flex flex-col items-center gap-3 p-6 min-w-[160px]">
                                <div className="w-16 h-16 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center shadow-inner group-hover:bg-blue-500/10 transition-colors">
                                    {node.icon && <node.icon className="w-8 h-8 text-blue-500" />}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">{node.label}</span>
                                {i < 4 && (
                                    <div className="hidden lg:block absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/10" />
                                )}
                            </div>
                        ))}

                    </div>
                </section>

                {/* Feature Grid */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="mb-20">
                        <h3 className="text-3xl font-bold mb-4">Core Ecosystem</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* User Side */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    User-Centric Features
                                </div>
                                <div className="grid gap-4">
                                    {[
                                        "Global Book Discovery",
                                        "Direct Secure Downloads",
                                        "Personal Request Tracking",
                                        "Category-based Exploration",
                                        "Saved Personal Library"
                                    ].map((f) => (
                                        <div key={f} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4 group hover:bg-white/[0.04]">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                                <Zap className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-sm">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Admin Side */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Administrative Controls
                                </div>
                                <div className="grid gap-4">
                                    {[
                                        "Full CRUD Book Management",
                                        "Modular Category System",
                                        "Request Approval Workflow",
                                        "Download Monitoring Logs",
                                        "Live Statistics Dashboard"
                                    ].map((f) => (
                                        <div key={f} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4 group hover:bg-white/[0.04]">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                <Shield className="w-4 h-4" />
                                            </div>
                                            <span className="font-medium text-sm">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Admin Dashboard Detail */}
                <section className="container mx-auto px-6 mb-32 py-24 bg-white/[0.01] rounded-[3rem] border border-white/5">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-4xl font-bold mb-12 text-center underline decoration-primary underline-offset-8">The Admin Engine</h3>
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {[
                                { label: "Inventory", value: "Real-time CRUD", icon: BookOpen },
                                { label: "Log Tracking", value: "Daily Audits", icon: Server },
                                { label: "Automation", value: "Approval Flows", icon: Zap }
                            ].map((card) => (
                                <div key={card.label} className="text-center p-8 rounded-2xl bg-black border border-white/10 group hover:border-blue-500/30 transition-colors">
                                    <card.icon className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                                    <p className="text-xs text-muted-foreground uppercase mb-2">{card.label}</p>
                                    <p className="text-lg font-bold">{card.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-8 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                The Admin Dashboard was engineered as a centralized hub for content moderation. Utilizing a table-based management system with advanced filtering, admins can oversee thousands of entries with ease.
                            </p>
                            <p>
                                The upload system utilizes modal-based interactions for a clean workspace, providing real-time feedback and validation to prevent data entry errors.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Challenges */}
                <section className="container mx-auto px-6 mb-32">
                    <h3 className="text-3xl font-bold mb-12 text-center">Technical Obstacles</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                tag: "State Management",
                                title: "Scalable Dashboard State",
                                desc: "Managing complex states across deep component trees in the admin section was solved by implementing a custom Context Provider, ensuring data consistency without prop-drilling."
                            },
                            {
                                tag: "Authentication",
                                title: "Granular Role-Based Security",
                                desc: "Securing routes for both Users and Admins was achieved using specialized HOCs (Higher-Order Components) that verify JWT claims before rendering protected views."
                            },
                            {
                                tag: "API Performance",
                                title: "CORS & Request Handling",
                                desc: "Encountered initial latency with cross-origin requests. Optimized this by fine-tuning middleware and implementing pre-flight caching for faster response times."
                            },
                            {
                                tag: "Data UX",
                                title: "Large Volume Rendering",
                                desc: "Rendering hundreds of books initially slowed down the client. Implemented efficient pagination and memoization strategies to keep the UI smooth at 60fps."
                            }
                        ].map((c) => (
                            <div key={c.title} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                                <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-500 border-none font-bold text-[10px] uppercase tracking-tighter">
                                    {c.tag}
                                </Badge>
                                <h4 className="text-xl font-bold mb-3">{c.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Results */}
                <section className="container mx-auto px-6 mb-32 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-4xl font-bold mb-8">Project Reflection</h3>
                        <div className="grid md:grid-cols-2 gap-12 text-left">
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-blue-500">Impact</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    Inkdrop successfully demonstrates how digital libraries can be both secure and user-friendly. The resulting platform is a fully-scalable SaaS prototype that handles authentication, complex CRUD, and real-time state management with production-level reliability.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xl font-bold text-emerald-400">Key Takeaways</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    Building Inkdrop solidified my expertise in creating modular dashboard architectures. I mastered the art of backend-frontend integration through rigorous JWT implementations and learned the critical importance of secure environment variable management in production.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Closing CTA */}
                <section className="container mx-auto px-6 text-center">
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-8">Experience the Live Platform</h3>
                        <div className="flex gap-4">
                            <Button asChild size="lg" className="rounded-full px-12 bg-blue-600 text-white hover:bg-blue-700">
                                <a href="https://inkdrop-v2-0.onrender.com/" target="_blank" rel="noopener noreferrer">Launch App</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-12 border-white/10 text-white transition-colors hover:bg-white/5">
                                <Link to="/">Back Home</Link>
                            </Button>
                            <Button asChild size="lg" className="rounded-full px-12 bg-white text-black hover:bg-white/90">
                                <Link to="/#projects">Next Project</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Inkdrop Case Study. Built with React & Tailwind.
            </footer>
        </div>
    );
};

export default InkdropCaseStudy;
