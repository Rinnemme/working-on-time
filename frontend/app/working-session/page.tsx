"use client";
import EmptySession from "../../src/components/empty-session/emptySession";
import WorkingSession from "@/src/components/working-session/workingSession";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";

export default function Page() {
  const projectid = useSelector(
    (state: AppState) => state.workingSession.projectid
  );
  const projects = useSelector((state: AppState) => state.projects);
  const workingProject = projects.find((project) => project.id === projectid);

  return (
    <div className="top-0 w-full h-full z-0 fade-in">
      {!workingProject && <EmptySession />}
      {workingProject && <WorkingSession project={workingProject} />}
    </div>
  );
}
