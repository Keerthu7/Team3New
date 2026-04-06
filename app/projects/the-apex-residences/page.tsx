"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import ProjectNormalLayout from "@/components/project-normal-layout";

export default function ApexResidencesPage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "the-apex-residences");

  if (!project) return null;

  return (
    <ProjectNormalLayout project={project} />
  );
}
