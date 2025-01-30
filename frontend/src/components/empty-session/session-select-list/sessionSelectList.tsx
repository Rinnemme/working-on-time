import type { Project } from "@/src/store/types";
import FormattedDate from "../../formatted-date/formattedDate";
import SessionSelectItem from "./session-select-item/sessionSelectItem";

export default function SessionSelectList({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 max-w-lg px-3">
      {projects.map((project) => {
        if (
          +project.totalTasks &&
          +project.totalTasks - +project.completedTasks > 0
        )
          return <SessionSelectItem key={project.id} project={project} />;
      })}
    </div>
  );
}
