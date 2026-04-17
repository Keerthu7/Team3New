"use client";

import { useState } from "react";
import { Search, Download, Mail, Zap, UserCheck, Calendar, Phone, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialLeads = [
    { _id: "1", name: "Sarah Collins", email: "sarah@example.com", phone: "+91 98765 43210", category: "Residential", status: "New", date: "Today, 10:30 AM", message: "Looking for consultation." },
    { _id: "2", name: "David Peterson", email: "david@corp.com", phone: "+1 234 567 8900", category: "Commercial", status: "In Progress", date: "Yesterday, 2:15 PM", message: "Need office renovation." },
    { _id: "3", name: "Emma Wilson", email: "emma@designs.com", phone: "+44 7700 900077", category: "Interior", status: "Replied", date: "Oct 24, 2024", message: "Home interior styling." },
];

export default function AdminLeads() {
    const [leads, setLeads] = useState(initialLeads);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateLeadStatus = (id: string, newStatus: string) => {
        setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
        setOpenDropdown(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dfe2ed]">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#181c23]">Client Messages</h1>
                    <p className="text-sm text-[#42474e] font-medium mt-1">Manage project inquiries.</p>
                </div>
                <button 
                    disabled={filteredLeads.length === 0}
                    className="flex items-center justify-center bg-[#181c23] hover:bg-[#2c3039] text-white px-6 h-11 rounded-xl shadow-md transition-all duration-300 font-bold text-sm tracking-tight"
                >
                    <Download size={16} className="mr-2" />
                    Export CSV
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-[#dfe2ed] shadow-sm flex items-center gap-5 group hover:border-[#181c23] hover:shadow-md transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-[#f0f3fe] flex items-center justify-center text-[#28557F] group-hover:bg-[#181c23] group-hover:text-white transition-all duration-300">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest mb-0.5">Total</p>
                        <p className="text-2xl font-bold text-[#181c23] tracking-tight">{leads.length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#dfe2ed] shadow-sm flex items-center gap-5 group hover:border-[#181c23] hover:shadow-md transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-[#f0f3fe] flex items-center justify-center text-[#28557F] group-hover:bg-[#181c23] group-hover:text-white transition-all duration-300">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest mb-0.5">New</p>
                        <p className="text-2xl font-bold text-[#181c23] tracking-tight">{leads.filter(l => l.status === "New").length}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#dfe2ed] shadow-sm flex items-center gap-5 group hover:border-[#181c23] hover:shadow-md transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-[#f0f3fe] flex items-center justify-center text-[#28557F] group-hover:bg-[#181c23] group-hover:text-white transition-all duration-300">
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest mb-0.5">Finalized</p>
                        <p className="text-2xl font-bold text-[#181c23] tracking-tight">{leads.filter(l => l.status === "Replied").length}</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4 pt-4">
                <div className="flex bg-white p-2 rounded-2xl border border-[#dfe2ed] shadow-sm max-w-md">
                    <div className="relative flex-1 flex items-center">
                        <Search className="absolute left-4 text-[#72777f]" size={20} />
                        <input
                            type="text"
                            placeholder="Search client messages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 h-11 bg-transparent border-none focus:outline-none text-sm font-medium text-[#181c23]"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredLeads.map((lead, i) => (
                            <motion.div
                                key={lead._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative"
                            >
                                <div className="bg-white border border-[#dfe2ed] p-5 md:p-6 rounded-2xl shadow-sm hover:border-[#28557F] hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className="h-14 w-14 rounded-2xl bg-[#f0f3fe] border border-[#d0e4ff] flex items-center justify-center font-bold text-[#28557F] text-xl group-hover:bg-[#28557F] group-hover:text-white transition-all duration-500">
                                            {lead.name[0]}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`rounded font-bold uppercase tracking-widest text-[9px] py-1 px-2 border ${lead.status === "New" ? "bg-[#181c23] text-white border-[#181c23]" :
                                                    lead.status === "In Progress" ? "bg-[#f0f3fe] text-[#28557F] border-[#d0e4ff]" :
                                                    "bg-white text-[#72777f] border-[#dfe2ed]"
                                                }`}>
                                                    {lead.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-[#72777f] uppercase tracking-widest flex items-center gap-1.5">
                                                    <Calendar size={12} /> {lead.date}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#181c23] group-hover:text-[#28557F] transition-colors">{lead.name}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#42474e] font-medium">
                                                <span className="flex items-center gap-1.5"><Mail size={12} className="text-[#a0cafb]" /> {lead.email}</span>
                                                <span className="flex items-center gap-1.5"><Phone size={12} className="text-[#a0cafb]" /> {lead.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="hidden md:flex items-center gap-6">
                                            <div className="w-[1px] h-4 bg-[#dfe2ed]" />
                                            <div className="text-right">
                                                <p className="text-[9px] font-bold text-[#72777f] uppercase leading-none mb-0.5">Project</p>
                                                <p className="text-xs font-bold text-[#181c23]">{lead.category}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 relative">
                                            <button 
                                                onClick={() => setOpenDropdown(openDropdown === lead._id ? null : lead._id)}
                                                className="h-10 px-6 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-[#dfe2ed] text-[#42474e] hover:bg-[#181c23] hover:text-white transition-all duration-300"
                                            >
                                                Update Status
                                            </button>
                                            
                                            {/* Custom Dropdown */}
                                            {openDropdown === lead._id && (
                                                <div className="absolute top-12 right-0 bg-white border border-[#dfe2ed] rounded-2xl shadow-xl w-48 p-2 z-10">
                                                    <button onClick={() => updateLeadStatus(lead._id, "In Progress")} className="w-full text-left px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#181c23] hover:bg-[#f0f3fe] hover:text-[#28557F] flex items-center transition-colors">
                                                        <Clock size={12} className="mr-2" /> Mark In Progress
                                                    </button>
                                                    <button onClick={() => updateLeadStatus(lead._id, "Replied")} className="w-full text-left px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#181c23] hover:bg-[#f0f3fe] hover:text-[#28557F] flex items-center transition-colors">
                                                        <CheckCircle2 size={12} className="mr-2" /> Mark Finalized
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
