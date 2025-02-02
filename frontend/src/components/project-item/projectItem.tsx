import type { Project } from "@/src/store/types";
import FormattedDate from "../formatted-date/formattedDate";
import ProjectTools from "../project-tools/projectTools";

export default function ProjectItem({ project }: { project: Project }) {
  const priority =
    project.priority === 1
      ? { textColor: "text-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", string: "High" };
  return (
    <div className="w-full flex flex-col border border-wot-light-gray bg-white rounded p-4 fade-in">
      <div>
        <div
          className={`text-start w-full flex justify-between font-semibold ${priority.textColor}`}
        >
          <div>{project.name}</div>
          <ProjectTools project={project} />
        </div>
        <div className="text-start text-balance w-fit mt-1">
          {project.description}
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-x-6 gap-y-4 mt-4">
        <div className="w-fit flex flex-wrap gap-x-6 gap-y-4">
          <div className="text-start">
            <div className={`${priority.textColor} ` + "font-semibold"}>
              Created
            </div>
            <FormattedDate date={project.dateCreated.slice(0, 10)} />
          </div>
          <div className="text-start">
            <div className={`${priority.textColor} ` + "font-semibold"}>
              Due
            </div>
            <FormattedDate date={project.due.slice(0, 10)} />
          </div>
        </div>
        <div className="flex justify-start flex-wrap gap-x-6 gap-y-4">
          <div className="min-w-fit text-start">
            <div className={`${priority.textColor} ` + "font-semibold"}>
              Task Completion
            </div>
            {+project.totalTasks > 0 ? (
              <div>
                {`${project.completedTasks} of ${project.totalTasks} (` +
                  (+project.completedTasks / +project.totalTasks) * 100 +
                  "%)"}
              </div>
            ) : (
              <div className="italic">No Tasks Yet</div>
            )}
          </div>
          <div className="text-start">
            <div className={`${priority.textColor} ` + "font-semibold"}>
              Priority
            </div>
            <div>{priority.string}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
