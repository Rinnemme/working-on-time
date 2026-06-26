import type { Project } from "@/src/store/types";
import { useState } from "react";
import Tools from "../../../public/tools.svg";
import Image from "next/image";
import Modal from "../modal/modal";
import ProjectEditForm from "./project-edit-form/projectEditForm";
import ProjectDeleteConfirmation from "./project-delete-confirmation/projectDeleteConfirmation";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ModalType = "Edit" | "Delete" | null;

export default function ProjectTools({ project }: { project: Project }) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);
  const path = usePathname();

  return (
    <div className="h-5 w-5 min-w-5 min-h-5 ms-auto relative text-base">
      <Image
        src={Tools}
        alt={"project tools"}
        className="w-5 bg-wot-light-gray rounded-full hover:cursor-pointer hover:bg-wot-gray transition-all"
        onClick={() => setDropdown(!dropdown)}
      ></Image>
      {dropdown && (
        <div
          className="absolute font-normal top-6 right-0 bg-white border border-wot-light-gray shadow-xl rounded-xl z-10 w-fit py-2 px-2"
          onMouseLeave={() => setDropdown(false)}
        >
          {path !== `/projects/${project.id}` && (
            <Link href={`/projects/${project.id}`}>
              <div className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition">
                Go To Project
              </div>
            </Link>
          )}
          <div
            className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition"
            onClick={() => setModal("Edit")}
          >
            Edit Project
          </div>
          <div
            className="text-nowrap text-sm rounded-lg px-3 py-1.5 text-wot-black hover:cursor-pointer hover:bg-wot-lighter-gray hover:text-wot-rose transition"
            onClick={() => setModal("Delete")}
          >
            Delete Project
          </div>
        </div>
      )}
      {modal === "Edit" && (
        <Modal closeFunc={() => setModal(null)} backgroundColor="bg-wot-blue">
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
