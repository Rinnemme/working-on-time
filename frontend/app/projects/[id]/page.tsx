"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "next/navigation";
import type { AppState } from "@../../../src/store/store";
import type { Project } from "@../../../src/store/types";
import Throbber from "@../../../src/components/throbber/throbber";
import TaskList from "@../../../src/components/task-list/taskList";
import Modal from "@/src/components/modal/modal";
import AddTaskForm from "@/src/components/add-task-form/addTaskForm";
import AddTaskButton from "@/src/components/add-task-button/addTaskButton";
import ProjectDescription from "@/src/components/project-description/projectDescsription";
import NoTasks from "@/src/components/no-tasks/noTasks";

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
      <div className="relative flex items-start pt-12 pb-20 sm:pt-14 justify-center w-full">
        {isLoading && <Throbber />}
        {!isLoading && project && (
          <>
            <div className="text-center flex items-center w-full flex-col px-2">
              <h1 className="text-wot-rose text-2xl font-bold sm:text-3xl fade">
                {project.name}
              </h1>
              <div className="mt-10 flex flex-col gap-4 w-full items-center max-w-lg px-3">
                <ProjectDescription project={project} />
                <h1 className="text-wot-rose text-2xl mt-5 font-bold sm:text-3xl fade flex items-center gap-2 justify-center">
                  Tasks
                  <AddTaskButton projectid={project.id} />
                </h1>
                {!project.tasks.length && (
                  <NoTasks addTask={() => setModal("Task")} />
                )}
                {project.tasks.length > 0 && <TaskList tasks={project.tasks} />}
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
