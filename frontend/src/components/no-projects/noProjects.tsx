import { useState } from "react";
import Modal from "../modal/modal";
import AddProjectForm from "../add-project-button/add-project-form/addProjectForm";

export default function NoProjects() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="border w-64 border-wot-light-gray rounded-lg border-dashed relative flex flex-col py-4 px-2 justify-center items-center hover:cursor-pointer hover:scale-105 duration-300 active:scale-100 hover:bg-white hover:shadow-sm"
      >
        <div className="font-semibold text-wot-rose text-lg hover:cursor-pointer">
          No Projects Yet
        </div>
        <div className="font-regular hover:cursor-pointer">
          Click to add a project
        </div>
      </div>
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
