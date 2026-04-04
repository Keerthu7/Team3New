"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#28557F]">Project Not Found</h1>
      </div>
    );
  }

  // Mapper helper to translate Project data into the rich MagazineSpread Blog structure
  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: project.overview,
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[1] || project.image,
    spread2Intro: project.overview,
    spread2SmallImage: project.gallery[2] || project.image,
    patientJourneyTitle: "Architectural Vision",
    patientJourneyDesc1: project.overview.substring(0, Math.floor(project.overview.length / 2)),
    patientJourneyDesc2: project.overview.substring(Math.floor(project.overview.length / 2)),
    healingInteriorImage: project.gallery[3] || project.image,
    logisticsTitle: "Spatial Logic & Planning",
    logisticsParagraph1: "Our approach consistently prioritizes the integration of function and form. Every line drawn in our Coimbatore studio is a deliberate response to the specific micro-climate and site context.",
    logisticsParagraph2: "By utilizing advanced structural engineering alongside traditional architectural principles, we ensure that every facility—from a private luxury residence to a high-precision medical campus—remains a beacon of reliability and innovation.",
    logisticsLeftImage: project.gallery[4] || project.image,
    logisticsRightImage: project.gallery[0],
    materialityTitle: "Materiality & Detail",
    materialityDescription: "The dialogue between transparency and solidity defines our current body of work. We utilize high-performance materials to manage energy efficiency while inviting natural light into every internal volume.",
    facadeDetailImage: project.gallery[1] || project.image,
    lobbyImage: project.gallery[2] || project.image,
    nocturnalTitle: "Technical Excellence",
    nocturnalDescription: "For complex architectural commissions, structural integrity and meticulous coordination are paramount. Our team of specialists ensures that even the most ambitious design concepts are grounded in safety and durability.",
    nocturnalNightImage: project.gallery[3] || project.image,
    nocturnalDayImage: project.gallery[4] || project.image,
    diagramQuote: "Precision architecture requires the coordination of high-technology with traditional architectural wisdom. We bridge this gap through innovative structural solutions.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png", // Or a relevant technical drawing if available
    diagramRightDesc: "Our architectural identity is defined by this quest for structural perfection. Through this project, we have demonstrated that clinical excellence and high-end design are complementary forces.",
    conclusionImage: project.gallery[0],
    conclusionTitle: "Final Narrative",
    conclusionP1: "Project '" + project.formalTitle + "' stands as a significant addition to our portfolio, reflecting our commitment to transforming the architectural landscape of South India.",
    conclusionP3: "TEAM 3 ASSOCIATES - ARCHITECTURAL EXCELLENCE"
  };

  return (
    <div className="bg-[#f4f4f4] min-h-screen no-scrollbar relative">
      {/* Main Editorial Flow */}
      <main className="flex flex-col font-sens no-scrollbar relative">
        {/* Stationary Back Button - Contained within Header/Hero Area (Disappears on scroll) */}
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-3 py-2 px-4 bg-white/40 backdrop-blur-lg rounded-full shadow-2xl hover:bg-white transition-all z-[100] group border border-white/20"
        >
          <ChevronLeft size={18} className="text-[#28557F] transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#28557F] uppercase">Back</span>
        </button>

        {/* THE INTEGRATED MAGAZINE MONOGRAPH (Fullscreen Slider + Details below) */}
        <div className="pt-0">
          <MagazineSpread 
            blog={blogData} 
            heroElement={<ProjectHeroSlider images={project.gallery} />} 
          />
        </div>
      </main>
    </div>
  );
}
