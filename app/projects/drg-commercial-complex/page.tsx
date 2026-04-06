"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects-data";
import { ChevronLeft } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import ProjectNormalLayout from "@/components/project-normal-layout";

export default function DRGCommercialComplexPage() {
  const router = useRouter();
  const project = projects.find((p) => p.slug === "drg-commercial-complex");

  if (!project) return null;

  return (
    <ProjectNormalLayout project={project} />
  );
}
