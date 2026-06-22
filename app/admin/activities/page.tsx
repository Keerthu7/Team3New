"use client";

import React, { useState, useEffect } from "react";
import { 
    Search, 
    User, 
    Filter, 
    ArrowUpDown, 
    Loader2, 
    Calendar,
    ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Activity {
    _id: string;
    user: string;
    action: string;
    details: string;
    timestamp: string;
}

const ACTION_OPTIONS = [
    { label: "All Actions", value: "" },
    { label: "Logins", value: "LOGIN" },
    { label: "Logouts", value: "LOGOUT" },
    { label: "Create Project", value: "CREATE_PROJECT" },
    { label: "Update Project", value: "UPDATE_PROJECT" },
    { label: "Delete Project", value: "DELETE_PROJECT" },
    { label: "Create Blog", value: "CREATE_BLOG" },
    { label: "Update Blog", value: "UPDATE_BLOG" },
    { label: "Delete Blog", value: "DELETE_BLOG" },
    { label: "Update Lead", value: "UPDATE_LEAD" },
    { label: "Delete Lead", value: "DELETE_LEAD" }
];

const USER_OPTIONS = [
    { label: "All Administrators", value: "" },
    { label: "Team 3 Admin", value: "team3associates" },
    { label: "Praveen Kumar (Engineer)", value: "praveen.eng@team3associates.com" },
    { label: "Prabhakar (Architect)", value: "prabhakar.arch@team3associates.com" }
];

export default function ActivityLogPage() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedAction, setSelectedAction] = useState("");

    // Fetch activities based on filters
    const fetchActivities = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append("query", searchTerm);
            if (selectedUser) params.append("user", selectedUser);
            if (selectedAction) params.append("action", selectedAction);

            const res = await fetch(`/api/activities?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setActivities(data);
            }
        } catch (err) {
            console.error("Error loading activities:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchActivities();
        }, 300); // Debounce search changes

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedUser, selectedAction]);

    const getActionStyle = (action: string) => {
        if (action === "LOGIN") return "bg-sky-50 text-sky-700 border-sky-100";
        if (action === "LOGOUT") return "bg-rose-50 text-rose-700 border-rose-100";
        if (action.startsWith("CREATE")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
        if (action.startsWith("UPDATE")) return "bg-amber-50 text-amber-700 border-amber-100";
        if (action.startsWith("DELETE")) return "bg-red-50 text-red-700 border-red-100";
        return "bg-slate-50 text-slate-700 border-slate-100";
    };

    const getFormattedUser = (userEmail: string) => {
        const lower = userEmail.toLowerCase();
        if (lower === "team3associates") return "Team 3 Admin";
        if (lower === "praveen.eng@team3associates.com") return "Praveen Kumar (Engineer)";
        if (lower === "prabhakar.arch@team3associates.com") return "Prabhakar (Architect)";
        return userEmail;
    };

    return (
        <div className="space-y-8 font-[var(--font-poppins)]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#dfe2ed]">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-[#181c23] leading-tight">
                        System Audit Logs
                    </h1>
                    <p className="text-[#42474e] font-medium text-xs md:text-sm">
                        Monitor login sessions and track changes made by administrators.
                    </p>
                </div>
                <button 
                    onClick={fetchActivities}
                    className="self-start md:self-auto px-4 py-2 bg-white border border-[#dfe2ed] hover:border-[#28557F] text-[#28557F] text-xs font-bold rounded-xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                    Refresh Logs
                </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-[#dfe2ed] rounded-2xl p-5 md:p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Field */}
                    <div className="relative flex items-center bg-[#f0f3fe]/40 border border-[#dfe2ed] rounded-xl focus-within:border-[#28557F] focus-within:ring-2 focus-within:ring-[#28557F]/10 transition-all duration-300 px-3 py-1.5">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-transparent border-none text-slate-800 placeholder:text-slate-400 text-xs py-1.5 pr-8 focus:outline-none"
                            placeholder="Search log descriptions or admins..."
                        />
                        <Search className="absolute right-3 text-slate-400 pointer-events-none" size={16} />
                    </div>

                    {/* Filter User */}
                    <div className="relative flex items-center bg-[#f0f3fe]/40 border border-[#dfe2ed] rounded-xl focus-within:border-[#28557F] focus-within:ring-2 focus-within:ring-[#28557F]/10 transition-all duration-300 px-3 py-1.5">
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="w-full bg-transparent border-none outline-none appearance-none text-slate-700 text-xs py-1.5 pr-8 focus:ring-0 focus:outline-none cursor-pointer"
                        >
                            {USER_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <User className="absolute right-3 text-slate-400 pointer-events-none" size={16} />
                    </div>

                    {/* Filter Action */}
                    <div className="relative flex items-center bg-[#f0f3fe]/40 border border-[#dfe2ed] rounded-xl focus-within:border-[#28557F] focus-within:ring-2 focus-within:ring-[#28557F]/10 transition-all duration-300 px-3 py-1.5">
                        <select
                            value={selectedAction}
                            onChange={(e) => setSelectedAction(e.target.value)}
                            className="w-full bg-transparent border-none outline-none appearance-none text-slate-700 text-xs py-1.5 pr-8 focus:ring-0 focus:outline-none cursor-pointer"
                        >
                            {ACTION_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 text-slate-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {/* Audit Logs Table/Cards */}
            <div className="border border-[#dfe2ed] rounded-2xl overflow-hidden bg-white shadow-sm">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-20 flex flex-col items-center justify-center gap-3"
                        >
                            <Loader2 className="animate-spin text-[#28557F]" size={32} />
                            <p className="text-xs font-bold text-[#72777f] uppercase tracking-widest">Querying audit trail...</p>
                        </motion.div>
                    ) : activities.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="divide-y divide-[#dfe2ed]"
                        >
                            {/* Table Header (Hidden on Mobile) */}
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#f9f9ff] text-[10px] font-bold text-[#72777f] uppercase tracking-widest border-b border-[#dfe2ed]">
                                <div className="col-span-3 flex items-center gap-1.5"><User size={12} /> Administrator</div>
                                <div className="col-span-2 flex items-center gap-1.5"><ArrowUpDown size={12} /> Action</div>
                                <div className="col-span-4 flex items-center gap-1.5">Details</div>
                                <div className="col-span-3 flex items-center justify-end gap-1.5"><Calendar size={12} /> Timestamp</div>
                            </div>

                            {/* Logs List */}
                            {activities.map((act) => (
                                <div 
                                    key={act._id} 
                                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 hover:bg-[#f9f9ff] transition-colors items-center text-xs text-slate-700"
                                >
                                    {/* Administrator */}
                                    <div className="col-span-1 md:col-span-3 flex items-center gap-3">
                                        <div className="h-7 w-7 rounded bg-[#dfe2ed] flex items-center justify-center font-bold text-[#42474e] text-[9px] uppercase shrink-0">
                                            {act.user ? act.user.slice(0, 2) : "AD"}
                                        </div>
                                        <span className="font-bold text-slate-900 break-all">{getFormattedUser(act.user)}</span>
                                    </div>

                                    {/* Action Tag */}
                                    <div className="col-span-1 md:col-span-2 self-start md:self-auto">
                                        <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getActionStyle(act.action)}`}>
                                            {act.action}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="col-span-1 md:col-span-4 font-semibold text-slate-600 break-words">
                                        {act.details}
                                    </div>

                                    {/* Timestamp */}
                                    <div className="col-span-1 md:col-span-3 text-[10px] text-[#72777f] font-bold md:text-right">
                                        {new Date(act.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-16 text-center flex flex-col items-center justify-center gap-4"
                        >
                            <div className="h-12 w-12 rounded-full bg-[#f0f3fe] border border-[#d0e4ff] flex items-center justify-center text-[#28557F]">
                                <ShieldAlert size={22} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-sm text-[#181c23]">No Activity Logs Found</h4>
                                <p className="text-xs text-[#72777f] font-medium max-w-xs mx-auto">
                                    No actions match your search query or filter settings. Try adjusting your filters.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
