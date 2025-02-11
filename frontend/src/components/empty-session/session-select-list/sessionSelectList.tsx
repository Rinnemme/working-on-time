import type { Project } from "@/src/store/types";
import SessionSelectItem from "./session-select-item/sessionSelectItem";
import NoProjects from "../../no-projects/noProjects";

export default function SessionSelectList({
  projects,
  selectFunction,
}: {
  projects: Project[];
  selectFunction: (projectid: number) => void;
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 max-w-lg px-3">
      {projects.length === 0 && <NoProjects />}
      {projects.length > 0 &&
        projects.map((project) => {
          return (
            <SessionSelectItem
              key={project.id}
              project={project}
              selectFunction={selectFunction}
            />
          );
        })}
    </div>
  );
}
