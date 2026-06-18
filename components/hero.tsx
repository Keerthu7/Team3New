"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const desktopImages = [
  "/images/project1.png",
  "/images/project2.png",
  "/images/project3.png",
  "/images/project4.png",
  "/images/project5.png",
];

const mobileImages = [
   "/images/project1.png",
  "/images/project2-mobile.png",
  "/images/project3-mobile.png",
  "/images/project4-mobile.png",
  "/images/project5-mobile.png",
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
  };

  const handleDotClick = (index: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 md:pb-32 bg-black">
      {/* Desktop Slider */}
      <div className="absolute inset-0 hidden md:block">
        {desktopImages.map((src, index) => {
          const isCurrent = index === currentIndex;
          const isPrev = index === prevIndex;
          
          return (
            <div
              key={src}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out`}
              style={{
                opacity: isCurrent || isPrev ? 1 : 0,
                zIndex: isCurrent ? 10 : (isPrev ? 5 : 0),
              }}
            >
              <Image
                src={src}
                alt={`Project Slide ${index + 1}`}
                fill
                className={`object-cover brightness-110 contrast-[1.02] ${
                  src.includes("project4") || src.includes("project2") ? "object-top" : "object-center"
                }`}
                priority
                sizes="100vw"
                quality={95}
              />
            </div>
          );
        })}
        {/* Subtle Cinematic Overlay (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Mobile Slider */}
      <div className="absolute inset-0 block md:hidden overflow-hidden">
        <div 
          className="h-full flex transition-transform duration-1000 ease-in-out"
          style={{ 
            width: `${mobileImages.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / mobileImages.length)}%)` 
          }}
        >
          {mobileImages.map((src, index) => (
            <div
              key={src}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / mobileImages.length}%` }}
            >
              <Image
                src={src}
                alt={`Project Slide Mobile ${index + 1}`}
                fill
                className={`object-cover brightness-110 contrast-[1.02] ${
                  src.includes("project4") || src.includes("project2") ? "object-top" : "object-center"
                }`}
                priority
                sizes="100vw"
                quality={95}
              />
            </div>
          ))}
        </div>
        {/* Subtle Cinematic Overlay (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Manual Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/25 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all duration-300 border border-white/10 group cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/25 hover:bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all duration-300 border border-white/10 group cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {desktopImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Header Space Overlay (Lightened) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-20" />
      
      {/* Text and Buttons have been completely removed */}
    </section>
  );
}