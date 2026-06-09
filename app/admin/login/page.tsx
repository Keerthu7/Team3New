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

            {/* Glassmorphic Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 w-full max-w-[360px]"
            >
                <div className="bg-white/10 backdrop-blur-[25px] border border-white/20 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                    {/* Close Icon (decorative) */}
                    <div className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer transition-colors p-1 border border-white/20 rounded-md">
                        <X size={12} />
                    </div>

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
                            <label className="text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] block mb-1.5 ml-1">Email</label>
                            <div className="relative border-b border-white/30 focus-within:border-white transition-all duration-300 py-0.5">
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/20 text-sm py-1.5 pr-8"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <label className="text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] block mb-1.5 ml-1">Password</label>
                            <div className="relative border-b border-white/30 focus-within:border-white transition-all duration-300 py-0.5">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/20 text-sm py-1.5 pr-8"
                                    placeholder="••••••••"
                                    required
                                />
                                <button 
                                    type="button"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between text-[10px] text-white/60 font-bold uppercase tracking-widest">
                            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="h-3 w-3 rounded-sm bg-white/10 border-white/30 text-[#28557F] focus:ring-0 focus:ring-offset-0" />
                                <span>Remember</span>
                            </label>
                            <button type="button" className="hover:text-white transition-colors">Forgot?</button>
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.9)" }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-[#28557F] h-12 rounded-xl font-black text-xs shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-[0.1em]"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                        
                        <div className="text-center pt-1">
                            <p className="text-[10px] text-white/40 font-medium">
                                Don't have an account? <button type="button" className="text-white font-bold hover:underline ml-1">Register</button>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
