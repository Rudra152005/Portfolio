import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, User, Mail, ArrowRight, MessageCircle, Loader2, Sparkles, Code, Cpu, Globe, Terminal } from 'lucide-react';

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 ${type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}
        >
            {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            <span className="font-medium">{message}</span>
        </motion.div>
    );
};

const CollaborationSection = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [whatsappLink, setWhatsappLink] = useState('');
    const [showToast, setShowToast] = useState(false);

    const validateForm = () => {
        if (!formData.name.trim() || formData.name.length < 2) return "Please enter a valid name.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
        if (!formData.message.trim() || formData.message.length < 10) return "Message should be at least 10 characters.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            alert(error); // Simple for now, can be improved to toast
            return;
        }

        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setStatus('success');
                setShowToast(true);
                setWhatsappLink(`https://wa.me/919554622143?text=${data.whatsappMsg}`);
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setShowToast(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setShowToast(true);
        }
    };

    return (
        <section id="collaboration" className="relative py-32 bg-[#030303] overflow-hidden">
            <AnimatePresence>
                {showToast && (
                    <Toast
                        message={status === 'success' ? "Message sent successfully!" : "Failed to send message."}
                        type={status === 'success' ? 'success' : 'error'}
                        onClose={() => setShowToast(false)}
                    />
                )}
            </AnimatePresence>

            {/* Premium Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />

                {/* Floating Tech Particles */}
                {[Code, Cpu, Globe, Terminal, MessageSquare].map((Icon, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.05, 0.15, 0.05],
                            y: [0, -150, 0],
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            delay: i * 3
                        }}
                        className="absolute text-primary/20"
                        style={{
                            left: `${15 + i * 18}%`,
                            top: `${20 + (i % 3) * 25}%`
                        }}
                    >
                        <Icon size={32 + i * 4} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">

                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                <Sparkles className="w-3 h-3" /> Connect with me
                            </div>
                            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1]">
                                Interested in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-blue-400 italic">collaboration?</span>
                            </h2>
                            <p className="text-white/60 text-xl leading-relaxed max-w-lg font-light">
                                Let's transform your ideas into exceptional digital experiences.
                                I'm ready to dive into technical challenges and create something remarkable.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.04]">
                                <Terminal className="w-8 h-8 text-primary mb-4" />
                                <h4 className="font-bold text-white text-lg">Technical Solutions</h4>
                                <p className="text-white/40 text-sm mt-1">Built with precision and modern best practices.</p>
                            </div>
                            <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.04]">
                                <Globe className="w-8 h-8 text-blue-400 mb-4" />
                                <h4 className="font-bold text-white text-lg">Global Reach</h4>
                                <p className="text-white/40 text-sm mt-1">Scaling projects for users worldwide.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Premium Contact Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, type: 'spring' }}
                        className="w-full lg:w-1/2 relative"
                    >
                        {/* Glowing Border Animation */}
                        <div className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-r from-primary/30 via-blue-500/30 to-primary/30 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />

                        <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#08080a] border border-white/10 backdrop-blur-3xl shadow-2xl overflow-hidden">
                            {/* Card Content Interior Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16 space-y-8"
                                    >
                                        <div className="relative">
                                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto relative z-10">
                                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                            </div>
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-3xl font-bold text-white">Transmitted!</h3>
                                            <p className="text-white/50 text-lg">Your signal has been received. I'll get back to you across the wire shortly.</p>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex flex-col gap-4"
                                        >
                                            <a
                                                href={whatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-8 py-5 text-sm font-black text-white hover:bg-emerald-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-95"
                                            >
                                                <MessageCircle className="w-5 h-5" /> EXPEDITE VIA WHATSAPP
                                            </a>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors"
                                            >
                                                Send another message
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-8 relative z-10"
                                    >
                                        <div className="space-y-5">
                                            <div className="relative group/field">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/field:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    placeholder="Your Identity"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:bg-white/[0.08] transition-all"
                                                />
                                            </div>
                                            <div className="relative group/field">
                                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/field:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="Digital Address"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:bg-white/[0.08] transition-all"
                                                />
                                            </div>
                                            <div className="relative group/field">
                                                <Terminal className="absolute left-5 top-6 w-5 h-5 text-white/20 group-focus-within/field:text-primary transition-colors" />
                                                <textarea
                                                    placeholder="Message payload..."
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:bg-white/[0.08] transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="w-full group/btn relative overflow-hidden rounded-2xl py-5 text-sm font-black uppercase tracking-widest text-black bg-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                        >
                                            {/* Shimmer Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                            <span className="relative flex items-center justify-center gap-3">
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" /> ENGAGING...
                                                    </>
                                                ) : (
                                                    <>
                                                        TRANSMIT PAYLOAD <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </button>

                                        {status === 'error' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs text-center font-bold tracking-widest uppercase"
                                            >
                                                Transmission Error. Retry pulse?
                                            </motion.p>
                                        )}
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CollaborationSection;
