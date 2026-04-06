"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer"; 
import { MapPin, Phone, Mail, Send, ExternalLink, ChevronDown } from "lucide-react"; 
import { motion } from "framer-motion";

export default function ContactPage() {
  const googleMapsLink = "https://maps.app.goo.gl/YourActualLocationLink"; 

  return (
    <div className="bg-[#28557F] min-h-screen selection:bg-[#28557F]/10 font-sans relative flex flex-col overflow-x-hidden">
      <Header />

      {/* 1. DESKTOP ONLY: Floating Social Icons */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-5 z-50"
      >
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <div className="h-16 w-[1px] bg-white/20 mx-auto mt-2"></div>
      </motion.div>

      {/* 2. WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/919994433331111" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-5 md:bottom-24 md:right-8 z-[100] bg-[#25D366] text-white p-3 rounded-full shadow-xl hover:bg-[#20ba56] transition-all flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className="md:w-[28px] md:h-[28px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462-1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>
      
      <main className="w-full max-w-5xl mx-auto px-5 lg:px-8 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center pt-[120px] md:pt-[140px] pb-24 md:pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-5 w-full" 
            >
              <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                <div className="space-y-5 text-[#28557F]">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center"><MapPin size={15} /></div>
                    <div><h4 className="text-[10px] font-bold uppercase tracking-widest mb-1">Headquarters</h4><p className="text-gray-600 text-[12px] leading-relaxed">Team 3 Associates, JKR Towers, Sitra, Coimbatore - 641048.</p></div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center"><Phone size={15} /></div>
                    <div><h4 className="text-[10px] font-bold uppercase tracking-widest mb-1">Registry</h4><p className="text-gray-600 text-[12px] leading-relaxed">+91 999 443 333 1111</p></div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center"><Mail size={15} /></div>
                    <div><h4 className="text-[10px] font-bold uppercase tracking-widest mb-1">Digital Inquiry</h4><p className="text-gray-600 text-[12px] leading-relaxed break-all font-medium">info@team3associates.com</p></div>
                  </div>
                </div>

                {/* 3. MOBILE VIEW ONLY SOCIAL ICONS (This was hidden before) */}
                <div className="lg:hidden flex items-center justify-center gap-6 pt-6 mt-6 border-t border-gray-100">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>

              {/* MAP CARD */}
              <div className="relative w-full h-[220px] md:h-[260px] bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <a href={googleMapsLink} target="_blank" className="absolute top-3 left-3 z-20 bg-white/95 p-2 rounded-lg flex items-center gap-2 shadow-md">
                  <ExternalLink size={14} className="text-[#28557F]" />
                  <span className="text-[10px] font-bold text-gray-800">Sitra, Coimbatore</span>
                </a>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.033324021234!2d77.03333333333333!3d11.033333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAyJzAwLjAiTiA3N8KwMDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1633333333333!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" className="opacity-90 object-cover"></iframe>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-7 bg-white p-7 md:p-10 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-center w-full"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-gray-600">Full Name *</label>
                    <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-4 py-3 text-[14px] outline-none focus:ring-1 focus:ring-[#28557F]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-gray-600">Email Address *</label>
                    <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-4 py-3 text-[14px] outline-none focus:ring-1 focus:ring-[#28557F]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-gray-600">Service Category</label>
                  <div className="relative">
                    <select defaultValue="" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-4 py-3 text-[14px] appearance-none outline-none focus:ring-1 focus:ring-[#28557F]">
                      <option value="" disabled>Select interest</option>
                      <option value="Residential">Residential Architecture</option>
                      <option value="Commercial">Commercial Spaces</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[12px] font-semibold text-gray-600">Message Details *</label>
                  <textarea rows={5} placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-lg bg-gray-50 px-4 py-3 text-[14px] resize-none outline-none focus:ring-1 focus:ring-[#28557F]"></textarea>
                </div>

                <button type="submit" className="w-full sm:w-auto bg-[#28557F] text-white px-10 py-4 rounded-lg text-[14px] font-bold flex items-center justify-center gap-3 hover:bg-[#1e4061] transition-all shadow-lg">
                  Submit Inquiry <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}