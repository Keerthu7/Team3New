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
            className="absolute inset-0 z-10 bg-slate-100 animate-pulse flex items-center justify-center"
          >
            {/* Elegant, ultra-lightweight logo shape outline shimmer placeholder */}
            <div className="w-12 h-12 bg-slate-200/50 rounded-full animate-pulse" />
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
