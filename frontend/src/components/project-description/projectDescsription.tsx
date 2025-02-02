import type { Project } from "@/src/store/types";
import FormattedDate from "../formatted-date/formattedDate";

export default function ProjectDescription({ project }: { project: Project }) {
  const priority =
    project.priority === 1 ? "Low" : project.priority === 2 ? "Medium" : "High";
  return (
    <div className="w-full flex flex-col border border-wot-light-gray bg-white rounded p-4 fade-in relative">
      <div className="text-center text-balance w-fit mt-1">
        {project.description}
      </div>
      <div className="w-full flex justify-center flex-wrap gap-x-6 gap-y-4 mt-4">
        <div className="w-fit flex flex-wrap gap-x-6 gap-y-4">
          <div className="text-center">
            <div className={" text-wot-rose font-semibold"}>Created</div>
            <FormattedDate date={project.dateCreated.slice(0, 10)} />
          </div>
          <div className="text-center">
            <div className={" text-wot-rose font-semibold"}>Due</div>
            <FormattedDate date={project.due.slice(0, 10)} />
          </div>
        </div>
        <div className="flex justify-start flex-wrap gap-x-6 gap-y-4">
          <div className="min-w-fit text-center font-semibold">
            <div className={" text-wot-rose font-semibold"}>
              Task Completion
            </div>
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
          <div className="text-center">
            <div className={" text-wot-rose font-semibold"}>Priority</div>
            <div>{priority}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
