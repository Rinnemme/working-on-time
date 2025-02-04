import { useSelector, useDispatch } from "react-redux";
import { unsetToast } from "@/src/store/toastSlice";
import { useEffect } from "react";
import type { AppState } from "@/src/store/store";
import Image from "next/image";
import Success from "@/public/success.svg";

export default function Toast() {
  const dispatch = useDispatch();
  const message = useSelector((state: AppState) => state.toast.message);

  useEffect(() => {
    setTimeout(() => dispatch(unsetToast()), 5000);
  }, []);

  return (
    <div className="fixed flex gap-2 z-50 top-[4.5rem] right-4 shadow-lg text-sm px-4 py-2 border border-wot-light-gray bg-white rounded-md slide opacity-0">
      <Image alt="success" src={Success} height={18} />
      {message}
    </div>
  );
}
