import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../store/projectSlice";
import { Task } from "@/src/store/types";

export default function TaskDeleteConfirmation({
  task,
  closeFunc,
}: Readonly<{ task: Task; closeFunc: () => void }>) {
  const dispatch = useDispatch();

  async function confirmFunc() {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `${process.env.baseURI}/tasks/${task.id}/delete`,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(deleteTask(task));
          closeFunc();
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("ruh roh, 400");
          // set an error
        } else console.log(err);
      });
  }

  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-56 mt-8 px-2.5 py-1.5 text-balance text-gray-900">
        Are you sure you want to delete this task? This action cannot be undone.
      </div>

      <div className="w-full mb-2 flex justify-center">
        <button
          onClick={confirmFunc}
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-4 py-2 my-4 font-light text-white shadow-sm hover:bg-sky-600 hover:scale-105 transition-all duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
