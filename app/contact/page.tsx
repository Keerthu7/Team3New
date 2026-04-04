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
    <div className="bg-[#FAFAFC] min-h-screen selection:bg-[#28557F]/10 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-[#28557F]/30"></div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#28557F]">
              Connect With Us
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 tracking-tight leading-[1.1]">
            Let's discuss your next <br />
            <span className="font-semibold text-[#28557F]">architectural vision.</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
            Reach out to our studio for consultations, project inquiries, or to simply start a conversation about your structural needs.
          </p>
        </motion.div>

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
                <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#28557F] shadow-sm transition-colors group-hover:border-[#28557F]/30 group-hover:bg-[#28557F]/5">
                  <MapPin size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Headquarters</h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    Team 3 Associates, JKR Towers, <br />
                    Door No. 5/6, Moonlight Gardens Sitra, <br />
                    Kalapatti Main Rd, Kalapatti, TN - 641048.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#28557F] shadow-sm transition-colors group-hover:border-[#28557F]/30 group-hover:bg-[#28557F]/5">
                  <Phone size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Registry</h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    +91 999 443 333 1111<br />
                    <span className="text-[12px] opacity-80">Mon - Sat, 9:00 AM to 7:00 PM IST</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#28557F] shadow-sm transition-colors group-hover:border-[#28557F]/30 group-hover:bg-[#28557F]/5">
                  <Mail size={14} />
                </div>
                <div className="-mt-0.5">
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-1">Digital Inquiry</h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    <a href="mailto:info@team3associates.com" className="hover:text-[#28557F] transition-colors">info@team3associates.com</a><br />
                    <a href="mailto:hello@team3associates.com" className="hover:text-[#28557F] transition-colors">hello@team3associates.com</a>
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
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <form className="space-y-8">
              {/* Form fields remain the same as before */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[12px] font-medium text-gray-600">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-md bg-gray-50/50 px-4 py-3 text-[14px] outline-none focus:border-[#28557F]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-medium text-gray-600">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-md bg-gray-50/50 px-4 py-3 text-[14px] outline-none focus:border-[#28557F]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-gray-600">Service Category</label>
                <select defaultValue="" className="w-full border border-gray-200 rounded-md bg-gray-50/50 px-4 py-3 text-[14px] outline-none focus:border-[#28557F] appearance-none cursor-pointer">
                  <option value="" disabled>Select an area of interest</option>
                  <option value="Residential">Residential Architecture</option>
                  <option value="Commercial">Commercial Spaces</option>
                  <option value="Interior">Interior Design</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-gray-600">Message Details *</label>
                <textarea rows={5} placeholder="Tell us about your project..." className="w-full border border-gray-200 rounded-md bg-gray-50/50 px-4 py-3 text-[14px] outline-none focus:border-[#28557F] resize-none"></textarea>
              </div>

              <button type="submit" className="w-full sm:w-auto bg-[#28557F] text-white px-10 py-4 rounded-md text-[13px] font-semibold flex items-center justify-center gap-3 group transition-all hover:bg-[#1a3a5a]">
                Submit Inquiry
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}