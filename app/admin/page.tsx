"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FolderGit2,
    FileText,
    MessageSquare,
    ArrowUpRight,
    Loader2,
    ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    // using mock counts since API might not exist yet, 
    // but building the component properly for future DB hooks
    const [stats, setStats] = useState({
        projects: { count: 0, loading: true },
        blogs: { count: 0, loading: true },
        leads: { count: 0, loading: true }
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);

    useEffect(() => {
        // Fetch Projects
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                const count = Array.isArray(data) ? data.length : 0;
                setStats(prev => ({ ...prev, projects: { count, loading: false } }));
            })
            .catch(() => setStats(prev => ({ ...prev, projects: { count: 0, loading: false } })));

        // Fetch Blogs
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                const count = Array.isArray(data) ? data.length : 0;
                setStats(prev => ({ ...prev, blogs: { count, loading: false } }));
            })
            .catch(() => setStats(prev => ({ ...prev, blogs: { count: 0, loading: false } })));

        // Fetch Leads
        fetch('/api/leads')
            .then(res => res.json())
            .then(data => {
                const count = Array.isArray(data) ? data.length : 0;
                setStats(prev => ({ ...prev, leads: { count, loading: false } }));
                // Show first 5 most recent leads
                if (Array.isArray(data)) {
                    setRecentLeads(data.slice(0, 5));
                }
            })
            .catch(() => setStats(prev => ({ ...prev, leads: { count: 0, loading: false } })));
    }, []);

    const statCards = [
        {
            title: "Portfolio",
            value: stats.projects.count,
            loading: stats.projects.loading,
            icon: FolderGit2,
            label: "Projects",
        },
        {
            title: "Insights",
            value: stats.blogs.count,
            loading: stats.blogs.loading,
            icon: FileText,
            label: "Blogs",
        },
        {
            title: "Inquiries",
            value: stats.leads.count,
            loading: stats.leads.loading,
            icon: MessageSquare,
            label: "Leads",
        },
    ];

    return (
        <div className="space-y-12">
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#dfe2ed]">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-[#181c23] leading-tight flex items-center gap-2">
                        System Dashboard
                    </h1>
                    <p className="text-[#42474e] font-medium text-sm">Manage your website content efficiently.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-white px-4 py-2 rounded-xl border border-[#dfe2ed] shadow-sm">
                        <span className="text-[10px] text-[#72777f] font-bold uppercase tracking-widest block leading-none mb-1">Status</span>
                        <span className="text-xs font-bold text-[#181c23] flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Server
                        </span>
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                    >
                        <div className="border border-[#dfe2ed] shadow-sm rounded-2xl bg-white overflow-hidden transition-all duration-300 group-hover:border-[#28557F] group-hover:shadow-md h-full relative cursor-default">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-10 w-10 rounded-xl bg-[#f0f3fe] flex items-center justify-center text-[#28557F] border border-[#d0e4ff] transition-colors group-hover:bg-[#28557F] group-hover:text-white group-hover:border-[#28557F]">
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest leading-none">{stat.label}</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-4xl font-bold tracking-tighter text-[#181c23]">
                                        {stat.loading ? <Loader2 className="animate-spin h-6 w-6 text-[#72777f]" /> : stat.value}
                                    </div>
                                    <p className="text-[11px] text-[#42474e] font-semibold uppercase tracking-wider">{stat.title}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
                {/* Recent Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#181c23] tracking-tight">Recent Activity</h2>
                        <Link href="/admin/leads" className="text-[11px] font-bold text-[#28557F] flex items-center gap-1 uppercase tracking-widest hover:translate-x-1.5 transition-all duration-300">
                            View All <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="border border-[#dfe2ed] rounded-2xl overflow-hidden divide-y divide-[#dfe2ed] bg-white shadow-sm">
                        {recentLeads.length > 0 ? recentLeads.map((lead, index) => (
                            <div key={lead._id || index} className="p-5 flex items-center justify-between bg-white hover:bg-[#f9f9ff] transition-colors group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-[#f0f3fe] border border-[#d0e4ff] flex items-center justify-center font-bold text-[#28557F] text-xs">
                                        {lead.name ? lead.name[0] : 'U'}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-[#181c23] group-hover:text-[#28557F] transition-colors">{lead.name}</h4>
                                        <p className="text-xs text-[#42474e] font-medium">{lead.category || "Consultation"}</p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1.5">
                                    <span className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest">{lead.date}</span>
                                    <Link href="/admin/leads" className="h-7 w-7 rounded-lg border border-[#dfe2ed] flex items-center justify-center hover:bg-[#28557F] hover:border-[#28557F] hover:text-white transition-all duration-500 hover:scale-110 active:scale-90 shadow-sm text-[#42474e]">
                                        <ArrowUpRight size={14} className="group-hover:text-white" />
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center">
                                <p className="text-[#a0cafb] font-bold uppercase tracking-widest text-[10px]">No new messages.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-[#181c23] tracking-tight">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link href="/admin/projects" className="flex items-center justify-between p-5 rounded-2xl border border-[#dfe2ed] bg-white hover:border-[#28557F] hover:translate-x-1 transition-all duration-500 hover:shadow-md group">
                            <div className="flex items-center gap-3">
                                <FolderGit2 size={18} className="text-[#72777f] group-hover:text-[#28557F] transition-colors" />
                                <span className="font-bold text-sm text-[#181c23]">Manage Projects</span>
                            </div>
                            <ChevronRight size={16} className="text-[#72777f] group-hover:text-[#28557F] transition-colors" />
                        </Link>
                        <Link href="/admin/blogs" className="flex items-center justify-between p-5 rounded-2xl border border-[#dfe2ed] bg-white hover:border-[#28557F] hover:translate-x-1 transition-all duration-500 hover:shadow-md group">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-[#72777f] group-hover:text-[#28557F] transition-colors" />
                                <span className="font-bold text-sm text-[#181c23]">Post Insight</span>
                            </div>
                            <ChevronRight size={16} className="text-[#72777f] group-hover:text-[#28557F] transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
