import { Task } from "@/src/store/types";

export default function TaskDetails({ task }: Readonly<{ task: Task }>) {
  return (
    <div>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-lg px-4 font-bold leading-6 mb-5 mt-4 text-wot-rose">
          {task.name}
        </h3>

        <div className="block w-72 px-2.5 py-1.5 mb-5 text-wot-black sm:leading-6">
          {task.description}
        </div>
      </div>
    </div>
  );
}
