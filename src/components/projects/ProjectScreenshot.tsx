"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectUIMockup } from "@/components/projects/ProjectUIMockup";

type ProjectScreenshotProps = {
  projectId: string;
  src: string;
  alt: string;
  variant?: "before" | "after";
  className?: string;
  priority?: boolean;
};

export function ProjectScreenshot({
  projectId,
  src,
  alt,
  variant = "after",
  className = "",
  priority = false,
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`h-full w-full ${className}`}>
        <ProjectUIMockup projectId={projectId} variant={variant} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={`object-cover object-top ${className}`}
      sizes="(max-width: 768px) 100vw, 680px"
      onError={() => setFailed(true)}
    />
  );
}
