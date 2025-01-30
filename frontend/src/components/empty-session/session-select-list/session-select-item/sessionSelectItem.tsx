import { Project } from "@/src/store/types";
import FormattedDate from "@/src/components/formatted-date/formattedDate";

export default function SessionSelectItem({ project }: { project: Project }) {
  const priority =
    project.priority === 1
      ? { textColor: "text-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", string: "High" };

  const dueDate = `${project.due.slice(5, 7)}/${project.due.slice(
    8,
    10
  )}/${project.due.slice(0, 4)}`;
  return (
    <div className="w-full flex flex-col border gap-2 border-wot-light-gray rounded p-4 fade-in hover:cursor-pointer hover:ring-1 hover:ring-wot-light-gray hover:scale-105 transition-all">
      <div
        className={`text-center hover:cursor-pointer font-semibold ${priority.textColor} overflow-ellipsis`}
      >
        {project.name}
      </div>
      <div className="w-full flex justify-center gap-4">
        <div className="hover:cursor-pointer">{`Due ${dueDate}`}</div>
        <div className="hover:cursor-pointer">
          {+project.completedTasks / +project.totalTasks + "% Complete"}
        </div>
        <div className="hover:cursor-pointer">
          {priority.string + " Priority"}
        </div>
      </div>
    </div>
  );
}
