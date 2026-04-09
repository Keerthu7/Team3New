import MagazineSpread from "@/components/magazine-spread";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { blogs } from "@/data/blog-data";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

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
