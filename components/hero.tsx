"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const desktopImages = [
  "/images/project1.png",
  "/images/project2.png",
  "/images/project3.png",
  "/images/project4.png",
  "/images/project5.png",
];

const mobileImages = [
  "/images/project1-mobile.png",
  "/images/project2-mobile.png",
  "/images/project3-mobile.png",
  "/images/project4-mobile.png",
  "/images/project5-mobile.png",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 3000); // 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 md:pb-32 bg-black">
      {/* Desktop Slider */}
      <div className="absolute inset-0 hidden md:block">
        {desktopImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1000ms ease-in-out",
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Project Slide ${index + 1}`}
              fill
              className={`object-cover brightness-110 contrast-[1.02] ${
                src.includes("project4") || src.includes("project2") ? "object-top" : "object-center"
              }`}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Subtle Cinematic Overlay (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Mobile Slider */}
      <div className="absolute inset-0 block md:hidden">
        {mobileImages.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 1000ms ease-in-out",
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt={`Project Slide Mobile ${index + 1}`}
              fill
              className={`object-cover brightness-110 contrast-[1.02] ${
                src.includes("project4") || src.includes("project2") ? "object-top" : "object-center"
              }`}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Subtle Cinematic Overlay (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
      </div>



      {/* Floating Header Space Overlay (Lightened) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-20" />
      
      {/* Text and Buttons have been completely removed */}
    </section>
  );
}