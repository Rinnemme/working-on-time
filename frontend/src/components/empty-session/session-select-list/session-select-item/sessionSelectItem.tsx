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
      ? { textColor: "text-wot-blue", borderColor: "border-l-wot-blue", badgeBg: "bg-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", borderColor: "border-l-wot-green", badgeBg: "bg-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", borderColor: "border-l-wot-yellow", badgeBg: "bg-wot-yellow", string: "High" };

  const selectProject = () => {
    selectFunction(project.id);
    localStorage.setItem("workingid", project.id.toString());
  };

  const dueDate = `${project.due.slice(5, 7)}/${project.due.slice(8, 10)}/${project.due.slice(0, 4)}`;

  const pct =
    +project.totalTasks > 0
      ? Math.round((+project.completedTasks / +project.totalTasks) * 100)
      : 0;

  return (
    <div
      onClick={selectProject}
      className={`w-full flex flex-col border border-wot-light-gray border-l-4 ${priority.borderColor} bg-white rounded-2xl shadow-md p-5 fade-in hover:cursor-pointer [&:hover_*]:cursor-pointer hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`font-bold text-base leading-snug ${priority.textColor}`}>
          {project.name}
        </span>
        <span className={`shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full text-white ${priority.badgeBg}`}>
          {priority.string}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Due</div>
          <div className="text-sm font-medium text-wot-black">{dueDate}</div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Tasks</div>
          {+project.totalTasks > 0 ? (
            <>
              <div className="text-sm mb-1.5">
                {`${project.completedTasks} of ${project.totalTasks} (${pct}%)`}
              </div>
              <div className="h-1.5 w-full rounded-full bg-wot-lighter-gray overflow-hidden">
                <div
                  className="h-full rounded-full bg-wot-green transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </>
          ) : (
            <div className="italic text-sm text-wot-gray">No tasks yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
