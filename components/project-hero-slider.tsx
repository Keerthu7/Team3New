"use client";

import React, { useState, useEffect } from "react";
import { LoadingImage } from "./loading-image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectHeroSliderProps {
  images: string[];
}

export function ProjectHeroSlider({ images }: ProjectHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds
    return () => clearInterval(timer);
  }, [images, currentIndex]); // Reset interval when slide changes manually

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
      {/* Render ALL images stacked — only visible one has opacity-100 */}
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: "opacity 600ms ease-in-out",
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <LoadingImage
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="w-full h-full object-cover"
            sizes="100vw"
            quality={95}
          />
        </div>
      ))}

      {/* Manual Navigation Controls */}
      {images.length > 1 && (
        <>
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
        </>
      )}

      {/* Slide Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
    </div>
  );
}