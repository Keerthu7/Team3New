"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import MagazineSpread from "@/components/magazine-spread";

export default function KMCHDiagnosticCenterPage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "kmch-diagnostic-center");

  if (!project) return null;

  const blogData = {
    title: project.formalTitle,
    heroImage: project.gallery[0],
    introDescription: "The Kovai Medical Center & Hospital (KMCH) represents a landmark in patient-centric architectural wellness. Spanning across 18,000 square feet in Coimbatore, this facility was designed to provide a healing environment through the use of natural light, soothing colors, and intuitive navigation, ensuring that medical technicality exists in harmony with patient comfort.",
    projectDetails: {
      location: project.location,
      architect: "Team 3 Associates",
      area: project.area,
      completion: project.year,
      scope: project.scopeOfWork
    },
    spread2BigImage: project.gallery[0],
    spread2Intro: "Our diagnostic center proposal focuses on the psychological impact of clinical spaces. By integrating large glass surfaces and outdoor greenery into the design, we have created a facility that reduces patient anxiety and promotes a sense of tranquility, while maintaining the highest standards of hygiene and medical precision.",
    spread2SmallImage: project.gallery[1],
    patientJourneyTitle: "Healing Environment",
    patientJourneyDesc1: "The patient journey begins in a spacious, light-filled lobby that feels more like a hospitality space than a traditional hospital. This intentional design choice sets the tone for the entire visit, reducing the stress associated with diagnostic procedures and creating a welcoming atmosphere for both patients and their families.",
    patientJourneyDesc2: "The flow of the building is optimized for efficiency and care. Departments are arranged to minimize patient travel distances, and consultation rooms are designed with high levels of acoustic privacy and comfortable seating, ensuring that every interaction between patients and medical staff occurs in a supportive and professional environment.",
    healingInteriorImage: project.gallery[2],
    logisticsTitle: "Precision & Coordination",
    logisticsParagraph1: "The coordination of high-precision medical technology with traditional building systems required an advanced level of foresight. Every diagnostic suite is designed with integrated shielding and specialized environmental controls to ensure the reliability of sensitive equipment, while the public areas remain open and airy.",
    logisticsParagraph2: "The facility's spatial logic is defined by a clear separation of medical and public zones. This vertical and horizontal hierarchy ensures that the center functions effectively even during peak hours, with service lanes and technical corridors tucked away to the rear, while patient spaces are prioritized at the building's facade.",
    logisticsLeftImage: "/images/kmch/4.jpg",
    logisticsRightImage: "/images/kmch/2.jpg",
    materialityTitle: "Clinical Materiality",
    materialityDescription: "The choice of materials is not merely aesthetic but functions to manage hygiene and maintain a sterile environment. High-performance, anti-microbial surfaces are used throughout the medical zones, while the public lobby features warmer, more organic materials to create a welcoming and human-scale experience.",
    facadeDetailImage: project.gallery[3],
    lobbyImage: project.gallery[4],
    nocturnalTitle: "Healthcare Innovation",
    nocturnalDescription: "Beneath the clinical surface lies a complex structural framework designed to support the weight of heavy medical machinery. The building utilize post-tensioned concrete slabs to achieve the large, column-free spans required for high-precision diagnostic imaging suites.",
    nocturnalNightImage: project.gallery[4],
    nocturnalDayImage: project.gallery[0],
    diagramQuote: "Precision architecture in healthcare requires the seamless integration of high-technology with traditional architectural wisdom. We bridge this gap through innovative structural solutions.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png",
    diagramRightDesc: "Our architectural identity in the healthcare sector is defined by this quest for structural and functional perfection. Through this project, we have demonstrated that clinical excellence and high-end design are complementary forces.",
    conclusionImage: project.gallery[2],
    conclusionTitle: "Final Narrative",
    conclusionP1: "Project '" + project.formalTitle + "' stands as a significant addition to our portfolio, reflecting our commitment to transforming the healthcare landscape of South India.",
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
