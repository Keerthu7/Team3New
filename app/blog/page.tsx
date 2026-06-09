import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import connectToDatabase from "@/lib/db";
import BlogModel from "@/models/Blog";
import BlogsClient from "@/components/BlogsClient";

export const dynamic = 'force-dynamic';

async function getBlogs() {
  try {
    await connectToDatabase();
    const mongoBlogs = await BlogModel.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(mongoBlogs || []));
  } catch (err) {
    console.error("MongoDB fetch failed for blogs:", err);
    return [];
  }
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
        <BlogsClient initialBlogs={blogs} />
      </section>

      <Footer />
    </main>
  );
}