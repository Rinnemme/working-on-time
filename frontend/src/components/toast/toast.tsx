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
    <div className="fixed flex gap-2 z-50 top-[4.5rem] right-4 shadow-lg text-sm pe-4 ps-3 py-2 border border-wot-light-gray bg-white rounded-md slide opacity-0">
      <Image
        alt="success"
        src={toastProps.error ? Failure : Success}
        height={18}
      />
      {toastProps.message}
    </div>
  );
}
