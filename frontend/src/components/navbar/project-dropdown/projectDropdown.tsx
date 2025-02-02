import { Project } from "@/src/store/types";
import Link from "next/link";

export default function ProjectDropdown({
  projects,
  path,
  onLeave,
}: {
  projects: Project[];
  path: string;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseLeave={onLeave}
      className="absolute top-12 start-[-2px] gap-1 p-3 shadow-lg bg-white border border-wot-light-gray rounded-sm flex flex-col fade-in w-fit max-w-64"
    >
      <Link
        href="/projects"
        className={
          "rounded-md text-sm text-nowrap text-start hover:cursor-pointer " +
          (path === "/projects"
            ? "text-wot-rose"
            : "text-wot-black hover:text-wot-yellow transition-all duration-200")
        }
      >
        All Projects
      </Link>
      {projects.map((project) => {
        return (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={
              "rounded-md text-sm text-full text-start text-nowrap text-ellipsis overflow-hidden hover:cursor-pointer " +
              (path === `/projects/${project.id}`
                ? "text-wot-rose"
                : "text-wot-black hover:text-wot-yellow transition-all duration-200")
            }
          >
            {project.name}
          </Link>
        );
      })}
    </div>
  );
}
