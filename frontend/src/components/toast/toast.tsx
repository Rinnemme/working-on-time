import { useSelector, useDispatch } from "react-redux";
import { unsetToast } from "@/src/store/toastSlice";
import { useEffect } from "react";
import type { AppState } from "@/src/store/store";
import Image from "next/image";
import Success from "@/public/success.svg";
import Failure from "@/public/failure.svg";

export default function Toast() {
  const dispatch = useDispatch();
  const toastProps = useSelector((state: AppState) => state.toast);

  useEffect(() => {
    setTimeout(() => dispatch(unsetToast()), 2000);
  }, []);

  return (
    <div className="fixed flex items-center gap-3 z-50 top-[4.5rem] right-4 shadow-xl text-sm px-4 py-3 border border-wot-light-gray bg-white rounded-2xl slide opacity-0 max-w-xs">
      <Image
        alt="success"
        src={toastProps.error ? Failure : Success}
        height={18}
        className="shrink-0"
      />
      <span className="font-medium">{toastProps.message}</span>
    </div>
  );
}
