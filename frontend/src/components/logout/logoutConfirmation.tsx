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
      url: `${process.env.baseURI}/logout`,
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
          resetLocalStorage();
          dispatch(setToast({ error: false, message: "You have logged out" }));
          closeFunc();
          resetStore();
        }
      })
      .catch((err) => {
        dispatch(setToast({ error: true, message: "Something went wrong." }));
      })
      .finally(() => {
        setTimeout(() => dispatch(setIsLoading(false)), 500);
      });
  }

  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-56 mt-8 px-2.5 py-1.5 text-balance text-wot-black">
        Are you sure you wish to log out?
      </div>

      <div className="w-full mb-2 flex justify-center">
        <button
          onClick={confirmFunc}
          className="inline-flex w-auto justify-center rounded-3xl bg-wot-rose px-4 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
