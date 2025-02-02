import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../store/projectSlice";
import { Project } from "@/src/store/types";

export default function ProjectDeleteConfirmation({
  project,
  closeFunc,
}: Readonly<{ project: Project; closeFunc: () => void }>) {
  const dispatch = useDispatch();

  async function confirmFunc() {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `${process.env.baseURI}/my-projects/${project.id}/delete`,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await dispatch(deleteProject(project));
          closeFunc();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-56 mt-8 px-2.5 py-1.5 text-balance text-gray-900">
        Are you sure you want to delete this project? This action cannot be
        undone.
      </div>

      <div className="w-full mb-2 flex justify-center">
        <button
          onClick={confirmFunc}
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-4 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
