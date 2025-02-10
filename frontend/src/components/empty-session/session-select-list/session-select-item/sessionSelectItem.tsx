import { Project } from "@/src/store/types";

export default function SessionSelectItem({
  project,
  selectFunction,
}: {
  project: Project;
  selectFunction: (projectid: number) => void;
}) {
  const priority =
    project.priority === 1
      ? { textColor: "text-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", string: "High" };

  const selectProject = () => {
    selectFunction(project.id);
    localStorage.setItem("workingid", project.id.toString());
  };

  const dueDate = `${project.due.slice(5, 7)}/${project.due.slice(
    8,
    10
  )}/${project.due.slice(0, 4)}`;
  return (
    <div
      onClick={selectProject}
      className="w-full flex flex-col border gap-2 bg-white border-wot-light-gray rounded p-4 fade-in hover:cursor-pointer hover:ring-wot-light-gray hover:shadow-sm hover:scale-105 transition-all"
    >
      <div
        className={`text-center hover:cursor-pointer font-semibold ${priority.textColor} overflow-ellipsis`}
      >
        {project.name}
      </div>
      <div className="w-full flex justify-center gap-4">
        <div className="hover:cursor-pointer">{`Due ${dueDate}`}</div>
        <div className="hover:cursor-pointer">
          {Math.round((+project.completedTasks / +project.totalTasks) * 100) +
            "% Complete"}
        </div>
        <div className="hover:cursor-pointer">
          {priority.string + " Priority"}
        </div>
      </div>
    </div>
  );
}
