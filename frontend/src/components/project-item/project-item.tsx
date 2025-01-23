"use client";
import type { Project } from "@/src/store/types";
import { useParams } from "next/navigation";

export default function ProjectItem({ project }: { project: Project }) {
  const params = useParams();
  const priority =
    project.priority === 1
      ? { textColor: "text-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", string: "High" };
  return (
    <div className="w-full flex flex-col items-start justify-start border border-wot-light-gray rounded p-3 fade-in relative">
      <div>
        {!params.id && (
          <div className={`text-left w-fit font-bold ${priority.textColor}`}>
            {project.name}
          </div>
        )}
        <div className="text-left w-fit">{project.description}</div>
      </div>
      <div className="w-full flex justify-start flex-wrap gap-x-6 gap-y-4 mt-4">
        <div className="w-fit flex justify-start flex-wrap gap-x-6 gap-y-4">
          <div className="w-fit text-left">
            <div className={`${priority.textColor}`}>Created</div>
            <div>{project.dateCreated.slice(0, 10)}</div>
          </div>
          <div className="w-fit text-left">
            <div className={`${priority.textColor}`}>Due</div>
            <div>{project.due.slice(0, 10)}</div>
          </div>
        </div>
        <div className="w-fit flex justify-start flex-wrap gap-x-6 gap-y-4">
          <div className="w-fit min-w-fit text-left">
            <div className={`${priority.textColor}`}>Task Completion</div>
            {+project.totalTasks > 0 ? (
              <div>
                {`${project.completedTasks} of ${project.totalTasks} (` +
                  +project.completedTasks / +project.totalTasks +
                  "%)"}
              </div>
            ) : (
              <div className="font-light italic">No Tasks Yet</div>
            )}
          </div>
          <div className="w-fit text-left">
            <div className={`${priority.textColor}`}>Priority</div>
            <div>{priority.string}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
