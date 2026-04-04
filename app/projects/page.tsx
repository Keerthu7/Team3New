"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/projects-data";
import Link from "next/link";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Categories
  const filters = [
    "All",
    "Apartment",
    "Residential",
    "Healthcare",
    "Commercial",
    "Interior",
  ];


  // Filtering Logic
  const filteredProjects = (() => {
    if (activeFilter === "All") return projects;

    // Define Related Categories mapping
    const relatedMap: Record<string, string[]> = {
      "Healthcare": ["Commercial"],
      "Residential": ["Interior", "Apartment"],
      "Apartment": ["Residential"],
      "Commercial": ["Healthcare"],
      "Interior": ["Residential"],
    };

    const primary = projects.filter((p) => p.filterType === activeFilter);
    const relatedTypes = relatedMap[activeFilter] || [];
    const related = projects.filter((p) => 
      relatedTypes.includes(p.filterType) && p.filterType !== activeFilter
    );
    const others = projects.filter((p) => 
      !primary.includes(p) && !related.includes(p)
    );

    // Prioritize Primary, then Related, then Others to keep the grid full
    return [...primary, ...related, ...others];
  })();

  return (
    <div className="bg-[#f9f9ff] min-h-screen">
      <Header />
      
      <section className="max-w-7xl mx-auto px-4 pt-32 pb-20 font-sens">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#181c23] mb-6">
          Our Projects
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#28557F] text-white" 
                  : "bg-[#e5e7eb] text-gray-600 hover:bg-gray-300" 
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="relative group rounded-xl overflow-hidden h-[200px] md:h-[260px] lg:h-[300px] shadow-sm cursor-pointer block"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

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
          ))}
        </div>

        {/* Refined Architectural CTA */}
        <div className="mt-20 mb-16 text-center max-w-4xl mx-auto px-4">
          <div className="w-[1px] h-12 bg-[#28557F]/20 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#28557F] mb-8 tracking-tight">
            Ready to build your vision?
          </h2>
          <p className="text-lg text-[#181c23]/60 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
            Let's collaborate to create something extraordinary together. From residential masterpieces to state-of-the-art clinical spaces, we bring your vision to life.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-10 py-4 border-2 border-[#28557F] text-[#28557F] text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#28557F] hover:text-white transition-all duration-500"
          >
            Work With Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
