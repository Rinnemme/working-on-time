"use client";
import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import Throbber from "@/src/components/throbber/throbber";
import SessionSelectList from "./session-select-list/sessionSelectList";

export default function EmptySession() {
  const projects = useSelector((state: AppState) => state.projects);
  const isLoading = useSelector((state: AppState) => state.isLoading);
  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-start pt-12 mb-20 sm:pt-14 justify-center w-full bg-white">
        <div className="text-center flex items-center w-full flex-col px-2">
          <h1 className="text-2xl font-semibold text-wot-rose sm:text-3xl">
            New Working Session
          </h1>
          <h3 className="text-md mt-3 mb-2 font-semibold text-wot-black">
            Click a project to begin a working session
          </h3>
          {isLoading && <Throbber />}
          {!isLoading && projects.length > 0 && (
            <SessionSelectList projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}
