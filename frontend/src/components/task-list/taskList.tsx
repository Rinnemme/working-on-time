"use client";

import { Task } from "@/src/store/types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setProjectTasks } from "@/src/store/projectSlice";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskItem from "../task-item/taskItem";
import NoTasks from "../no-tasks/noTasks";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const activeIndex = tasks.findIndex((task) => task.id === active.id);
    const overIndex = tasks.findIndex((task) => task.id === over.id);
    const newtasks = arrayMove(tasks, activeIndex, overIndex);
    axios({
      method: "POST",
      data: {
        swapToId: over.id,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/tasks/${active.id}/move`,
    });
    dispatch(setProjectTasks(newtasks));
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center max-w-xl">
      <div
        className="italic hover:text-wot-rose text-center hover:cursor-pointer"
        onClick={() => setShowComplete(!showComplete)}
      >
        {showComplete ? "Hide completed tasks" : "Show completed tasks"}
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={tasks}>
          {!showComplete &&
            tasks
              .filter((task) => !task.complete)
              .map((task) => {
                return <TaskItem task={task} key={task.id} />;
              })}
          {showComplete &&
            tasks.map((task) => {
              return <TaskItem task={task} key={task.id} />;
            })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
