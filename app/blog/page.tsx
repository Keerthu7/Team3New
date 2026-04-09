import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blog-data";

export default function BlogPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-6 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
          Our Journals
        </h1>
        <p className="text-sm md:text-base text-[#666666] max-w-2xl leading-relaxed">
          Thoughts, insights, and stories about architecture, design, and building the future.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogs.map((blog) => (
            <Link 
              key={blog.slug} 
              href={`/blog/${blog.slug}`}
              className="group flex flex-col bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image 
                  src={blog.thumbnail || blog.heroImage} 
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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