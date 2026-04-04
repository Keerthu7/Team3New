"use client";

import React from "react";
import Image from "next/image"; // Next.js Image import panniyachu

export function OurClients() {
  // Text-ku bathila Image path (src) add pannirukom
  const logos = [
    { name: "Prince Piping Systems", src: "/images/clients/prince.png" },
    { name: "SRM Institute of Tech", src: "/images/clients/srm.png" },
    { name: "KMCH Speciality Hospital", src: "/images/clients/kmch.png" },
    { name: "Arya Bhavan", src: "/images/clients/arya-bhavan.png" },
    { name: "Dr. N.G.P. Arts & Science", src: "/images/clients/dr-ngp.png" },
  ];

  // Repeat for 2 rows to match the reference
  const allLogos = [...logos, ...logos];

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-bold text-center tracking-[0.3em] uppercase mb-16 text-primary">
          Our Clients
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-8 items-center justify-items-center">
          {allLogos.map((logo, index) => (
            <div 
              key={index} 
              // Size adjust panniruken (width & height), mela pogumpothu scale aagum
              className="relative w-28 h-12 md:w-36 md:h-16 flex flex-col items-center group cursor-default"
            >
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300" 
                sizes="(max-width: 768px) 112px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}