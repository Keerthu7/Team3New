"use client";

import React from "react";
import Image from "next/image";
import { MapPin, User, Maximize, Calendar, FileText, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectHeroSlider } from "./project-hero-slider";

import { Project } from "@/lib/projects-data";

interface ProjectNormalLayoutProps {
  project: Project;
}

export default function ProjectNormalLayout({ project }: ProjectNormalLayoutProps) {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
      {/* 1. HERO SLIDER SECTION (5 Images) */}
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-neutral-900">
        <ProjectHeroSlider images={project.gallery.slice(0, 5)} />
        
        {/* Floating Back Button */}
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-2 py-2.5 px-5 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:bg-white transition-all z-50 group border border-neutral-200"
        >
          <ChevronLeft size={18} className="text-[#28557F] transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#28557F] uppercase">Back</span>
        </button>

        {/* Hero Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
      </section>

      {/* 2. PROJECT HEADER & OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-4 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Title & Intro (Wider) */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] text-[#28557F] uppercase mb-4 opacity-70">
                {project.category || "Project Case Study"}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                {project.formalTitle}
              </h1>
              {project.subtitle && (
                <p className="text-lg text-neutral-500 mt-3 font-medium tracking-tight">
                  {project.subtitle}
                </p>
              )}
            </div>
            
            <p className="text-base text-neutral-600 leading-relaxed font-normal text-justify">
              {project.overview}
            </p>
          </div>

          {/* Right Column: Specifications Card (Narrower) */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-100 shadow-sm sticky top-32">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#28557F] mb-8 pb-1">
                Specifications
              </h3>
              
              <div className="space-y-6">
                <SpecItem icon={MapPin} label="Location" value={project.location} />
                <SpecItem icon={User} label="Architect" value="Team 3 Associates" />
                <SpecItem icon={Maximize} label="Area" value={project.area} />
                <SpecItem icon={Calendar} label="Completion" value={project.year} />
                <SpecItem icon={FileText} label="Scope" value={project.scopeOfWork} isSmall />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL GALLERY (Custom Mosaic Grid) */}
      <section className="bg-white pt-6 md:pt-8 pb-0 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <p className="text-[10px] font-bold text-[#28557F] tracking-[0.5em] uppercase mb-4 opacity-40 font-sans">Visual Documentation</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 uppercase">Project Gallery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {project.gallery.map((img, index) => {
              // Custom Mosaic Pattern: Full (12), Half-Half (6,6), Wide-Narrow (8,4), Full (12)
              const pattern = [12, 6, 6, 8, 4, 12];
              const span = pattern[index % pattern.length];
              
              const spanClasses: { [key: number]: string } = {
                12: "md:col-span-12",
                6: "md:col-span-6",
                8: "md:col-span-8",
                4: "md:col-span-4"
              };

              return (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-sm bg-white shadow-lg border border-neutral-100 group transition-all duration-500 hover:shadow-2xl ${spanClasses[span]} h-[300px] md:h-[400px] ${span === 12 ? 'h-[400px] md:h-[500px]' : ''}`}
                >
                  <Image 
                    src={img} 
                    alt={`${project.formalTitle} detail ${index + 1}`} 
                    fill 
                    className="object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700"></div>
                  
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-sm shadow-sm z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 max-w-[80%]">
                      <span className="text-[9px] font-bold text-[#28557F] tracking-[0.2em] uppercase">
                        {project.galleryCaptions?.[index] || `VIEW DETAIL / ${String(index + 1).padStart(2, '0')}`}
                      </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL SPECIFICATIONS & CREDITS (Minimalist Technical Sheet) */}
      {project.technicalDetails && (
        <section className="bg-white pt-16 pb-24 md:pb-32 px-6 md:px-12 font-poppins">
          <div className="max-w-6xl mx-auto">
            
            {/* Minimal Header */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#181c23]">Technical data</h2>
            </div>

            <div className="space-y-20">
               {/* 01 / DOCUMENTATION & CONTRIBUTORS */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-4">
                     <span className="text-sm font-bold text-[#28557F] opacity-40 tracking-[0.4em]">01 / Project team</span>
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                     <div className="space-y-4">
                        {project.technicalDetails.photoCredits.map((p: any, idx: number) => (
                          <div key={idx} className="flex gap-4 items-baseline">
                            <span className="w-32 text-xs font-bold text-[#72777f] tracking-widest flex-shrink-0">Photo / {p.label}</span>
                            <span className="text-sm font-bold text-[#181c23] tracking-tight">{p.value}</span>
                          </div>
                        ))}
                     </div>
                     <div className="space-y-4">
                        {project.technicalDetails.contributors.map((c: any, idx: number) => (
                          <div key={idx} className="flex gap-4 items-baseline">
                            <span className="w-32 text-xs font-bold text-[#72777f] tracking-widest flex-shrink-0">{c.label}</span>
                            <span className="text-sm font-bold text-[#181c23] tracking-tight">{c.value}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* 02 / MATERIAL APPLICATIONS */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-4">
                     <span className="text-sm font-bold text-[#28557F] opacity-40 tracking-[0.4em]">02 / Materials</span>
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                     {project.technicalDetails.materials.map((m: any, idx: number) => (
                       <div key={idx} className="flex flex-col gap-2 focus-within:translate-x-1 transition-transform">
                         <span className="text-xs font-bold text-[#72777f] tracking-widest">{m.label}</span>
                         <span className="text-base font-bold text-[#181c23] tracking-tight leading-tight">{m.value}</span>
                       </div>
                     ))}
                  </div>
               </div>

               {/* 03 / VISUAL PALETTE */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                  <div className="lg:col-span-4">
                     <span className="text-sm font-bold text-[#28557F] opacity-40 tracking-[0.4em]">03 / Palette archive</span>
                  </div>
                  <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PaletteItem 
                           image={project.technicalDetails.finishes.facade.images[0]} 
                           label="Facade Finish" 
                           desc={project.technicalDetails.finishes.facade.desc} 
                        />
                        <PaletteItem 
                           image={project.technicalDetails.finishes.wall.images[0]} 
                           label="Wall Finish" 
                           desc={project.technicalDetails.finishes.wall.desc} 
                        />
                        <PaletteItem 
                           image={project.technicalDetails.finishes.flooring.images[0]} 
                           label="Floor Finish" 
                           desc={project.technicalDetails.finishes.flooring.desc} 
                        />
                      </div>
                  </div>
               </div>
            </div>

          </div>
        </section>
      )}

      <footer className="py-24 px-6 text-center bg-white border-t border-neutral-100">
        <div className="inline-flex flex-col items-center gap-6">
          <p className="text-[10px] font-bold tracking-[0.6em] text-[#28557F] uppercase opacity-40">Innovative • Design • Excellence</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-neutral-200"></div>
            <h3 className="text-2xl font-bold text-neutral-900 uppercase tracking-tighter">Team 3 Associates</h3>
            <div className="w-12 h-[1px] bg-neutral-200"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SpecItem({ icon: Icon, label, value, isSmall = false }: any) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-8 h-8 rounded-full bg-[#28557F]/5 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-[#28557F]" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">{label}</p>
        <p className="text-sm font-semibold text-neutral-800 uppercase tracking-wide leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}

function PaletteItem({ image, label, desc }: any) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-neutral-50 rounded-sm overflow-hidden group border border-neutral-100 transition-all duration-700">
        <Image src={image || "/images/placeholder.png"} alt={label} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="space-y-1.5">
        <p className="text-sm font-bold text-[#28557F] tracking-widest opacity-60">{label}</p>
        <p className="text-xs text-[#72777f] tracking-tight leading-tight">{desc}</p>
      </div>
    </div>
  );
}
