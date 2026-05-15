import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "@/lib/db";
import BlogModel from "@/models/Blog";
import { blogs as fallbackBlogs } from "@/data/blog-data";

async function getBlogs() {
  try {
    await connectToDatabase();
    const mongoBlogs = await BlogModel.find({}).sort({ createdAt: -1 });
    
    if (mongoBlogs && mongoBlogs.length > 0) {
        return JSON.parse(JSON.stringify(mongoBlogs));
    }
  } catch (err) {
    console.error("MongoDB fetch failed for blogs, using static fallback:", err);
  }
  
  // Return empty array or static data if DB fails
  return fallbackBlogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-44 pb-6 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
          Our Journals
        </h1>
        <p className="text-sm md:text-base text-[#666666] max-w-2xl leading-relaxed">
          Thoughts, insights, and stories about architecture, design, and building the future.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {blogs.map((blog: any, index: number) => (
            <Link 
              key={blog.slug || blog._id} 
              href={`/blog/${blog.slug}`}
              className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={blog.thumbnail || blog.heroImage} 
                  alt={blog.title}
                  fill
                  priority={index < 3} // Optimize first few blog posts
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
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
      </section>

      <Footer />
    </main>
  );
}