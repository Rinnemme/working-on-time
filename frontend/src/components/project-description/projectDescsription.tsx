import type { Project } from "@/src/store/types";
import FormattedDate from "../formatted-date/formattedDate";

export default function ProjectDescription({ project }: { project: Project }) {
  const priority =
    project.priority === 1
      ? { string: "Low", badgeBg: "bg-wot-blue" }
      : project.priority === 2
      ? { string: "Medium", badgeBg: "bg-wot-green" }
      : { string: "High", badgeBg: "bg-wot-yellow" };

  const pct = +project.totalTasks > 0
    ? Math.round((+project.completedTasks / +project.totalTasks) * 100)
    : 0;

  return (
    <div className="w-full flex flex-col border border-wot-light-gray bg-white rounded-2xl shadow-md p-5 fade-in relative">
      <div className="text-center text-balance w-full mt-1 text-wot-gray">
        {project.description}
      </div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Created</div>
          <FormattedDate date={project.dateCreated.slice(0, 10)} />
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Due</div>
          <FormattedDate date={project.due.slice(0, 10)} />
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Priority</div>
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full text-white ${priority.badgeBg}`}>
            {priority.string}
          </span>
        </div>
        <div className="text-center col-span-2 sm:col-span-1">
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
            <div className="font-light italic text-sm">No Tasks Yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
