"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function ApexResidencesPage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "the-apex-residences");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "The Apex Residences redefines vertical living in Pollachi through the integration of vertical greenery and sustainable design principles. Spanning 65,000 square feet, this high-end apartment complex offers residents private gardens and shared natural spaces, creating a micro-climate that reduces energy consumption and improves well-being, while maintaining a luxury lifestyle.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "The Apex Residences redefines vertical living in Pollachi through the integration of vertical greenery and sustainable design principles. This high-end apartment complex offers residents private gardens and shared natural spaces, creating a micro-climate that reduces energy consumption and improves well-being.",
    spread2SmallImage: project.gallery[1],
    patientJourneyTitle: "Vertical Ecology",
    patientJourneyDesc1: "The vertical journey through the building is designed to be a sensory experience. From the light-filled lobby that opens into a lushly landscaped central courtyard, to the private elevator banks that offer views of the surrounding greenery.",
    patientJourneyDesc2: "The layout of each apartment unit priorities the family's communal life while ensuring individual privacy. The large, open-plan living areas are integrated with the balcony gardens through full-height sliding glass systems.",
    healingInteriorImage: project.gallery[2],
    logisticsTitle: "Ecological Precision",
    logisticsParagraph1: "Our design process was heavily influenced by the local climate and sustainable building practices. The thick masonry walls and strategically placed vertical fins act as solar shading, preventing the harsh afternoon heat from penetrating the living quarters.",
    logisticsParagraph2: "The spatial logic is further refined by the zoning of public and private spheres. Service areas and parking are tucked away to ensure a clean and quiet architectural experience, while the residential units occupy the upper levels, enjoying elevated views.",
    logisticsLeftImage: project.gallery[3],
    logisticsRightImage: project.gallery[4],
    materialityTitle: "Sustainable Materiality",
    materialityDescription: "The dialogue between the smoothness of glass and the texture of vertical greenery defines the complex's material identity. We chose materials that age gracefully and support ecological growth, ensuring that the facility remains a timeless landmark.",
    facadeDetailImage: project.gallery[0],
    lobbyImage: project.gallery[1],
    nocturnalTitle: "Technical Brilliance",
    nocturnalDescription: "Beneath the green architectural surface lies a complex infrastructure designed to support a high-end ecological lifestyle. Integrated smart home systems control everything from irrigation and lighting to climate and security.",
    nocturnalNightImage: project.gallery[3],
    nocturnalDayImage: project.gallery[4],
    diagramQuote: "Precision architecture in sustainable development requires the seamless integration of high-technology with natural systems. We bridge this gap through innovative structural solutions.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "Our architectural identity in the residential sector is defined by this quest for structural and ecological perfection. Through this project, we have demonstrated that sustainable living and high-end design are complementary forces.",
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
