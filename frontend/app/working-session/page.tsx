"use client";
import EmptySession from "../../src/components/empty-session/emptySession";
import WorkingSession from "@/src/components/working-session/workingSession";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import Throbber from "@/src/components/throbber/throbber";

export default function Page() {
  const projectid = useSelector(
    (state: AppState) => state.workingSession.projectid
  );
  const loading = useSelector((state: AppState) => state.isLoading);
  const projects = useSelector((state: AppState) => state.projects);
  const workingProject = projects.find((project) => project.id === projectid);

  return (
    <>
      {loading && <Throbber />}
      {!loading && (
        <div className="top-0 w-full h-full z-0 fade-in">
          {!workingProject && <EmptySession />}
          {workingProject && <WorkingSession project={workingProject} />}
        </div>
      )}
    </>
  );
}
