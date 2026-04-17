import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let project = null;

    // 1. Try finding by MongoDB ID (if it's a valid ObjectId)
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(id);
    }

    // 2. Try finding by Slug (Most common for SEO URLs)
    if (!project) {
        project = await Project.findOne({ slug: id });
    }

    // 3. Try finding by Numeric ID (Fallback for older data)
    if (!project && !isNaN(Number(id))) {
        project = await Project.findOne({ id: Number(id) });
    }

    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findByIdAndUpdate(id, body, { new: true });
    } else {
        project = await Project.findOneAndUpdate({ slug: id }, body, { new: true });
    }

    if (!project && !isNaN(Number(id))) {
        project = await Project.findOneAndUpdate({ id: Number(id) }, body, { new: true });
    }

    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let project = null;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findByIdAndDelete(id);
    } else {
        project = await Project.findOneAndDelete({ slug: id });
    }

    if (!project && !isNaN(Number(id))) {
        project = await Project.findOneAndDelete({ id: Number(id) });
    }

    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
