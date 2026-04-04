"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function SivaTradeCentrePage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "siva-trade-centre");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "Siva Traders, a well-known enterprise in Tirupur, required a dynamic commercial hub that would reflect their brand's growth and vision. The resulting Siva Trade Centre is a multi-functional space of 25,394 square feet, where form follows function, featuring retail bays, executive offices, and logistics facilities within a cohesive and modern architectural envelope.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "Our commercial complex proposal was driven by the need for maximum flexibility. By utilizing a modular design and large, column-free interior spaces, we have created a building that can easily adapt to changing business requirements, while the bold, contemporary facade ensures high visibility and brand impact.",
    spread2SmallImage: project.gallery[2],
    patientJourneyTitle: "Dynamic Commerce",
    patientJourneyDesc1: "The flow of the building is designed to maximize business activity. A spacious, high-ceilinged retail concourse welcomes customers, while the executive offices are tucked away on the upper levels for a more focused and professional atmosphere, as well as providing quiet retreats for the business leadership.",
    patientJourneyDesc2: "The logistics and service lanes are integrated into the building's design, ensuring that operations can occur without disrupting the public-facing areas. This spatial logic is further refined by a vertical hierarchy that prioritizes public access at the ground levels while providing high-quality office environments above.",
    healingInteriorImage: project.gallery[3],
    logisticsTitle: "Precision & Function",
    logisticsParagraph1: "The coordination of commercial high-technology with traditional architectural systems was an essential part of the project. Every office and retail bay is designed with integrated environmental controls and advanced networking capabilities, ensuring that the facility remains a beacon of efficiency and innovation.",
    logisticsParagraph2: "The structural design utilize post-tensioned concrete slabs to achieve the large spans required for open-plan retail areas. This engineering feat allows the architecture to feel light and floating, despite its substantial material presence, while the façade is designed to manage thermal gain in the Tirupur climate.",
    logisticsLeftImage: project.gallery[1],
    logisticsRightImage: project.gallery[4],
    materialityTitle: "Commercial Materiality",
    materialityDescription: "The dialogue between the ruggedness of local stone and the smoothness of glass defines the center's material identity. We chose materials that age gracefully, ensuring that the facility maintains its professional and timeless look, while the custom fixtures and artisanal woodworking add a layer of tactile warmth.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[2],
    nocturnalTitle: "Technical Brilliance",
    nocturnalDescription: "Beneath the bold architectural surface lies a complex infrastructure designed to support a high-end commercial environment. Integrated smart building systems control everything from lighting and climate to security, ensuring that the facility remains a beacon of efficiency and reliability.",
    nocturnalNightImage: project.gallery[4],
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
