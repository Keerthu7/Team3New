import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Blog from '@/models/Blog';
import { blogs as fallbackBlogs } from '@/data/blog-data';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("MongoDB fetch failed for blogs:", error.message);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const blog = await Blog.create(body);
    
    // Log audit activity
    const { logActivity } = await import("@/lib/audit");
    await logActivity("CREATE_BLOG", `Created blog post: ${blog.title}`);

    // Instant cache busting
    revalidatePath('/blog');
    revalidatePath('/admin/blogs');
    revalidatePath('/admin');
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
