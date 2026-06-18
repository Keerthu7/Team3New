"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingImageProps extends ImageProps {
  containerClassName?: string;
}

export function LoadingImage({ containerClassName, ...props }: LoadingImageProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // Minimum duration to show the elegant Team3 logo loading animation (e.g. 800ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Check if image is already complete in browser cache on mount
  React.useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.complete && imageRef.current.naturalWidth > 0) {
        setIsImageLoaded(true);
      }
    }
  }, []);

  // Safety fallback timeout: if image takes > 6s, force display anyway
  React.useEffect(() => {
    if (isImageLoaded) return;
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, [isImageLoaded]);

  // The placeholder is shown until BOTH the image is loaded (or cached) AND the minimum transition time has elapsed.
  const showPlaceholder = !isImageLoaded || !minTimeElapsed;

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
              {/* Elegant Team3 Logo Indicator */}
              <div className="relative w-20 h-6 md:w-24 md:h-8">
                <Image
                  src="/images/logo.png"
                  alt="Team3 Logo"
                  fill
                  className="object-contain grayscale brightness-90 dark:brightness-100"
                  priority
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
        quality={95}
        {...props}
        onLoad={() => setIsImageLoaded(true)}
        className={`${props.className || ""} transition-opacity duration-300 ${
          showPlaceholder ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
