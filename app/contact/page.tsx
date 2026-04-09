"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/header";
import { MapPin, Phone, Mail, Send, ExternalLink, ChevronDown, CalendarDays, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  // Updated with the exact Google Maps link for Team 3 Associates
  const googleMapsLink = "https://www.google.com/maps/place/Team+3+Associates/@11.0366655,77.0376785,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba8571c5d7c09c3:0x9ae231fdadd57826!8m2!3d11.0366655!4d77.0402534!16s%2Fg%2F11b6_c2bxb"; 

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const dates = React.useMemo(() => {
    const arr = [];
    const today = new Date();
    // Start from tomorrow
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(tomorrow);
      d.setDate(tomorrow.getDate() + i);
      arr.push({
        id: i,
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
      });
    }
    return arr;
  }, []);

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM"
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/hello.hynox@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        alert("Success! Your consultation call has been scheduled. Check your email for details!");
        setStep(1);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <a href="https://www.instagram.com/team3_associates?igsh=am10cWh1dGc3NDd4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#28557F] hover:scale-110 transition-all duration-300 shadow-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT COLUMN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-5 w-full h-full" 
            >
              <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                <div className="space-y-5 text-[#28557F]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#28557F]/10 flex items-center justify-center text-[#28557F]"><MapPin size={18} /></div>
                    <div className="mt-0.5"><h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Headquarters</h4><p className="text-gray-900 text-sm font-medium leading-relaxed">Team 3 Associates, JKR Towers, Sitra, Coimbatore - 641048.</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#28557F]/10 flex items-center justify-center text-[#28557F]"><Phone size={18} /></div>
                    <div className="mt-0.5"><h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Registry</h4><p className="text-gray-900 text-sm font-medium leading-relaxed">+91 999 443 333 1111</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#28557F]/10 flex items-center justify-center text-[#28557F]"><Mail size={18} /></div>
                    <div className="mt-0.5"><h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Digital Inquiry</h4><p className="text-[#28557F] text-sm font-bold leading-relaxed break-all">info@team3associates.com</p></div>
                  </div>
                </div>

                {/* 3. MOBILE VIEW ONLY SOCIAL ICONS */}
                <div className="lg:hidden flex items-center justify-center gap-6 pt-6 mt-6 border-t border-gray-100">
                  <a href="https://www.instagram.com/team3_associates?igsh=am10cWh1dGc3NDd4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#28557F]/5 flex items-center justify-center text-[#28557F]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
              </div>

              {/* MAP CARD */}
              <div className="relative w-full flex-1 min-h-[220px] md:min-h-[260px] bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <a href={googleMapsLink} target="_blank" className="absolute top-3 left-3 z-20 bg-white/95 p-2 rounded-lg flex items-center gap-2 shadow-md">
                  <ExternalLink size={14} className="text-[#28557F]" />
                  <span className="text-[10px] font-bold text-gray-800">Team 3 Associates, JKR Towers, Kalapatti Main Rd</span>
                </a>
                {/* Updated iframe src with proper Google Maps embed URL */}
                <iframe 
                  src="https://maps.google.com/maps?q=Team%203%20Associates,%20JKR%20Towers,%20Kalapatti,%20Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  className="opacity-90 object-cover"
                ></iframe>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Schedule Call Mock */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[20px] shadow-xl border border-gray-100 flex flex-col w-full h-full lg:max-w-none"
            >
              {step === 1 ? (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-[#111827] mb-5 tracking-tight">When should we meet?</h3>
                  
                  {/* Date Selection */}
                  <div className="relative group">
                    <div ref={scrollContainerRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x pr-12 relative z-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}>
                      <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
                      {dates.map((item, idx) => (
                        <button 
                          key={item.id}
                          onClick={() => setSelectedDate(idx)}
                          className={`flex flex-col items-center justify-center shrink-0 w-[88px] h-[78px] rounded-[16px] border transition-all snap-start ${
                            selectedDate === idx 
                              ? "border-[#28557F] bg-[#28557F]/5 ring-1 ring-[#28557F]/20" 
                              : "border-gray-200 hover:border-[#28557F]/30 bg-white"
                          }`}
                        >
                          <span className="text-[13px] font-medium text-gray-500 mb-0.5">{item.day}</span>
                          <span className={`text-[15px] font-semibold ${selectedDate === idx ? "text-[#28557F]" : "text-gray-900"}`}>{item.date}</span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Scroll Right Overlay Fade */}
                    <div className="absolute right-0 top-0 bottom-4 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none flex items-center justify-end pr-0.5 z-10 rounded-r-[20px]">
                      <button 
                        onClick={scrollRight}
                        className="w-8 h-8 md:w-9 md:h-9 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-[#28557F] hover:shadow-lg transition-all pointer-events-auto active:scale-95"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Time Selection */}
                  <h3 className="text-[17px] md:text-[18px] font-semibold text-[#111827] mt-4 mb-4 tracking-tight">Selection time of the day</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-2 rounded-[12px] text-[13px] font-semibold border transition-all ${
                          selectedTime === time
                             ? "border-[#28557F] text-[#28557F] bg-[#28557F]/5 ring-1 ring-[#28557F]/20"
                             : "border-gray-200 text-gray-800 hover:border-[#28557F]/30 bg-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {/* TimeZone */}
                  <h3 className="text-[17px] md:text-[18px] font-semibold text-[#111827] mt-5 mb-3 tracking-tight">Time Zone</h3>
                  <div className="border-b border-gray-900 pb-2 mb-7">
                    <p className="text-[13px] md:text-[14px] font-medium text-gray-700 truncate">(GMT+5:30) Chennai, Kolkata, Mumbai, New Delhi (...)</p>
                  </div>

                  <button 
                    onClick={() => {
                        if(selectedTime) setStep(2);
                        else alert("Please select a time first!");
                    }}
                    className="w-full bg-[#28557F] hover:bg-[#1e4061] text-white font-medium py-4 rounded-[12px] transition-all shadow-md mt-auto tracking-wide text-[15px]"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-7">
                    <button onClick={() => setStep(1)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all border border-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div>
                      <h3 className="text-[19px] font-semibold text-[#111827] tracking-tight leading-tight">Enter Details</h3>
                      <p className="text-[14px] font-medium text-[#28557F]">
                        {dates[selectedDate].day}, {dates[selectedDate].date} | {selectedTime}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 flex-1">
                    {/* FormSubmit Config */}
                    <input type="hidden" name="_subject" value={`New Meeting Scheduled: ${dates[selectedDate].date} at ${selectedTime}`} />
                    <input type="hidden" name="_autoresponse" value={`Your consultation call with Team 3 Associates has been officially scheduled for ${dates[selectedDate].day}, ${dates[selectedDate].date} at ${selectedTime}. We look forward to meeting with you!`} />
                    <input type="hidden" name="Selected Date" value={`${dates[selectedDate].day}, ${dates[selectedDate].date}`} />
                    <input type="hidden" name="Selected Time" value={selectedTime} />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-gray-700">Full Name *</label>
                      <input type="text" name="name" required placeholder="John Doe" className="w-full border border-gray-300 rounded-[10px] bg-white px-4 py-3 text-[14px] text-gray-900 outline-none focus:ring-2 focus:ring-[#28557F]/20 focus:border-[#28557F] transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-gray-700">Email Address *</label>
                      <input type="email" name="email" required placeholder="john@example.com" className="w-full border border-gray-300 rounded-[10px] bg-white px-4 py-3 text-[14px] text-gray-900 outline-none focus:ring-2 focus:ring-[#28557F]/20 focus:border-[#28557F] transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[13px] font-semibold text-gray-700">Phone Number *</label>
                      <input type="tel" name="phone" required placeholder="+91 98765 43210" className="w-full border border-gray-300 rounded-[10px] bg-white px-4 py-3 text-[14px] text-gray-900 outline-none focus:ring-2 focus:ring-[#28557F]/20 focus:border-[#28557F] transition-all" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-[#28557F] hover:bg-[#1e4061] text-white font-medium py-4 rounded-[12px] transition-all shadow-md mt-2 tracking-wide text-[15px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                       {isSubmitting ? "Scheduling..." : "Schedule Event"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}