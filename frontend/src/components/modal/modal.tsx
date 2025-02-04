import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function Modal({
  children,
  closeFunc,
}: Readonly<{ children: React.ReactNode; closeFunc: () => void }>) {
  return (
    <Dialog className="relative z-10" open={true} onClose={closeFunc}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
      />
      <div className="fixed inset-0 z-10 w-screen max-h-dvh flex justify-center">
        <div className="flex min-h-full min-w-96 content-center justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className="flex flex-col relative content-center rounded-xl bg-white px-4 pb-4 pt-5 max-w-xl max-h-[90dvh] overflow-auto my-12"
          >
            <div className="sticky top-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="absolute top-0 right-0 size-6 fill-slate-300 transition-all duration-300 hover:cursor-pointer hover:fill-wot-rose"
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
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
