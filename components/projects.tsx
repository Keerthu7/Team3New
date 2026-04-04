"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const projectData = [
  {
    id: 1,
    name: "Mr. Jagan residence",
    location: "Coimbatore",
    description: "A modern, sustainable architecture featuring sleek design, open spaces, and seamless indoor-outdoor living integration safely anchored by premium engineering.",
    date: "21, DEC 2025",
    image: "/images/interiors/jagan_int.png",
    interiorImage: "/images/project1.png",
  },
  {
    id: 2,
    name: "Mr. Ramesh residence",
    location: "Coimbatore",
    description: "Luxury reimagined through a minimalist lens. This residence combines glass and stone to create a timeless sanctuary for urban living.",
    date: "15, JAN 2026",
    image: "/images/interiors/ramesh_int.png",
    interiorImage: "/images/project2.png",
  },
  {
    id: 3,
    name: "KMCH Diagnostic Centre",
    location: "Coimbatore",
    description: "Cutting-edge healthcare infrastructure designed for efficiency and patient comfort. A synthesis of advanced technology and human-centric design.",
    date: "10, FEB 2026",
    image: "/images/interiors/kmch_int.png",
    interiorImage: "/images/project3.png",
  },
  {
    id: 4,
    name: "Siva Trade Centre",
    location: "Coimbatore",
    description: "A commercial landmark that redefines the skyline. Integrated workspace solutions with a focus on sustainability and structural excellence.",
    date: "05, MAR 2026",
    image: "/images/interiors/siva_int.png",
    interiorImage: "/images/project4.png",
  },
  {
    id: 5,
    name: "D.R.G commercial complex",
    location: "Coimbatore",
    description: "Multi-functional spaces designed for retail and premium offices. A bold architectural statement in the heart of the city's trade hub.",
    date: "20, APR 2026",
    image: "/images/interiors/drg_int.png",
    interiorImage: "/images/project5.png",
  },
];

function ProjectItem({ project, index }: { project: typeof projectData[0], index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // v4.1: Unified Offset for all projects.
  // Using 100px clearance to ensure Stage 1 is immediately obvious.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end end"],
  });

  // Stage 1: Branding Overlay (Bottom Left)
  // v4.1: Strictly ends at 30% to make room for the transition buffer.
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  // Stage 2: Detailed Card (Top Right)
  // v4.1: Only starts appearing at 50% AFTER the 20% safe buffer zone.
  const cardOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 1], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.65], [0.95, 1]);
  const cardY = useTransform(scrollYProgress, [0.85, 1], [0, -50]);

  // Background Image Scale
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative h-[350vh] w-full bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Image Layer */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>

        {/* Stage 1: Branding Overlay */}
        <motion.div 
          style={{ opacity: stage1Opacity, y: stage1Y }}
          className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 pointer-events-none"
        >
          <div className="max-w-2xl drop-shadow-xl">
            <h3 className="text-3xl md:text-5xl font-semibold text-white uppercase tracking-tighter leading-[0.85] mb-4">
              {project.name}
            </h3>
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-base font-semibold text-white uppercase tracking-[0.4em]">
                {project.location}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stage 2: Detailed Card */}
        <motion.div 
          style={{ opacity: cardOpacity, scale: cardScale, y: cardY }}
          className="absolute inset-0 flex items-start justify-end p-6 md:p-12 z-30 pointer-events-none"
        >
          <div className="bg-white/95 backdrop-blur-2xl rounded-none p-5 md:p-6 max-w-sm w-full shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/40 pointer-events-auto flex flex-col gap-5 mt-24">
            <div className="flex items-center justify-between">
              <div className="bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-none flex items-center gap-2">
                <div className="grid grid-cols-2 gap-1 animate-pulse">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-0.5 h-0.5 bg-primary rounded-full" />
                  ))}
                </div>
                <span className="text-[9px] font-semibold text-primary tracking-[0.3em] uppercase">Architecture</span>
              </div>
              <span className="text-[9px] font-semibold text-gray-400 tracking-[0.2em] uppercase">
                {project.date}
              </span>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-none overflow-hidden shadow-lg border border-white/50">
              <Image src={project.interiorImage} alt={project.name} fill className="object-cover" />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-3 leading-tight uppercase tracking-tighter">
                {project.name}
              </h3>
              <p className="text-gray-500 leading-relaxed font-semibold mb-6 text-[10px] md:text-[11px] pr-2">
                {project.description}
              </p>
              <Link href={`/projects/${project.id}`}>
                <button className="w-full px-8 py-3 bg-primary text-white rounded-none font-semibold text-[9px] uppercase tracking-[0.25em] hover:bg-black transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-3 group">
                  Check Project
                  <div className="w-4 h-4 rounded-none bg-white/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-1 h-1 bg-white rounded-none shadow-sm" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  return (
    <>
      <section id="projects" className="w-full bg-white">
        {projectData.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </section>
    </>
  );
}
