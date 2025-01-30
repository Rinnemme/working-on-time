import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import Image from "next/image";
import WorkingPause from "../../../../public/pause-rose.svg";
import WorkingPlay from "../../../../public/play-rose.svg";
import WorkingReplay from "../../../../public/replay-rose.svg";
import WorkingSkip from "../../../../public/skip-rose.svg";
import RestingPause from "../../../../public/pause-blue.svg";
import RestingPlay from "../../../../public/play-blue.svg";
import RestingReplay from "../../../../public/replay-blue.svg";
import RestingSkip from "../../../../public/skip-blue.svg";

export default function Timer({
  stateSetter,
  duration,
  working,
}: {
  stateSetter: () => void;
  duration: number;
  working: boolean;
}) {
  function timeString(num: number) {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    const min = minutes < 10 ? `0${minutes}` : minutes;
    const sec = seconds < 10 ? `0${seconds}` : seconds;
    return `${min}:${sec}`;
  }
  const [paused, setPaused] = useState<boolean>(false);
  const [repetition, setRepetition] = useState<number>(0);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    return (
      <div className={"absolute top-full mt-4 text-center"}>
        <div className="text-md mb-2 font-semibold">Time Remaining</div>
        <div className="flex items-center gap-2 justify-center">
          <Image
            alt="Restart Timer"
            onClick={() => {
              setRepetition((repetition) => repetition + 1);
            }}
            className="h-8 hover:cursor-pointer active:scale-95"
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
            alt="Restart Timer"
            onClick={stateSetter}
            className="h-8 hover:cursor-pointer active:scale-95"
            src={working ? WorkingSkip : RestingSkip}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-[300px] h-fit flex flex-col gap-6 p-6 pb-28 border border-wot-light-gray justify-center relative">
      <div className="w-fit h-fit flex justify-center relative fade-in">
        <CountdownCircleTimer
          isPlaying={!paused}
          duration={duration}
          size={250}
          key={repetition}
          colors={working ? ["#820263", "#820263"] : ["#3066be", "#3066be"]}
          colorsTime={[duration, 0]}
          onComplete={stateSetter}
          strokeWidth={28}
          strokeLinecap={"butt"}
          trailColor={working ? "#fa9f42" : "#1da67b"}
        >
          {renderTime}
        </CountdownCircleTimer>
        <div
          className="absolute self-center w-fit"
          onClick={() => setPaused(!paused)}
        >
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
