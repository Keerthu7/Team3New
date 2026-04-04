"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { name: "Prince Piping Systems", src: "/images/clients/prince.png" },
  { name: "SRM Institute of Tech", src: "/images/clients/srm.png" },
  { name: "KMCH Speciality Hospital", src: "/images/clients/kmch.png" },
  { name: "Arya Bhavan", src: "/images/clients/arya-bhavan.png" },
  { name: "Dr. N.G.P. Arts & Science", src: "/images/clients/dr-ngp.png" },
];

export function LogoMarquee() {
  return (
    <div className="bg-white py-10 overflow-hidden border-y border-gray-100">
      <div className="flex whitespace-nowrap">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 30, // Animation speed
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-20 md:gap-32 pr-20 md:pr-32"
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              // 'grayscale' matrum 'opacity-50' eduthachu. Original color-la theriyum!
              className="relative w-28 h-12 md:w-40 md:h-16 cursor-default flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill
                className="object-contain" 
                sizes="(max-width: 768px) 112px, 160px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}