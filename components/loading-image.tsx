"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps extends ImageProps {
  containerClassName?: string;
}

export function LoadingImage({ containerClassName, ...props }: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Check if image is already cached/complete in the browser on mount
  React.useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.complete && imageRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, []);

  // Safety fallback timeout to ensure the image displays eventually
  React.useEffect(() => {
    if (isLoaded) return;
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Priority (above-the-fold) LCP images bypass state delays & transitions completely
  const isPriority = props.priority === true;
  const showPlaceholder = !isLoaded && !isPriority;

  return (
    <div className={`relative overflow-hidden w-full h-full min-h-[150px] md:min-h-[200px] ${containerClassName || ""}`}>
      {/* Loading Placeholder */}
      <AnimatePresence>
        {showPlaceholder && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#f8f9fa] dark:bg-[#181c23]"
          >
            <motion.div
              animate={{
                scale: [0.97, 1.03, 0.97],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              {/* Elegant micro-logo indicator */}
              <div className="relative w-20 h-6 md:w-24 md:h-8">
                <Image
                  src="/images/logo.png"
                  alt="Team3 Logo"
                  fill
                  className="object-contain grayscale brightness-90 dark:brightness-100"
                />
              </div>
              {/* Subtle loading dots */}
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.9, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.15,
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
        ref={imageRef}
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={`${props.className || ""} transition-opacity duration-300 ${
          showPlaceholder ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
