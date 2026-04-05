"use client";

import React from "react";
import Image from "next/image"; 
import Link from "next/link"; 
import { Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { 
    name: "KMCH", 
    logo: "/images/clients/kmch.png", 
    text: "Our expertise spans across residential, commercial, and institutional projects, where we seamlessly blend aesthetics with structural integrity.", 
    stars: 5 
  },
  { 
    name: "NGP", 
    logo: "/images/clients/dr-ngp.png", 
    text: "The team's attention to detail in the institutional campus redesign was exceptional. They truly understand modern architectural needs.", 
    stars: 4 
  },
  { 
    name: "SRM", 
    logo: "/images/clients/srm.png", 
    text: "Innovative solutions for our research wing. Their ability to integrate sustainable features into the core design is commendable.", 
    stars: 5 
  },
  { 
    name: "PRINCE", 
    logo: "/images/clients/prince.png", 
    text: "A reliable partner for industrial infrastructure. Their designs are both functional and visually impactful for our global brand.", 
    stars: 4 
  },
  { 
    name: "ARYA BHAVAN", 
    logo: "/images/clients/arya-bhavan.png", 
    text: "Transformed our hospitality space with a perfect blend of traditional and modern aesthetics. Clients love the new ambiance.", 
    stars: 5 
  },
  { 
    name: "SANKARA", 
    logo: "/images/clients/sankara.png", 
    text: "Their vision for the healthcare facility renovation was outstanding. Efficient space planning meets a soothing healing environment.", 
    stars: 5 
  },
  { 
    name: "PSG TECH", 
    logo: "/images/clients/psg.png", 
    text: "Excellent collaboration on the new academic block. Their commitment to structural excellence is unmatched in the industry.", 
    stars: 4 
  },
  { 
    name: "TAMIL NADU TOURISM", 
    logo: "/images/clients/tn-tourism.png", 
    text: "Breathtaking designs for the new beach-side resort. They've captured the essence of local culture in a modern framework.", 
    stars: 5 
  },
  { 
    name: "AVINASHI RESIDENCY", 
    logo: "/images/clients/avinashi.png", 
    text: "Luxury redefined in our latest residential complex. The team provided end-to-end solutions that exceeded our expectations.", 
    stars: 5 
  },
  { 
    name: "COIMBATORE CORP", 
    logo: "/images/clients/cbe-corp.png", 
    text: "Professionalism and expertise demonstrated in the public park masterplan. A great asset to the city's infrastructure development.", 
    stars: 4 
  }
];

export function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Static Header & Rating */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 z-10 bg-white pr-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" stroke="none" />
              ))}
              <span className="ml-2 text-sm font-bold text-gray-900">5.0</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              from <span className="text-gray-900 font-bold italic underline decoration-gray-200">58 reviews</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#28557F] leading-[1.1]">
            People love<br />us, and we<br />love them
          </h2>
          
          <div className="flex flex-col gap-8 mt-4">
            <Link href="/projects">
              <button className="w-fit flex items-center gap-3 px-8 py-4 bg-[#28557F] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black transition-all group shadow-md border border-[#28557F]">
                View Our Works 
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side: Horizontal Marquee */}
        <div className="w-full lg:w-2/3 overflow-hidden">
          <div className="flex whitespace-nowrap">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-8"
            >
              {duplicatedTestimonials.map((testimonial, i) => (
                <div 
                  key={i} 
                  className="w-[350px] md:w-[450px] inline-flex shrink-0 p-10 bg-gray-50 rounded-2xl border border-gray-100 flex-col gap-10 whitespace-normal shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1">
                    {[...Array(testimonial.stars)].map((_, j) => (
                      <Star key={j} size={14} fill="#0f172a" stroke="none" />
                    ))}
                    {[...Array(5 - testimonial.stars)].map((_, j) => (
                      <Star key={j} size={14} fill="#e2e8f0" stroke="none" />
                    ))}
                  </div>
                  
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-500">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100 overflow-hidden">
                      <Image 
                        src={testimonial.logo} 
                        alt={`${testimonial.name} Logo`}
                        fill 
                        className="object-contain p-2" 
                        sizes="56px"
                      />
                    </div>

                    <div>
                      <span className="block font-bold text-sm tracking-widest text-[#28557F] uppercase">
                        {testimonial.name}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                        Verified Client
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}