"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    MessageSquare,
    LogOut,
    Search,
    Menu,
    X,
    FolderGit2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        href: "/admin/projects",
        icon: FolderGit2,
    },
    {
        title: "Blogs",
        href: "/admin/blogs",
        icon: FileText,
    },
    {
        title: "Leads",
        href: "/admin/leads",
        icon: MessageSquare,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-[60] p-2 bg-[#28557F] text-white rounded-lg shadow-lg md:hidden"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-[#dfe2ed] bg-white font-[var(--font-poppins)] transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                {/* Branding */}
                <div className="flex h-20 items-center px-6 border-b border-[#dfe2ed]">
                    <Link href="/admin" className="flex items-center gap-3">
                        <img 
                            src="/images/logo.png" 
                            alt="Team 3 Logo" 
                            className="h-10 w-auto"
                        />
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <div className="mb-8">
                        <p className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest px-2 mb-4">Navigation</p>
                        <nav className="space-y-1.5">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                                            isActive
                                                ? 'bg-[#28557F] text-white shadow-lg shadow-[#28557F]/30'
                                                : 'text-[#42474e] hover:bg-[#f0f3fe] hover:text-[#28557F] hover:translate-x-1'
                                        }`}
                                    >
                                        <Icon size={20} className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#72777f] group-hover:text-[#28557F]'}`} />
                                        <span className="font-bold text-sm tracking-tight">{item.title}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest px-2 mb-4">System</p>
                        <nav className="space-y-1">
                            <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#42474e] hover:text-[#181c23] hover:bg-[#f0f3fe] transition-all text-sm font-medium group">
                                <Search size={18} className="group-hover:text-[#28557F]" />
                                <span>Preview Site</span>
                            </Link>
                            <button
                                onClick={() => alert("Logout implemented on backend")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#ba1a1a] hover:text-[#93000a] hover:bg-[#ffdad6] transition-all text-sm font-medium group"
                            >
                                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Profile Footer */}
                <div className="p-4 border-t border-[#dfe2ed]">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#f0f3fe] border border-[#a0cafb]">
                        <div className="h-8 w-8 rounded bg-[#d0e4ff] flex items-center justify-center text-[#001d35] font-bold text-[10px]">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-[#181c23] truncate">Admin User</p>
                            <p className="text-[9px] text-[#28557F] font-bold truncate uppercase tracking-widest">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
