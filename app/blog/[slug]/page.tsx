import MagazineSpread from "@/components/magazine-spread";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { blogs } from "@/data/blog-data";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import BlogModel from "@/models/Blog";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let blog = null;
  
  try {
      await connectToDatabase();
      const mongoBlog = await BlogModel.findOne({ slug });
      if (mongoBlog) {
          // Convert to plain JS object to pass to client component props
          blog = JSON.parse(JSON.stringify(mongoBlog));
      }
  } catch (err) {
      console.error("MongoDB fetch failed, using fallback:", err);
  }
  
  if (!blog) {
      blog = blogs.find((b) => b.slug === slug);
  }

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-[#f4f4f4] min-h-screen">
      <Header />
      <div className="pt-0">
        <MagazineSpread blog={blog} variant="blog" />
      </div>
      <Footer />
    </main>
  );
}
