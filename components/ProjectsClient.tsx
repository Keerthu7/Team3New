"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

interface ProjectsClientProps {
  initialProjects: any[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter Categories
  const filters = [
    "All",
    "Residential",
    "Commercial",
    "Hospitality",
    "Healthcare",
    "Interiors",
  ];

  // Helper to determine if a project matches the active filter
  const isMatchingFilter = (project: any, filter: string) => {
    if (filter === "All") return true;
    
    const filterLower = filter.toLowerCase();
    const filterTypeLower = (project.filterType || "").toLowerCase();
    const categoryLower = (project.category || "").toLowerCase();
    
    if (filterTypeLower === filterLower || categoryLower === filterLower) return true;
    
    if (filterLower === "interiors") {
      return filterTypeLower === "interior" || filterTypeLower === "interiors" || categoryLower.includes("interior");
    }
    
    if (filterLower === "healthcare") {
      return filterTypeLower === "healthcare" || filterTypeLower === "health care" || categoryLower.includes("health") || categoryLower.includes("clinic") || categoryLower.includes("hospital");
    }
    
    return false;
  };

  // Helper to check if a project matches search query
  const matchesSearch = (project: any, query: string) => {
    if (!query) return false;
    const q = query.toLowerCase().trim();
    return (
      (project.title || "").toLowerCase().includes(q) ||
      (project.category || "").toLowerCase().includes(q) ||
      (project.location || "").toLowerCase().includes(q)
    );
  };

  // Helper to sort matching items to the top
  const sortProjectsBySearch = (items: any[], query: string) => {
    if (!query) return items;
    return [...items].sort((a, b) => {
      const aMatches = matchesSearch(a, query);
      const bMatches = matchesSearch(b, query);
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  };

  // Split projects into matching (primary) and remaining (other) arrays
  const primaryProjects = activeFilter === "All"
    ? initialProjects
    : initialProjects.filter(p => isMatchingFilter(p, activeFilter));

  const otherProjects = activeFilter === "All"
    ? []
    : initialProjects.filter(p => !isMatchingFilter(p, activeFilter));

  // Sort both arrays so that search matches rise to the top
  const primaryProjectsFiltered = sortProjectsBySearch(primaryProjects, searchQuery);
  const otherProjectsFiltered = sortProjectsBySearch(otherProjects, searchQuery);

  const handleImageError = (id: string) => {
    setErrorImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-[#181c23] mb-4">Search Projects</h3>
            <div className="relative w-full">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search by name, category, location..."
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#28557F] focus:ring-2 focus:ring-[#28557F]/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 font-medium mb-3">Popular Categories</p>
              <div className="flex flex-wrap gap-2">
                {filters.filter(f => f !== "All").map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Buttons & Search Icon */}
      <div className="flex flex-nowrap overflow-x-auto gap-3 mb-10 pb-4 md:pb-0 md:flex-wrap md:overflow-visible scrollbar-hide items-center">
        {/* Search Icon Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-shrink-0 w-10 h-10 md:w-[42px] md:h-[42px] flex items-center justify-center rounded-full bg-white border border-[#dfe2ed] text-gray-600 hover:bg-gray-100 transition-all shadow-sm group"
          aria-label="Open search"
        >
          <Search className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:text-[#28557F] transition-colors" />
        </button>

        <div className="w-[1px] h-6 bg-gray-300 mx-1 flex-shrink-0"></div>

        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-[13px] md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              activeFilter === filter
                ? "bg-[#28557F] text-white shadow-lg shadow-[#28557F]/20 scale-105" 
                : "bg-white border border-[#dfe2ed] text-gray-600 hover:bg-gray-100" 
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 justify-items-center">
        {primaryProjectsFiltered.length === 0 ? (
          <div className="col-span-1 lg:col-span-2 py-12 text-center">
            <p className="text-gray-500 font-medium">No projects found in this category.</p>
          </div>
        ) : (
          primaryProjectsFiltered.map((project, index) => {
            const projectId = project.id || project._id;
            const isError = errorImages[projectId];
            
            return (
              <Link
                key={projectId}
                href={`/projects/${project.slug || project._id || project.id}`}
                className="relative group overflow-hidden shadow-sm cursor-pointer block w-full max-w-[613.43px] h-auto aspect-[613.43/367.91] md:h-[367.91px] rounded-[14.75px]"
              >
                {/* Desktop Background Image */}
                <div className="hidden md:block absolute inset-0">
                  <Image
                    src={isError ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" : project.image}
                    alt={project.title}
                    fill
                    priority={index < 4}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 613px"
                    onError={() => handleImageError(projectId)}
                    quality={95}
                  />
                </div>

                {/* Mobile Background Image */}
                <div className="block md:hidden absolute inset-0">
                  <Image
                    src={isError ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" : (project.mobileImage || project.image)}
                    alt={`${project.title} Mobile`}
                    fill
                    priority={index < 4}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                    onError={() => handleImageError(projectId)}
                    quality={95}
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Text Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 text-white text-left">
                  <span className="text-[9px] font-medium tracking-wide uppercase opacity-90 mb-0.5 block">
                    {project.category}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold leading-tight">{project.title}</h3>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Other Projects Section */}
      {activeFilter !== "All" && otherProjectsFiltered.length > 0 && (
        <div className="w-full mt-20">
          {/* Decorative Divider */}
          <div className="w-full h-[1px] bg-[#dfe2ed]/60 mb-12"></div>
          
          {/* Section Heading */}
          <h3 className="text-xl md:text-2xl font-bold text-[#181c23] mb-10 tracking-tight uppercase">
            Other Projects
          </h3>
          
          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 justify-items-center">
            {otherProjectsFiltered.map((project) => {
              const projectId = project.id || project._id;
              const isError = errorImages[projectId];
              
              return (
                <Link
                  key={projectId}
                  href={`/projects/${project.slug || project._id || project.id}`}
                  className="relative group overflow-hidden shadow-sm cursor-pointer block w-full max-w-[613.43px] h-auto aspect-[613.43/367.91] md:h-[367.91px] rounded-[14.75px]"
                >
                  {/* Desktop Background Image */}
                  <div className="hidden md:block absolute inset-0">
                    <Image
                      src={isError ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" : project.image}
                      alt={project.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 613px"
                      onError={() => handleImageError(projectId)}
                      quality={95}
                    />
                  </div>

                  {/* Mobile Background Image */}
                  <div className="block md:hidden absolute inset-0">
                    <Image
                      src={isError ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" : (project.mobileImage || project.image)}
                      alt={`${project.title} Mobile`}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="100vw"
                      onError={() => handleImageError(projectId)}
                      quality={95}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Text Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-5 text-white text-left">
                    <span className="text-[9px] font-medium tracking-wide uppercase opacity-90 mb-0.5 block">
                      {project.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold leading-tight">{project.title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
