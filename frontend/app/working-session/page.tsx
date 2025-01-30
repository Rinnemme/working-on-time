"use client";
import EmptySession from "../../src/components/empty-session/emptySession";
import WorkingSession from "@/src/components/working-session/workingSession";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";

export default function Page() {
  const workingSession = useSelector((state: AppState) => state.workingSession);
  const project = useSelector((state: AppState) => state.projects[0]);

  return (
    <>
      {/* {!workingSession && <EmptySession />}
      {workingSession && <div>cool</div>} */}
      {project && <WorkingSession project={project} />}
    </>
  );
}
