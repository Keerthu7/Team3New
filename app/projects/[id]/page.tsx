import React from "react";
import ProjectNormalLayout from "@/components/project-normal-layout";
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const dbProjects = await Project.find({}, { slug: 1, id: 1 });
    return dbProjects.map((project) => ({
      id: project.slug || String(project.id),
    }));
  } catch (err) {
    return [];
  }
}

async function getProject(idOrSlug: string) {
  try {
    await connectToDatabase();
    
    let project = null;

    // 1. Try finding by MongoDB ID (if it's a valid ObjectId)
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findById(idOrSlug);
    }

    // 2. Try finding by Slug (Most common for SEO URLs)
    if (!project) {
        project = await Project.findOne({ slug: idOrSlug });
    }

    // 3. Try finding by Numeric ID (Fallback for older data)
    if (!project && !isNaN(Number(idOrSlug))) {
        project = await Project.findOne({ id: Number(idOrSlug) });
    }
    
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (error: any) {
    console.error("Project fetch failed:", error.message);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const idOrSlug = resolvedParams.id;
  const project = await getProject(idOrSlug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-[#28557F]">Project Not Found</h1>
      </div>
    );
  }

  return (
    <ProjectNormalLayout project={project} />
  );
}
