"use client";

import React from "react";
import Image from "next/image";

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
        {/* Subtle Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-10" />
      </div>

      {/* Floating Header Space Overlay */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-20" />
      
      {/* Text and Buttons have been completely removed */}
    </section>
  );
}