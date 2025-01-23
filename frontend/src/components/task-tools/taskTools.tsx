"use client";

import type { Task } from "@/src/store/types";
import { useState } from "react";
import Tools from "../../../public/tools.svg";
import Image from "next/image";
import Modal from "../modal/modal";

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
            className="text-nowrap hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Edit")}
          >
            Edit Task
          </div>
          <div className="text-nowrap hover:cursor-pointer hover:text-wot-rose">
            Delete Task
          </div>
          <div className="text-nowrap hover:cursor-pointer hover:text-wot-rose">
            View Details
          </div>
        </div>
      )}
      {modal === "Edit" && <Modal closeFunc={() => setModal(null)}>okok</Modal>}
      {modal === "Delete" && (
        <Modal closeFunc={() => setModal(null)}>okok</Modal>
      )}
      {modal === "Details" && (
        <Modal closeFunc={() => setModal(null)}>okok</Modal>
      )}
    </div>
  );
}
