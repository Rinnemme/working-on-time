"use client";
import Image from "next/image";
import LoadingGif from "../../../public/loading.gif";

export default function Throbber() {
  return (
    <div className="mt-16 flex flex-col gap-4 w-full items-center max-w-lg px-3 fade-in">
      <Image src={LoadingGif} width={30} alt="throbber" />
    </div>
  );
}
