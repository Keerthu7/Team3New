"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProjectsClientProps {
  initialProjects: any[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({});

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

  // Split projects into matching (primary) and remaining (other) arrays
  const primaryProjects = activeFilter === "All"
    ? initialProjects
    : initialProjects.filter(p => isMatchingFilter(p, activeFilter));

  const otherProjects = activeFilter === "All"
    ? []
    : initialProjects.filter(p => !isMatchingFilter(p, activeFilter));

  const handleImageError = (id: string) => {
    setErrorImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-nowrap overflow-x-auto gap-3 mb-10 pb-4 md:pb-0 md:flex-wrap md:overflow-visible scrollbar-hide">
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
        {primaryProjects.length === 0 ? (
          <div className="col-span-1 lg:col-span-2 py-12 text-center">
            <p className="text-gray-500 font-medium">No projects found in this category.</p>
          </div>
        ) : (
          primaryProjects.map((project, index) => {
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
      {activeFilter !== "All" && otherProjects.length > 0 && (
        <div className="w-full mt-20">
          {/* Decorative Divider */}
          <div className="w-full h-[1px] bg-[#dfe2ed]/60 mb-12"></div>
          
          {/* Section Heading */}
          <h3 className="text-xl md:text-2xl font-bold text-[#181c23] mb-10 tracking-tight uppercase relative inline-block">
            Other Projects
            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#28557F]"></span>
          </h3>
          
          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 justify-items-center">
            {otherProjects.map((project) => {
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
