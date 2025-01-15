"use client";
import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import ProjectItem from "@/src/components/project-item/project-item";

export default function Projects() {
  const projects = useSelector((state: AppState) => state.projects);

  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 mb-20 sm:pt-14 justify-center w-full bg-white">
        <div className="text-center flex items-center w-full flex-col px-2">
          <h1 className="text-2xl font-extrabold text-wot-rose sm:text-3xl">
            Your Projects
          </h1>
          <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
            {projects.map((project) => {
              return (
                <ProjectItem key={`project-${project.id}`} project={project} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
