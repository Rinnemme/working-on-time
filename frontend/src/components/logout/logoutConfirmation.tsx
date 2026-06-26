import axios from "axios";
import { useDispatch } from "react-redux";
import { setToast } from "@/src/store/toastSlice";
import { useRouter } from "next/navigation";
import { resetProjects } from "@/src/store/projectSlice";
import { resetUser } from "@/src/store/userSlice";
import { resetWorkingSession } from "@/src/store/workingSessionSlice";
import { setIsLoading } from "@/src/store/loadingSlice";

export default function LogoutConfirmation({
  closeFunc,
}: Readonly<{ closeFunc: () => void }>) {
  const dispatch = useDispatch();
  const router = useRouter();

  function resetLocalStorage() {
    localStorage.removeItem("workingid");
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("workingDuration");
    localStorage.removeItem("restingDuration");
    localStorage.removeItem("working");
  }

  function resetStore() {
    dispatch(resetProjects());
    dispatch(resetUser());
    dispatch(resetWorkingSession());
  }

  async function confirmFunc() {
    dispatch(setIsLoading(true));
    axios({
      method: "POST",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/auth/logout`,
    })
      .then((res) => {
        router.push("/");
        resetLocalStorage();
        dispatch(setToast({ error: false, message: "You have logged out" }));
        closeFunc();
        resetStore();
      })
      .catch((err) => {
        dispatch(setToast({ error: true, message: "Something went wrong." }));
      })
      .finally(() => {
        setTimeout(() => dispatch(setIsLoading(false)), 500);
      });
  }

  return (
    <div className="text-center flex flex-col items-center px-2">
      <h3 className="text-2xl font-black tracking-tight mt-6 mb-2 text-wot-rose">
        Log Out
      </h3>
      <p className="w-56 mt-2 px-2 text-sm text-wot-black leading-relaxed text-balance">
        Are you sure you wish to log out?
      </p>
      <div className="w-full mt-4 mb-6 flex justify-center">
        <button
          onClick={confirmFunc}
          className="rounded-full bg-wot-rose px-8 py-2.5 font-semibold text-sm text-white shadow-md hover:shadow-lg hover:bg-wot-light-rose transition-all duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
