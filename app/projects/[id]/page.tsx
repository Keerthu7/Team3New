"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import ProjectNormalLayout from "@/components/project-normal-layout";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const project = projects.find((p) => p.id === id);

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
