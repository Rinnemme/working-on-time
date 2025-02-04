import { useSelector, useDispatch } from "react-redux";
import { unsetToast } from "@/src/store/toastSlice";
import { useEffect } from "react";
import type { AppState } from "@/src/store/store";

export default function Toast() {
  const dispatch = useDispatch();
  const message = useSelector((state: AppState) => state.toast.message);

  useEffect(() => {
    setTimeout(() => dispatch(unsetToast()), 5000);
  }, []);

  return (
    <div className="fixed z-50 top-6 right-6 shadow-xl border-wot-gray border px-5 py-3 bg-white rounded-md slide opacity-0">
      {message}
    </div>
  );
}
