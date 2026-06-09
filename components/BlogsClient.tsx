"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

interface BlogsClientProps {
  initialBlogs: any[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        {initialBlogs.map((blog: any, index: number) => (
          <Link 
            key={blog.slug || blog._id} 
            href={`/blog/${blog.slug}`}
            className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Desktop Thumbnail */}
              <div className="hidden md:block absolute inset-0">
                <Image 
                  src={blog.thumbnail || blog.heroImage} 
                  alt={blog.title}
                  fill
                  priority={index < 3} // Optimize first few blog posts
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1200px) 33vw, 400px"
                />
              </div>
              {/* Mobile Thumbnail */}
              <div className="block md:hidden absolute inset-0">
                <Image 
                  src={blog.mobileThumbnail || blog.thumbnail || blog.heroImage} 
                  alt={`${blog.title} Mobile`}
                  fill
                  priority={index < 3} // Optimize first few blog posts
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="100vw"
                />
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col items-start">
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#28557F] uppercase tracking-wider mb-2">
                {blog.title}
              </h3>
              <p className="text-[13px] text-[#666666] leading-relaxed line-clamp-2">
                {blog.subtitle || "Exploring the intricacies of modern architectural design and implementation strategy."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
