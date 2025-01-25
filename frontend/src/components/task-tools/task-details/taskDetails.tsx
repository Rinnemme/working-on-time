"use client";

import { Task } from "@/src/store/types";

export default function TaskDetails({ task }: Readonly<{ task: Task }>) {
  return (
    <div>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-rose">
          {task.name}
        </h3>

        <div className="block w-72 px-2.5 py-1.5 mb-5 text-gray-900 sm:leading-6">
          {task.description}
        </div>
      </div>
    </div>
  );
}
