import MagazineSpread from "@/components/magazine-spread";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function BlogPage() {
  const kmchBlog = {
    title: "KMCH DIAGNOSTIC CENTER @ ERODE",
    heroImage: "/images/projects/kmch-diagnostic/hero.png",
    introDescription: "A state of the art diagnostic center for a renowned institution of healthcare in Tamil Nadu: Kovai Medical Center and Hospital (KMCH). This facility represents a paradigm shift in medical architecture, where technical precision meets high-end hospitality. Our design approach focuses on creating a seamless interface between advanced diagnostic technology and the human experience of healing. Every corridor, examination room, and waiting area has been meticulously planned to optimize workflow while reducing the inherent stress associated with medical procedures.",
    projectDetails: {
      location: "ERODE",
      architect: "Team 3 Associates",
      area: "12500 SQFT",
      completion: "2023",
      scope: "ARCHITECTURE, STRUCTURAL DESIGN, LANDSCAPE DESIGN"
    },
    // Spread 2: The Proposal
    spread2BigImage: "/images/projects/kmch-diagnostic/interior.png",
    spread2Intro: "The proposal involved designing a state-of-the-art diagnostic center at the hospital premises of KMCH Erode.",
    spread2SmallImage: "/images/projects/kmch-diagnostic/hero.png",
    
    // Spread 3: The Patient Journey (Expanded Content)
    patientJourneyTitle: "The Patient Journey",
    patientJourneyDesc1: "The interior architecture of the KMCH Diagnostic Center is defined by the 'Healing Spaces' concept. Upon entry, patients are greeted by a double-height lobby that provides an immediate sense of openness and tranquility. High-end materials such as warm wood paneling and soft marble surfaces are chosen specifically to neutralize the clinical feel. This intentional choice of materiality acts as a psychological buffer, transitioning the patient from the urban chaos outside into a serene, controlled environment focused entirely on wellness.",
    patientJourneyDesc2: "Moving deeper into the clinical core, the lighting transitions from natural daylight to soft, recessed architectural LEDs that eliminate harsh shadows. Each diagnostic suite is designed as a private sanctuary, where the technical complexity of the MRI or CT machines is housed within custom-designed cabinetry. This 'Invisible Tech' approach ensures that the medical high-technology is available but not visually overwhelming, allowing the patient to remain calm and focused throughout their visit. The inclusion of soft acoustics further enhances this sense of dedicated personal care.",
    healingInteriorImage: "/images/projects/kmch-diagnostic/interior_2.png",

    // Spread 4: Context & Smart Planning
    logisticsTitle: "Complexity & Smart Planning",
    logisticsParagraph1: "For complicated hospital buildings, planning is absolutely crucial. Every square foot must be optimized for both medical efficiency and patient comfort. Our planning strategy involved a 'Vertical Medical Core' that centralizes all specialized services including electrical systems, HVAC with medical-grade filtration, and high-speed vertical transportation. This centralized approach allows for a cleaner floor plan and easier maintenance, ensuring that the critical diagnostic functions are never interrupted by technical service flows.",
    logisticsParagraph2: "Integrating advanced medical equipment requires precise structural engineering, especially for heavy machinery like MRI scanners which require specific weight load distributions and EMI shielding. Our structural team worked in close coordination with medical consultants to analyze the vibration parameters and safety requirements of each diagnostic modality. The result is a highly adaptive structural frame that can accommodate future medical technology upgrades with minimal intervention, safeguarding the long-term viability of the institution's healthcare infrastructure.",
    logisticsLeftImage: "/images/projects/kmch-diagnostic/hero.png",
    logisticsRightImage: "/images/projects/kmch-diagnostic/interior.png",

    // Spread 5: Urban Materiality (Expanded Content)
    materialityTitle: "Urban Narrative & Materiality",
    materialityDescription: "The exterior of the KMCH Diagnostic Center is a sophisticated dialogue between transparency and solidity. We utilized a high-performance glass curtain wall to invite soft northern light into the lobby spaces, while the main diagnostic blocks are clad in textured stone paneling that provides thermal mass and privacy. This material duality reflects the dual nature of the facility: a welcoming, public-facing healthcare institution and a private, high-precision technical core. The stone's natural texture brings an organic element to the medical campus, bridging the gap between nature and technology.",
    facadeDetailImage: "/images/projects/kmch-diagnostic/hero.png",
    lobbyImage: "/images/projects/kmch-diagnostic/interior_2.png",

    // Spread 6: Nocturnal Strategy
    nocturnalTitle: "Nocturnal Strategy & Presence",
    nocturnalDescription: "As a 24-hour healthcare facility, the nocturnal presence of the diagnostic center is a vital part of its urban identity. We implemented a 'Luminous Beacon' strategy, where the building's internal activity is softly signaled through the glass facade at night. Narrow-beam uplights highlight the architectural textures of the stone cladding, creating a reassuring presence within the Erode landscape. This subtle illumination ensures that the facility is highly visible for emergency arrivals while maintaining a calm, non-intrusive glow that respects the surrounding neighborhood's nocturnal environment.",
    nocturnalNightImage: "/images/projects/kmch-diagnostic/hero.png",
    nocturnalDayImage: "/images/projects/kmch-diagnostic/interior.png",
    
    // Spread 7: Blueprint & Identity
    diagramQuote: "Our work as project architects doesn't just stop with the design of the building; it involves the complex coordination of various consultants and systems into a single, cohesive unit. This holistic approach ensures that every pipe, wire, and structural beam is aligned with the final patient experience. By acting as the central hub for consultants in HVAC, electrical engineering, and medical planning, we ensure that the architectural vision remains uncompromised by the technical demands of the facility.",
    diagramBlueprintImage: "/images/blueprint-placeholder.png", 
    diagramRightDesc: "We analyze various parameters including radiation safety, magnetic interference zones, and sterilization flows to ensure the building functions safely and efficiently. This level of technical oversight is what defines Team 3 Associates' commitment to excellence in healthcare design. Every blueprint is a map of safety, precision, and architectural innovation, carefully crafted to meet the evolving needs of Kovai Medical Center and Hospital.",
    
    // Spread 8: Conclusion
    conclusionTitle: "Architectural Vision",
    conclusionImage: "/images/projects/kmch-diagnostic/interior_2.png",
    conclusionP1: "The KMCH Diagnostic Center stands as a testament to our commitment to precision-driven architecture in the healthcare sector. It is more than a building; it is a meticulously engineered environment designed to support the institution's mission of life-saving care. Through this project, we have demonstrated that clinical excellence and high-end architectural design are not mutually exclusive, but rather complementary forces in the future of medical wellness.",
    conclusionP3: "TEAM 3 ASSOCIATES - EXCELLENCE IN HEALTHCARE DESIGN"
  };

  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      <Header />
      <div className="pt-0">
        <MagazineSpread blog={kmchBlog} variant="blog" />
      </div>
      <Footer />
    </main>
  );
}
