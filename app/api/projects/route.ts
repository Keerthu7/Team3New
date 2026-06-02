import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { projects as fallbackProjects } from '@/lib/projects-data';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("MongoDB fetch failed:", error.message);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    if (!body.id) {
        const lastProject = await Project.findOne().sort({ id: -1 });
        body.id = lastProject ? lastProject.id + 1 : 1;
    }
    
    const project = await Project.create(body);
    
    // Instant cache busting for real-time updates
    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
