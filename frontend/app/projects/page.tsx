"use client";
import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import ProjectItem from "@/src/components/project-item/projectItem";
import Throbber from "@/src/components/throbber/throbber";
import AddProjectButton from "@/src/components/add-project-button/addProjectButton";
import NoProjects from "@/src/components/no-projects/noProjects";

export default function Projects() {
  const projects = useSelector((state: AppState) => state.projects);
  const isLoading = useSelector((state: AppState) => state.isLoading);

  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-10 pb-20 justify-center w-full bg-wot-off-white">
        <div className="text-center flex items-center w-full flex-col px-2">
          {isLoading && <Throbber />}
          {!isLoading && (
            <>
              <h1 className="text-2xl flex items-center gap-2 font-bold text-wot-rose sm:text-3xl">
                Your Projects
                <AddProjectButton />
              </h1>
              <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-lg px-3">
                {projects.length === 0 && <NoProjects />}
                {projects.length > 0 &&
                  projects.map((project) => {
                    return (
                      <ProjectItem
                        key={`project-${project.id}`}
                        project={project}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
