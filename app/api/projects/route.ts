import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { projects as fallbackProjects } from '@/lib/projects-data';

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    // If DB is genuinely empty (seed hasn't run), return fallback for now
    if (projects.length === 0) {
        return NextResponse.json(fallbackProjects);
    }
    
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error("MongoDB fetch failed, using fallback data:", error.message);
    // Graceful fallback if local network blocks MongoDB
    return NextResponse.json(fallbackProjects);
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
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
