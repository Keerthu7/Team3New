"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Loader2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Helper component for uploading images
function ImageUpload({ label, onUpload, defaultImage }: { label: string, onUpload: (url: string) => void, defaultImage?: string }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(defaultImage || "");

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.url) {
                setPreview(data.url);
                onUpload(data.url);
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">{label}</label>
            <div className="relative border-2 border-dashed border-[#dfe2ed] rounded-2xl p-4 flex flex-col items-center justify-center bg-[#f9f9ff] hover:bg-[#f0f3fe] hover:border-[#a0cafb] transition-all cursor-pointer min-h-[140px] overflow-hidden">
                <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                
                {uploading ? (
                    <Loader2 className="animate-spin text-[#28557F]" size={30} />
                ) : preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0 z-0" />
                ) : (
                    <>
                        <ImageIcon size={32} className="text-[#a0cafb] mb-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#28557F]">Upload Image</span>
                    </>
                )}
            </div>
        </div>
    );
}

// Initial default blank state matching Schema
const emptyProject = {
    title: "", formalTitle: "", category: "", filterType: "Residential", subtitle: "", 
    image: "", gallery: [], location: "", year: "", area: "", scopeOfWork: "", overview: "", 
    designTypes: [], galleryCaptions: [],
    technicalDetails: {
        finishes: {
            facade: { desc: "", images: [] },
            wall: { desc: "", images: [] },
            flooring: { desc: "", images: [] }
        },
        materials: [], contributors: [], photoCredits: []
    }
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Form state
    const [formData, setFormData] = useState<any>(JSON.parse(JSON.stringify(emptyProject)));
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const fetchProjects = () => {
        setIsLoading(true);
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = Array.isArray(projects) ? projects.filter(p => 
        (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    const toggleModal = () => {
        if (isModalOpen) {
            setFormData(JSON.parse(JSON.stringify(emptyProject)));
            setEditingId(null);
        }
        setIsModalOpen(!isModalOpen);
    };

    const handleEdit = (project: any) => {
        setFormData(JSON.parse(JSON.stringify({
            ...emptyProject,
            ...project
        })));
        setEditingId(project._id);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        
        // Auto-generate slug if new
        if (!editingId && formData.title) {
            formData.slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/projects/${editingId}` : '/api/projects';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const result = await res.json();
            
            if (!res.ok) {
                throw new Error(result.error || "Failed to save project to MongoDB.");
            }
            
            fetchProjects();
            toggleModal();
        } catch (error: any) {
            console.error(error);
            alert(`Error: ${error.message}\n\n(Note: If this says ECONNREFUSED or Timeout, your local internet/ISP is blocking MongoDB. Deploy to Vercel or change network to fix this!)`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dfe2ed]">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-[#181c23]">Projects</h1>
                    <p className="text-sm text-[#42474e] font-medium mt-1">Manage your portfolio items.</p>
                </div>
                <button 
                    onClick={toggleModal}
                    className="flex items-center justify-center bg-[#28557F] hover:bg-[#194973] text-white px-6 h-11 rounded-xl shadow-md transition-all duration-300 font-bold text-sm tracking-tight hover:shadow-lg"
                >
                    <Plus size={18} className="mr-2" />
                    New Project
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex bg-white p-2 rounded-2xl border border-[#dfe2ed] shadow-sm">
                <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-4 text-[#72777f]" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 h-11 bg-transparent border-none focus:outline-none text-sm font-medium text-[#181c23]"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-[#28557F]" size={40} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={project._id || project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white border border-[#dfe2ed] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#28557F] transition-all duration-300 group"
                        >
                            <div className="relative aspect-[4/3] bg-[#f0f3fe] border-b border-[#dfe2ed] overflow-hidden">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-[#a0cafb]"><ImageIcon size={40} /></div>
                                )}
                                
                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(project)} className="h-8 w-8 rounded-lg bg-white/90 shadow text-[#42474e] flex items-center justify-center hover:bg-[#28557F] hover:text-white transition-colors">
                                        <Edit2 size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(project._id)} className="h-8 w-8 rounded-lg bg-white/90 shadow text-[#ba1a1a] flex items-center justify-center hover:bg-[#ba1a1a] hover:text-white transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold text-[#28557F] uppercase tracking-widest bg-[#f0f3fe] px-2 py-0.5 rounded">{project.category}</span>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#d3e4ff] text-[#004880]`}>
                                        {project.filterType}
                                    </span>
                                </div>
                                <h3 className="font-bold text-[#181c23] group-hover:text-[#28557F] transition-colors line-clamp-1">{project.title}</h3>
                                <p className="text-sm text-[#72777f] font-medium mt-1 line-clamp-1">{project.location} • {project.year}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={toggleModal}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col border border-[#dfe2ed] overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-[#dfe2ed] bg-[#f9f9ff]">
                                <h2 className="text-xl font-bold tracking-tight text-[#181c23]">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                                <button onClick={toggleModal} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#e5e8f3] text-[#42474e] transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-8 overflow-y-auto bg-white flex-1 custom-scrollbar">
                                <form id="project-form" onSubmit={handleSubmit} className="space-y-10">
                                    
                                    {/* Section 1: Basic Information */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[#28557F] mb-6 flex items-center border-b pb-2"><span className="bg-[#28557F] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span> Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Main Title</label>
                                                <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. Modern Villa" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Formal Title (Detail Page)</label>
                                                <input value={formData.formalTitle} onChange={e => setFormData({...formData, formalTitle: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. The Modern Villa Residence" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Category</label>
                                                <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. Residential" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Filter Type</label>
                                                <select value={formData.filterType} onChange={e => setFormData({...formData, filterType: e.target.value})} className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors">
                                                    <option value="Residential">Residential</option>
                                                    <option value="Commercial">Commercial</option>
                                                    <option value="Healthcare">Healthcare</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Interior">Interior</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Location</label>
                                                <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. Chennai, India" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Year</label>
                                                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. 2024" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Area</label>
                                                <input value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. 10,000 Sq.Ft" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Scope Of Work</label>
                                                <input value={formData.scopeOfWork} onChange={e => setFormData({...formData, scopeOfWork: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="E.g. Architecture & Interior Design" />
                                            </div>
                                            <div className="col-span-1 md:col-span-2 space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Subtitle</label>
                                                <input value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} required type="text" className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-12 px-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="Brief subtitle for the cover..." />
                                            </div>
                                            <div className="col-span-1 md:col-span-2 space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">Overview Description</label>
                                                <textarea value={formData.overview} onChange={e => setFormData({...formData, overview: e.target.value})} required rows={4} className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl p-4 focus:outline-none focus:border-[#28557F] font-medium text-sm transition-colors" placeholder="Detail description of the project..." />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Media & Gallery */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[#28557F] mb-6 flex items-center border-b pb-2"><span className="bg-[#28557F] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">2</span> Media & Gallery</h3>
                                        <div className="space-y-6">
                                            <ImageUpload 
                                                label="Main Thumbnail / Hero Image" 
                                                defaultImage={formData.image} 
                                                onUpload={(url) => setFormData({...formData, image: url})} 
                                            />
                                            
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex justify-between">
                                                    Gallery Images
                                                    <button type="button" onClick={() => setFormData({...formData, gallery: [...formData.gallery, ""]})} className="text-[#28557F] flex items-center"><Plus size={12} className="mr-1"/> Add Image</button>
                                                </label>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {formData.gallery.map((url: string, index: number) => (
                                                        <div key={index} className="relative group">
                                                            <ImageUpload 
                                                                label={`Image ${index + 1}`} 
                                                                defaultImage={url} 
                                                                onUpload={(newUrl) => {
                                                                    const g = [...formData.gallery]; g[index] = newUrl; setFormData({...formData, gallery: g});
                                                                }} 
                                                            />
                                                            <button type="button" onClick={() => {
                                                                const g = [...formData.gallery]; g.splice(index, 1); setFormData({...formData, gallery: g});
                                                            }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 3: Technical Details */}
                                    <div>
                                        <h3 className="text-lg font-bold text-[#28557F] mb-6 flex items-center border-b pb-2"><span className="bg-[#28557F] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">3</span> Technical Specifics</h3>
                                        
                                        <div className="space-y-4">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex items-center">Materials Used <button type="button" onClick={() => setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: [...(formData.technicalDetails?.materials || []), {label: "", value: ""}]}})} className="ml-4 text-[10px] bg-[#e5e8f3] px-2 py-1 rounded text-[#28557F] hover:bg-[#d3e4ff] transition"><Plus size={10} className="inline mr-1" />Add Material</button></label>
                                            {(formData.technicalDetails?.materials || []).map((m: any, index: number) => (
                                                <div key={`m-${index}`} className="flex gap-2 relative">
                                                    <input value={m.label} onChange={(e) => { const v = [...formData.technicalDetails.materials]; v[index].label = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} placeholder="E.g. Flooring" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <input value={m.value} onChange={(e) => { const v = [...formData.technicalDetails.materials]; v[index].value = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} placeholder="E.g. Italian Marble" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <button type="button" onClick={() => { const v = [...formData.technicalDetails.materials]; v.splice(index, 1); setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} className="text-red-500 p-2"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex items-center">Contributors <button type="button" onClick={() => setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: [...(formData.technicalDetails?.contributors || []), {label: "", value: ""}]}})} className="ml-4 text-[10px] bg-[#e5e8f3] px-2 py-1 rounded text-[#28557F] hover:bg-[#d3e4ff] transition"><Plus size={10} className="inline mr-1" />Add Contributor</button></label>
                                            {(formData.technicalDetails?.contributors || []).map((m: any, index: number) => (
                                                <div key={`c-${index}`} className="flex gap-2 relative">
                                                    <input value={m.label} onChange={(e) => { const v = [...formData.technicalDetails.contributors]; v[index].label = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} placeholder="E.g. Structural Engineer" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <input value={m.value} onChange={(e) => { const v = [...formData.technicalDetails.contributors]; v[index].value = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} placeholder="E.g. John Doe Consulting" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <button type="button" onClick={() => { const v = [...formData.technicalDetails.contributors]; v.splice(index, 1); setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} className="text-red-500 p-2"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex items-center">Photo Credits <button type="button" onClick={() => setFormData({...formData, technicalDetails: {...formData.technicalDetails, photoCredits: [...(formData.technicalDetails?.photoCredits || []), {label: "", value: ""}]}})} className="ml-4 text-[10px] bg-[#e5e8f3] px-2 py-1 rounded text-[#28557F] hover:bg-[#d3e4ff] transition"><Plus size={10} className="inline mr-1" />Add Photo Credit</button></label>
                                            {(formData.technicalDetails?.photoCredits || []).map((m: any, index: number) => (
                                                <div key={`p-${index}`} className="flex gap-2 relative">
                                                    <input value={m.label} onChange={(e) => { const v = [...formData.technicalDetails.photoCredits]; v[index].label = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, photoCredits: v}}) }} placeholder="E.g. Exterior Shots" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <input value={m.value} onChange={(e) => { const v = [...formData.technicalDetails.photoCredits]; v[index].value = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, photoCredits: v}}) }} placeholder="E.g. Jane Studios" className="flex-1 bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-10 px-3 text-sm focus:border-[#28557F] outline-none" />
                                                    <button type="button" onClick={() => { const v = [...formData.technicalDetails.photoCredits]; v.splice(index, 1); setFormData({...formData, technicalDetails: {...formData.technicalDetails, photoCredits: v}}) }} className="text-red-500 p-2"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div className="p-6 border-t border-[#dfe2ed] bg-[#f9f9ff] flex items-center justify-end gap-3 z-50">
                                <button type="button" onClick={toggleModal} className="px-6 h-11 rounded-xl font-bold tracking-tight text-sm text-[#42474e] hover:bg-[#e5e8f3] transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" form="project-form" disabled={saving} className="px-8 h-11 flex items-center justify-center rounded-xl font-bold tracking-tight text-sm bg-[#28557F] text-white hover:bg-[#194973] shadow-md transition-all disabled:opacity-50 min-w-[140px]">
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <><Save size={16} className="mr-2" /> Save Project</>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
