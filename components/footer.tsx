"use client";

import React from "react";
import Link from "next/link";
import { Globe, Mail, MessageSquare, Link2, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white selection:bg-white/20">
      {/* MAIN FOOTER BODY */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          
          {/* COLUMN 1: STUDIO IDENTITY */}
          <div className="flex flex-col gap-10">
            <Link href="/" className="group">
              <div className="flex items-center gap-4">
                <span className="text-white text-2xl font-black tracking-tighter">T3</span>
                <div className="w-[1px] h-8 bg-white/20" />
                <div className="flex flex-col leading-none">
                  <div className="flex items-end">
                    <span className="text-white text-[13px] font-bold uppercase tracking-tight">Team</span>
                    <span className="text-white text-2xl font-bold leading-[0.7] ml-1">3</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mt-0.5">Associates</span>
                </div>
              </div>
            </Link>
            <p className="text-[13px] font-medium leading-relaxed text-white/50 max-w-xs">
              A multidisciplinary architecture and interior design studio dedicated to blending aesthetic innovation with structural integrity since 1998.
            </p>
          </div>

          {/* COLUMN 2: DISCOVERY */}
          <div className="flex flex-col gap-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Portfolio</h4>
            <div className="flex flex-col gap-5 text-[13px] font-semibold text-white/80">
              <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-2 group">
                Selected Works <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </Link>
              <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group">
                Studio Profile <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2 group">
                Journal <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </Link>
            </div>
          </div>

          {/* COLUMN 3: PRESENCE */}
          <div className="flex flex-col gap-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Presence</h4>
            <div className="flex flex-col gap-6 text-[13px] font-medium text-white/50 leading-relaxed">
              <div>
                <p className="text-white/80 font-semibold mb-1">Salem HQ</p>
                <p>104 Raman / Venkatasamy Road, RS Puram</p>
                <p>Tamil Nadu, India.</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="text-white/80 font-semibold mb-1">Coimbatore Studio</p>
                <p>Coming Soon</p>
              </div>
            </div>
          </div>

          {/* COLUMN 4: INQUIRY */}
          <div className="flex flex-col gap-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Connect</h4>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <a href="mailto:info@team3associates.com" className="text-[15px] font-bold text-white hover:text-white/60 transition-colors underline underline-offset-8 decoration-white/20">
                  info@team3associates.com
                </a>
                <p className="text-[13px] font-semibold text-white/40">+91 999 443 333 1111</p>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"><Globe size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"><Link2 size={18} /></a>
                <a href="mailto:info@team3associates.com" className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"><Mail size={18} /></a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* WHITE COPYRIGHT BAR (Requested Style) */}
      <div className="bg-white py-10 selection:bg-black/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em]">
            © {currentYear} Team3 Associates. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-black text-black uppercase tracking-[0.4em] flex items-center gap-3">
            <span className="text-black/30 font-bold tracking-[0.3em]">POWERED BY</span>
            <span className="bg-black text-white px-3 py-1 scale-110">HYNOX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
