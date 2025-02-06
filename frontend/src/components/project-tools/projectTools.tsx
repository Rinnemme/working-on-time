import type { Project } from "@/src/store/types";
import { useState } from "react";
import Tools from "../../../public/tools.svg";
import Image from "next/image";
import Modal from "../modal/modal";
import ProjectEditForm from "./project-edit-form/projectEditForm";
import ProjectDeleteConfirmation from "./project-delete-confirmation/projectDeleteConfirmation";
import Link from "next/link";

type ModalType = "Edit" | "Delete" | null;

export default function ProjectTools({ project }: { project: Project }) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <div className="h-5 w-5 ms-auto relative">
      <Image
        src={Tools}
        alt={"project tools"}
        className="w-5 bg-wot-light-gray rounded-full hover:cursor-pointer hover:bg-wot-gray transition-all"
        onClick={() => setDropdown(!dropdown)}
      ></Image>
      {dropdown && (
        <div
          className="absolute font-normal top-6 right-0 bg-wot-off-white border border-wot-light-gray shadow z-10 w-fit py-2 px-3"
          onMouseLeave={() => setDropdown(false)}
        >
          <Link href={`/projects/${project.id}`}>
            <div className="text-nowrap text-end text-wot-black hover:cursor-pointer hover:text-wot-rose">
              Go To Project
            </div>
          </Link>
          <div
            className="text-nowrap text-end text-wot-black hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Edit")}
          >
            Edit Project
          </div>
          <div
            className="text-nowrap text-end text-wot-black hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Delete")}
          >
            Delete project
          </div>
          <div className="text-nowrap text-end text-wot-black hover:cursor-pointer hover:text-wot-rose">
            Working Session
          </div>
        </div>
      )}
      {modal === "Edit" && (
        <Modal closeFunc={() => setModal(null)} backgroundColor="wot-blue">
          <ProjectEditForm closeFunc={() => setModal(null)} project={project} />
        </Modal>
      )}
      {modal === "Delete" && (
        <Modal closeFunc={() => setModal(null)}>
          <ProjectDeleteConfirmation
            closeFunc={() => setModal(null)}
            project={project}
          />
        </Modal>
      )}
    </div>
  );
}
