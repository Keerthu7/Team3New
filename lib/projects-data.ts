export interface Project {
  id: number;
  slug: string;
  title: string;
  formalTitle: string;
  category: string;
  filterType: string;
  subtitle: string;
  image: string;
  gallery: string[];
  location: string;
  year: string;
  area: string;
  scopeOfWork: string;
  overview: string;
  designTypes: string[];
  technicalDetails?: {
    finishes: {
      facade: { desc: string; images: string[] };
      wall: { desc: string; images: string[] };
      flooring: { desc: string; images: string[] };
    };
    materials: { label: string; value: string }[];
    contributors: { label: string; value: string }[];
    photoCredits: { label: string; value: string }[];
  };
  galleryCaptions: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "mr-jagan-residence",
    title: "Mr. Jagan Residence",
    formalTitle: "KRISHNA AISHWARYAM",
    category: "Residential Architecture",
    filterType: "Residential",
    subtitle: "A contemporary tropical courtyard residence.",
    image: "/images/interiors/jagan_int.png",
    gallery: [
      "/images/jagan/1.jpg",
      "/images/jagan/6.jpg",
      "/images/jagan/65.jpg",
      "/images/jagan/67.jpg",
      "/images/jagan/74.jpg",
    ],
    galleryCaptions: [
      "The central tropical courtyard serves as the heart of Krishna Aishwaryam, designed to facilitate a seamless transition between the indoor living spaces and the lush exterior landscape. This architectural void acts as a natural ventilator, drawing cool air through the residence while providing a serene focal point that changes with the path of the sun throughout the day.",
      "Natural light is a primary material in our design philosophy. We utilized large-format sliding glass systems and strategically placed clerestory windows to ensure that every corner of the living zone is bathed in soft, indirect illumination. This approach reduces the need for artificial lighting during the day and enhances the tactile quality of the interior stone and wood finishes.",
      "From this perspective, the volumetric interplay of the residence becomes clear. The design balances heavy masonry elements with light, cantilevered roof planes, creating a sense of both groundedness and loftiness. The staggered floor plates allow for private terraces that overlook the internal courtyards, ensuring that every bedroom has a direct connection to nature.",
      "The interior design of Krishna Aishwaryam follows a philosophy of 'Warm Minimalism'. We selected a palette of seasoned teakwood, honed granite, and lime-plastered walls to create a space that feels both high-end and deeply comfortable. Custom-designed furniture pieces are integrated into the architectural shell, ensuring that functionality is never sacrificed for aesthetic purity.",
      "At night, the strategic use of warm architectural lighting highlights the textures of the natural materials used in the facade. The transition between the solid stone walls and the transparent glass sections creates a rhythmic nocturnal presence that is both welcoming and secure. This lighting strategy was meticulously planned to minimize glare while accentuating the building's horizontal lines.",
    ],
    location: "COIMBATORE",
    year: "2023",
    area: "9,565 SQFT",
    scopeOfWork: "ARCHITECTURE, INTERIOR, STRUCTURAL DESIGN, LANDSCAPE",
    overview: "A contemporary take on a traditional courtyard house design, Krishna Aishwaryam integrates modern tropical aesthetics with functional living spaces. The design emphasizes natural ventilation and light, creating a seamless connection between indoor and outdoor environments through strategically placed courtyards and large openings. The spatial planning revolves around a series of interconnected volumes that facilitate a rhythmic transition from public to private zones. Large-format glass sliding doors blur the boundaries between the interior and the lushly landscaped courtyards, allowing the home to breathe and adapt to the changing tropical climate. The internal planning is characterized by a fluid sequence of semi-open spaces that encourage social interaction while maintaining individual privacy. Custom-built cabinetry and integrated furniture pieces were designed as architectural extensions of the walls, ensuring a clutter-free environment that prioritizes the purity of form and the quality of natural materials. This meticulous attention to detail extends to the landscape design, where native flora is used to enhance the residence's ecological footprint and provide a constantly evolving seasonal backdrop to daily life.",
    designTypes: ["Architectural", "Structural", "Interior", "Landscape"],
    technicalDetails: {
      finishes: {
        facade: { desc: "Exposed brick & natural lime plaster", images: ["/images/jagan/1.jpg"] },
        wall: { desc: "Textured wall finishes & wooden paneling", images: ["/images/jagan/6.jpg", "/images/jagan/65.jpg", "/images/jagan/67.jpg"] },
        flooring: { desc: "Athangudi tiles & polished concrete", images: ["/images/jagan/74.jpg", "/images/jagan/1.jpg"] },
      },
      materials: [
        { label: "Windows", value: "Custom Teakwood frames" },
        { label: "Tiles", value: "Athangudi Heritage Tiles" },
        { label: "Decorative Lighting", value: "The Purple Turtles" },
        { label: "Color", value: "Asian Paints Royale" },
        { label: "Sanitaryware", value: "TOTO" },
        { label: "Bath Fittings", value: "Gessi" },
      ],
      contributors: [
        { label: "Structural", value: "Team 3 Structural Cell" },
        { label: "Landscape", value: "Green Earth Landscapes" },
      ],
      photoCredits: [
        { label: "Interior", value: "Radhakrishnan" },
        { label: "Exterior", value: "Radhakrishnan" },
      ],
    },
  },
  {
    id: 2,
    slug: "mr-ramesh-residence",
    title: "Mr. Ramesh Residence",
    formalTitle: "Mr. RAMESH RESIDENCE",
    category: "Residential Architecture",
    filterType: "Residential",
    subtitle: "A four-story luxury apartment and duplex penthouse.",
    image: "/images/interiors/ramesh_int.png",
    gallery: [
      "/images/ramesh/3 (1).jpg",
      "/images/ramesh/1 (1).jpg",
      "/images/ramesh/5 (2).jpg",
      "/images/ramesh/balcony.jpg",
      "/images/ramesh/living1.jpg",
    ],
    galleryCaptions: [
      "The Mr. Ramesh Residence in Salem is designed as a vertically stacked multi-unit development, making a bold urban statement in a rapidly developing neighborhood. Our architectural strategy focused on creating distinctidentities for each floor while maintaining a cohesive overall envelope, utilizing a palette of textured granite and high-performance glass to define the building's contemporary character.",
      "The interior spaces feature large, unobstructed floor plates that maximize the panoramic views of the Salem skyline. By utilizing advanced structural engineering, we minimized internal columns, allowing for a flexible open-plan layout that accommodates both formal entertaining and private family living. The integration of high-end millwork and recessed lighting further enhances the sense of luxury.",
      "Vertical integration is achieved through a light-filled central atrium that houses a custom-designed glass elevator. This technical feature serves as an architectural focal point, connecting the different levels while providing a sense of transparency and movement. The atrium also facilitates natural stack ventilation, drawing cool air from the ground floor up through the entire building.",
      "The crowning achievement of the development is the luxury duplex penthouse, designed as the pinnacle of the technical and aesthetic design. Featuring double-height living spaces, a private internal staircase, and meticulously detailed finishes, the penthouse offers an unparalleled level of urban sophistication, reflecting Team 3 Associates' commitment to high-end residential excellence.",
      "At night, the residence transforms into a luminous urban landmark through a carefully choreographed lighting strategy. We used layers of grazing lights to highlight the textures of the stone facade and soft internal glows to define the building's volumetric layers. This nocturnal presence reinforces the project's identity as a beacon of modern architecture in Salem.",
    ],
    location: "SALEM",
    year: "2020 - 2022",
    area: "16,155 SQFT",
    scopeOfWork: "ARCHITECTURE, INTERIOR, STRUCTURAL DESIGN, LANDSCAPE",
    overview: "Mr. Ramesh Residence in Salem is an architectural study in vertical luxury and urban density. This four-story development is meticulously layered to accommodate multiple premium apartment units, culminating in a spectacular duplex penthouse that serves as the building's crowning jewel. The design utilizes a sophisticated palette of textured granite and high-performance glass to create a rhythmic facade that is both bold and protective. Internally, the spaces are defined by their generous proportions and seamless flow, where large-format openings provide sweeping views of the city skyline while maintaining a sense of residential sanctuary. Every design decision, from the central light-filled atrium to the carefully curated finishes, reflects a commitment to elevating the multi-unit dwelling experience into a statement of modern architectural excellence.",
    designTypes: ["Architectural", "Interior", "Structural"],
  },
  {
    id: 3,
    slug: "kmch-diagnostic-center",
    title: "KMCH Diagnostic Center",
    formalTitle: "KMCH COMPREHENSIVE CANCER CENTER",
    category: "Health Care",
    filterType: "Healthcare",
    subtitle: "A landmark in patient-centric architectural wellness.",
    image: "/images/interiors/kmch_int.png",
    gallery: [
      "/images/kmch/1.jpg",
      "/images/kmch/2.jpg",
      "/images/kmch/3.jpg",
      "/images/kmch/6.jpg",
      "/images/kmch/8.jpg",
    ],
    galleryCaptions: [
      "The exterior facade of the KMCH Diagnostic Center is defined by its seasoned teakwood louvers, which serve both an aesthetic and functional purpose. These louvers provide a sophisticated urban identity while acting as a solar shading system that protects the internal diagnostic suites from harsh western sunlight, maintaining a high-performance thermal envelope.",
      "Inside the diagnostic core, our design approach focuses on 'Technical Hospitality'. We integrated advanced medical technology into bespoke interior cabinetry, ensuring that life-saving equipment is readily available but visually muted. This reduced clinical friction helps to lower patient anxiety levels, creating an environment that feels more like a wellness retreat than a medical facility.",
      "The healing corridors are designed as intuitive navigation paths bathed in natural light. By utilizing double-height volumes and soft, curved architectural forms, we eliminate the 'unending hallway' syndrome common in healthcare design. The material palette of vitrified terrazzo and soft wood paneling provides a tactile sense of cleanliness and warmth.",
      "Technical precision is paramount in diagnostic spaces, but comfort is equally vital. The MRI and CT sanctuary suites are meticulously planned with integrated EMI shielding and acoustic dampening. We used soft, recessed LED lighting and custom ceiling graphics to provide a calming visual focus for patients during their procedures, ensuring a dignifed and serene patient journey.",
      "The medical technical core acts as a luminous beacon within the Erode healthcare landscape. Our architectural strategy centralizes complex HVAC and electrical systems into a unified vertical spine, allowing the patient-facing areas to remain open and uncluttered. This nocturnal presence reinforces KMCH's identity as a 24-hour institution of care and excellence.",
    ],
    location: "COIMBATORE",
    year: "2024",
    area: "18,000 SQFT",
    scopeOfWork: "ARCHITECTURE, INTERIOR, STRUCTURAL DESIGN",
    overview: "Kovai Medical Center & Hospital (KMCH) represents a landmark in patient-centric architectural wellness. The Comprehensive Cancer Center was designed to provide a healing environment through the use of natural light, soothing colors, and intuitive navigation, ensuring that medical technicality exists in harmony with patient comfort.",
    designTypes: ["Healthcare", "Architectural", "Structural"],
    technicalDetails: {
      finishes: {
        facade: { desc: "Seasoned teakwood louvers", images: ["/images/kmch/1.jpg"] },
        wall: { desc: "Vitrified terrazzo & ceramic tiles", images: ["/images/kmch/2.jpg", "/images/kmch/3.jpg", "/images/kmch/6.jpg"] },
        flooring: { desc: "Kota stone & China mosaic", images: ["/images/kmch/8.jpg", "/images/kmch/1.jpg"] },
      },
      materials: [
        { label: "Windows", value: "Fenesta from Alfa Claddings" },
        { label: "Tiles", value: "Kajaria from Vaigai Ceramics" },
        { label: "Decorative Lighting", value: "Abby & Ledos from Gojis" },
        { label: "Color", value: "Asian Paints" },
        { label: "Sanitaryware", value: "Kohler" },
        { label: "Bath Fittings", value: "Jaguar" },
        { label: "Furniture", value: "Sources Unlimited" },
        { label: "Furnishings", value: "Dreams Furnishings" },
        { label: "Wallpaper", value: "Marshalls" },
        { label: "Hardware", value: "Hafele from Rams Agency" },
        { label: "Kitchen Sink", value: "Franke" },
        { label: "Air Conditioning", value: "Mitsubishi" },
      ],
      contributors: [
        { label: "Structural", value: "Le Premier" },
        { label: "Civil", value: "Dinesh from Ace Structures" },
      ],
      photoCredits: [
        { label: "Interior", value: "Yash Jain & Senthil" },
        { label: "Exterior", value: "Ganesh Ramachandran" },
      ],
    },
  },
  {
    id: 4,
    slug: "siva-trade-centre",
    title: "Siva Trade Centre",
    formalTitle: "SIVA TRADE CENTER",
    category: "Commercial Architecture",
    filterType: "Commercial",
    subtitle: "A dynamic commercial hub where form follows function.",
    image: "/images/interiors/siva_int.png",
    gallery: [
      "/images/sivatrade EXT/1 view 1.jpg",
      "/images/sivatrade EXT/2 view.jpg",
      "/images/sivatrade inter/1 lobby 1.jpg",
      "/images/sivatrade inter/11 ff double ht 1.jpg",
      "/images/sivatrade inter/17 conference 1.jpg",
    ],
    galleryCaptions: [
      "The Siva Trade Centre in Tirupur is defined by its dynamic commercial facade, designed to reflect the energy and industrial heritage of the region. Our architectural approach utilized a rhythmic arrangement of solid and transparent volumes, creating a visually striking presence that stands out as a landmark of modern commercial excellence in the heart of the city's trade district.",
      "The modern retail bays are meticulously planned for maximum visibility and brand impact, featuring large-format glass shopfronts and integrated signage zones. Each bay is designed to accommodate a diverse range of commercial activities, from high-end apparel showrooms to boutique retail outlets, ensuring that the development remains a vibrant destination throughout the day.",
      "Inside, the high-ceilinged executive lobby serves as a showcase for modular commercial excellence. We utilized a palette of polished stone, brushed metal, and integrated LED lighting to create a space that is both professional and welcoming. The double-height volume enhances the sense of scale and provides an impressive entrance experience for both clients and employees.",
      "Spacious conference suites are equipped with state-of-the-art building systems, including integrated audio-visual technology and precision-controlled climate systems. The architectural design of these suites focuses on acoustic clarity and ergonomic comfort, providing an ideal environment for strategic business meetings and collaborative executive workshops.",
      "Behind the sleek commercial facade, the logistics and service lanes are seamlessly integrated into the architectural envelope. This operational spine is designed for efficiency, ensuring that goods can be moved and services can be maintained without disrupting the public-facing commercial areas. This functional integration is a hallmark of Team 3's approach to commercial design.",
    ],
    location: "TIRUPUR",
    year: "2021 - 2022",
    area: "25,394 SQFT",
    scopeOfWork: "ARCHITECTURE, INTERIOR, STRUCTURAL DESIGN",
    overview: "Siva Trade Centre represents a new benchmark for commercial architecture in Tirupur, where dynamic form meets rigorous functional efficiency. Designed as a multi-functional hub for one of the region's prominent enterprises, the building integrates high-street retail bays, executive office suites, and specialized logistics facilities within a single, cohesive modern envelope. The architectural language is defined by a rhythmic playful interplay of solid volumes and transparent glass sections, ensuring maximum brand visibility while providing a professional, light-filled internal environment. The spatial planning prioritizes ease of movement and operational clarity, allowing the diverse commercial activities to coexist harmoniously. The building’s nocturnal presence, highlighted by strategic architectural lighting, reinforces its status as a landmark of progress and quality in the heart of the city’s trade district.",
    designTypes: ["Commercial", "Architectural", "Interior"],
  },
  {
    id: 5,
    slug: "drg-commercial-complex",
    title: "D.R.G Commercial Complex",
    formalTitle: "D.R.G INTEGRATED COMPLEX",
    category: "Commercial Architecture",
    filterType: "Commercial",
    subtitle: "Visibility-centric retail and premium office development.",
    image: "/images/interiors/drg_int.png",
    gallery: [
      "/images/DRG/1.jpg",
      "/images/DRG/1_8 - Photo.jpg",
      "/images/DRG/2_20 - Photo.jpg",
      "/images/DRG/3_30 - Photo.jpg",
      "/images/DRG/1_5 - Photo.jpg",
    ],
    galleryCaptions: [
      "The D.R.G Integrated Complex in Namakkal is a strategic visibility-centric development designed to set a new benchmark for commercial excellence in the region. Our design process focused on the building's relationship with the prominent roadway, resulting in a bold architectural form that naturally attracts attention while providing a stable and secure environment for business operations.",
      "High-street retail spaces are housed within a contemporary facade that balances transparency with structural rhythm. The design prioritizes the pedestrian experience, with well-lit walkway zones and direct access to premium retail bays. The use of durable, high-quality materials ensures that the facade maintains its aesthetic integrity even in the challenging urban environment of Namakkal.",
      "The premium office environments within the complex are designed to foster productivity and business growth. We incorporated large glazed sections to provide ample natural light, while integrated thermal shading systems ensure a comfortable internal climate. The flexible floor plates allow businesses to customize their office layouts according to their specific operational needs.",
      "Meticulous structural planning was a cornerstone of the D.R.G Complex project. We utilized advanced post-tensioned concrete slabs to achieve large column-free spans, maximizing the usable commercial area. This technical approach not only provides greater layout flexibility but also reflects our firm's commitment to cutting-edge structural engineering and architectural innovation.",
      "The nocturnal presence of the D.R.G Integrated Complex is defined by a sophisticated architectural lighting scheme that highlights its geometric forms. By using high-efficiency LED fixtures, we created a luminous urban landmark that remains visible and attractive long after sunset, reinforcing the building's status as a premier destination for commerce and retail in Namakkal.",
    ],
    location: "NAMAKKAL",
    year: "2021",
    area: "12,000 SQFT",
    scopeOfWork: "ARCHITECTURE, STRUCTURAL DESIGN",
    overview: "The D.R.G Commercial Complex is a visibility-centric retail and office development designed to maximize its prominent location in Namakkal. The project’s architectural strategy revolves around the building’s interaction with the urban streetscape, utilizing a bold, geometric facade to create a strong visual identity that naturally draws the eye of passersby. Behind this striking exterior, the complex offers premium retail spaces on the lower levels and sophisticated, flexible office environments above. The design emphasizes clarity of form and durability of materials, creating a stable yet dynamic platform for business growth. Natural light is channeled deep into the floor plates through strategic glazing, while modern building systems ensure high-performance thermal comfort. This integrated approach ensures that the D.R.G Complex is not just a place of business, but a vibrant architectural contributor to the city's commercial evolution.",
    designTypes: ["Architectural", "Structural"],
  },
  {
    id: 6,
    slug: "azure-penthouse",
    title: "Azure Penthouse",
    formalTitle: "THE AZURE PENTHOUSE",
    category: "Interior Design",
    filterType: "Interior",
    subtitle: "A serene urban sanctuary of minimalist luxury.",
    image: "/images/projects/azure-penthouse/hero.png",
    gallery: [
      "/images/ramesh/2 (2).jpg",
      "/images/ramesh/4 (2).jpg",
      "/images/ramesh/6 (2).jpg",
      "/images/ramesh/home-theater.jpg",
      "/images/ramesh/living.jpg",
    ],
    galleryCaptions: [
      "The Azure Penthouse represents the pinnacle of urban luxury in Coimbatore, designed as a serene sanctuary high above the city. The open-plan living area features high-performance glass curtain walls that offer 270-degree panoramic views, while the interior palette of cool tones and natural stone creates a sophisticated atmosphere of minimalist elegance.",
      "The private home cinema suite is a masterclass in integrated technology and interior styling. We utilized custom-designed silk wallpaper acoustic panels and deep-set architectural lighting to create an immersive cinematic experience. The ergonomic seating and bespoke cabinetry ensure that the space is as functional as it is visually stunning.",
      "The master suite is designed for ultimate comfort, featuring a sequence of interconnected spaces including a private lounge, dressing area, and spa-like bathroom. The use of engineered oak flooring and soft ambient lighting creates a warm, intimate environment, while large-format glazing ensures that the connection to the city skyline is never lost.",
      "In the contemporary lounge, we integrated a curated selection of fine art and designer furniture within the architectural shell. The space is defined by its clean horizontal lines and meticulous detailing, where every joint and material transition has been carefully considered to reflect Team 3 Associates' commitment to high-end interior craftsmanship.",
      "The nocturnal identity of the Azure Penthouse is defined by the soft glow of its interior spaces reflecting against the high-performance glazing. Our lighting strategy uses layers of task, ambient, and accent lighting to define different zones within the open-plan layout, creating a dynamic urban residence that transforms with the setting sun.",
    ],
    location: "COIMBATORE",
    year: "2024",
    area: "2,200 SQFT",
    scopeOfWork: "INTERIOR DESIGN, STYLING",
    overview: "The Azure Penthouse is an exercise in minimalist luxury. This urban sanctuary features a palette of cool tones and natural materials, creating a serene atmosphere high above the city. Every detail, from the custom furniture to the curated art pieces, has been chosen to enhance the sense of space and light.",
    designTypes: ["Interior Design", "Styling"],
    technicalDetails: {
      finishes: {
        facade: { desc: "Alu-wood composite glazing", images: ["/images/ramesh/2 (2).jpg"] },
        wall: { desc: "Silk wallpaper & Italian marble cladding", images: ["/images/ramesh/4 (2).jpg", "/images/ramesh/6 (2).jpg", "/images/ramesh/home-theater.jpg"] },
        flooring: { desc: "Statuario marble & Engineered oak", images: ["/images/ramesh/living.jpg", "/images/ramesh/2 (2).jpg"] },
      },
      materials: [
        { label: "Windows", value: "Schueco" },
        { label: "Tiles", value: "Sicis Mosaics" },
        { label: "Decorative Lighting", value: "Artemide & Flos" },
        { label: "Color", value: "Benjamin Moore" },
        { label: "Furniture", value: "Minotti & B&B Italia" },
        { label: "Kitchen", value: "Poggenpohl" },
      ],
      contributors: [
        { label: "Interior Styling", value: "Team 3 Interior Studio" },
        { label: "Automation", value: "Lutron" },
      ],
      photoCredits: [
        { label: "Photography", value: "Inclined Studio" },
      ],
    },
  },
  {
    id: 7,
    slug: "the-apex-residences",
    title: "The Apex Residences",
    formalTitle: "THE APEX VERTICAL ECOLOGY",
    category: "Apartment Architecture",
    filterType: "Apartment",
    subtitle: "High-end urban living with integrated vertical greenery.",
    image: "/images/projects/apex-residences/hero.png",
    gallery: [
      "/images/jagan/11.jpg",
      "/images/jagan/13.jpg",
      "/images/jagan/58.jpg",
      "/images/jagan/66.jpg",
      "/images/jagan/68.jpg",
    ],
    galleryCaptions: [
      "The Apex Residences redefines high-end urban living in Pollachi through its innovative integration of vertical greenery and private gardens. Our architectural strategy treats the building as a living ecosystem, where every residence has direct access to curated natural spaces. This vertical forest approach improves air quality and provides a serene ecological retreat from the urban bustle.",
      "Private garden terraces are meticulously designed to create an ecological micro-climate for every apartment. By using a variety of native plant species and automated irrigation systems, we've created sustainable outdoor 'rooms' that serve as natural thermal buffers. These green spaces not only enhance the well-being of the residents but also provide architectural depth and character to the facade.",
      "The sustainable architectural facade is defined by its deep-set masonry solar fins, which work in harmony with the vertical greenery to reduce heat gain. These fins are more than just aesthetic elements; they are technical components designed to minimize reliance on artificial cooling while creating a rhythmic, contemporary identity that reflects the project's commitment to ecological modernism.",
      "Light-filled family communal spaces are seamlessly integrated with the balcony gardens, creating a unified living environment that celebrates the Pollachi landscape. We utilized a material palette of natural stone, warm wood, and high-performance glass to ensure that the transition between the lush exterior and the minimalist interior is both beautiful and functional.",
      "Ecological micro-landscaping is strategically used throughout the development as a natural thermal buffer and visual screen. This layered approach to greenery ensures that the building's overall environmental performance is significantly enhanced, providing a sustainable model for the future of multi-unit residential development in India's rapidly growing urban centers.",
    ],
    location: "POLLACHI",
    year: "2024",
    area: "65,000 SQFT",
    scopeOfWork: "ARCHITECTURE, STRUCTURAL DESIGN, SUSTAINABILITY",
    overview: "The Apex Residences redefines high-end vertical living in Pollachi through a pioneering integration of architectural innovation and ecological sensitivity. Conceived as a 'Vertical Ecology', the project treats the multi-story structure as a living system where every residence is granted a private, lushly landscaped garden terrace. These green buffers serve as natural thermal regulators, improving air quality and providing a serene, grounded atmosphere high above the ground. The architectural facade is characterized by deep-set solar fins and staggered balconies that create a dynamic shadow play throughout the day, reinforcing the building's contemporary identity. Internally, the apartments are designed with an emphasis on transparency and openness, allowing the vibrant vertical gardens to become an extension of the living spaces. The Apex Residences is more than a housing complex; it is a sustainable micro-climate that offers its residents a unique, nature-centric lifestyle within the urban context.",
    designTypes: ["Architectural", "Structural", "Sustainability"],
  },
];