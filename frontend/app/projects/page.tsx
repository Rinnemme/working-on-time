"use client";
import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Projects() {
  const router = useRouter();
  const projects = useSelector((state: AppState) => state.projects);
  const username = useSelector((state: AppState) => state.user.username);

  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-center justify-center h-dvh w-full bg-wot-rose">
        <div className="max-w-xl">
          <div className="text-center flex flex-col px-2">
            <h1 className="text-3xl font-extrabold leading-10 text-white sm:text-5xl">
              <span>Projects</span>
              {projects.map((project) => {
                return (
                  <p key={`${project.id}`} className="text-sm">
                    {project.name}
                  </p>
                );
              })}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
