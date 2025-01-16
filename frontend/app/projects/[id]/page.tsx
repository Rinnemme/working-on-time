"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { AppState } from "@/src/store/store";
import type { Project } from "@/src/store/types";
import ProjectItem from "@/src/components/project-item/project-item";

export default function Project() {
  const [loading, setLoading] = useState<boolean>(true);
  //   const [project, setProject] = useState<Project | null>(null);

  // avoids quirky typing error despite checking for truthy params.id
  const getParam = (param: string | string[] | undefined) => {
    return param ? param : "";
  };

  const projects = useSelector((state: AppState) => state.projects);
  const params = useParams();
  const project = params.id
    ? projects[projects.findIndex((p) => p.id === +getParam(params.id))]
    : null;

  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 mb-20 sm:pt-14 justify-center w-full bg-white">
        {project && (
          <div className="text-center flex items-center w-full flex-col px-2">
            <h1 className="text-2xl font-extrabold text-wot-rose sm:text-3xl fade">
              {project.name}
            </h1>
            <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
              <ProjectItem key={`project-${project.id}`} project={project} />
            </div>
          </div>
        )}
        {!project && (
          <div className="text-center flex items-center w-full flex-col px-2">
            <h1 className="text-2xl font-extrabold text-wot-rose sm:text-3xl fade">
              Project Not Found
            </h1>
            <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
              This project does not exist, or you do not have access to it.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
