import { Project, Task } from "@/src/store/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { moveTask, setProjectTasks } from "@/src/store/projectSlice";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskItem from "../task-item/taskItem";
import NoTasks from "./no-tasks/noTasks";
import { AppState } from "@/src/store/store";
import AllTasksDone from "./all-tasks-done/allTasksDone";

export default function TaskList({ projectid }: { projectid: number }) {
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const dispatch = useDispatch();
  const project = useSelector((state: AppState) =>
    state.projects.find((project) => project.id === projectid)
  ) as Project;
  const tasks = project.tasks;
  const incompleteTasks = project.tasks.filter((task) => !task.complete);
  const completedTasks = +project.completedTasks;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const oldPosition =
      tasks[tasks.findIndex((task) => task.id === active.id)].position;
    const newPosition =
      tasks[tasks.findIndex((task) => task.id === over.id)].position;
    axios({
      method: "POST",
      data: {
        swapToId: over.id,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/tasks/${active.id}/move`,
    });
    dispatch(
      moveTask({
        projectid: project.id,
        oldPosition,
        newPosition,
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 items-center max-w-xl">
      {+project.completedTasks > 0 && (
        <div
          className="italic hover:text-wot-rose text-center hover:cursor-pointer"
          onClick={() => setShowComplete(!showComplete)}
        >
          {showComplete ? "Hide completed tasks" : "Show completed tasks"}
        </div>
      )}
      {completedTasks === 0 && <div></div>} {/* spacer  */}
      {tasks.length === 0 && <NoTasks projectid={project.id} />}
      {completedTasks === +project.totalTasks && +project.totalTasks > 0 && (
        <AllTasksDone projectid={project.id} />
      )}
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={showComplete ? tasks : incompleteTasks}>
          {!showComplete &&
            incompleteTasks.map((task) => {
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
