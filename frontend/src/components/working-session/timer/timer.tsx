import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Image from "next/image";
import WorkingPause from "../../../../public/pause-rose.svg";
import WorkingPlay from "../../../../public/play-rose.svg";
import WorkingReplay from "../../../../public/replay-rose.svg";
import WorkingSkip from "../../../../public/skip-rose.svg";
import RestingPause from "../../../../public/pause-blue.svg";
import RestingPlay from "../../../../public/play-blue.svg";
import RestingReplay from "../../../../public/replay-blue.svg";
import RestingSkip from "../../../../public/skip-blue.svg";
import { useSelector, useDispatch } from "react-redux";
import { setRemainingTime } from "@/src/store/workingSessionSlice";
import { AppState } from "@/src/store/store";

export default function Timer({
  toggleWorking,
  togglePaused,
  keyParam,
  resetTimer,
  duration,
  working,
  paused,
  onEditTimer,
}: {
  toggleWorking: () => void;
  togglePaused: () => void;
  keyParam: number;
  resetTimer: () => void;
  duration: number;
  working: boolean;
  paused: boolean;
  onEditTimer: () => void;
}) {
  const dispatch = useDispatch();
  const volume = useSelector((state: AppState) => state.volume);
  const reduxRemainingTime = useSelector(
    (state: AppState) => state.workingSession.timer.currentRemainingTime
  );

  function timeString(num: number) {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    const min = minutes < 10 ? `0${minutes}` : minutes;
    const sec = seconds < 10 ? `0${seconds}` : seconds;
    return `${min}:${sec}`;
  }

  function reset() {
    dispatch(setRemainingTime(duration));
    localStorage.setItem("remainingTime", duration.toString());
    resetTimer();
  }

  function skip() {
    dispatch(setRemainingTime(null));
    localStorage.removeItem("remainingTime");
    toggleWorking();
  }

  // Renders the remaining time inside the circle center.
  const renderTime = ({ remainingTime }: { remainingTime: number }) => (
    <span
      className={
        "text-3xl font-black tabular-nums tracking-tight " +
        (working ? "text-wot-rose" : "text-wot-blue")
      }
    >
      {timeString(remainingTime)}
    </span>
  );

  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2023/03/18/audio_9b98a3c314.mp3?filename=game-level-complete-143022.mp3"
  );
  audio.volume = volume;

  return (
    <div className="w-[300px] bg-white h-fit flex flex-col items-center gap-6 p-6 border border-wot-light-gray rounded-2xl shadow-md">
      {/* Circle with time inside */}
      <div className="fade-in">
        <CountdownCircleTimer
          isPlaying={!paused}
          duration={duration}
          initialRemainingTime={reduxRemainingTime || duration}
          size={250}
          key={keyParam}
          colors={working ? ["#820263", "#820263"] : ["#3066be", "#3066be"]}
          colorsTime={[duration, 0]}
          onComplete={toggleWorking}
          strokeWidth={28}
          strokeLinecap={"butt"}
          onUpdate={(remainingTime) => {
            dispatch(setRemainingTime(remainingTime));
            if (remainingTime === 0) {
              audio.play();
            }
            localStorage.setItem("remainingTime", remainingTime.toString());
          }}
          trailColor={working ? "#fa9f42" : "#1da67b"}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>

      {/* Controls: reset — play/pause — skip */}
      <div className="flex items-center gap-4 mb-1">
        <button
          onClick={reset}
          className="w-10 h-10 rounded-full bg-wot-lighter-gray flex items-center justify-center shadow-sm hover:shadow-md hover:cursor-pointer active:scale-95 transition"
        >
          <Image
            alt="Restart Timer"
            className="h-5"
            src={working ? WorkingReplay : RestingReplay}
          />
        </button>

        <button
          onClick={togglePaused}
          className={
            "w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:cursor-pointer active:scale-95 transition " +
            (working ? "bg-wot-rose" : "bg-wot-blue")
          }
        >
          <Image
            className="w-6 brightness-0 invert"
            alt={paused ? "Resume" : "Pause"}
            src={
              working && paused
                ? WorkingPlay
                : working && !paused
                ? WorkingPause
                : !working && paused
                ? RestingPlay
                : RestingPause
            }
          />
        </button>

        <button
          onClick={skip}
          className="w-10 h-10 rounded-full bg-wot-lighter-gray flex items-center justify-center shadow-sm hover:shadow-md hover:cursor-pointer active:scale-95 transition"
        >
          <Image
            alt="Skip"
            className="h-5"
            src={working ? WorkingSkip : RestingSkip}
          />
        </button>
      </div>
      <button
        onClick={onEditTimer}
        className={
          "text-xs font-medium text-wot-gray underline underline-offset-2 transition " +
          (working ? "hover:text-wot-rose" : "hover:text-wot-blue")
        }
      >
        Edit Timer
      </button>
    </div>
  );
}
