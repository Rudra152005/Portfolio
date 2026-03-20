import { ArrowLeft, ExternalLink, Github, CheckCircle2, List, ClipboardList, Layout, Database, Server, Code, Zap, Globe, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ListiqueCaseStudy = () => {
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
                            Live Site
                        </Badge>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-24">
                    <div className="max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            Listique
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-emerald-500 mb-6 font-display uppercase tracking-widest">
                            Modern Wishlist & Item Tracking Platform
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                            A dynamic platform designed for efficient wishlist management, allowing users to organize and track their desired items with a clean, minimal interface.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="rounded-full px-8 bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <a href="https://listique-eight.vercel.app/" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Site
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/10 hover:bg-white/5 transition-all text-white">
                                <a href="http://github.com/Rudra152005/Listique" target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    Source Code
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Problem & Solution */}
                <section className="container mx-auto px-6 mb-32 grid md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight text-white">The Challenge</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            In a digital age filled with endless products, users often find it difficult to consolidate their "must-haves" in one place. Existing solutions are either too cluttered with ads or lack the simple, server-side reliability needed for quick item management.
                        </p>
                        <div className="pt-4 grid grid-cols-1 gap-4">
                            {[
                                { icon: MessageSquare, title: "Organization Struggle", desc: "Users find it hard to categorize desired items across multiple platforms." },
                                { icon: Zap, title: "Lack of Tracking", desc: "No structured way to see price changes or availability in a simple list." }
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-sm">
                                    <item.icon className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold tracking-tight text-white">The Solution</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Listique focuses on "Essentialism." By using PHP for server-side logic and Tailwind CSS for a feather-light UI, the platform provides a robust CRUD experience without the overhead of heavy JavaScript frameworks where not needed.
                        </p>
                        <div className="space-y-4 pt-4">
                            {[
                                "Modern Table-based Item Management",
                                "Dynamic PHP Server-side Rendering",
                                "Responsive Mobile-first Interface",
                                "Streamlined CRUD Operations"
                            ].map((text) => (
                                <div key={text} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <span className="font-medium text-foreground/80">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="container mx-auto px-6 mb-32 pt-24 border-t border-white/5">
                    <div className="mb-16">
                        <h3 className="text-4xl font-bold mb-4 text-white">Core Technology</h3>
                        <p className="text-muted-foreground">Leveraging proven web standards for maximum reliability.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <Code className="w-6 h-6 text-orange-500" />
                            </div>
                            <h4 className="text-xl font-bold">Frontend</h4>
                            <p className="text-muted-foreground text-sm">
                                HTML5 for semantic structure and Tailwind CSS for a modern utility-first styling approach. This ensures the app is lightning-fast and responsive across all devices.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["HTML5", "CSS3", "Tailwind"].map(t => <Badge key={t} variant="secondary" className="bg-white/[0.05] text-muted-foreground">{t}</Badge>)}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <Database className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h4 className="text-xl font-bold">Backend</h4>
                            <p className="text-muted-foreground text-sm">
                                PHP handles the server-side logic, managing form submissions and dynamic content rendering. It provides a solid foundation for the platform's CRUD functionalities.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["PHP", "Server-Side", "Form Auth"].map(t => <Badge key={t} variant="secondary" className="bg-white/[0.05] text-muted-foreground">{t}</Badge>)}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <Server className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h4 className="text-xl font-bold">Deployment</h4>
                            <p className="text-muted-foreground text-sm">
                                Configured with optimized environment variables and a structured file system to ensure seamless deployment on platforms like Vercel with PHP support.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Vercel", "PHP Hosting", "CI/CD"].map(t => <Badge key={t} variant="secondary" className="bg-white/[0.05] text-muted-foreground">{t}</Badge>)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Architecture */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="p-12 rounded-3xl bg-white/[0.01] border border-white/5 shadow-sm">
                        <h3 className="text-2xl font-bold mb-12 text-center text-white">System Workflow</h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8">
                            {[
                                { label: "User Interface", sub: "HTML / Tailwind" },
                                { label: "Logic Layer", sub: "PHP Processing" },
                                { label: "Data Source", sub: "Local / Database" }
                            ].map((step, i) => (
                                <>
                                    <div key={step.label} className="w-full md:w-64 p-6 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                                        <p className="font-bold text-sm mb-1">{step.label}</p>
                                        <p className="text-xs text-muted-foreground">{step.sub}</p>
                                    </div>
                                    {i < 2 && (
                                        <div className="rotate-90 md:rotate-0 text-white/20">
                                            <ArrowLeft className="w-6 h-6 rotate-180" />
                                        </div>
                                    )}
                                </>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section className="container mx-auto px-6 mb-32">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Dynamic List Management", desc: "Easily add, edit, and update items in real-time with server-side validation." },
                            { title: "Responsive Data Tables", desc: "Optimized viewing experience for large lists on any screen size." },
                            { title: "Clean Dashboard UI", desc: "Focused environment designed to reduce visual noise and maximize productivity." },
                            { title: "Secure Form Handling", desc: "Robust PHP-based form sanitization to prevent common web vulnerabilities." },
                            { title: "Minimal Asset Load", desc: "Serialized assets and optimized CSS for instantaneous page transitions." },
                            { title: "Direct Action Workflow", desc: "One-click actions for deleting or marking items, ensuring zero friction." }
                        ].map((feature) => (
                            <div key={feature.title} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-emerald-500/20 transition-all group">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-lg font-bold mb-2 text-white">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Challenges & Solutions */}
                <section className="container mx-auto px-6 mb-32 max-w-4xl">
                    <h3 className="text-3xl font-bold mb-12 text-white">Engineering Reflections</h3>
                    <div className="space-y-8">
                        {[
                            {
                                challenge: "Form Validation & Security",
                                solution: "Implemented strict server-side validation using PHP's native filtering functions to prevent SQL injection and XSS, combined with frontend constraints for a smooth user experience."
                            },
                            {
                                challenge: "State Consistency in SSR",
                                solution: "Managed session state effectively to ensure that CRUD operations reflected instantly across page reloads, providing a 'Single Page App' feel using standard web protocols."
                            },
                            {
                                challenge: "Tailwind Integration in Traditional Stack",
                                solution: "Utilized a specialized build process to ensure Tailwind utility classes were purged and optimized for the PHP-rendered templates, resulting in optimized page speeds."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="outline" className="text-xs uppercase border-emerald-500/20 text-emerald-500">Problem {i + 1}</Badge>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-white">{item.challenge}</h4>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    <span className="text-emerald-500 font-bold not-italic mr-2">Resolution:</span>
                                    {item.solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* What I Learned */}
                <section className="container mx-auto px-6 mb-32 py-24 bg-primary/[0.05] border border-primary/10 rounded-[3rem]">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-4xl font-bold mb-8 italic text-white">Key Takeaways</h3>
                        <div className="grid md:grid-cols-2 gap-12 text-left text-muted-foreground">
                            <p>
                                Developing <span className="text-white">Listique</span> reinforced the power of server-side rendering for data-heavy applications. I learned how to structure PHP logic to be as modular as modern React components while maintaining high performance.
                            </p>
                            <p>
                                The project also deepened my proficiency with <span className="text-white">Tailwind CSS</span>, specifically how to build complex, consistent UIs without writing custom CSS, and how to optimize those styles for a traditional multi-page application.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="container mx-auto px-6 text-center">
                    <div className="max-w-xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4 text-white">Ready to explore the platform?</h3>
                        <p className="text-muted-foreground mb-12">Experience the clean interface and dynamic functionality of Listique firsthand.</p>
                        <div className="flex justify-center gap-4">
                            <Button asChild size="lg" className="rounded-full px-10 bg-emerald-600 text-white hover:bg-emerald-700">
                                <a href="https://listique-eight.vercel.app/" target="_blank" rel="noopener noreferrer">Launch App</a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-10 border-white/10 text-white transition-colors hover:bg-white/5">
                                <Link to="/">Back to Home</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 border-t border-white/5 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Listique Case Study. Professional Portfolio.
            </footer>
        </div>
    );
};

export default ListiqueCaseStudy;
