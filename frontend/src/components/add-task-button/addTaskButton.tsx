import Image from "next/image";
import { useState } from "react";
import Modal from "../modal/modal";
import AddTaskForm from "../add-task-form/addTaskForm";
import Add from "../../../public/add.svg";

export default function AddTaskButton({ projectid }: { projectid: number }) {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Image
        className="bg-wot-gray hover:bg-wot-green hover:scale-105 transition hover:cursor-pointer rounded-full h-[18px] w-[18px] flex items-center justify-center"
        onClick={() => setModal(true)}
        src={Add}
        alt="Add a task"
      />
      {modal && (
        <Modal closeFunc={() => setModal(false)}>
          <AddTaskForm
            projectid={projectid}
            closeFunc={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
