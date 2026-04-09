"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Framer motion import panniruken

export function OurClients() {
  const logos = [
    { name: "Prince Piping Systems", src: "/images/clients/prince.png" },
    { name: "SRM Institute of Tech", src: "/images/clients/srm.png" },
    { name: "KMCH Speciality Hospital", src: "/images/clients/kmch.png" },
    { name: "Arya Bhavan", src: "/images/clients/arya-bhavan.png" },
    { name: "Dr. N.G.P. Arts & Science", src: "/images/clients/dr-ngp.png" },
  ];

  // Infinite scroll seamless-a irukka, logos-a 4 times duplicate pannirukom
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section id="clients" className="pt-20 pb-8 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-xl md:text-2xl font-bold text-center tracking-[0.3em] uppercase text-primary">
          Our Clients
        </h2>
      </div>
      
      {/* Logos Container */}
      <div className="flex flex-col gap-12 md:gap-16 relative w-full">
        
        {/* ROW 1: Auto-scroll Left */}
        <div className="flex w-full">
          <motion.div 
            className="flex gap-12 md:gap-20 items-center min-w-max"
            // 0% la irunthu -50% ku continuous a move aagum
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25 // Speed-a matha intha value-a mathikonga (e.g., 15 fast aagum, 30 slow aagum)
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <div 
                key={`row1-${index}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 group cursor-default"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100" 
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ROW 2: Auto-scroll Right */}
        <div className="flex w-full">
          <motion.div 
            className="flex gap-12 md:gap-20 items-center min-w-max"
            // -50% la irunthu 0% ku continuous a (Right side) move aagum
            animate={{ x: ["-50%", "0%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25 // Row 2 speed
            }}
          >
            {marqueeLogos.map((logo, index) => (
              <div 
                key={`row2-${index}`} 
                className="relative w-28 h-12 md:w-36 md:h-16 flex-shrink-0 group cursor-default"
              >
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100" 
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}