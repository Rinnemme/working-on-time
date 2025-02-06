import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../../../store/projectSlice";
import { setToast } from "@/src/store/toastSlice";

export default function AddProjectForm({
  closeFunc,
}: Readonly<{ closeFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<any>({
    mode: "onTouched",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    axios({
      method: "POST",
      data: {
        name: data.projectName,
        priority: data.priority,
        description: data.description,
        due: data.due,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/my-projects/add`,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(
            addProject({
              ...res.data[0],
              totalTasks: "0",
              completedTasks: "0",
              tasks: [],
            })
          );
          dispatch(setToast("Project added!"));
          closeFunc();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
        <h3 className="text-3xl font-bold leading-6 mb-5 mt-4 text-wot-yellow">
          New project
        </h3>

        <div className="w-96 mt-6">
          <label
            htmlFor="projectName"
            className="block font-normal leading-6 text-wot-black"
          >
            Project Name
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="text"
              id="projectName"
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-yellow sm:text-sm sm:leading-6"
              {...register("projectName", {
                required: "Project name is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-yellow">
            {errors.projectName?.message as ReactNode}
          </p>
        </div>

        <div className="w-80 mt-6 mb-4">
          <label
            htmlFor="priority"
            className="block font-normal leading-6 text-wot-black"
          >
            Priority
          </label>
          <div className="mt-2 flex justify-center">
            <select
              id="priority"
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-yellow sm:text-sm sm:leading-6"
              {...register("priority")}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>

        <div className="w-80 mt-6 mb-4">
          <label
            htmlFor="due"
            className="block font-normal leading-6 text-wot-black"
          >
            Due
          </label>
          <div className="mt-2 flex justify-center">
            <input
              type="date"
              id="due"
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-yellow sm:text-sm sm:leading-6"
              {...register("due")}
            />
          </div>
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
              className="block w-72 h-36 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-yellow sm:text-sm sm:leading-6"
              {...register("description", {
                required: "A description is required",
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-yellow">
            {errors.description?.message as ReactNode}
          </p>
        </div>
      </div>
      <div className="mt-5 sm:mt-6 w-full mb-4 flex justify-center">
        <button
          type="submit"
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-yellow px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}
