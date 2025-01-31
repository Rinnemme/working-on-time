"use client";
import EmptySession from "../../src/components/empty-session/emptySession";
import WorkingSession from "@/src/components/working-session/workingSession";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";

export default function Page() {
  const workingProject = useSelector(
    (state: AppState) => state.workingSession.project
  );

  return (
    <div className="top-0 w-full h-full z-0 fade-in">
      {!workingProject && <EmptySession />}
      {workingProject && <WorkingSession project={workingProject} />}
    </div>
  );
}
