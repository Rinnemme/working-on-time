"use client";

import { Task } from "../../../src/store/types";
import Image from "next/image";
import Draggable from "../../../public/draggable.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskTools from "../task-tools/taskTools";

export default function TaskItem({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      key={`task-${task.id}`}
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="border border-wot-light-gray rounded-sm bg-white relative flex py-4 px-2 gap-2 align-center items-center"
    >
      <Image
        src={Draggable}
        alt={"Draggable"}
        ref={setActivatorNodeRef}
        {...listeners}
        className="h-6 hover:cursor-move"
      />
      <input
        type="checkbox"
        className="hover:cursor-pointer"
        onChange={() => console.log("cool")}
        checked={task.complete}
      ></input>
      <div className="ml-3 text-nowrap overflow-ellipsis">{task.name}</div>
      <TaskTools task={task} />
    </div>
  );
}
