"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "next/navigation";
import type { AppState } from "@../../../src/store/store";
import type { Project } from "@../../../src/store/types";
import ProjectItem from "@../../../src/components/project-item/project-item";
import Throbber from "@../../../src/components/throbber/throbber";
import TaskList from "@../../../src/components/task-list/taskList";
import Modal from "@/src/components/modal/modal";
import AddTaskForm from "@/src/components/add-task/addTask";
import Add from "../../../public/add.svg";
import Image from "next/image";

type AddModal = "Task" | "Project" | null;

export default function Project() {
  const [modal, setModal] = useState<AddModal>(null);
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
    <div className="top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 mb-20 sm:pt-14 justify-center w-full">
        {isLoading && <Throbber />}
        {!isLoading && project && (
          <>
            <div className="text-center flex items-center w-full flex-col px-2">
              <h1 className="text-wot-rose text-2xl font-bold sm:text-3xl fade">
                {project.name}
              </h1>
              <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
                <ProjectItem key={`project-${project.id}`} project={project} />
                <h1 className="text-wot-rose text-2xl mt-5 mb-5 font-bold sm:text-3xl fade flex items-center gap-2 justify-center">
                  Tasks
                  <Image
                    className="bg-wot-gray hover:bg-wot-green hover:scale-105 transition hover:cursor-pointer rounded-full h-5 w-5 flex items-center justify-center"
                    onClick={() => setModal("Task")}
                    src={Add}
                    alt="Add a task"
                  />{" "}
                </h1>
                <TaskList tasks={project.tasks} />
              </div>
            </div>
          </>
        )}
        {!isLoading && !project && (
          <div className="text-center flex items-center w-full flex-col px-2">
            <h1 className="text-2xl font-bold text-wot-rose sm:text-3xl fade">
              Project Not Found
            </h1>
            <div className="mt-10 flex flex-col gap-4 w-full max-w-lg px-3">
              This project does not exist, or you do not have access to it.
            </div>
          </div>
        )}
      </div>
      {modal === "Task" && (
        <Modal closeFunc={() => setModal(null)}>
          <AddTaskForm
            closeFunc={() => setModal(null)}
            projectid={project.id}
          />
        </Modal>
      )}
    </div>
  );
}
