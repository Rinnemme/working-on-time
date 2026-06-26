import { useState } from "react";
import Modal from "../modal/modal";
import AddProjectForm from "../add-project-button/add-project-form/addProjectForm";

export default function NoProjects() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="border w-64 border-wot-light-gray rounded-2xl border-dashed relative flex flex-col py-6 px-4 justify-center items-center hover:cursor-pointer hover:scale-105 duration-300 active:scale-100 hover:bg-white hover:shadow-md transition"
      >
        <div className="font-bold text-wot-rose text-lg hover:cursor-pointer">
          No Projects Yet
        </div>
        <div className="text-sm text-wot-gray mt-1 hover:cursor-pointer">
          Click to add a project
        </div>
      </div>
      {modal && (
        <Modal
          closeFunc={() => setModal(false)}
          backgroundColor="bg-wot-light-yellow"
        >
          <AddProjectForm closeFunc={() => setModal(false)} />
        </Modal>
      )}
    </>
  );
}
