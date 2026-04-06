import Image from "next/image";
import { MapPin, User, Maximize, Calendar, FileText } from "lucide-react";

export default function MagazineSpread({ 
  blog, 
  heroElement, 
  variant = "default" 
}: { 
  blog: any, 
  heroElement?: React.ReactNode,
  variant?: "default" | "blog"
}) {
  if (!blog) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f4] text-black pb-0 font-sans">
      
      {/* FULL-BLEED FULLSCREEN HERO BLOCK (Edge-to-Edge Architectural Cinema) - ONLY IN DEFAULT VARIANT */}
      {variant === "default" && (
        <section className="w-full h-screen relative overflow-hidden bg-black z-0 shadow-2xl transition-all duration-1000 animate-in fade-in fill-none">
           {heroElement ? (
              <div className="absolute inset-0 w-full h-full">
                {heroElement}
              </div>
           ) : (
              <Image src={blog.heroImage} alt="Hero" fill className="object-cover" priority />
           )}

           {/* Monograph Entry Overlay / Gradient Blend */}
           <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f4f4] to-transparent pointer-events-none"></div>

           {/* Scroll Down Indicator */}
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em] opacity-60">discovery</span>
              <div className="w-[1px] h-12 bg-white/40"></div>
           </div>
        </section>
      )}

      {/* MAGAZINE SPREADS CONTAINER (Centered Monograph Experience) */}
      <div className={`w-full flex flex-col items-center gap-24 ${variant === "blog" ? "pt-32" : "pt-8 md:pt-16"} pb-0 px-4 md:px-12 relative z-10`}>
        
        {variant === "blog" ? (
          /* SPREAD 1 (BLOG/MONOGRAPH HERO): Side-by-Side Hero for Blog Page specifically */
          <section className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row min-h-[700px] overflow-hidden rounded-sm">
             {/* Left Side: Hero image or Slider */}
             <div className="w-full lg:w-[55%] relative min-h-[400px] bg-black border-b lg:border-b-0 lg:border-r border-black/10">
                {heroElement ? (
                   <div className="absolute inset-0 w-full h-full">
                      {heroElement}
                   </div>
                ) : (
                   <Image src={blog.heroImage} alt="Hero" fill className="object-cover" priority />
                )}
             </div>

             {/* Right Side: Overview & Specs */}
             <div className="w-full lg:w-[45%] flex flex-col">
                <div className="p-8 md:p-12 lg:p-16 flex-grow border-b border-black/5 bg-[#fafafa]">
                   <p className="text-[10px] font-bold tracking-[0.5em] text-[#28557F]/60 uppercase mb-8 border-b border-black/5 pb-4">Architectural Monograph</p>
                   <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 text-[#000000] tracking-tighter leading-none uppercase">
                      {blog.title}
                   </h1>
                   <p className="text-[15px] md:text-[16px] leading-relaxed font-medium opacity-80 text-justify">
                      {blog.introDescription}
                   </p>
                </div>

                <div className="p-8 md:p-12 lg:p-16 bg-white">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#28557F]/60 mb-10 border-b border-black/5 pb-4">Project Specifications</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-[14px]">
                      <div className="flex items-start gap-4">
                         <MapPin size={16} className="text-[#28557F] mt-0.5 opacity-50" />
                         <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-[#000000]/40 text-[8px]">Location</p>
                            <p className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.location}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <User size={16} className="text-[#28557F] mt-0.5 opacity-50" />
                         <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-[#000000]/40 text-[8px]">Architect</p>
                            <p className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.architect}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Maximize size={16} className="text-[#28557F] mt-0.5 opacity-50" />
                         <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-[#000000]/40 text-[8px]">Area</p>
                            <p className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.area}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4">
                         <Calendar size={16} className="text-[#28557F] mt-0.5 opacity-50" />
                         <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-[#000000]/40 text-[8px]">Completion</p>
                            <p className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.completion}</p>
                         </div>
                      </div>
                      <div className="sm:col-span-2 pt-4 border-t border-black/5 flex items-start gap-4">
                         <FileText size={16} className="text-[#28557F] mt-0.5 opacity-50" />
                         <div className="space-y-1">
                            <p className="font-bold uppercase tracking-widest text-[#000000]/40 text-[8px] mb-2">Scope of Work</p>
                            <p className="font-bold uppercase tracking-[0.05em] text-[#000000] leading-relaxed">{blog.projectDetails?.scope}</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        ) : (
          /* SPREAD 1 (MONOGRAPH CORE): Original Layout for Project Pages */
          <section className="w-full max-w-[1440px] bg-white shadow-[0_0_80px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden first:mt-0 rounded-sm">
             <div className="w-full p-8 md:p-14 lg:p-24 flex flex-col md:flex-row gap-16 lg:gap-24 bg-[#fafafa]">
                <div className="w-full md:w-3/5">
                   <p className="text-[10px] font-bold tracking-[0.5em] text-[#28557F]/60 uppercase mb-8 border-b border-black/5 pb-4">Architectural Monograph</p>
                   <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-10 text-[#000000] tracking-tighter leading-none uppercase">
                      {blog.title}
                   </h1>
                   <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed font-medium opacity-80 text-justify">
                      {blog.introDescription}
                   </p>
                </div>

                <div className="w-full md:w-2/5 md:pl-20 md:border-l border-black/10">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#28557F]/60 mb-12 border-b border-black/5 pb-4">Project Specifications</h3>
                   <div className="space-y-8 text-[15px] leading-relaxed">
                      <div className="flex items-start gap-4 group">
                         <MapPin size={18} className="text-[#28557F] mt-1 opacity-50" />
                         <div className="flex flex-col">
                            <span className="font-bold uppercase tracking-widest text-[#000000]/40 text-[9px]">Location</span>
                            <span className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.location}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                         <User size={18} className="text-[#28557F] mt-1 opacity-50" />
                         <div className="flex flex-col">
                            <span className="font-bold uppercase tracking-widest text-[#000000]/40 text-[9px]">Architect</span>
                            <span className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.architect}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                         <Maximize size={18} className="text-[#28557F] mt-1 opacity-50" />
                         <div className="flex flex-col">
                            <span className="font-bold uppercase tracking-widest text-[#000000]/40 text-[9px]">Area</span>
                            <span className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.area}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                         <Calendar size={18} className="text-[#28557F] mt-1 opacity-50" />
                         <div className="flex flex-col">
                            <span className="font-bold uppercase tracking-widest text-[#000000]/40 text-[9px]">Completion</span>
                            <span className="font-bold uppercase tracking-[0.1em] text-[#000000]">{blog.projectDetails?.completion}</span>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                         <FileText size={18} className="text-[#28557F] mt-1 opacity-50" />
                         <div className="flex flex-col">
                            <span className="font-bold uppercase tracking-widest text-[#000000]/40 text-[9px]">Scope</span>
                            <span className="font-bold uppercase tracking-[0.05em] text-[#000000] leading-relaxed pr-4">{blog.projectDetails?.scope}</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        )}

        {/* SPREAD 2: The Proposal & Functions */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-20 relative flex border-b lg:border-b-0 lg:border-r border-black/10">
              <div className="relative w-full h-full min-h-[500px]">
                 <Image src={blog.spread2BigImage} alt="Spread 2" fill className="object-cover" />
              </div>
           </div>
           <div className="w-full lg:w-1/2 p-12 md:p-24 relative flex flex-col">
              <div className="flex-grow flex flex-col justify-center max-w-lg mb-12">
                 <h2 className="text-2xl font-bold mb-6 text-[#000000] uppercase tracking-tight">The Proposal</h2>
                 <p className="text-[15px] max-w-lg leading-relaxed opacity-80 mb-6 font-medium whitespace-pre-wrap text-justify">
                    {blog.spread2Intro}
                 </p>
              </div>
              <div className="relative w-full h-[40%] min-h-[300px] grayscale hover:grayscale-0 transition-all duration-700">
                 <Image src={blog.spread2SmallImage} alt="Detail" fill className="object-cover" />
              </div>
           </div>
        </section>

        {/* NEW SPREAD 3: The Patient Journey (Expanded) */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-[#fafafa] border-b lg:border-b-0 lg:border-r border-black/10 text-justify">
              <h2 className="text-2xl font-bold mb-8 text-[#000000] uppercase tracking-tight">{blog.patientJourneyTitle || "The Patient Journey"}</h2>
              <p className="text-[15px] max-w-md mx-auto leading-relaxed opacity-80 mb-6 font-medium whitespace-pre-wrap">
                 {blog.patientJourneyDesc1}
              </p>
              <p className="text-[15px] max-w-md mx-auto leading-relaxed opacity-80 font-medium whitespace-pre-wrap">
                 {blog.patientJourneyDesc2}
              </p>
           </div>
           <div className="w-full lg:w-1/2 p-12 md:p-24 relative flex flex-col justify-between">
              <div className="relative w-full h-[55%] mb-12 shadow-md">
                 <Image src={blog.healingInteriorImage} alt="Healing Spaces" fill className="object-cover" />
              </div>
              <div className="p-8 border-l-4 border-black mb-auto mt-8">
                 <h3 className="text-lg font-bold text-[#000000] mb-4 uppercase">Architectural Wellness</h3>
                 <p className="text-[14px] leading-relaxed opacity-70 font-medium italic">
                    "Healing begins at the threshold. Our design philosophy centers on the neurological impact of space, where the architectural environment directly influences sensory perception and the physiological responses of the patient."
                 </p>
              </div>
           </div>
        </section>

        {/* SPREAD 4: Context & Smart Planning */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-24 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/10">
              <div className="max-w-md mx-auto mt-auto mb-16">
                 <h2 className="text-2xl font-bold mb-6 text-[#000000] uppercase tracking-tight">{blog.logisticsTitle || "Context & Smart Planning"}</h2>
                 <p className="text-[15px] leading-relaxed opacity-80 mb-6 font-medium whitespace-pre-wrap text-justify">
                    {blog.logisticsParagraph1}
                 </p>
                 <p className="text-[15px] leading-relaxed opacity-80 mb-10 font-medium pb-10 border-b border-black/10 whitespace-pre-wrap text-justify">
                    {blog.logisticsParagraph2}
                 </p>
              </div>
              <div className="relative w-full aspect-[4/3] shadow-sm max-w-md mx-auto mt-auto group overflow-hidden">
                 <Image src={blog.logisticsLeftImage} alt="Context 1" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
           </div>
           <div className="w-full lg:w-1/2 p-12 md:p-20 relative flex">
             <div className="relative w-full h-full min-h-[500px]">
                 <Image src={blog.logisticsRightImage} alt="Context 2" fill className="object-cover" />
             </div>
           </div>
        </section>

        {/* NEW SPREAD 5: Urban Materiality & Visual Detail */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row-reverse min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-24 relative flex flex-col justify-center bg-[#fafafa]">
              <h2 className="text-2xl font-bold mb-8 text-[#000000] uppercase tracking-tight">{blog.materialityTitle || "Urban Materiality"}</h2>
              <p className="text-[15px] max-w-md mx-auto leading-relaxed opacity-80 mb-8 font-medium whitespace-pre-wrap text-justify">
                 {blog.materialityDescription}
              </p>
              <div className="relative w-full h-[400px] shadow-2xl">
                 <Image src={blog.facadeDetailImage} alt="Materiality Detail" fill className="object-cover" />
              </div>
           </div>
           <div className="w-full lg:w-1/2 p-12 md:p-24 relative flex flex-col justify-between border-r border-black/10">
              <div className="relative w-full h-[65%] mb-12">
                 <Image src={blog.lobbyImage} alt="Lobby View" fill className="object-cover" />
              </div>
              <div className="max-w-md mt-8 mb-auto">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-[#000000]/60 mb-4">Facade Narrative</h3>
                 <p className="text-[14px] leading-relaxed opacity-80 font-medium text-justify">
                    The intersection of the glass curtain wall and textured stone paneling creates a visual dialogue with the surrounding urban medical campus. This choice of materiality is not merely aesthetic but functions to manage solar gain and thermal insulation across the facility's northern exposure. Each stone panel is placed to create a rhythmic shadow play that evolves with the sun's position, softening the building's massive clinical volume into a more human-scale architectural presence.
                 </p>
              </div>
           </div>
        </section>

        {/* SPREAD 6: Nocturnal Core & Strategy */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/10">
              <div className="max-w-md mb-12">
                 <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#000000]/60 mb-4">{blog.nocturnalTitle || "Nocturnal Strategy"}</p>
                 <p className="text-[15px] leading-relaxed opacity-80 font-medium whitespace-pre-wrap text-justify">
                    {blog.nocturnalDescription}
                 </p>
              </div>
              <div className="relative w-full h-[500px]">
                 <Image src={blog.nocturnalNightImage} alt="Night View" fill className="object-cover" />
              </div>
           </div>

           <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-between bg-[#fcfcfc]">
              <div className="relative w-full h-[350px] mb-12 border border-black/5 shadow-sm">
                 <Image src={blog.nocturnalDayImage} alt="Day View" fill className="object-cover" />
              </div>
              <div className="border-t-4 border-black pt-10 mb-auto mt-8 max-w-lg">
                 <h2 className="text-xl font-bold mb-6 text-[#000000] uppercase tracking-tight">Strategic Planning</h2>
                 <p className="text-[14px] leading-relaxed opacity-80 font-medium mb-4 text-justify">
                    For complex architectural projects, structural integrity and meticulous planning are crucial at every phase. The coordination of medical high-technology with traditional building systems requires an advanced level of foresight to prevent future operational conflicts.
                 </p>
                 <p className="text-[14px] leading-relaxed font-bold text-[#000000] uppercase tracking-wider text-justify">
                    Our vision as architects extends beyond design into the precise coordination of systems and safety parameters, ensuring that the facility remains a beacon of reliability and innovation in the healthcare community.
                 </p>
              </div>
           </div>
        </section>

        {/* SPREAD 7: Blueprint & Identity */}
        <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden">
           <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/10">
              <div className="mb-16 max-w-lg">
                 <h2 className="text-2xl font-bold mb-4 text-[#000000] uppercase tracking-tight">Blueprint Analysis</h2>
                 <p className="text-[14px] leading-relaxed opacity-80 font-medium pb-8 border-b border-black/10 whitespace-pre-wrap text-justify">
                    {blog.diagramQuote}
                 </p>
              </div>
              <div className="relative w-full aspect-square bg-[#fafafa] flex items-center justify-center p-8">
                 <Image src={blog.diagramBlueprintImage} alt="Blueprint" fill className="object-contain opacity-80 p-4" />
              </div>
           </div>

           <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-between bg-[#fafafa]">
              <div className="relative w-full h-[500px] bg-white shadow-sm overflow-hidden group mb-12">
                 <Image src={blog.conclusionImage} alt="Final Detail" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="max-w-lg mt-auto">
                 <h2 className="text-xl font-bold mb-4 text-[#000000] uppercase tracking-tight">Architectural Identity</h2>
                 <p className="text-[15px] leading-relaxed opacity-80 font-medium whitespace-pre-wrap text-justify">
                    {blog.diagramRightDesc}
                 </p>
              </div>
           </div>
        </section>

        {/* SPREAD: Technical Specifications & Credits (Based on reference image) */}
        {blog.technicalDetails && (
          <section className="w-full max-w-[1440px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row min-h-[900px] overflow-hidden p-8 md:p-16 lg:p-24 bg-white relative">
             <div className="absolute top-8 right-12 text-sm font-bold opacity-30">35</div>
             
             {/* Left side: Finishing Grid */}
             <div className="w-full lg:w-[45%] flex flex-col gap-12 border-b lg:border-b-0 lg:border-r border-black/10 pr-12">
                <div className="flex gap-4 items-start">
                   <div className="w-[120px] shrink-0">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/90 mb-2">Facade Finishes</h4>
                      <p className="text-[9px] opacity-60 leading-tight">
                         01 / {blog.technicalDetails.finishes.facade.desc}
                      </p>
                   </div>
                   <div className="flex-grow aspect-[3/5] relative bg-neutral-100 overflow-hidden">
                      <Image 
                         src={blog.technicalDetails.finishes.facade.images[0] || "/images/placeholder.png"} 
                         alt="Facade Finish" fill className="object-cover" 
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">01</span>
                   </div>
                </div>

                <div className="flex gap-4 items-start">
                   <div className="w-[120px] shrink-0">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/90 mb-2">Wall Finishes</h4>
                      <p className="text-[9px] opacity-60 leading-tight">
                         {blog.technicalDetails.finishes.wall.desc}
                      </p>
                   </div>
                   <div className="flex gap-4 w-full h-[400px]">
                      <div className="relative flex-grow h-full bg-neutral-100">
                         <Image src={blog.technicalDetails.finishes.wall.images[0] || "/images/placeholder.png"} alt="Wall Finish 1" fill className="object-cover" />
                         <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">02</span>
                      </div>
                      <div className="flex flex-col gap-4 w-[45%] h-full">
                         <div className="relative flex-grow bg-neutral-100">
                            <Image src={blog.technicalDetails.finishes.wall.images[1] || "/images/placeholder.png"} alt="Wall Finish 2" fill className="object-cover" />
                            <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">03</span>
                         </div>
                         <div className="relative flex-grow bg-neutral-100">
                            <Image src={blog.technicalDetails.finishes.wall.images[2] || "/images/placeholder.png"} alt="Wall Finish 3" fill className="object-cover" />
                            <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">04</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 items-start">
                   <div className="w-[120px] shrink-0">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-black/90 mb-2">Flooring Finishes</h4>
                      <p className="text-[9px] opacity-60 leading-tight">
                         {blog.technicalDetails.finishes.flooring.desc}
                      </p>
                   </div>
                   <div className="flex gap-4 w-full h-[300px]">
                      <div className="relative flex-grow h-full bg-neutral-100">
                         <Image src={blog.technicalDetails.finishes.flooring.images[0] || "/images/placeholder.png"} alt="Floor Finish 1" fill className="object-cover" />
                         <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">05</span>
                      </div>
                      <div className="relative flex-grow h-full bg-neutral-100">
                         <Image src={blog.technicalDetails.finishes.flooring.images[1] || "/images/placeholder.png"} alt="Floor Finish 2" fill className="object-cover" />
                         <span className="absolute bottom-2 left-2 text-[10px] italic font-bold opacity-40">06</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right side: Detailed Lists */}
             <div className="w-full lg:w-[55%] lg:pl-16 flex flex-col justify-center">
                <div className="mb-12 border-b border-black/10 pb-8">
                   <h3 className="text-xl font-bold tracking-tight mb-6">Unique Material Applications</h3>
                   <div className="grid grid-cols-1 gap-y-3">
                      {blog.technicalDetails.materials.map((m: any, idx: number) => (
                         <div key={idx} className="flex border-b border-black/5 pb-1 last:border-0">
                            <span className="w-[180px] text-[12px] font-bold">{m.label}</span>
                            <span className="text-[12px] opacity-70">: {m.value}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="mb-12 border-b border-black/10 pb-8">
                   <h3 className="text-xl font-bold tracking-tight mb-6">Key Contributors</h3>
                   <div className="grid grid-cols-1 gap-y-3">
                      {blog.technicalDetails.contributors.map((c: any, idx: number) => (
                         <div key={idx} className="flex border-b border-black/5 pb-1 last:border-0">
                            <span className="w-[180px] text-[12px] font-bold">{c.label}</span>
                            <span className="text-[12px] opacity-70">: {c.value}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div>
                   <h3 className="text-xl font-bold tracking-tight mb-6">Photo Credits</h3>
                   <div className="grid grid-cols-1 gap-y-3">
                      {blog.technicalDetails.photoCredits.map((p: any, idx: number) => (
                         <div key={idx} className="flex border-b border-black/5 pb-1 last:border-0">
                            <span className="w-[180px] text-[12px] font-bold">{p.label}</span>
                            <span className="text-[12px] opacity-70">: {p.value}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>
        )}

        {/* SPREAD 8: Conclusion */}
        <section className="w-full max-w-[1440px] shadow-[0_0_40px_rgba(0,0,0,0.1)] relative overflow-hidden flex items-end justify-end mb-24 min-h-[450px] md:min-h-[600px] aspect-[16/9] lg:aspect-[21/9] border border-black/5">
           <Image src={blog.conclusionImage} alt="Conclusion" fill className="object-cover object-center opacity-95" />
           <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 w-[90%] md:w-fit max-w-[420px] bg-[#fcfcfc]/95 backdrop-blur-md border-t-4 border-black p-6 text-justify shadow-2xl">
              <h2 className="text-base md:text-lg font-bold mb-4 text-[#000000] uppercase tracking-tight">{blog.conclusionTitle || "Final Vision"}</h2>
              <p className="text-[12px] leading-relaxed opacity-80 font-medium mb-3 whitespace-pre-wrap">{blog.conclusionP1}</p>
              <p className="text-[12px] leading-relaxed font-bold text-[#000000] pt-4 border-t border-black/10 uppercase tracking-widest">{blog.conclusionP3}</p>
           </div>
        </section>
      </div>
    </div>
  );
}
