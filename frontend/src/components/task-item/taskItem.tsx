"use client";

import { Task } from "../../../src/store/types";
import Image from "next/image";
import Draggable from "../../../public/draggable.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      key={`task-${task.id}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border border-wot-lightgray bg-white relative flex py-4 px-2 gap-2 align-center hover:cursor-pointer"
    >
      <Image src={Draggable} alt={"Draggable"} className="h-6" />
      <input
        type="checkbox"
        onChange={() => console.log("cool")}
        checked={task.complete}
      ></input>
      <div className="ml-3">{task.name}</div>
    </div>
  );
}
