"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex flex-col font-sans">
      {/* Top Blue Section */}
      <div className="w-full bg-[#28557F] text-white py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-6 flex flex-col lg:pr-12 border-b md:border-b-0 border-white/10 pb-10 md:pb-0">
            <Image 
              src="/images/logo.png" 
              alt="Team 3 Associates" 
              width={200} 
              height={55} 
              className="object-contain object-left mr-auto h-auto w-auto max-h-[48px] brightness-0 invert opacity-100 mb-6" 
            />
            <p className="text-[15px] font-medium leading-loose text-white md:max-w-[85%] text-justify">
              A multidisciplinary architecture studio dedicated to creating refined spaces that inspire human connection and elevate the built environment.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              {/* Facebook */}
              <Link href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28557F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="https://www.instagram.com/team3_associates?igsh=am10cWh1dGc3NDd4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28557F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28557F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#28557F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Information Links */}
          <div className="lg:col-span-3 flex flex-col border-b md:border-b-0 border-white/10 pb-10 md:pb-0">
            <h3 className="text-lg font-bold mb-6 tracking-wide">Information</h3>
            <div className="flex flex-col gap-5">
              <Link href="/about" className="text-[15px] hover:translate-x-1 hover:text-white/70 transition-all font-medium">About Us</Link>
              <Link href="/projects" className="text-[15px] hover:translate-x-1 hover:text-white/70 transition-all font-medium">Projects</Link>
              <Link href="/blog" className="text-[15px] hover:translate-x-1 hover:text-white/70 transition-all font-medium">Blogs</Link>
              <Link href="/contact" className="text-[15px] hover:translate-x-1 hover:text-white/70 transition-all font-medium">Contact Us</Link>
            </div>
          </div>

          {/* Column 3: Location Details */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="text-lg font-bold mb-6 tracking-wide">Location</h3>
            <div className="text-[15px] font-medium leading-[1.8] mb-6">
              <p>JKR Towers, Door No. 5/6,</p>
              <p>Moonlight Garden, Sitra</p>
              <p>Kalapatti Road,</p>
              <p>Coimbatore, Tamil Nadu 641048</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-white/80" strokeWidth={1.5} />
                <span className="text-[15px] font-bold tracking-wide">9092433339</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-white/80" strokeWidth={1.5} />
                <span className="text-[15px] font-bold tracking-wide">admin@t3associates.in</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom White Section */}
      <div className="w-full bg-white py-6 shadow-sm border-t border-gray-100 flex items-center justify-center">
        <p className="text-[15px] text-[#1a1a1a] font-medium tracking-wide">
          © {currentYear} HYNOX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}