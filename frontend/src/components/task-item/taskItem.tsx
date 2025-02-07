import { Task } from "../../../src/store/types";
import Image from "next/image";
import Draggable from "../../../public/draggable.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskTools from "../task-tools/taskTools";
import { useDispatch } from "react-redux";
import { setToast } from "@/src/store/toastSlice";
import { toggleTaskCompletion } from "@/src/store/projectSlice";
import axios from "axios";

export default function TaskItem({ task }: { task: Task }) {
  const dispatch = useDispatch();

  const toggleComplete = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.baseURI}/tasks/${task.id}/toggle`,
    })
      .then((res) => {
        if (res.status === 200) {
          if (!task.complete) {
            dispatch(setToast({ error: false, message: "Task completed!" }));
          }
          dispatch(toggleTaskCompletion(task));
        }
      })
      .catch((err) => {
        dispatch(setToast({ error: true, message: "Something went wrong." }));
      });
  };

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
      className={
        "border border-wot-light-gray w-full rounded-sm relative flex py-4 px-1 items-center " +
        (task.complete
          ? "bg-wot-lighter-gray text-wot-gray line-through"
          : " bg-white")
      }
    >
      <Image
        src={Draggable}
        alt={"Draggable"}
        ref={setActivatorNodeRef}
        {...listeners}
        className="min-h-6 min-w-6 w-6 h-6 ms-1 me-2 hover:cursor-move"
      />
      <input
        type="checkbox"
        className="hover:cursor-pointer accent-wot-gray"
        onChange={() => toggleComplete()}
        checked={task.complete}
      ></input>
      <div className="ms-3 me-2 text-nowrap overflow-hidden overflow-ellipsis">
        {task.name}
      </div>
      <TaskTools task={task} />
    </div>
  );
}
