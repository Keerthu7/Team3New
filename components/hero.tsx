"use client";

import React from "react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-end pb-24 md:pb-32">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Modern Architectural House"
          fill
          className="object-cover brightness-110 contrast-[1.02]"
          priority
          sizes="100vw"
        />
        {/* Subtle Cinematic Overlay (Lightened) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
      </div>

      {/* Floating Header Space Overlay (Lightened) */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-20" />
      
      {/* Text and Buttons have been completely removed */}
    </section>
  );
}