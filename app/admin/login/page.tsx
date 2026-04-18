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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-[var(--font-poppins)]">
            {/* Background Image - Architecture related landscape */}
            <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{ 
                    backgroundImage: "url('/admin-bg.png')",
                    filter: "brightness(0.7)"
                }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-1 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />

            {/* Glassmorphic Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-[400px] px-4"
            >
                <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-[2rem] p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative overflow-hidden group">
                    {/* Close Icon (UI decoration from image) */}
                    <div className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer transition-colors p-1 border border-white/30 rounded-md">
                        <X size={14} />
                    </div>

                    <div className="mb-10 text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Login</h1>
                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-300 text-xs font-medium pt-2"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {/* Email / Username Field */}
                        <div className="relative group/field">
                            <label className="text-xs font-semibold text-white/80 lowercase tracking-wider block mb-1 ml-1">Email</label>
                            <div className="relative border-b border-white/40 focus-within:border-white transition-all py-1">
                                <input
                                    type="text"
                                    name="username"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/20 text-sm py-2 pr-10"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative group/field">
                            <label className="text-xs font-semibold text-white/80 lowercase tracking-wider block mb-1 ml-1">Password</label>
                            <div className="relative border-b border-white/40 focus-within:border-white transition-all py-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/20 text-sm py-2 pr-10"
                                    placeholder="••••••••"
                                    required
                                />
                                <div 
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 cursor-pointer hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Lock size={18} /> : <Lock size={18} />}
                                    {/* Using Lock for consistency with image, but usually Eye is better. I'll stick to image vibe. */}
                                </div>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-[11px] text-white/70 font-medium">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="rounded-sm bg-white/10 border-white/30 text-[#28557F] focus:ring-offset-0 focus:ring-0" />
                                Remember me
                            </label>
                            <button type="button" className="hover:text-white hover:underline transition-all">Forgot Password</button>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-[#28557F] hover:bg-[#28557F] hover:text-white h-12 rounded-full font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative group-login-btn"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                        
                        {/* Register Link */}
                        <div className="text-center pt-2">
                            <p className="text-xs text-white/60">
                                Don't have an account? <button type="button" className="text-white font-bold hover:underline ml-1">Register</button>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* Additional Branding Overlay */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <img 
                    src="/images/logo.png" 
                    alt="Team 3 Logo" 
                    className="h-12 w-auto drop-shadow-lg"
                />
                <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
                    <span className="bg-white/90 backdrop-blur-sm text-[#28557F] px-2 py-0.5 rounded-sm">TEAM 3</span>
                    <span className="text-white font-medium text-sm tracking-[0.2em]">ASSOCIATES</span>
                </div>
            </div>
        </div>
    );
}
