import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import Blog from '@/models/Blog';
import { projects } from '@/lib/projects-data';
import { blogs } from '@/data/blog-data';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing data to prevent duplicates during seed
    await Project.deleteMany({});
    await Blog.deleteMany({});
    
    // Insert new data
    const insertedProjects = await Project.insertMany(projects);
    const insertedBlogs = await Blog.insertMany(blogs);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      projectsInserted: insertedProjects.length,
      blogsInserted: insertedBlogs.length
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
