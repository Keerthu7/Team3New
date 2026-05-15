import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // ✅ Add this
  images: {
    unoptimized: true,  // ✅ Add this (required for static export)
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;