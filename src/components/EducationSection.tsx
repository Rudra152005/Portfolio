import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const educationData = [
    {
        id: 1,
        degree: "B.Tech in Computer Science",
        institution: "Lovely Professional University",
        duration: "2023 – 2024",
        achievement: "Specialization in Full Stack Development",
        icon: GraduationCap,
        highlight: true,
        coursework: [
            "Data Structures",
            "Algorithms",
            "DBMS",
            "Operating Systems",
            "Computer Networks",
        ],
    },
    {
        id: 2,
        degree: "Senior Secondary (12th)",
        institution: "K.B Inter College",
        duration: "2020 – 2022",
        achievement: "Major: Science (PCM)",
        icon: Award,
        highlight: false,
    },
    {
        id: 3,
        degree: "Secondary Education (10th)",
        institution: "K.B Inter College",
        duration: "2018 – 2020",
        achievement: "Focus: Science & Mathematics",
        icon: BookOpen,
        highlight: false,
    },
];

const EducationSection = () => {
    return (
        <section id="education" className="relative py-24 bg-transparent overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center justify-center space-x-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary tracking-wide uppercase">Education</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">
                        Academic Journey
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
                        My formal education laying the foundation for algorithms, systems programming, and modern software engineering.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Subtle glowing animated line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent -translate-x-1/2"
                        style={{
                            boxShadow: '0 0 10px 1px hsl(var(--primary) / 0.5)',
                        }}
                    />

                    <div className="space-y-16">
                        {educationData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={item.id} className="relative flex items-start md:justify-between group">

                                    {/* Timeline Node (Icon) */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        className={`absolute left-[0px] md:left-1/2 w-14 h-14 rounded-full border-4 border-[#050505] -translate-x-0 md:-translate-x-1/2 z-10 flex items-center justify-center transition-all duration-500
                      ${item.highlight
                                                ? 'bg-primary text-black shadow-[0_0_20px_0_hsl(var(--primary)/0.6)]'
                                                : 'bg-[#111111] text-muted-foreground group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_20px_0_hsl(var(--primary)/0.4)]'
                                            }
                    `}
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </motion.div>

                                    {/* Desktop Layout Helper -> alternates empty space */}
                                    {isEven ? (
                                        <div className="hidden md:block w-[45%]" />
                                    ) : null}

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                                        className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}
                                    >
                                        <div className={`p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/5 shadow-2xl transition-all duration-500 hover:border-white/10 relative overflow-hidden group/card
                      ${item.highlight ? 'ring-1 ring-primary/20 bg-gradient-to-br from-[#0a0a0f] to-primary/5' : ''}
                    `}>
                                            {/* Inner glow on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <div className={`flex flex-col gap-1 mb-4 ${isEven ? 'items-start' : 'md:items-end items-start'}`}>
                                                <span className="inline-block px-3 py-1 bg-white/5 text-white/60 text-xs font-semibold tracking-wider rounded-full mb-2">
                                                    {item.duration}
                                                </span>
                                                <h3 className="text-2xl font-bold text-white group-hover/card:text-primary transition-colors duration-300">
                                                    {item.degree}
                                                </h3>
                                                <p className="text-lg font-medium text-white/80">{item.institution}</p>
                                            </div>

                                            <div className={`inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 mb-6 ${item.highlight ? 'bg-primary/10 border-primary/20 text-primary-foreground font-semibold' : 'text-white/70'}`}>
                                                {item.achievement}
                                            </div>

                                            {item.coursework && (
                                                <div className={`mt-2 ${isEven ? 'text-left' : 'md:text-right text-left'}`}>
                                                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Relevant Coursework</h4>
                                                    <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                                                        {item.coursework.map((course, i) => (
                                                            <span key={i} className="px-3 py-1.5 text-xs font-medium bg-white/5 text-white/70 rounded-md border border-white/5 transition-colors hover:bg-white/10">
                                                                {course}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </motion.div>

                                    {/* Desktop Layout Helper -> alternates empty space */}
                                    {!isEven ? (
                                        <div className="hidden md:block w-[45%]" />
                                    ) : null}

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
