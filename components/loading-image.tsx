"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps extends ImageProps {
  containerClassName?: string;
}

export function LoadingImage({ containerClassName, ...props }: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Safety timeout to ensure image is shown even if onLoad doesn't fire
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden w-full h-full min-h-[150px] md:min-h-[200px] ${containerClassName || ""}`}>
      {/* Loading Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#f8f9fa]"
          >
            <motion.div
              animate={{
                scale: [0.9, 1.05, 0.9],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative w-24 h-8 md:w-32 md:h-10">
                <Image
                  src="/images/logo.png"
                  alt="Loading..."
                  fill
                  className="object-contain grayscale brightness-50"
                />
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-1 h-1 bg-[#28557F] rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <Image
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={`${props.className || ""} transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
