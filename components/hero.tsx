"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-end pb-24 md:pb-32">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Modern Architectural House"
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Cinematic Overlay (Darker at bottom for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-10" />
      </div>

      {/* Floating Header Space Overlay */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-20" />

      {/* Hero Content Overlay (Exact Alignment from Image) */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-[6vw] md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter mb-10">
              Curating Space & <br />
              <span className="opacity-90">Architectural</span> <br />
              <span className="text-white">Excellence</span>
            </h1>

            <p className="text-[13px] md:text-base text-white/80 font-medium max-w-xl leading-relaxed mb-12">
              Since 1998, Team 3 Associates has been crafting environments that inspire. 
              From luxury residences to prestigious healthcare institutions.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link href="/projects">
                <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-[8px] md:text-[9px] uppercase tracking-[0.25em] hover:bg-[#28557F] hover:text-white transition-all shadow-2xl duration-500 min-w-[200px]">
                  Explore Projects
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-10 py-5 bg-transparent text-white border border-white/40 backdrop-blur-md rounded-full font-bold text-[8px] md:text-[9px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500 min-w-[200px]">
                  Work With Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
