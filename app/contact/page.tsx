"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MapPin, Phone, Mail, Send, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  // Intha link-ai ungaludaiya sariyana Google Maps location link-ku maathikollavum
  const googleMapsLink = "https://maps.google.com/?q=Team+3+Associates+JKR+Towers+Kalapatti";

  return (
    <div className="bg-[#28557F] min-h-screen selection:bg-white/10 font-sans">
      <Header />
      
      <main 
        className="max-w-7xl mx-auto px-6 min-h-screen flex flex-col"
      >
        <div className="flex-1 flex flex-col justify-center pt-[112px] pb-[40px]">
        {/* Header Section Removed */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-20">
          
          {/* Contact Information (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-10"
          >
            <div className="space-y-6">
              {/* Location - Updated with New Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white shadow-sm transition-colors group-hover:border-white/40 group-hover:bg-white/20">
                  <MapPin size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Headquarters</h4>
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    Team 3 Associates, JKR Towers, <br />
                    Door No. 5/6, Moonlight Gardens Sitra, <br />
                    Kalapatti Main Rd, Kalapatti, TN - 641048.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white shadow-sm transition-colors group-hover:border-white/40 group-hover:bg-white/20">
                  <Phone size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Registry</h4>
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    +91 999 443 333 1111<br />
                    <span className="text-[12px] opacity-60">Mon - Sat, 9:00 AM to 7:00 PM IST</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white shadow-sm transition-colors group-hover:border-white/40 group-hover:bg-white/20">
                  <Mail size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Digital Inquiry</h4>
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    <a href="mailto:info@team3associates.com" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">info@team3associates.com</a><br />
                    <a href="mailto:hello@team3associates.com" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">hello@team3associates.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Map Section with Address Card */}
            <div className="relative w-full h-[240px] bg-gray-200 rounded-lg overflow-hidden border border-gray-200 mt-2 shadow-sm group">
              <a 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 pr-5 rounded-xl flex items-center gap-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-gray-100 max-w-[90%]"
              >
                <div className="flex-shrink-0 text-[#28557F]">
                  <ExternalLink size={18} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-800 leading-tight mb-0.5">
                    JKR Towers, Kalapatti Main Rd,
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 leading-tight">
                    Sitra, Coimbatore - 641048
                  </span>
                </div>
              </a>
              
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.783268884617!2d77.0378!3d11.0556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8570000000001%3A0x0!2zMTHCsDAzJzIwLjIiTiA3N8KwMDInMTYuMSJF!5e0!3m2!1sen!2sin!4v1712230000000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-100 transition-all duration-700"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 bg-white/5 p-8 md:p-12 rounded-xl border border-white/10 backdrop-blur-sm"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[12px] font-medium text-white/60">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full border border-white/20 rounded-md bg-white/5 px-4 py-3 text-[14px] text-white outline-none focus:border-white/50 placeholder:text-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-medium text-white/60">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className="w-full border border-white/20 rounded-md bg-white/5 px-4 py-3 text-[14px] text-white outline-none focus:border-white/50 placeholder:text-white/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-white/60">Service Category</label>
                <div className="relative">
                  <select defaultValue="" className="w-full border border-white/20 rounded-md bg-white/5 px-4 py-3 text-[14px] text-white outline-none focus:border-white/50 appearance-none cursor-pointer">
                    <option value="" disabled className="bg-[#28557F]">Select interest</option>
                    <option value="Residential" className="bg-[#28557F]">Residential Architecture</option>
                    <option value="Commercial" className="bg-[#28557F]">Commercial Spaces</option>
                    <option value="Interior" className="bg-[#28557F]">Interior Design</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-white/60">Message Details *</label>
                <textarea rows={5} placeholder="Tell us about your project..." className="w-full border border-white/20 rounded-md bg-white/5 px-4 py-3 text-[14px] text-white outline-none focus:border-white/50 resize-none placeholder:text-white/20"></textarea>
              </div>

              <button type="submit" className="w-full sm:w-auto bg-white text-[#28557F] px-10 py-4 rounded-md text-[13px] font-bold flex items-center justify-center gap-3 group transition-all hover:bg-white/90">
                Submit Inquiry
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
    </div>
  );
}