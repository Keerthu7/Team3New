"use client";

import React, { useState } from "react";
import Image from "next/image"; // Image component import aagi irukanum
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
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-[#28557F]/5 px-8 md:px-16 py-4 transition-all duration-300">
      <nav className="flex w-full max-w-[1700px] mx-auto items-center justify-between">
        
        {/* LOGO SECTION - Ithu thaan maathi iruken */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image 
            src="/images/logo.png" // Unga logo-voda sariyana path-a inga kudunga
            alt="Team 3 Associates" 
            width={180} // Logo-voda agalam (ungaluku yetha maari mathikonga)
            height={50} // Logo-voda uyaram
            priority // Header logo dhu priority true kudukrathu nallathu
            className="object-contain h-auto w-auto max-h-[40px]" // Style adjust panna
          />
        </Link>

        {/* Desktop Nav Section */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-bold text-[#28557F] hover:opacity-70 transition-all tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#28557F]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[14px] font-bold text-[#28557F] hover:opacity-70 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}