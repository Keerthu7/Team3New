"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function DRGCommercialComplexPage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "drg-commercial-complex");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "The D.R.G Complex is an integrated commercial development designed for maximum visibility in Namakkal. Occupying 12,000 square feet, the facility features a mix of high-street retail spaces and premium offices, utilizing a bold facade to attract attention while providing high-quality internal environments that foster productivity and business growth.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "The D.R.G Complex is an integrated commercial development designed for maximum visibility in Namakkal. Occupying 12,000 square feet, the facility features a mix of high-street retail spaces and premium offices, utilizing a bold facade to attract attention while providing high-quality internal environments.",
    spread2SmallImage: project.gallery[1],
    patientJourneyTitle: "Visibility & Productivity",
    patientJourneyDesc1: "The flow of the building is optimized for high foot traffic and professional focus. A spacious, ground-level retail concourse welcomes shoppers, while the corporate offices are tucked away on the upper levels for a more professional and quiet atmosphere.",
    patientJourneyDesc2: "The logistics and service lanes are integrated into the complex's design, ensuring that operations can occur without disrupting the public-facing areas. This spatial logic is further refined by a vertical hierarchy that prioritizes public access at the ground levels.",
    healingInteriorImage: project.gallery[2],
    logisticsTitle: "Strategic Commercial Planning",
    logisticsParagraph1: "The coordination of commercial high-technology with traditional architectural systems was an essential part of the project. Every office and retail bay is designed with integrated environmental controls and advanced networking capabilities.",
    logisticsParagraph2: "The structural design utilize post-tensioned concrete slabs to achieve the large spans required for open-plan retail areas. This engineering feat allows the architecture to feel light and floating, despite its substantial material presence.",
    logisticsLeftImage: project.gallery[3],
    logisticsRightImage: project.gallery[4],
    materialityTitle: "Modern Materiality",
    materialityDescription: "The dialogue between the ruggedness of local stone and the smoothness of glass defines the complex's material identity. We chose materials that age gracefully, ensuring that the facility maintains its professional and timeless look.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[1],
    nocturnalTitle: "Technical Precision",
    nocturnalDescription: "Beneath the bold architectural surface lies a complex infrastructure designed to support a high-end commercial environment. Integrated smart building systems control everything from lighting and climate to security.",
    nocturnalNightImage: project.gallery[3],
    nocturnalDayImage: project.gallery[0],
    diagramQuote: "Commercial architecture requires the coordination of high-technology with traditional architectural wisdom. We bridge this gap through innovative structural solutions.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "Our architectural identity in the commercial sector is defined by this quest for structural and functional perfection. Through this project, we have demonstrated that commercial excellence and high-end design are complementary forces.",
    conclusionImage: project.gallery[4],
    conclusionTitle: "Final Narrative",
    conclusionP1: "Project '" + project.formalTitle + "' stands as a significant addition to our portfolio, reflecting our commitment to transforming the commercial landscape of South India.",
    conclusionP3: "TEAM 3 ASSOCIATES - ARCHITECTURAL EXCELLENCE"
  };

  return (
    <div className="bg-[#f4f4f4] min-h-screen no-scrollbar relative">
      <main className="flex flex-col font-sens no-scrollbar relative">
        <button 
          onClick={() => router.back()}
          className="absolute top-8 left-8 flex items-center gap-3 py-2 px-4 bg-white/40 backdrop-blur-lg rounded-full shadow-2xl hover:bg-white transition-all z-[100] group border border-white/20"
        >
          <ChevronLeft size={18} className="text-[#28557F] transition-transform group-hover:-translate-x-1" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#28557F] uppercase">Back</span>
        </button>

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
