"use client";

import React from "react";
import Link from "next/link";
import {
    FolderGit2,
    FileText,
    MessageSquare,
    ArrowUpRight,
    ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

interface AdminDashboardClientProps {
    stats: {
        projects: number;
        blogs: number;
        leads: number;
    };
    recentLeads: any[];
    recentActivities: any[];
}

export default function AdminDashboardClient({ stats, recentLeads, recentActivities }: AdminDashboardClientProps) {
    const statCards = [
        {
            title: "Portfolio",
            value: stats.projects,
            icon: FolderGit2,
            label: "Projects",
        },
        {
            title: "Insights",
            value: stats.blogs,
            icon: FileText,
            label: "Blogs",
        },
        {
            title: "Inquiries",
            value: stats.leads,
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
                                        {stat.value}
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
                <div className="lg:col-span-2 space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#181c23] tracking-tight">Recent Inquiries</h2>
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

                    {/* Admin Activity Feed */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-[#181c23] tracking-tight">Recent Admin Activities</h2>
                            <Link href="/admin/activities" className="text-[11px] font-bold text-[#28557F] flex items-center gap-1 uppercase tracking-widest hover:translate-x-1.5 transition-all duration-300">
                                View Full Log <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="border border-[#dfe2ed] rounded-2xl overflow-hidden divide-y divide-[#dfe2ed] bg-white shadow-sm">
                            {recentActivities && recentActivities.length > 0 ? recentActivities.map((act, index) => {
                                // Dynamic tag colors based on action type
                                let tagBg = "bg-slate-100 text-slate-700 border-slate-200";
                                if (act.action === "LOGIN") tagBg = "bg-sky-50 text-sky-700 border-sky-100";
                                else if (act.action === "LOGOUT") tagBg = "bg-rose-50 text-rose-700 border-rose-100";
                                else if (act.action.startsWith("CREATE")) tagBg = "bg-emerald-50 text-emerald-700 border-emerald-100";
                                else if (act.action.startsWith("UPDATE")) tagBg = "bg-amber-50 text-amber-700 border-amber-100";
                                else if (act.action.startsWith("DELETE")) tagBg = "bg-red-50 text-red-700 border-red-100";

                                return (
                                    <div key={act._id || index} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white hover:bg-[#f9f9ff] transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="h-8 w-8 rounded-lg bg-[#dfe2ed] flex items-center justify-center font-bold text-[#42474e] text-[10px] shrink-0 uppercase">
                                                {act.user ? act.user.slice(0, 2) : "AD"}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold text-xs text-[#181c23]">{act.user}</span>
                                                    <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagBg}`}>
                                                        {act.action}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#42474e] font-semibold">{act.details}</p>
                                            </div>
                                        </div>
                                        <span className="text-[9px] text-[#72777f] font-bold whitespace-nowrap self-end md:self-center">
                                            {new Date(act.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                );
                            }) : (
                                <div className="p-12 text-center">
                                    <p className="text-[#a0cafb] font-bold uppercase tracking-widest text-[10px]">No recent admin activity.</p>
                                </div>
                            )}
                        </div>
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
