import { useState } from "react";
import Modal from "../modal/modal";
import AddProjectForm from "./add-project-form/addProjectForm";

export default function AddProjectButton() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="flex items-center gap-1.5 bg-wot-rose text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-wot-light-rose transition hover:cursor-pointer"
      >
        + New Project
      </button>
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
