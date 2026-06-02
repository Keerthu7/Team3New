import MagazineSpread from "@/components/magazine-spread";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/db";
import BlogModel from "@/models/Blog";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const dbBlogs = await BlogModel.find({}, { slug: 1 });
    return dbBlogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (err) {
    return [];
  }
}


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
      console.error("MongoDB fetch failed:", err);
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
