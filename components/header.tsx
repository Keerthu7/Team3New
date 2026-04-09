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
    // Header size konjam reduce panniyachu (py-3 to py-2)
    <header className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] w-[88%] max-w-[1050px] bg-white rounded-[100px] px-8 md:px-10 py-2 shadow-md flex items-center justify-between">
      
      {/* LOGO SECTION - Size reduced slightly */}
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity ml-2 md:ml-4">
        <Image 
          src="/images/logo.png" 
          alt="Team 3 Associates" 
          width={190} 
          height={50} 
          priority 
          // Max height slightly reduced
          className="object-contain h-auto w-auto max-h-[40px] md:max-h-[46px]" 
        />
      </Link>

      {/* Desktop Nav Section */}
      <div className="hidden items-center gap-8 lg:gap-12 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[14px] font-medium text-[#1A4A75] hover:opacity-70 transition-all tracking-wide"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-[#1A4A75] p-2 hover:bg-gray-100 rounded-full transition-colors mr-1"
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
              className="text-[14px] font-medium text-[#1A4A75] hover:opacity-70 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}