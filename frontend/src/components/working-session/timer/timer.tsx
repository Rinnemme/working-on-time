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
}: {
  toggleWorking: () => void;
  togglePaused: () => void;
  keyParam: number;
  resetTimer: () => void;
  duration: number;
  working: boolean;
  paused: boolean;
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

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return (
      <div className={"absolute top-full mt-4 text-center"}>
        <div className="text-md mb-2 font-semibold">Time Remaining</div>
        <div className="flex items-center gap-2 justify-center">
          <Image
            alt="Restart Timer"
            onClick={reset}
            className="h-7 hover:cursor-pointer active:scale-95"
            src={working ? WorkingReplay : RestingReplay}
          />
          <div
            className={
              "text-2xl border text-center px-2 py-1 " +
              (working
                ? "border-wot-rose text-wot-rose"
                : "border-wot-blue text-wot-blue")
            }
          >
            {timeString(remainingTime)}
          </div>
          <Image
            alt="Skip"
            onClick={skip}
            className="h-8 ml-1 hover:cursor-pointer active:scale-95"
            src={working ? WorkingSkip : RestingSkip}
          />
        </div>
      </div>
    );
  };

  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2023/03/18/audio_9b98a3c314.mp3?filename=game-level-complete-143022.mp3"
  );
  audio.volume = volume;

  return (
    <div className="w-[300px] bg-white h-fit flex flex-col gap-6 p-6 pb-28 border border-wot-light-gray justify-center relative">
      <div className="w-fit h-fit flex justify-center relative fade-in">
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
        <div className="absolute self-center w-fit" onClick={togglePaused}>
          <Image
            className={"hover:cursor-pointer w-36 active:scale-95"}
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
        </div>
      </div>
    </div>
  );
}
