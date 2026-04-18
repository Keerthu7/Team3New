import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Blog from '@/models/Blog';
import { blogs as fallbackBlogs } from '@/data/blog-data';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    // If DB is empty, return fallback
    if (blogs.length === 0) {
        return NextResponse.json(isAdmin ? [] : fallbackBlogs);
    }
    
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("MongoDB fetch failed, using fallback data:", error.message);
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    return NextResponse.json(isAdmin ? [] : fallbackBlogs);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
