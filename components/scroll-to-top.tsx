"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[110] w-12 h-12 md:w-14 md:h-14 bg-[#28557F] text-white rounded-full shadow-[0_8px_30px_rgb(40,85,127,0.4)] hover:bg-[#1a3855] hover:shadow-[0_12px_40px_rgb(26,56,85,0.5)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center focus:outline-none group"
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} className="stroke-[2.5px] group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
