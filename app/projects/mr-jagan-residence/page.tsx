"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function JaganResidencePage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "mr-jagan-residence");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "Krishna Aishwaryam is a masterclass in contemporary tropical architecture, specifically designed to navigate the unique climatic conditions of Coimbatore. The residence is centered around a traditional 'Muttam' or courtyard, reimagined through a modern lens to facilitate natural cross-ventilation and a recursive play of light and shadow throughout the day.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "The proposal for this residence focused on creating a sanctuary that feels both expansive and intimate. By utilizing a double-height central volume, we were able to draw hot air upwards and out, while the surrounding living spaces remain cool and shaded. The integration of local stone and reclaimed wood elements adds a layer of tactile warmth to the sharp-edged modern geometry.",
    spread2SmallImage: project.gallery[2],
    patientJourneyTitle: "Architectural Narrative",
    patientJourneyDesc1: "Moving through the house is designed to be a sensory experience. From the compressed entryway that opens into the vastness of the courtyard, to the private balconies that offer framed views of the Western Ghats, every transition is deliberate. The 'journey' here is one of discovery, where each room reveals a different perspective of the central landscape.",
    patientJourneyDesc2: "The interior layout prioritizes the family's communal life while ensuring individual privacy. The ground floor is an open-plan expanse that blurs the line between the lush garden and the formal living areas, facilitated by large-span glass sliding systems that disappear into wall pockets when fully opened.",
    healingInteriorImage: project.gallery[3],
    logisticsTitle: "Climate & Spatial Planning",
    logisticsParagraph1: "Our planning process was heavily influenced by the seasonal sun path and prevailing wind directions. The thick masonry walls on the south-west exposure act as thermal mass, preventing the harsh afternoon heat from penetrating the living quarters. Conversely, the north-easterly vents allow the gentle morning breeze to flush the interiors daily.",
    logisticsParagraph2: "The spatial logic is further refined by the zoning of public and private spheres. Service areas are tucked away to the rear, while the master suites occupy the upper levels, enjoying elevated views and enhanced privacy. This vertical hierarchy ensures that the home functions efficiently as a family unit while providing quiet retreats for every member.",
    logisticsLeftImage: project.gallery[1],
    logisticsRightImage: project.gallery[3],
    materialityTitle: "Materiality & Texture",
    materialityDescription: "The dialogue between the ruggedness of Kadappa stone and the smoothness of polished concrete defines the home's material identity. We chose materials that age gracefully, developing an organic patina that mirrors the growth of the surrounding landscape. This grounded palette is punctuated by bespoke brass fixtures and artisanal woodworking.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[1],
    nocturnalTitle: "Technical Precision",
    nocturnalDescription: "Beneath the aesthetic surface lies a complex structural framework. To achieve the large, column-free spans required for the open-plan layout, we employed post-tensioned concrete slabs. This engineering feat allows the architecture to feel light and floating, despite its substantial presence and material density.",
    nocturnalNightImage: project.gallery[4],
    nocturnalDayImage: project.gallery[0],
    diagramQuote: "Precision architecture requires the coordination of high-technology with traditional architectural wisdom. We bridge this gap through innovative structural solutions.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "Our architectural identity is defined by this quest for structural perfection. Through this project, we have demonstrated that clinical excellence and high-end design are complementary forces.",
    conclusionImage: project.gallery[4],
    conclusionTitle: "Final Narrative",
    conclusionP1: "Project '" + project.formalTitle + "' stands as a significant addition to our portfolio, reflecting our commitment to transforming the architectural landscape of South India.",
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
