import type { Project } from "@/src/store/types";
import Link from "next/link";
import FormattedDate from "../formatted-date/formattedDate";
import ProjectTools from "../project-tools/projectTools";

export default function ProjectItem({ project }: { project: Project }) {
  const priority =
    project.priority === 1
      ? { textColor: "text-wot-blue", borderColor: "border-l-wot-blue", badgeBg: "bg-wot-blue", string: "Low" }
      : project.priority === 2
      ? { textColor: "text-wot-green", borderColor: "border-l-wot-green", badgeBg: "bg-wot-green", string: "Medium" }
      : { textColor: "text-wot-yellow", borderColor: "border-l-wot-yellow", badgeBg: "bg-wot-yellow", string: "High" };

  const pct = +project.totalTasks > 0
    ? Math.round((+project.completedTasks / +project.totalTasks) * 100)
    : 0;

  return (
    <div className={`w-full flex flex-col border border-wot-light-gray border-l-4 ${priority.borderColor} bg-white rounded-2xl shadow-md p-5 fade-in transition hover:shadow-lg`}>
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/projects/${project.id}`}
          className={`font-bold text-base leading-snug hover:cursor-pointer ${priority.textColor}`}
        >
          {project.name}
        </Link>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full text-white ${priority.badgeBg}`}>
            {priority.string}
          </span>
          <ProjectTools project={project} />
        </div>
      </div>
      <div className="text-start text-balance w-full mt-2 text-sm text-wot-gray">
        {project.description}
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Created</div>
          <FormattedDate date={project.dateCreated.slice(0, 10)} />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-1">Due</div>
          <FormattedDate date={project.due.slice(0, 10)} />
        </div>
        <div className="col-span-2">
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
            <div className="italic text-sm">No Tasks Yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
