import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWorkingProject } from "@/src/store/workingSessionSlice";
import type { AppState } from "@/src/store/store";
import Throbber from "@/src/components/throbber/throbber";
import SessionSelectList from "./session-select-list/sessionSelectList";
import type { Project } from "@/src/store/types";

export default function EmptySession() {
  const dispatch = useDispatch();
  const projects = useSelector((state: AppState) => state.projects);
  const isLoading = useSelector((state: AppState) => state.isLoading);
  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 pb-20 sm:pt-14 justify-center w-full bg-wot-off-white">
        <div className="text-center flex items-center w-full flex-col px-2">
          <h1 className="text-3xl font-bold text-wot-rose sm:text-3xl">
            New Working Session
          </h1>
          <h2 className="font-bold text-3xl mt-2 mb-3 text-wot-yellow">
            Select a Project
          </h2>
          {isLoading && <Throbber />}
          {!isLoading && projects.length > 0 && (
            <SessionSelectList
              projects={projects}
              selectFunction={(project: Project) =>
                dispatch(setWorkingProject(project))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
