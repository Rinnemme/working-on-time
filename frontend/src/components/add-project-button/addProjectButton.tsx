import Image from "next/image";
import { useState } from "react";
import Modal from "../modal/modal";
import AddProjectForm from "./add-project-form/addProjectForm";
import Add from "../../../public/add.svg";

export default function AddProjectButton() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <Image
        className="bg-wot-light-gray hover:bg-wot-light-green hover:scale-105 transition hover:cursor-pointer rounded-full h-[18px] w-[18px] flex items-center justify-center"
        onClick={() => setModal(true)}
        src={Add}
        alt="Add a task"
      />
      {modal && (
        <Modal
          closeFunc={() => setModal(false)}
          backgroundColor="wot-light-yellow"
        >
          <AddProjectForm closeFunc={() => setModal(false)} />
        </Modal>
      )}
    </>
  );
}
