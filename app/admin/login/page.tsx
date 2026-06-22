"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("A network error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden font-[var(--font-poppins)] p-4">
            {/* Background Image - Architecture related landscape */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ 
                    backgroundImage: "url('/images/project1.png')"
                }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-1 bg-gradient-to-br from-black/20 via-transparent to-black/20" />

            {/* Branding Container - Now in flow above the card */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 flex flex-col items-center mb-6"
            >
                <img 
                    src="/images/logo.png" 
                    alt="Team 3 Logo" 
                    className="h-12 md:h-16 w-auto drop-shadow-xl"
                />
            </motion.div>

            {/* Professional Glassmorphic Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 w-full max-w-[380px]"
            >
                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    <div className="mb-8 text-center space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">Login</h1>
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-300 text-[10px] font-semibold pt-1"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] block mb-2 ml-1">Email Address</label>
                            <div className="relative flex items-center bg-white/10 border border-white/20 rounded-xl focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10 transition-all duration-300 px-3 py-1.5">
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/30 text-sm py-1.5 pr-8 focus:outline-none"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="absolute right-3 text-white/40 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="text-[10px] font-bold text-white/70 uppercase tracking-[0.15em] block mb-2 ml-1">Password</label>
                            <div className="relative flex items-center bg-white/10 border border-white/20 rounded-xl focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10 transition-all duration-300 px-3 py-1.5">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/30 text-sm py-1.5 pr-8 focus:outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    className="absolute right-3 text-white/40 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between text-[10px] text-white/60 font-bold uppercase tracking-widest">
                            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="h-3 w-3 rounded-sm bg-white/10 border-white/30 text-[#28557F] focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                                <span>Remember</span>
                            </label>
                            <button 
                                type="button" 
                                onClick={() => setShowForgotModal(true)} 
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                Forgot?
                            </button>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-[#28557F] h-12 rounded-xl font-black text-xs shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-[0.1em] cursor-pointer"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            {/* Forgot Password Modal */}
            <AnimatePresence>
                {showForgotModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-white text-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Password Recovery</h3>
                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                This request is being forwarded to the development team. You will be redirected to WhatsApp to send the recovery request.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button 
                                    onClick={() => setShowForgotModal(false)}
                                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-500 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        window.open("https://wa.me/918870524355?text=Hello%20Team%203%20Development%20Team%2C%20I%20have%20forgotten%20my%20admin%20password.%20Please%20help%20me%20recover%20it.", "_blank");
                                        setShowForgotModal(false);
                                    }}
                                    className="px-4 py-2 bg-[#28557F] hover:bg-[#1f4365] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                    Proceed to WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
