"use client";

import React from "react";
import {Header}  from "@/components/header";
import { MapPin, Phone, Mail, Send, ExternalLink, ChevronDown } from "lucide-react"; 
import { motion } from "framer-motion";

export default function ContactPage() {
  const googleMapsLink = "https://maps.app.goo.gl/YourActualLocationLink"; 

  return (
    <div className="bg-[#28557F] min-h-screen selection:bg-[#28557F]/10 font-sans">
      <Header />
      
      <main 
        // max-w-6xl la irunthu max-w-5xl aakiruken. Overall size innum compact aagum.
        className="max-w-5xl mx-auto px-6 min-h-screen flex flex-col"
      >
        <div className="flex-1 flex flex-col justify-center pt-[140px] pb-[60px]">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-20">
          
          {/* Left Column Wrapper */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-5" 
          >
            
            {/* Contact Info (White Card) - Padding & Spacing Reduced */}
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xl border border-gray-100 space-y-5">
              
              {/* Location */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F] transition-colors group-hover:bg-[#28557F]/10">
                  <MapPin size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-[#28557F] uppercase tracking-widest mb-1">Headquarters</h4>
                  <p className="text-gray-600 text-[12px] leading-relaxed">
                    Team 3 Associates, JKR Towers, <br />
                    Door No. 5/6, Sitra, <br />
                    Kalapatti, TN - 641048.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F] transition-colors group-hover:bg-[#28557F]/10">
                  <Phone size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-[#28557F] uppercase tracking-widest mb-1">Registry</h4>
                  <p className="text-gray-600 text-[12px] leading-relaxed">
                    +91 999 443 333 1111<br />
                    <span className="text-[10px] text-gray-400">Mon - Sat, 9:00 AM to 7:00 PM</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 shrink-0 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F] transition-colors group-hover:bg-[#28557F]/10">
                  <Mail size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-[#28557F] uppercase tracking-widest mb-1">Digital Inquiry</h4>
                  <p className="text-gray-600 text-[12px] leading-relaxed flex flex-col gap-0.5">
                    <a href="mailto:info@team3associates.com" className="hover:text-[#28557F] transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-[#28557F]/50">info@team3associates.com</a>
                    <a href="mailto:hello@team3associates.com" className="hover:text-[#28557F] transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-[#28557F]/50">hello@team3associates.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Map Section - Height Reduced to 180px */}
            <div className="relative w-full h-[180px] bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg group">
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md p-2 pr-3.5 rounded-lg flex items-center gap-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 max-w-[85%]"
              >
                <div className="flex-shrink-0 text-[#28557F]">
                  <ExternalLink size={14} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-800 leading-tight mb-0.5">
                    JKR Towers, Kalapatti Main Rd,
                  </span>
                  <span className="text-[8px] font-medium text-gray-500 leading-tight">
                    Sitra, Coimbatore - 641048
                  </span>
                </div>
              </a>
              
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.033324021234!2d77.03333333333333!3d11.033333333333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAyJzAwLjAiTiA3N8KwMDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1633333333333!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 transition-all duration-700 group-hover:opacity-100" 
              ></iframe>
            </div>

          </motion.div>

          {/* Contact Form (Right Side) - Padding & Height Adjustments */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col justify-center"
          >
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-600">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-3.5 py-2 text-[13px] text-gray-900 outline-none focus:border-[#28557F] focus:ring-1 focus:ring-[#28557F] placeholder:text-gray-400" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-gray-600">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-3.5 py-2 text-[13px] text-gray-900 outline-none focus:border-[#28557F] focus:ring-1 focus:ring-[#28557F] placeholder:text-gray-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Service Category</label>
                <div className="relative">
                  <select defaultValue="" className="w-full border border-gray-200 rounded-lg bg-gray-50 px-3.5 py-2 text-[13px] text-gray-900 outline-none focus:border-[#28557F] focus:ring-1 focus:ring-[#28557F] appearance-none cursor-pointer placeholder:text-gray-400">
                    <option value="" disabled className="bg-white text-gray-500">Select interest</option>
                    <option value="Residential" className="bg-white text-gray-900">Residential Architecture</option>
                    <option value="Commercial" className="bg-white text-gray-900">Commercial Spaces</option>
                    <option value="Interior" className="bg-white text-gray-900">Interior Design</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-gray-600">Message Details *</label>
                {/* Textarea rows reduced to 4 */}
                <textarea rows={4} placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-lg bg-gray-50 px-3.5 py-2 text-[13px] text-gray-900 outline-none focus:border-[#28557F] focus:ring-1 focus:ring-[#28557F] resize-none placeholder:text-gray-400"></textarea>
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#28557F] text-white px-8 py-3 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2.5 group transition-all hover:bg-[#1e4061] shadow-md shadow-[#28557F]/10">
                Submit Inquiry
                <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
        </div>
      </main>
 
    </div>
  );
}