import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setWorkingProject } from "@/src/store/workingSessionSlice";
import type { AppState } from "@/src/store/store";
import Throbber from "@/src/components/throbber/throbber";
import SessionSelectList from "./session-select-list/sessionSelectList";

export default function EmptySession() {
  const dispatch = useDispatch();
  const projects = useSelector((state: AppState) => state.projects);
  const isLoading = useSelector((state: AppState) => state.isLoading);
  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 pb-20 sm:pt-14 justify-center w-full bg-wot-off-white">
        <div className="text-center flex items-center w-full flex-col px-2">
          {isLoading && <Throbber />}
          {!isLoading && (
            <div className="flex flex-col items-center w-full max-w-lg px-3">
              <div className="flex items-center justify-between w-full mb-2">
                <h1 className="text-3xl font-black tracking-tight text-wot-black">
                  New Working Session
                </h1>
                <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-wot-yellow text-white">
                  Select a Project
                </span>
              </div>
              <SessionSelectList
                projects={projects}
                selectFunction={(projectid: number) =>
                  dispatch(setWorkingProject(projectid))
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
