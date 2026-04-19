import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ProjectsClient from "@/components/ProjectsClient";
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { projects as fallbackProjects } from '@/lib/projects-data';

// This makes the component a Server Component by default in Next.js 13+
// We fetch data directly here for instant loading
async function getProjects() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    // If DB is genuinely empty (seed hasn't run), return fallback for now
    if (projects.length === 0) {
        return JSON.parse(JSON.stringify(fallbackProjects));
    }
    
    return JSON.parse(JSON.stringify(projects));
  } catch (error: any) {
    console.error("MongoDB fetch failed, using fallback data:", error.message);
    // Graceful fallback if database connection fails
    return JSON.parse(JSON.stringify(fallbackProjects));
  }
}

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <div className="bg-[#f9f9ff] min-h-screen">
      <Header />
      
      <section className="max-w-7xl mx-auto px-4 pt-44 pb-20 font-sens">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#181c23] mb-6">
          Our Projects
        </h2>

        {/* Client-side filtering and Optimized Grid */}
        <ProjectsClient initialProjects={projects} />

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
