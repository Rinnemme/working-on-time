import { useForm } from "react-hook-form";
import axios from "axios";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../../store/projectSlice";
import { Project } from "@/src/store/types";
import { setToast } from "@/src/store/toastSlice";

export default function ProjectEditForm({
  project,
  closeFunc,
}: Readonly<{ project: Project; closeFunc: () => void }>) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<any>({
    mode: "onChange",
  });
  const { errors } = formState;

  async function onSubmit(data: any) {
    if (
      data.projectName === project.name &&
      data.priority === project.priority &&
      data.description === project.description
    ) {
      closeFunc();
      return;
    }
    axios({
      method: "POST",
      data: {
        name: data.projectName,
        priority: data.priority,
        description: data.description,
        due: data.due,
      },
      withCredentials: true,
      url: `${process.env.baseURI}/my-projects/${project.id}/edit`,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(
            updateProject({
              ...project,
              name: data.projectName,
              priority: +data.priority,
              description: data.description,
              due: data.due,
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
          Edit project
        </h3>

        <div className="w-96 mt-3">
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
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              defaultValue={project.name}
              {...register("projectName", {
                required: "Project name is required",
                maxLength: {
                  value: 50,
                  message: "Must be no longer than 50 characters.",
                },
              })}
            />
          </div>
          <p className="mt-1 text-sm h-2 text-wot-blue">
            {errors.projectName?.message as ReactNode}
          </p>
        </div>

        <div className="w-80 mt-4 mb-4">
          <label
            htmlFor="priority"
            className="block font-normal leading-6 text-wot-black"
          >
            Priority
          </label>
          <div className="mt-2 flex justify-center">
            <select
              id="priority"
              defaultValue={project.priority}
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              {...register("priority")}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>

        <div className="w-80 mt-4 mb-4">
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
              defaultValue={project.due.slice(0, 10)}
              className="block w-72 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              {...register("due")}
            />
          </div>
        </div>

        <div className="w-72 mt-4">
          <label
            htmlFor="description"
            className="block font-normal leading-4 text-wot-black"
          >
            Description
          </label>
          <div className="mt-2 flex justify-center">
            <textarea
              id="description"
              className="block w-72 h-24 bg-wot-off-white rounded-md border-0 px-2.5 py-1.5 text-wot-black shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-wot-gray focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-blue sm:text-sm sm:leading-6"
              defaultValue={project.description}
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
      <div className="mt-3 w-full mb-4 flex justify-center">
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
