import { Project } from "@/src/store/types";
import Throbber from "../throbber/throbber";
import { AppState } from "@/src/store/store";
import { useSelector } from "react-redux";
import Timer from "./timer/timer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setWorkingProject,
  setWorking,
  setRemainingTime,
} from "@/src/store/workingSessionSlice";
import TaskList from "../task-list/taskList";
import AddTaskButton from "../add-task-button/addTaskButton";
import Modal from "../modal/modal";
import SessionSelectList from "../empty-session/session-select-list/sessionSelectList";
import TimerForm from "./timer-form/timerForm";

export default function WorkingSession({ project }: { project: Project }) {
  const isLoading = useSelector((state: AppState) => state.isLoading);
  const allProjects = useSelector((state: AppState) => state.projects);
  const workingDuration = useSelector(
    (state: AppState) => state.workingSession.timer.workingDuration
  );
  const restingDuration = useSelector(
    (state: AppState) => state.workingSession.timer.restingDuration
  );
  const working = useSelector(
    (state: AppState) => state.workingSession.working
  );
  const [showTimerForm, setShowTimerForm] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [resets, setResets] = useState<number>(0);
  const dispatch = useDispatch();

  const changeProject = (projectid: number) => {
    dispatch(setWorkingProject(projectid));
    dispatch(setWorking(true));
    dispatch(setRemainingTime(0));
    localStorage.setItem("working", "1");
    localStorage.removeItem("remainingTime");
    setResets((resets) => resets + 1);
    setModal(false);
  };

  const toggleWorking = () => {
    dispatch(setWorking(!working));
    const localWorking = working ? "0" : "1";
    localStorage.setItem("working", localWorking);
  };

  return (
    <div className="bg-wot-off-white top-0 w-full z-0 fade-in">
      {isLoading && <Throbber />}
      <div className="relative flex flex-col items-center pb-20 pt-10 justify-center w-full">
        <div className="text-center flex items-center w-full flex-col px-2">
          <h1
            className={
              "text-3xl font-bold " +
              (working ? "text-wot-rose" : "text-wot-blue")
            }
          >
            {project.name}
          </h1>
          <h2
            className={
              "font-bold text-3xl mt-1 mb-2 " +
              (working ? "text-wot-yellow" : "text-wot-light-green")
            }
          >
            {working ? "Working" : "Break"}
          </h2>
          <div
            className={
              "self-center mt-2 text-sm px-3 py-1 text-center bg-wot-white border rounded-full hover:cursor-pointer transition " +
              (working
                ? "text-wot-rose border-wot-rose hover:text-wot-yellow hover:border-wot-yellow"
                : "text-wot-blue border-wot-blue hover:text-wot-light-green hover:border-wot-light-green")
            }
            onClick={() => setModal(true)}
          >
            Change Project
          </div>
        </div>
        <div className="w-full flex justify-center items-end gap-4 px-4 mt-8 flex-wrap-reverse">
          <div className="max-w-md w-full h-fit p-4 bg-white border-wot-light-gray border overflow-visible">
            <div className="w-full bg-white flex items-center justify-center gap-2 sticky mb-2 mt-2 text-lg">
              <div className="font-bold">Task List</div>{" "}
              <AddTaskButton projectid={project.id} />
            </div>
            <TaskList projectid={project.id} />
          </div>

          {(!workingDuration || !restingDuration || showTimerForm) && (
            <TimerForm closeTimer={() => setShowTimerForm(false)} />
          )}
          {working && workingDuration && !showTimerForm && (
            <div className="w-fit flex flex-col gap-5">
              <Timer
                toggleWorking={toggleWorking}
                togglePaused={() => setPaused(!paused)}
                keyParam={resets}
                resetTimer={() => setResets((resets) => resets + 1)}
                duration={workingDuration}
                working={working}
                paused={paused}
              />
              <div
                className={
                  "self-center text-sm px-3 py-1 mb-2 text-center bg-wot-white border rounded-full hover:cursor-pointer transition " +
                  (working
                    ? "text-wot-rose border-wot-rose hover:text-wot-yellow hover:border-wot-yellow"
                    : "text-wot-blue border-wot-blue hover:text-wot-light-green hover:border-wot-light-green")
                }
                onClick={() => setShowTimerForm(true)}
              >
                Edit Timer
              </div>
            </div>
          )}
          {!working && restingDuration && !showTimerForm && (
            <div className="w-fit flex flex-col gap-5">
              <Timer
                toggleWorking={toggleWorking}
                togglePaused={() => setPaused(!paused)}
                keyParam={resets}
                resetTimer={() => setResets((resets) => resets + 1)}
                duration={restingDuration}
                working={working}
                paused={paused}
              />
              <div
                className={
                  "self-center text-sm px-3 py-1 text-center bg-wot-white border rounded-full hover:cursor-pointer transition " +
                  (working
                    ? "text-wot-rose border-wot-rose hover:text-wot-yellow hover:border-wot-yellow"
                    : "text-wot-blue border-wot-blue hover:text-wot-light-green hover:border-wot-light-green")
                }
                onClick={() => setShowTimerForm(true)}
              >
                Edit Timer
              </div>
            </div>
          )}
        </div>
      </div>
      {modal && (
        <Modal
          closeFunc={() => setModal(false)}
          backgroundColor="wot-light-gray"
        >
          <div className="mt-6 mb-6">
            <h2 className="font-bold text-2xl mb-[-10px] text-wot-rose">
              Select Another Project
            </h2>
            <SessionSelectList
              projects={allProjects}
              selectFunction={changeProject}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
