import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";

type ModalProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  closeFunc: () => void;
};

export default function Modal({
  children,
  backgroundColor = "bg-wot-rose",
  closeFunc,
}: ModalProps) {
  return (
    <Dialog className="relative z-10" open={true} onClose={closeFunc}>
      <DialogBackdrop
        transition
        className={`fixed inset-0 bg-opacity-75 ${backgroundColor}`}
      />
      <div className="fixed inset-0 z-10 w-screen max-h-dvh flex justify-center">
        <div className="flex min-h-full min-w-96 content-center justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className="flex flex-col relative rounded-2xl bg-white max-w-xl max-h-[90dvh] overflow-hidden my-12 w-full"
          >
            <div className="flex-shrink-0 relative h-10 bg-white z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute top-2 right-3 size-6 fill-slate-300 transition-all duration-300 hover:cursor-pointer hover:fill-wot-rose"
                onClick={closeFunc}
              >
                <path
                  className="hover:cursor-pointer"
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="absolute top-10 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

            <div className="overflow-y-auto flex-1 px-5 pb-5">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
