import type { Task } from "@/src/store/types";
import { useState } from "react";
import Tools from "../../../public/tools.svg";
import Image from "next/image";
import Modal from "../modal/modal";
import TaskEditForm from "./task-edit-form/taskEditForm";
import TaskDeleteConfirmation from "./task-delete-confirmation/taskDeleteConfirmation";
import TaskDetails from "./task-details/taskDetails";

type ModalType = "Edit" | "Delete" | "Details" | null;

export default function TaskTools({ task }: { task: Task }) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <div className="min-h-5 min-w-5 w-5 h-5 ms-auto mr-3 relative">
      <Image
        src={Tools}
        alt={"Task tools"}
        className=" bg-wot-light-gray rounded-full hover:cursor-pointer hover:bg-wot-gray transition-all"
        onClick={() => setDropdown(!dropdown)}
      ></Image>
      {dropdown && (
        <div
          className="absolute fade-in top-6 right-0 bg-white border border-wot-light-gray shadow-xl rounded-xl z-10 w-fit py-2 px-2"
          onMouseLeave={() => setDropdown(false)}
        >
          <div
            className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition"
            onClick={() => setModal("Details")}
          >
            View Details
          </div>
          <div
            className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition"
            onClick={() => setModal("Edit")}
          >
            Edit Task
          </div>
          <div
            className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition"
            onClick={() => setModal("Delete")}
          >
            Delete Task
          </div>
        </div>
      )}
      {modal === "Edit" && (
        <Modal closeFunc={() => setModal(null)} backgroundColor="wot-blue">
          <TaskEditForm closeFunc={() => setModal(null)} task={task} />
        </Modal>
      )}
      {modal === "Delete" && (
        <Modal closeFunc={() => setModal(null)}>
          <TaskDeleteConfirmation
            closeFunc={() => setModal(null)}
            task={task}
          />
        </Modal>
      )}
      {modal === "Details" && (
        <Modal
          closeFunc={() => setModal(null)}
          backgroundColor="wot-light-gray"
        >
          <TaskDetails task={task} />
        </Modal>
      )}
    </div>
  );
}
