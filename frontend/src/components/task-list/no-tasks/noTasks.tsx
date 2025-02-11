import Modal from "../../modal/modal";
import AddTaskForm from "../../add-task-button/add-task-form/addTaskForm";
import { useState } from "react";

export default function NoTasks({ projectid }: { projectid: number }) {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setModal(true)}
        className="border w-64 border-wot-light-gray rounded-lg border-dashed relative flex flex-col py-4 px-2 justify-center items-center hover:cursor-pointer hover:scale-105 duration-300 active:scale-100 hover:bg-white hover:shadow-sm"
      >
        <div className="font-semibold text-wot-rose text-lg hover:cursor-pointer">
          No Tasks Yet
        </div>
        <div className="font-regular hover:cursor-pointer">
          Click to add a task
        </div>
      </div>
      {modal && (
        <Modal
          closeFunc={() => setModal(false)}
          backgroundColor="wot-light-yellow"
        >
          <AddTaskForm
            projectid={projectid}
            closeFunc={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
