"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectHeroSliderProps {
  images: string[];
}

export function ProjectHeroSlider({ images }: ProjectHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>([]);

  // Initialise loaded state array
  useEffect(() => {
    setLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  // Auto-advance only after the next image is loaded
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

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
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "eager"} // preload all
            className="w-full h-full object-cover"
            sizes="100vw"
            quality={85}
            onLoad={() =>
              setLoaded((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              })
            }
          />
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
    </div>
  );
}