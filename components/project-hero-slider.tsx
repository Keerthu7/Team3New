"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectHeroSliderProps {
  images: string[];
}

export function ProjectHeroSlider({ images }: ProjectHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Safety check added
    if (!images || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); 

    return () => clearInterval(timer);
  }, [images]); // Dependency updated to watch the images array

  // If no images are provided, return null to avoid crashes
  if (!images || images.length === 0) {
    return null; 
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ 
            x: { type: "tween", duration: 0.6, ease: "linear" }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover"
            sizes="100vw"
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle Slide Indicators */}
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

      {/* Gradient Overlay for better contrast on indicators */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}