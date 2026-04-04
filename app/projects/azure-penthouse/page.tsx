"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function AzurePenthousePage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "azure-penthouse");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "The Azure Penthouse is an exercise in minimalist luxury and urban tranquility. Located in the heart of Coimbatore, this 2,200 square foot sanctuary features a palette of cool tones and natural materials, creating a serene atmosphere high above the city noise. Every detail, from the custom furniture to the curated art pieces, has been chosen to enhance the sense of space and light.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "The Azure Penthouse is an exercise in minimalist luxury and urban tranquility. Located in the heart of Coimbatore, this 2,200 square foot sanctuary features a palette of cool tones and natural materials, creating a serene atmosphere high above the city noise.",
    spread2SmallImage: project.gallery[1],
    patientJourneyTitle: "Minimalist Sanctuary",
    patientJourneyDesc1: "Moving through the penthouse is handled with an eye for flow and tranquility. From the light-filled entryway that opens into the vast living areas, to the private balconies that offer unfettered views of the city.",
    patientJourneyDesc2: "The layout prioritizes the integration of living and dining zones, creating a cohesive and open-plan environment for both daily life and formal entertaining. This is facilitated by a sophisticated use of material boundaries.",
    healingInteriorImage: project.gallery[2],
    logisticsTitle: "Spatial Refinement",
    logisticsParagraph1: "Our design process was heavily influenced by the direction of natural light. Large-span glass windows and strategically placed reflective surfaces ensure that the penthouse is bathed in a soft, ethereal glow throughout the day.",
    logisticsParagraph2: "The spatial logic is further refined by the zoning of public and private spheres. The master suite is a private retreat within the home, featuring a spa-like bathroom and a walk-in closet.",
    logisticsLeftImage: project.gallery[3],
    logisticsRightImage: project.gallery[4],
    materialityTitle: "Luxe Materiality",
    materialityDescription: "The dialogue between the smoothness of polished marble and the warmth of natural wood defines the penthouse's material identity. We chose materials that evoke a sense of calm and durability.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[1],
    nocturnalTitle: "Technical Precision",
    nocturnalDescription: "Beneath the elegant interior lies a complex infrastructure designed to support a high-end lifestyle. Integrated smart home systems control everything from lighting and climate to security.",
    nocturnalNightImage: project.gallery[3],
    nocturnalDayImage: project.gallery[4],
    diagramQuote: "Interior luxury is the result of invisible technical precision. We strive to make the most complex engineering disappear into the background of a beautiful space.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "This project serves as a archetype for modern urban living, demonstrating that high-end interior design and architectural precision are complementary forces.",
    conclusionImage: project.gallery[4],
    conclusionTitle: "Final Narrative",
    conclusionP1: "Project '" + project.formalTitle + "' stands as a significant addition to our portfolio, reflecting our commitment to transforming the interior landscape of South India.",
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
