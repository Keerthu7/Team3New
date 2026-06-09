"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

interface BlogsClientProps {
  initialBlogs: any[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const matchesSearch = (blog: any, query: string) => {
    if (!query) return false;
    const q = query.toLowerCase().trim();
    return (
      (blog.title || "").toLowerCase().includes(q) ||
      (blog.subtitle || "").toLowerCase().includes(q)
    );
  };

  const sortedBlogs = [...initialBlogs].sort((a, b) => {
    const aMatches = matchesSearch(a, searchQuery);
    const bMatches = matchesSearch(b, searchQuery);
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  return (
    <>
      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-12">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search journals by title or subtitle..."
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#28557F] focus:ring-1 focus:ring-[#28557F] transition-all duration-300 shadow-sm"
        />
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        {sortedBlogs.map((blog: any, index: number) => (
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
