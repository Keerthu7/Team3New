"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function RameshResidencePage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "mr-ramesh-residence");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "Spanning across 16,155 square feet of meticulous urban architecture, the Mr. Ramesh Residence in Salem is a bold statement of luxury and vertical living. This four-story residential complex combines the efficiency of high-density housing with the expansive feel of a single-family villa, culminating in a sprawling duplex penthouse that commands views of the city's skyline.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "The primary design challenge was to balance the density of four separate living units with the need for individual privacy and luxury. Our proposal achieved this through a vertically stacked arrangement that emphasizes separation between the core service shafts and the private living quarters, allowing for large, unobstructed floor plates and double-aspect views.",
    spread2SmallImage: project.gallery[1],
    patientJourneyTitle: "Vertical Integration",
    patientJourneyDesc1: "The vertical journey through the building is facilitated by a high-speed glass elevator and an architectural staircase that winds through a light-filled atrium. This central void not only connects the different levels visually but also serves as a thermal chimney, drawing cool air into the heart of each apartment even during the hottest Salem afternoons.",
    patientJourneyDesc2: "The duplex penthouse at the summit is the pinnacle of the project's design philosophy. It features expansive terraces that serve as outdoor living rooms, complete with integrated landscaping and water features that blur the boundary between the internal luxury and the external urban context, providing a serene escape from the bustling city.",
    healingInteriorImage: project.gallery[2],
    logisticsTitle: "Precision & Logic",
    logisticsParagraph1: "Our planning approach was driven by a commitment to functional excellence. Each apartment level is designed with a clear separation of public and private zones, ensuring that entertaining can occur without disrupting the tranquility of the bedrooms. This spatial logic extends to the underground parking and common areas, which are optimized for ease of movement.",
    logisticsParagraph2: "The structural design utilizes reinforced concrete frames with large slab spans to minimize the need for internal columns, providing the residents with maximum flexibility in their interior layouts. High-performance building systems for water management and solar energy collection are integrated into the architecture, ensuring that the legacy of the building is one of sustainability.",
    logisticsLeftImage: project.gallery[3],
    logisticsRightImage: project.gallery[4],
    materialityTitle: "Urban Materiality",
    materialityDescription: "The facade is characterized by a sophisticated interplay of textured granite, high-performance glass, and powder-coated aluminum fins. These materials were chosen for their durability in the local climate and their ability to create a timeless architectural aesthetic that reflects the quality of the life within.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[4],
    nocturnalTitle: "Technical Brilliance",
    nocturnalDescription: "Beneath the elegant facade lies a robust technical infrastructure designed to support a high-end lifestyle. Integrated smart home systems control everything from lighting and climate to security, while the advanced soundproofing between levels ensures that each residence remains a private and acoustically isolated sanctuary.",
    nocturnalNightImage: project.gallery[3],
    nocturnalDayImage: project.gallery[1],
    diagramQuote: "Architectural luxury is the result of invisible technical precision. We strive to make the most complex engineering disappear into the background of a beautiful space.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "This project serves as a archetype for modern urban development, demonstrating that high-density housing can still provide the luxury and privacy of a traditional residence. It is a testament to our ability to deliver technical excellence in complex residential commissions.",
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
