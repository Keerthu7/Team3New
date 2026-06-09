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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-[#181c23] mb-4">Search Journals</h3>
            <div className="relative w-full">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search by title or subtitle..."
                className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#28557F] focus:ring-2 focus:ring-[#28557F]/20 transition-all duration-300"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Icon Button */}
      <div className="flex mb-10">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex-shrink-0 w-10 h-10 md:w-[42px] md:h-[42px] flex items-center justify-center rounded-full bg-white border border-[#dfe2ed] text-gray-600 hover:bg-gray-100 transition-all shadow-sm group"
          aria-label="Open search"
        >
          <Search className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:text-[#28557F] transition-colors" />
        </button>
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
