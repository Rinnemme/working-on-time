"use client";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import type { AppState } from "@../../../src/store/store";
import type { Project } from "@../../../src/store/types";
import ProjectItem from "@../../../src/components/project-item/project-item";
import Throbber from "@../../../src/components/throbber/throbber";
import TaskList from "@../../../src/components/task-list/taskList";

export default function Project() {
  // avoids quirky typing error despite checking for truthy params.id
  const getParam = (param: string | string[] | undefined) => {
    return param ? param : "";
  };
  const isLoading = useSelector((state: AppState) => state.isLoading);
  const projects = useSelector((state: AppState) => state.projects);
  const params = useParams();
  const project =
    projects[projects.findIndex((p) => p.id === +getParam(params.id))];

  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 mb-20 sm:pt-14 justify-center w-full bg-white">
        {isLoading && <Throbber />}
        {!isLoading && project && (
          <>
            <div className="text-center flex items-center w-full flex-col px-2">
              <h1 className="text-2xl font-extrabold text-wot-rose sm:text-3xl fade">
                {project.name}
              </h1>
              <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
                <ProjectItem key={`project-${project.id}`} project={project} />
                <h1 className="text-2xl mt-5 mb-5 font-extrabold text-wot-rose sm:text-3xl fade">
                  Tasks
                </h1>
                <TaskList tasks={project.tasks} />
              </div>
            </div>
          </>
        )}
        {!isLoading && !project && (
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
