"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Background color set to match the exact blue in the image
    <footer className="w-full bg-[#28557F] py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* LEFT SIDE: Copyright Text */}
        <p className="text-[13px] font-medium text-white tracking-wide">
          © {currentYear} HYNOX. All rights reserved.
        </p>
        
        {/* RIGHT SIDE: Links */}
        <div className="flex items-center gap-6">
          <Link 
            href="/about" 
            className="text-[14px] font-bold text-white hover:text-white/80 transition-colors"
          >
            About us
          </Link>
          <Link 
            href="/contact" 
            className="text-[14px] font-bold text-white hover:text-white/80 transition-colors"
          >
            contact us
          </Link>
        </div>

      </div>
    </footer>
  );
}