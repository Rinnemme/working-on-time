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
    <div className="h-5 w-5 ms-auto mr-3 relative">
      <Image
        src={Tools}
        alt={"Task tools"}
        className="w-5 bg-wot-light-gray rounded-full hover:cursor-pointer hover:bg-wot-gray transition-all"
        onClick={() => setDropdown(!dropdown)}
      ></Image>
      {dropdown && (
        <div
          className="absolute top-6 right-0 bg-wot-off-white border border-wot-light-gray shadow z-10 w-fit py-2 px-3"
          onMouseLeave={() => setDropdown(false)}
        >
          <div
            className="text-nowrap text-end hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Details")}
          >
            View Details
          </div>
          <div
            className="text-nowrap text-end hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Edit")}
          >
            Edit Task
          </div>
          <div
            className="text-nowrap text-end hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Delete")}
          >
            Delete Task
          </div>
        </div>
      )}
      {modal === "Edit" && (
        <Modal closeFunc={() => setModal(null)}>
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
        <Modal closeFunc={() => setModal(null)}>
          <TaskDetails task={task} />
        </Modal>
      )}
    </div>
  );
}
