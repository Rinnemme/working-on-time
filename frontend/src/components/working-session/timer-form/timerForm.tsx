import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/src/store/store";
import {
  setRemainingTime,
  setSessionTimer,
} from "@/src/store/workingSessionSlice";
import { ReactNode } from "react";

export default function TimerForm({ closeTimer }: { closeTimer: () => void }) {
  const timer = useSelector((state: AppState) => state.workingSession.timer);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, trigger, setError } = useForm<any>(
    {
      mode: "onTouched",
    }
  );
  const { errors } = formState;

  function onSubmit(data: any) {
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
    } else {
      const workingDuration = +data.workingMinutes * 60 + +data.workingSeconds;
      const restingDuration = +data.restingMinutes * 60 + +data.restingSeconds;
      dispatch(setRemainingTime(null));
      localStorage.removeItem("remainingTime");
      dispatch(
        setSessionTimer({
          workingDuration,
          restingDuration,
        })
      );
      localStorage.setItem("workingDuration", workingDuration.toString());
      localStorage.setItem("restingDuration", restingDuration.toString());
      closeTimer();
    }
  }

  return (
    <div className="w-[300px] bg-white h-fit flex flex-col items-center gap-6 p-6 border border-wot-light-gray justify-center relative">
      <div className="w-fit h-fit flex justify-center relative fade-in">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-3 text-center flex flex-col items-center sm:mt-5">
            <h3 className="text-xl font-bold mb-5 text-wot-rose">
              {timer.restingDuration && timer.workingDuration
                ? "Edit Your Timer"
                : "Set Your Timer"}
            </h3>

            <div className="font-semibold text-lg">Working Time</div>
            <div className="w-full gap-2 flex items-center justify-center">
              <div className="mt-2 flex justify-center">
                <input
                  type="text"
                  id="workingMinutes"
                  defaultValue={
                    timer.workingDuration
                      ? Math.floor(timer.workingDuration / 60)
                      : "00"
                  }
                  className="w-12 bg-wot-off-white rounded-sm text-xl text-wot-rose border-0 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose"
                  {...register("workingMinutes", {
                    required: "You must enter a working duration",
                    pattern: {
                      value: /^([0]?[0-9]|[1-5][0-9]|[6]?[0])$/,
                      message: "Please enter a number of minutes from 0-60",
                    },
                  })}
                />
              </div>
              <label
                htmlFor="workingMinutes"
                className="block font-normal pt-2 text-xl"
              >
                M
              </label>
              <div className="mt-2 flex justify-center">
                <input
                  type="text"
                  id="workingSeconds"
                  defaultValue={
                    timer.workingDuration ? timer.workingDuration % 60 : "00"
                  }
                  className="w-12 bg-wot-off-white rounded-sm text-xl text-wot-rose border-0 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose"
                  {...register("workingSeconds", {
                    required: "You must enter a working duration",
                    pattern: {
                      value: /^([0]?[0-9]|[1-5][0-9]|[6]?[0])$/,
                      message: "Please enter a number of seconds from 0-60",
                    },
                  })}
                />
              </div>
              <label
                htmlFor="workingSeconds"
                className="block font-normal pt-2 text-xl"
              >
                S
              </label>
            </div>
            <p className="mt-1 text-sm h-2 text-wot-rose">
              {
                (errors.workingMinutes?.message ||
                  errors.workingSeconds?.message) as ReactNode
              }
            </p>

            <div className="mt-5 font-semibold text-lg">Resting Time</div>
            <div className="w-full gap-2 flex items-center justify-center">
              <div className="mt-2 flex justify-center">
                <input
                  type="text"
                  id="restingMinutes"
                  defaultValue={
                    timer.restingDuration
                      ? Math.floor(timer.restingDuration / 60)
                      : "00"
                  }
                  className="w-12 bg-wot-off-white rounded-sm text-xl text-wot-rose border-0 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose"
                  {...register("restingMinutes", {
                    required: "You must enter a working duration",
                    pattern: {
                      value: /^([0]?[0-9]|[1-5][0-9]|[6]?[0])$/,
                      message: "Please enter a number of minutes from 0-60",
                    },
                  })}
                />
              </div>
              <label
                htmlFor="restingMinutes"
                className="block font-normal pt-2 text-xl"
              >
                M
              </label>
              <div className="mt-2 flex justify-center">
                <input
                  type="text"
                  id="restingSeconds"
                  defaultValue={
                    timer.restingDuration ? timer.restingDuration % 60 : "00"
                  }
                  className="w-12 bg-wot-off-white rounded-sm text-xl text-wot-rose border-0 px-2.5 py-1.5 shadow-sm ring-1 ring-inset ring-wot-light-gray placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-wot-light-rose"
                  {...register("restingSeconds", {
                    required: "You must enter a working duration",
                    pattern: {
                      value: /^([0]?[0-9]|[1-5][0-9]|[6]?[0])$/,
                      message: "Please enter a number of seconds from 0-60",
                    },
                  })}
                />
              </div>
              <label
                htmlFor="restingSeconds"
                className="block font-normal pt-2 text-xl"
              >
                S
              </label>
            </div>
            <p className="mt-1 text-sm h-2 text-wot-rose">
              {
                (errors.restingMinutes?.message ||
                  errors.restingSeconds?.message) as ReactNode
              }
            </p>

            <div className="mt-4 w-full flex justify-center">
              <button
                type="submit"
                className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-5 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
              >
                {timer.restingDuration && timer.workingDuration
                  ? "Save"
                  : "Start Session"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
