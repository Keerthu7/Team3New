"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Projects", href: "/projects" },
    { label: "About us", href: "/about" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ];

  return (
    // Periya logo fit aaga header height lite ah increase panni irukken: h-[60px] & md:h-[70px]
    <header className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[850px] bg-white rounded-[100px] px-6 md:px-8 h-[60px] md:h-[70px] shadow-md flex items-center justify-between">
      
      {/* LOGO SECTION - Logo size perusa aakkiyachu */}
      <Link href="/" className="flex items-center h-full hover:opacity-80 transition-opacity ml-2 md:ml-4 translate-y-[2px]">
        <Image 
          src="/images/logo.png" 
          alt="Team 3 Associates" 
          width={240} 
          height={60} 
          priority 
          // max-h increase panni logo-va highlight panni irukken: max-h-[44px] md:max-h-[52px]
          className="object-contain h-auto w-auto max-h-[44px] md:max-h-[52px]" 
        />
      </Link>

      {/* Desktop Nav Section */}
      <div className="hidden items-center gap-6 lg:gap-10 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            // Text size 14px la irundhu 12px aakki chinnadhu panni irukken
            className="text-[12px] font-medium text-[#1A4A75] hover:opacity-70 transition-all tracking-wide"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-[#1A4A75] p-2 hover:bg-gray-100 rounded-full transition-colors mr-1 flex items-center justify-center"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[115%] left-0 w-full bg-white rounded-[24px] shadow-xl p-5 flex flex-col gap-4 md:hidden border border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              // Mobile view-layum text size 12px aakkiyachu
              className="text-[12px] font-medium text-[#1A4A75] hover:opacity-70 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}