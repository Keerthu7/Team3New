"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Loader2, Save, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadImage } from "@/lib/image-utils";

// Helper component for uploading images
function ImageUpload({ label, onUpload, defaultImage, dimensions }: { label: string, onUpload: (url: string) => void, defaultImage?: string, dimensions?: string }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(defaultImage || "");

    useEffect(() => {
        setPreview(defaultImage || "");
    }, [defaultImage]);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const uploadedUrl = await uploadImage(file);
            setPreview(uploadedUrl);
            onUpload(uploadedUrl);
        } catch (error: any) {
            console.error("Upload failed", error);
            alert("Upload Error: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const showLoading = uploading || (preview && preview.startsWith("uploading_"));

    return (
        <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f]">{label}</label>
            <div className="relative border-2 border-dashed border-[#dfe2ed] rounded-2xl p-4 flex flex-col items-center justify-center bg-[#f9f9ff] hover:bg-[#f0f3fe] hover:border-[#a0cafb] transition-all cursor-pointer min-h-[140px] overflow-hidden">
                <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                
                {showLoading ? (
                    <Loader2 className="animate-spin text-[#28557F]" size={30} />
                ) : preview ? (
                    <>
                        <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0 z-0" />
                        {dimensions && (
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded z-20">
                                {dimensions}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <ImageIcon size={32} className="text-[#a0cafb] mb-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#28557F] text-center">Upload Image</span>
                        {dimensions && (
                            <span className="text-[9px] text-gray-400 mt-1 font-semibold text-center leading-tight max-w-[90%]">{dimensions}</span>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}



const emptyProject = {
    title: "", formalTitle: "", category: "", filterType: "Residential", subtitle: "", 
    image: "", desktopHeroImage: "", mobileImage: "", mobileHeroImage: "", 
    gallery: [], mobileGallery: [], location: "", year: "", area: "", scopeOfWork: "", overview: "", 
    designTypes: [], galleryCaptions: [], mobileGalleryCaptions: [],
    technicalDetails: {
        finishes: {
            facade: { desc: "", images: [] },
            wall: { desc: "", images: [] },
            flooring: { desc: "", images: [] }
        },
        materials: [], contributors: [], photoCredits: []
    }
};

export default function AdminProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [projects, setProjects] = useState<any[]>(initialProjects);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState<any>(JSON.parse(JSON.stringify(emptyProject)));
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    
    // Reorder state
    const [isOrderModified, setIsOrderModified] = useState(false);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

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

    const filteredProjects = Array.isArray(projects) ? projects.filter(p => 
        (p.title && p.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    const moveProject = (index: number, direction: 'up' | 'down') => {
        if (searchTerm) return; // Disable reordering while searching
        
        const newProjects = [...projects];
        if (direction === 'up' && index > 0) {
            [newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]];
        } else if (direction === 'down' && index < newProjects.length - 1) {
            [newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]];
        } else {
            return;
        }
        
        // Update local order
        newProjects.forEach((p, i) => { p.order = i; });
        
        setProjects(newProjects);
        setIsOrderModified(true);
    };

    const saveOrder = async () => {
        setIsSavingOrder(true);
        try {
            const updates = projects.map((p, i) => ({ _id: p._id, order: i }));
            const res = await fetch('/api/projects/reorder', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            
            if (res.ok) {
                setIsOrderModified(false);
                alert("Order saved successfully!");
            } else {
                throw new Error("Failed to save order");
            }
        } catch (error: any) {
            console.error(error);
            alert("Error saving order: " + error.message);
        } finally {
            setIsSavingOrder(false);
        }
    };

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

    const handleBulkFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const fileArray = Array.from(files);
        if (fileArray.length === 0) return;

        // Generate unique temporary IDs for the uploading slots
        const tempIds = fileArray.map(() => `uploading_${Math.random().toString(36).substring(7)}`);

        // Update the form state to add the uploading slots
        setFormData((prev: any) => {
            const currentGallery = [...(prev.gallery || [])];
            const currentCaptions = [...(prev.galleryCaptions || [])];
            currentGallery.push(...tempIds);
            currentCaptions.push(...new Array(tempIds.length).fill(""));
            return {
                ...prev,
                gallery: currentGallery,
                galleryCaptions: currentCaptions
            };
        });

        // Start uploading in parallel
        fileArray.forEach((file, idx) => {
            const tempId = tempIds[idx];
            uploadImage(file)
                .then(uploadedUrl => {
                    setFormData((prev: any) => {
                        const currentGallery = [...(prev.gallery || [])];
                        const targetIndex = currentGallery.indexOf(tempId);
                        if (targetIndex !== -1) {
                            currentGallery[targetIndex] = uploadedUrl;
                        }
                        return { ...prev, gallery: currentGallery };
                    });
                })
                .catch(error => {
                    console.error("Upload failed for file:", file.name, error);
                    alert(`Failed to upload ${file.name}: ${error.message}`);
                    // Remove the failed slot
                    setFormData((prev: any) => {
                        const currentGallery = [...(prev.gallery || [])];
                        const currentCaptions = [...(prev.galleryCaptions || [])];
                        const targetIndex = currentGallery.indexOf(tempId);
                        if (targetIndex !== -1) {
                            currentGallery.splice(targetIndex, 1);
                            currentCaptions.splice(targetIndex, 1);
                        }
                        return { ...prev, gallery: currentGallery, galleryCaptions: currentCaptions };
                    });
                });
        });
    };

    const handleMobileBulkFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const fileArray = Array.from(files);
        if (fileArray.length === 0) return;

        const tempIds = fileArray.map(() => `uploading_${Math.random().toString(36).substring(7)}`);

        setFormData((prev: any) => {
            const currentGallery = [...(prev.mobileGallery || [])];
            const currentCaptions = [...(prev.mobileGalleryCaptions || [])];
            currentGallery.push(...tempIds);
            currentCaptions.push(...new Array(tempIds.length).fill(""));
            return {
                ...prev,
                mobileGallery: currentGallery,
                mobileGalleryCaptions: currentCaptions
            };
        });

        fileArray.forEach((file, idx) => {
            const tempId = tempIds[idx];
            uploadImage(file)
                .then(uploadedUrl => {
                    setFormData((prev: any) => {
                        const currentGallery = [...(prev.mobileGallery || [])];
                        const targetIndex = currentGallery.indexOf(tempId);
                        if (targetIndex !== -1) {
                            currentGallery[targetIndex] = uploadedUrl;
                        }
                        return { ...prev, mobileGallery: currentGallery };
                    });
                })
                .catch(error => {
                    console.error("Upload failed for mobile file:", file.name, error);
                    alert(`Failed to upload ${file.name}: ${error.message}`);
                    setFormData((prev: any) => {
                        const currentGallery = [...(prev.mobileGallery || [])];
                        const currentCaptions = [...(prev.mobileGalleryCaptions || [])];
                        const targetIndex = currentGallery.indexOf(tempId);
                        if (targetIndex !== -1) {
                            currentGallery.splice(targetIndex, 1);
                            currentCaptions.splice(targetIndex, 1);
                        }
                        return { ...prev, mobileGallery: currentGallery, mobileGalleryCaptions: currentCaptions };
                    });
                });
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.image) {
            alert("Please upload a Desktop Thumbnail Image in the Media section before saving.");
            return;
        }

        setSaving(true);
        
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
            if (!res.ok) throw new Error(result.error || "Failed to save project");
            fetchProjects();
            toggleModal();
        } catch (error: any) {
            console.error(error);
            alert(`Error: ${error.message}`);
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
                <div className="flex gap-4">
                    {isOrderModified && (
                        <button 
                            onClick={saveOrder}
                            disabled={isSavingOrder}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center"
                        >
                            {isSavingOrder ? <Loader2 size={18} className="mr-2 animate-spin" /> : <Save size={18} className="mr-2" />}
                            Save Order
                        </button>
                    )}
                    <button 
                        onClick={toggleModal}
                        className="bg-[#28557F] hover:bg-[#1a3855] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center"
                    >
                        <Plus size={18} className="mr-2" />
                        New Project
                    </button>
                </div>
            </div>

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
                                {!searchTerm && (
                                    <div className="absolute bottom-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveProject(i, 'up')} disabled={i === 0} className="h-7 w-7 rounded bg-white/90 shadow text-[#28557F] flex items-center justify-center hover:bg-[#28557F] hover:text-white disabled:opacity-30 disabled:hover:bg-white/90 disabled:hover:text-[#28557F]">
                                            ↑
                                        </button>
                                        <button onClick={() => moveProject(i, 'down')} disabled={i === filteredProjects.length - 1} className="h-7 w-7 rounded bg-white/90 shadow text-[#28557F] flex items-center justify-center hover:bg-[#28557F] hover:text-white disabled:opacity-30 disabled:hover:bg-white/90 disabled:hover:text-[#28557F]">
                                            ↓
                                        </button>
                                    </div>
                                )}
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
                                    <div>
                                    <div>
                                         <h3 className="text-lg font-bold text-[#28557F] mb-6 flex items-center border-b pb-2"><span className="bg-[#28557F] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">2</span> Media & Gallery</h3>
                                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                             
                                             {/* LEFT COLUMN: DESKTOP MEDIA */}
                                             <div className="space-y-6 border-r border-[#dfe2ed] pr-0 lg:pr-10">
                                                 <h4 className="text-xs font-bold text-[#28557F] uppercase tracking-widest border-b border-[#dfe2ed]/50 pb-2">💻 Desktop Media</h4>
                                                 
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                     <ImageUpload 
                                                         label="Desktop Thumbnail Image" 
                                                         defaultImage={formData.image} 
                                                         dimensions="List Card: 613 x 368 px"
                                                         onUpload={(url) => setFormData((prev: any) => ({...prev, image: url}))} 
                                                     />
                                                     <ImageUpload 
                                                         label="Desktop Hero Slider / Main Image" 
                                                         defaultImage={formData.desktopHeroImage} 
                                                         dimensions="Cover Hero: 1440 x 900 px"
                                                         onUpload={(url) => setFormData((prev: any) => ({...prev, desktopHeroImage: url}))} 
                                                     />
                                                 </div>

                                                 <div className="space-y-3">
                                                     <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex justify-between items-center">
                                                         Desktop Gallery Slider Images
                                                         <div className="relative">
                                                             <button 
                                                                 type="button" 
                                                                 onClick={() => document.getElementById('gallery-bulk-file-input')?.click()} 
                                                                 className="text-[#28557F] hover:text-[#1d3d5d] flex items-center font-bold text-xs bg-[#f0f3fe] py-1 px-3 rounded-lg border border-[#a0cafb]/50"
                                                             >
                                                                 <Plus size={12} className="mr-1"/> Add Image
                                                             </button>
                                                             <input
                                                                 id="gallery-bulk-file-input"
                                                                 type="file"
                                                                 multiple
                                                                 accept="image/*"
                                                                 onChange={handleBulkFiles}
                                                                 className="hidden"
                                                             />
                                                         </div>
                                                     </label>

                                                     <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1 border rounded-2xl bg-neutral-50/50">
                                                         {(formData.gallery || []).length === 0 ? (
                                                             <div className="col-span-2 text-center py-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">No desktop gallery images yet</div>
                                                         ) : (
                                                             (formData.gallery || []).map((url: string, index: number) => (
                                                                 <div key={index} className="relative group space-y-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                                                                     <ImageUpload 
                                                                         label={`Desktop Image ${index + 1}`} 
                                                                         defaultImage={url} 
                                                                         dimensions="Full: 1216 x 500 px / Half: 596 x 400 px"
                                                                         onUpload={(newUrl) => { 
                                                                             setFormData((prev: any) => { 
                                                                                 const g = [...prev.gallery]; 
                                                                                 g[index] = newUrl; 
                                                                                 return {...prev, gallery: g}; 
                                                                             }); 
                                                                         }} 
                                                                     />
                                                                     <input 
                                                                         value={formData.galleryCaptions?.[index] || ""} 
                                                                         onChange={(e) => { 
                                                                             setFormData((prev: any) => {
                                                                                 const c = [...(prev.galleryCaptions || [])]; 
                                                                                 while(c.length <= index) c.push(""); 
                                                                                 c[index] = e.target.value; 
                                                                                 return { ...prev, galleryCaptions: c };
                                                                             });
                                                                         }} 
                                                                         placeholder="Enter Caption" 
                                                                         className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-9 px-3 text-[10px] focus:border-[#28557F] outline-none" 
                                                                     />
                                                                     <button 
                                                                         type="button" 
                                                                         onClick={() => { 
                                                                             setFormData((prev: any) => {
                                                                                 const g = [...prev.gallery]; 
                                                                                 g.splice(index, 1); 
                                                                                 const c = [...(prev.galleryCaptions || [])]; 
                                                                                 c.splice(index, 1); 
                                                                                 return { ...prev, gallery: g, galleryCaptions: c };
                                                                             });
                                                                         }} 
                                                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg z-20"
                                                                     >
                                                                         <X size={12} />
                                                                     </button>
                                                                 </div>
                                                             ))
                                                         )}
                                                     </div>
                                                 </div>
                                             </div>

                                             {/* RIGHT COLUMN: MOBILE MEDIA */}
                                             <div className="space-y-6">
                                                 <h4 className="text-xs font-bold text-[#28557F] uppercase tracking-widest border-b border-[#dfe2ed]/50 pb-2">📱 Mobile Media</h4>
                                                 
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                     <ImageUpload 
                                                         label="Mobile Thumbnail Image" 
                                                         defaultImage={formData.mobileImage} 
                                                         dimensions="List Card: 358 x 215 px"
                                                         onUpload={(url) => setFormData((prev: any) => ({...prev, mobileImage: url}))} 
                                                     />
                                                     <ImageUpload 
                                                         label="Mobile Hero Slider / Main Image" 
                                                         defaultImage={formData.mobileHeroImage} 
                                                         dimensions="Cover Hero: 390 x 844 px"
                                                         onUpload={(url) => setFormData((prev: any) => ({...prev, mobileHeroImage: url}))} 
                                                     />
                                                 </div>

                                                 <div className="space-y-3">
                                                     <label className="text-[11px] font-bold uppercase tracking-widest text-[#72777f] flex justify-between items-center">
                                                         Mobile Gallery Slider Images
                                                         <div className="relative">
                                                             <button 
                                                                 type="button" 
                                                                 onClick={() => document.getElementById('mobile-gallery-bulk-file-input')?.click()} 
                                                                 className="text-[#28557F] hover:text-[#1d3d5d] flex items-center font-bold text-xs bg-[#f0f3fe] py-1 px-3 rounded-lg border border-[#a0cafb]/50"
                                                             >
                                                                 <Plus size={12} className="mr-1"/> Add Image
                                                             </button>
                                                             <input
                                                                 id="mobile-gallery-bulk-file-input"
                                                                 type="file"
                                                                 multiple
                                                                 accept="image/*"
                                                                 onChange={handleMobileBulkFiles}
                                                                 className="hidden"
                                                             />
                                                         </div>
                                                     </label>

                                                     <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1 border rounded-2xl bg-neutral-50/50">
                                                         {(formData.mobileGallery || []).length === 0 ? (
                                                             <div className="col-span-2 text-center py-8 text-[11px] font-bold uppercase tracking-wider text-gray-400">No mobile gallery images yet</div>
                                                         ) : (
                                                             (formData.mobileGallery || []).map((url: string, index: number) => (
                                                                 <div key={index} className="relative group space-y-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm">
                                                                     <ImageUpload 
                                                                         label={`Mobile Image ${index + 1}`} 
                                                                         defaultImage={url} 
                                                                         dimensions="Full: 358 x 400 px / Wide: 390 x 300 px"
                                                                         onUpload={(newUrl) => { 
                                                                             setFormData((prev: any) => { 
                                                                                 const g = [...prev.mobileGallery]; 
                                                                                 g[index] = newUrl; 
                                                                                 return {...prev, mobileGallery: g}; 
                                                                             }); 
                                                                         }} 
                                                                     />
                                                                     <input 
                                                                         value={formData.mobileGalleryCaptions?.[index] || ""} 
                                                                         onChange={(e) => { 
                                                                             setFormData((prev: any) => {
                                                                                 const c = [...(prev.mobileGalleryCaptions || [])]; 
                                                                                 while(c.length <= index) c.push(""); 
                                                                                 c[index] = e.target.value; 
                                                                                 return { ...prev, mobileGalleryCaptions: c };
                                                                             });
                                                                         }} 
                                                                         placeholder="Enter Caption" 
                                                                         className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-lg h-9 px-3 text-[10px] focus:border-[#28557F] outline-none" 
                                                                     />
                                                                     <button 
                                                                         type="button" 
                                                                         onClick={() => { 
                                                                             setFormData((prev: any) => {
                                                                                 const g = [...prev.mobileGallery]; 
                                                                                 g.splice(index, 1); 
                                                                                 const c = [...(prev.mobileGalleryCaptions || [])]; 
                                                                                 c.splice(index, 1); 
                                                                                 return { ...prev, mobileGallery: g, mobileGalleryCaptions: c };
                                                                             });
                                                                         }} 
                                                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg z-20"
                                                                     >
                                                                         <X size={12} />
                                                                     </button>
                                                                 </div>
                                                             ))
                                                         )}
                                                     </div>
                                                 </div>
                                             </div>

                                         </div>
                                     </div>
                                    </div>

                                    {/* Section 3: Technical Details */}
                                    <div className="space-y-12">
                                        <div className="border-b border-[#dfe2ed] pb-4">
                                            <h3 className="text-xl font-bold text-[#181c23] flex items-center gap-3">
                                                <span className="w-8 h-8 rounded-xl bg-[#28557F] text-white flex items-center justify-center text-sm">3</span>
                                                Technical Specifics
                                            </h3>
                                        </div>
                                        
                                        {/* Materials Section */}
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                                            <div className="lg:col-span-4">
                                                <h4 className="text-[11px] font-bold text-[#181c23] uppercase tracking-[0.15em] mb-2">Materials Used</h4>
                                                <p className="text-xs text-[#72777f] font-medium leading-relaxed">List significant materials, finishes, and hardware.</p>
                                            </div>
                                            <div className="lg:col-span-8 space-y-4">
                                                {(formData.technicalDetails?.materials || []).map((m: any, index: number) => (
                                                    <div key={`m-${index}`} className="flex flex-col md:flex-row gap-3">
                                                        <input value={m.label} onChange={(e) => { const v = [...formData.technicalDetails.materials]; v[index].label = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} placeholder="E.g. Flooring" className="w-full md:flex-1 bg-white border border-[#dfe2ed] rounded-xl h-11 px-4 text-sm focus:border-[#28557F] outline-none font-medium shadow-sm" />
                                                        <div className="flex gap-3 flex-1">
                                                            <input value={m.value} onChange={(e) => { const v = [...formData.technicalDetails.materials]; v[index].value = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} placeholder="E.g. Italian Marble" className="flex-1 bg-white border border-[#dfe2ed] rounded-xl h-11 px-4 text-sm focus:border-[#28557F] outline-none font-medium shadow-sm" />
                                                            <button type="button" onClick={() => { const v = [...formData.technicalDetails.materials]; v.splice(index, 1); setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: v}}) }} className="h-11 w-11 flex items-center justify-center text-[#ba1a1a] hover:bg-red-50 rounded-xl transition-colors"><X size={18} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => setFormData({...formData, technicalDetails: {...formData.technicalDetails, materials: [...(formData.technicalDetails?.materials || []), {label: "", value: ""}]}})} className="w-full h-11 flex items-center justify-center gap-2 border-2 border-dashed border-[#dfe2ed] rounded-xl text-[#28557F] font-bold text-[10px] uppercase tracking-widest hover:bg-[#f0f3fe] transition-all bg-white">
                                                    <Plus size={14} /> Add Material Detail
                                                </button>
                                            </div>
                                        </div>

                                        {/* Contributors Section */}
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                                            <div className="lg:col-span-4">
                                                <h4 className="text-[11px] font-bold text-[#181c23] uppercase tracking-[0.15em] mb-2">Project Team</h4>
                                                <p className="text-xs text-[#72777f] font-medium leading-relaxed">Acknowledge engineers and consultants.</p>
                                            </div>
                                            <div className="lg:col-span-8 space-y-4">
                                                {(formData.technicalDetails?.contributors || []).map((m: any, index: number) => (
                                                    <div key={`c-${index}`} className="flex flex-col md:flex-row gap-3">
                                                        <input value={m.label} onChange={(e) => { const v = [...formData.technicalDetails.contributors]; v[index].label = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} placeholder="E.g. Structural Engineer" className="w-full md:flex-1 bg-white border border-[#dfe2ed] rounded-xl h-11 px-4 text-sm focus:border-[#28557F] outline-none font-medium shadow-sm" />
                                                        <div className="flex gap-3 flex-1">
                                                            <input value={m.value} onChange={(e) => { const v = [...formData.technicalDetails.contributors]; v[index].value = e.target.value; setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} placeholder="E.g. Firm Name" className="flex-1 bg-white border border-[#dfe2ed] rounded-xl h-11 px-4 text-sm focus:border-[#28557F] outline-none font-medium shadow-sm" />
                                                            <button type="button" onClick={() => { const v = [...formData.technicalDetails.contributors]; v.splice(index, 1); setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: v}}) }} className="h-11 w-11 flex items-center justify-center text-[#ba1a1a] hover:bg-red-50 rounded-xl transition-colors"><X size={18} /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => setFormData({...formData, technicalDetails: {...formData.technicalDetails, contributors: [...(formData.technicalDetails?.contributors || []), {label: "", value: ""}]}})} className="w-full h-11 flex items-center justify-center gap-2 border-2 border-dashed border-[#dfe2ed] rounded-xl text-[#28557F] font-bold text-[10px] uppercase tracking-widest hover:bg-[#f0f3fe] transition-all bg-white">
                                                    <Plus size={14} /> Add Contributor
                                                </button>
                                            </div>
                                        </div>

                                        {/* Material Finishes Palette */}
                                        <div className="pt-12 border-t-2 border-[#dfe2ed] space-y-8">
                                            <div className="text-center">
                                                <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-[#181c23]">Material Finishes Palette</h4>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="space-y-4">
                                                    <ImageUpload 
                                                        label="Facade Finish" 
                                                        defaultImage={formData.technicalDetails?.finishes?.facade?.images?.[0]} 
                                                        dimensions="340 x 255 px (Aspect 4:3)"
                                                        onUpload={(url) => setFormData((prev: any) => ({...prev, technicalDetails: {...prev.technicalDetails, finishes: {...prev.technicalDetails.finishes, facade: {...prev.technicalDetails.finishes.facade, images: [url]}}}}))} 
                                                    />
                                                    <input value={formData.technicalDetails?.finishes?.facade?.desc} onChange={e => setFormData({...formData, technicalDetails: {...formData.technicalDetails, finishes: {...formData.technicalDetails.finishes, facade: {...formData.technicalDetails.finishes.facade, desc: e.target.value}}}})} placeholder="Facade Description..." className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-11 px-4 text-xs font-medium" />
                                                </div>
                                                <div className="space-y-4">
                                                    <ImageUpload 
                                                        label="Wall Finish" 
                                                        defaultImage={formData.technicalDetails?.finishes?.wall?.images?.[0]} 
                                                        dimensions="340 x 255 px (Aspect 4:3)"
                                                        onUpload={(url) => setFormData((prev: any) => ({...prev, technicalDetails: {...prev.technicalDetails, finishes: {...prev.technicalDetails.finishes, wall: {...prev.technicalDetails.finishes.wall, images: [url]}}}}))} 
                                                    />
                                                    <input value={formData.technicalDetails?.finishes?.wall?.desc} onChange={e => setFormData({...formData, technicalDetails: {...formData.technicalDetails, finishes: {...formData.technicalDetails.finishes, wall: {...formData.technicalDetails.finishes.wall, desc: e.target.value}}}})} placeholder="Wall Description..." className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-11 px-4 text-xs font-medium" />
                                                </div>
                                                <div className="space-y-4">
                                                    <ImageUpload 
                                                        label="Floor Finish" 
                                                        defaultImage={formData.technicalDetails?.finishes?.flooring?.images?.[0]} 
                                                        dimensions="340 x 255 px (Aspect 4:3)"
                                                        onUpload={(url) => setFormData((prev: any) => ({...prev, technicalDetails: {...prev.technicalDetails, finishes: {...prev.technicalDetails.finishes, flooring: {...prev.technicalDetails.finishes.flooring, images: [url]}}}}))} 
                                                    />
                                                    <input value={formData.technicalDetails?.finishes?.flooring?.desc} onChange={e => setFormData({...formData, technicalDetails: {...formData.technicalDetails, finishes: {...formData.technicalDetails.finishes, flooring: {...formData.technicalDetails.finishes.flooring, desc: e.target.value}}}})} placeholder="Floor Description..." className="w-full bg-[#f9f9ff] border border-[#dfe2ed] rounded-xl h-11 px-4 text-xs font-medium" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="p-6 border-t border-[#dfe2ed] bg-[#f9f9ff] flex items-center justify-end gap-3 z-50">
                                <button type="button" onClick={toggleModal} className="px-6 h-11 rounded-xl font-bold tracking-tight text-sm text-[#42474e] hover:bg-[#e5e8f3] transition-colors">Cancel</button>
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
