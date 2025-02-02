import { Project } from "@/src/store/types";
import Throbber from "../throbber/throbber";
import { AppState } from "@/src/store/store";
import { useSelector } from "react-redux";
import Timer from "./timer/timer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setWorkingProject } from "@/src/store/workingSessionSlice";
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
  const [showTimerForm, setShowTimerForm] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [resets, setResets] = useState<number>(0);
  const dispatch = useDispatch();

  const changeProject = (project: Project) => {
    dispatch(setWorkingProject(project));
    setWorking(true);
    setResets((resets) => resets + 1);
    setModal(false);
  };

  return (
    <div className="bg-wot-off-white top-0 w-full z-0 fade-in">
      {isLoading && <Throbber />}
      <div className="relative flex flex-col items-center pt-12 pb-20 sm:pt-14 justify-center w-full">
        <div className="text-center flex items-center w-full flex-col px-2">
          {modal && (
            <Modal closeFunc={() => setModal(false)}>
              <h2 className="font-bold text-3xl mt-2 mb-[-10px] text-wot-rose">
                Select Another Project
              </h2>
              <SessionSelectList
                projects={allProjects}
                selectFunction={changeProject}
              />
            </Modal>
          )}
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
              "font-bold text-3xl mt-2 mb-3 " +
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
        <div className="max-w-2xl w-full flex justify-center items-end gap-4 mt-10 flex-wrap-reverse">
          <div className="w-[300px] h-fit p-4 bg-white border-wot-light-gray border overflow-y-auto">
            <div className="w-full bg-white flex items-center justify-center gap-2 sticky mb-2 text-lg">
              <div className="font-bold">Tasks To Do</div>{" "}
              <AddTaskButton projectid={project.id} />
            </div>
            <TaskList tasks={project.tasks} />
          </div>
          {(!workingDuration || !restingDuration || showTimerForm) && (
            <TimerForm closeTimer={() => setShowTimerForm(false)} />
          )}
          {working && workingDuration && !showTimerForm && (
            <div className="w-fit flex flex-col gap-5">
              <Timer
                toggleWorking={() => setWorking(!working)}
                togglePaused={() => setPaused(!paused)}
                keyParam={resets}
                resetTimer={() => setResets((resets) => resets + 1)}
                duration={workingDuration}
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
          {!working && restingDuration && !showTimerForm && (
            <div className="w-fit flex flex-col gap-5">
              <Timer
                toggleWorking={() => setWorking(!working)}
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
    </div>
  );
}
