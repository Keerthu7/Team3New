"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { projects as fallbackProjects } from "@/lib/projects-data";
import { ChevronLeft, Loader2 } from "lucide-react";
import { ProjectHeroSlider } from "@/components/project-hero-slider";
import ProjectNormalLayout from "@/components/project-normal-layout";

export default function ProjectDetailPage() {
  const params = useParams();
  const idOrSlug = params.id as string;
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/projects/${idOrSlug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProject(data);
        } else {
          // If DB fails, search fallback data
          const fallback = fallbackProjects.find(p => p.slug === idOrSlug || p.id === Number(idOrSlug));
          if (fallback) setProject(fallback);
        }
        setLoading(false);
      })
      .catch(() => {
        // network error fallback
        const fallback = fallbackProjects.find(p => p.slug === idOrSlug || p.id === Number(idOrSlug));
        if (fallback) setProject(fallback);
        setLoading(false);
      });
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <Loader2 className="animate-spin text-[#28557F]" size={40} />
      </div>
    );
  }

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
