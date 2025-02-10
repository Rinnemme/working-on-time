import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../../store/projectSlice";
import { Task } from "@/src/store/types";
import { setToast } from "@/src/store/toastSlice";

export default function TaskEditForm({
  task,
  closeFunc,
}: Readonly<{ task: Task; closeFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<any>({
    mode: "onChange",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    if (data.taskName === task.name && data.description === task.description) {
      closeFunc();
      return;
    }
    axios({
      method: "POST",
      data: {
        name: data.taskName,
        description: data.description,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/tasks/${task.id}/edit`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            updateTask({
              ...task,
              name: data.taskName,
              description: data.description,
            })
          );
          dispatch(setToast({ error: false, message: "Changes saved!" }));
          closeFunc();
        }
      })
      .catch((err) => {
        dispatch(setToast({ error: true, message: "Something went wrong." }));
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-blue">
          Edit Task
        </h3>

        <div className="w-80 mt-6">
          <label
            htmlFor="taskName"
            className="block font-normal leading-6 text-wot-black"
          >
            Task Name
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="taskName"
              className="block w-64 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              defaultValue={task.name}
              {...register("taskName", {
                required: "Task name is required",
                maxLength: {
                  value: 50,
                  message: "Must be no longer than 50 characters.",
                },
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.taskName?.message as ReactNode}
          </p>
        </div>

        <div className="w-72 mt-6">
          <label
            htmlFor="description"
            className="block font-normal leading-4 text-wot-black"
          >
            Description
          </label>
          <div className="mt-2 flex justify-center">
            <textarea
              id="description"
              className="block w-64 h-32 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              defaultValue={task.description}
              {...register("description", {
                required: "A description is required",
                maxLength: {
                  value: 500,
                  message: "Must be no longer than 500 characters.",
                },
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.description?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 w-full mb-6 flex justify-center">
        <button
          type="submit"
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-blue px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}
