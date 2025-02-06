import { useState } from "react";
import Modal from "../modal/modal";
import LogoutConfirmation from "../logout/logoutConfirmation";
import { useSelector } from "react-redux";
import { AppState } from "@/src/store/store";

type ModalType = "Logout" | null;

export default function UserTools() {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>(null);
  const nickname = useSelector((state: AppState) => state.user.nickname);

  return (
    <>
      <div className="flex items-center hover:cursor-pointer">
        <div className="flex-shrink-0">
          <button
            type="button"
            className="rounded-md px-3 py-2 hover:cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:text-wot-rose"
            onClick={() => setDropdown(true)}
          >
            {`Welcome, ${nickname}!`}
          </button>
        </div>
      </div>
      {dropdown && (
        <div
          className="absolute top-16 right-7 bg-white border border-wot-light-gray shadow z-10 w-fit py-2 px-3"
          onMouseLeave={() => setDropdown(false)}
        >
          <div
            className="text-nowrap text-end text-wot-black hover:cursor-pointer hover:text-wot-rose"
            onClick={() => setModal("Logout")}
          >
            Log out
          </div>
        </div>
      )}
      {modal === "Logout" && (
        <Modal closeFunc={() => setModal(null)}>
          <LogoutConfirmation closeFunc={() => setModal(null)} />
        </Modal>
      )}
    </>
  );
}
