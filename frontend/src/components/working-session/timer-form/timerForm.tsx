import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/src/store/store";
import {
  setRemainingTime,
  setSessionTimer,
} from "@/src/store/workingSessionSlice";
import { ReactNode } from "react";
import { setToast } from "@/src/store/toastSlice";
import VolumeControl from "../volume-control/volumeControl";

// Zero-pads on blur and then hands off to react-hook-form's own onBlur.
function makePadBlur(
  rhfOnBlur: React.FocusEventHandler<HTMLInputElement>,
) {
  return (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    const n = parseInt(raw, 10);
    e.target.value =
      raw === "" || isNaN(n) || n < 0
        ? "00"
        : String(Math.min(n, 60)).padStart(2, "0");
    rhfOnBlur(e);
  };
}

export default function TimerForm({ closeTimer }: { closeTimer: () => void }) {
  const timer = useSelector((state: AppState) => state.workingSession.timer);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, setError } = useForm<any>({
    mode: "onBlur",
  });
  const { errors } = formState;

  function onSubmit(data: any) {
    if (timer.workingDuration && timer.restingDuration) {
      if (
        +data.workingSeconds + +data.workingMinutes * 60 ===
          timer.workingDuration &&
        +data.restingSeconds + +data.restingMinutes * 60 ===
          timer.restingDuration
      ) {
        closeTimer();
        return;
      }
    }
    if (+data.workingSeconds === 0 && +data.workingMinutes === 0) {
      setError("workingSeconds", {
        message: "Working time must exceed 0 seconds.",
      });
      return;
    } else if (+data.restingSeconds === 0 && +data.restingMinutes === 0) {
      setError("restingSeconds", {
        message: "Resting time must exceed 0 seconds.",
      });
      return;
    }
    const workingDuration = +data.workingMinutes * 60 + +data.workingSeconds;
    const restingDuration = +data.restingMinutes * 60 + +data.restingSeconds;
    dispatch(setRemainingTime(null));
    localStorage.removeItem("remainingTime");
    dispatch(setSessionTimer({ workingDuration, restingDuration }));
    localStorage.setItem("workingDuration", workingDuration.toString());
    localStorage.setItem("restingDuration", restingDuration.toString());
    dispatch(setToast({ error: false, message: "Changes saved!" }));
    closeTimer();
  }

  const inputClass =
    "w-14 bg-wot-off-white rounded-xl border-0 px-2 py-2 text-center text-wot-rose font-semibold text-xl tabular-nums shadow-sm ring-1 ring-inset ring-wot-light-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wot-rose";

  const validate = (v: string) => {
    const n = parseInt(v, 10);
    return (!isNaN(n) && n >= 0 && n <= 60) || "Enter a number from 0 to 60";
  };

  // Destructure so we can intercept onBlur while keeping RHF's handler.
  const { ref: wMinRef, onBlur: wMinBlur, ...wMinRest } = register("workingMinutes", { validate });
  const { ref: wSecRef, onBlur: wSecBlur, ...wSecRest } = register("workingSeconds", { validate });
  const { ref: rMinRef, onBlur: rMinBlur, ...rMinRest } = register("restingMinutes", { validate });
  const { ref: rSecRef, onBlur: rSecBlur, ...rSecRest } = register("restingSeconds", { validate });

  const isEdit = !!(timer.restingDuration && timer.workingDuration);

  return (
    <div className="w-[300px] bg-white h-fit flex flex-col items-center gap-4 p-6 border border-wot-light-gray rounded-2xl shadow-md justify-center relative">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="text-center flex flex-col items-center">
          <h3 className="text-xl font-black tracking-tight mb-5 text-wot-rose">
            {isEdit ? "Edit Your Timer" : "Set Your Timer"}
          </h3>

          {/* Working Time */}
          <div className="w-full mb-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-2">
              Working Time
            </div>
            {/* Input row — colon lives here so it aligns with inputs only */}
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                id="workingMinutes"
                defaultValue={
                  timer.workingDuration
                    ? String(Math.floor(timer.workingDuration / 60)).padStart(2, "0")
                    : "25"
                }
                className={inputClass}
                {...wMinRest}
                ref={wMinRef}
                onBlur={makePadBlur(wMinBlur)}
              />
              <span className="text-wot-rose font-bold text-xl">:</span>
              <input
                type="text"
                inputMode="numeric"
                id="workingSeconds"
                defaultValue={
                  timer.workingDuration
                    ? String(timer.workingDuration % 60).padStart(2, "0")
                    : "00"
                }
                className={inputClass}
                {...wSecRest}
                ref={wSecRef}
                onBlur={makePadBlur(wSecBlur)}
              />
            </div>
            {/* Label row — separate so colon doesn't fight the label height */}
            <div className="flex items-center justify-center gap-2 mt-1">
              <label htmlFor="workingMinutes" className="w-14 text-center text-xs text-wot-gray font-medium">
                min
              </label>
              <span className="w-[1ch]" />
              <label htmlFor="workingSeconds" className="w-14 text-center text-xs text-wot-gray font-medium">
                sec
              </label>
            </div>
            <p className="mt-1.5 text-xs h-4 text-wot-rose font-medium text-center">
              {(errors.workingMinutes?.message || errors.workingSeconds?.message) as ReactNode}
            </p>
          </div>

          {/* Resting Time */}
          <div className="w-full mb-1 mt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-2">
              Resting Time
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                id="restingMinutes"
                defaultValue={
                  timer.restingDuration
                    ? String(Math.floor(timer.restingDuration / 60)).padStart(2, "0")
                    : "05"
                }
                className={inputClass}
                {...rMinRest}
                ref={rMinRef}
                onBlur={makePadBlur(rMinBlur)}
              />
              <span className="text-wot-rose font-bold text-xl">:</span>
              <input
                type="text"
                inputMode="numeric"
                id="restingSeconds"
                defaultValue={
                  timer.restingDuration
                    ? String(timer.restingDuration % 60).padStart(2, "0")
                    : "00"
                }
                className={inputClass}
                {...rSecRest}
                ref={rSecRef}
                onBlur={makePadBlur(rSecBlur)}
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <label htmlFor="restingMinutes" className="w-14 text-center text-xs text-wot-gray font-medium">
                min
              </label>
              <span className="w-[1ch]" />
              <label htmlFor="restingSeconds" className="w-14 text-center text-xs text-wot-gray font-medium">
                sec
              </label>
            </div>
            <p className="mt-1.5 text-xs h-4 text-wot-rose font-medium text-center">
              {(errors.restingMinutes?.message || errors.restingSeconds?.message) as ReactNode}
            </p>
          </div>

          {/* Volume */}
          <div className="mt-4 w-full flex flex-col items-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-wot-gray mb-3">
              Transition Cue Volume
            </div>
            <VolumeControl />
          </div>

          <div className="mt-5 w-full flex justify-center">
            <button
              type="submit"
              className="rounded-full bg-wot-rose px-8 py-2.5 font-semibold text-sm text-white shadow-md hover:shadow-lg hover:bg-wot-light-rose transition-all duration-300"
            >
              {isEdit ? "Save" : "Set Timer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
