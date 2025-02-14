"use client";
import Image from "next/image";
import StockWorking from "../public/stock-working.avif";
import FooterLogo from "../public/Footer-Logo.svg";
import FooterGitHub from "../public/Footer-GitHub.svg";
import FooterLinkedIn from "../public/Footer-LinkedIn.svg";
import { useState } from "react";
import Modal from "@/src/components/modal/modal";
import SignupForm from "@/src/components/signup-form/signupForm";
import Link from "next/link";

export default function Home() {
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div className="bg-white top-0 w-full h-full z-0 fade-in">
      <div className="relative flex items-center justify-center h-dvh w-full bg-wot-rose">
        <div className="max-w-xl">
          <div className="text-center flex flex-col px-2">
            <h1 className="text-3xl font-extrabold leading-10 text-white sm:text-5xl">
              <span>Working On Time</span>
            </h1>
            <p className="mt-2 text-base sm:text-lg text-white px-6">
              Personal project management, simplified
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center py-28 w-full min-w-80 bg-wot-blue">
        <div className="w-full px-5 md:px-10 lg:px-20 max-w-7xl flex-col sm:flex-row gap-6 sm:gap-28 items-center sm:justify-between">
          <div className="text-center flex flex-col items-center sm:items-start sm:text-left flex-1 max-w-xl">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              <span>It's Your Time</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg w-10/12 sm:w-full text-white">
              Working On Time offers a simple set up of projects, tasks, and
              timers, that allow you to do your best work leveraging
              customizable iterations of the widely recognized Pomodoro
              Technique.
            </p>
            <Link
              href="/about"
              className="rounded-3xl mt-6 bg-wot-light-blue px-8 md:mr-10 lg:mr-14 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-light-green hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      <Image
        className="w-full hover:cursor-pointer"
        src={StockWorking}
        alt="A person working at a computer"
      ></Image>

      <div className="relative flex items-center justify-center py-28 w-full min-w-80 bg-wot-yellow">
        <div className="w-full max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-28 items-center sm:justify-between px-2 w-full">
            <div className="text-center flex flex-col items-center sm:items-start sm:text-left flex-1 max-w-xl">
              <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                <span>Good work takes time</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg w-10/12 sm:w-full text-white">
                Coming in at the low, low cost of completely free, you can
                create an account and get started on improving and simplifying
                your working sessions today!
              </p>

              <button
                onClick={() => setModal(true)}
                className="rounded-3xl bg-wot-light-yellow px-8 mt-6 py-2 my-4 font-light text-white shadow-sm hover:bg-wot-blue hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center h-fit py-28 min-h-72 w-full min-w-80 bg-wot-green">
        <div className="w-full max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start sm:justify-between px-2 w-full">
            <div className="text-center flex flex-col justify-center items-center flex-1 max-w-56">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterLogo}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-bold text-nowrap text-white">
                <span>Created by Emmett Herrick</span>
              </h1>
              <p className="mt-6 text-sm sm:text-base w-full text-white font-light">
                A simple portfolio app that is also legitimately useful!
              </p>
            </div>

            <div className="text-center flex flex-col justify-center items-center flex-1 max-w-48">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterGitHub}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-bold text-nowrap text-white">
                <span>Other projects on GitHub</span>
              </h1>
              <button className="rounded-3xl bg-wot-light-green px-6 mt-6 py-1 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300">
                <a target="_blank" href="https://github.com/rinnemme">
                  Check It Out
                </a>
              </button>
            </div>

            <div className="text-center flex flex-col justify-center items-center flex-1 max-w-48">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterLinkedIn}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-bold text-nowrap text-white">
                <span>Let's connect on LinkedIn!</span>
              </h1>
              <button className="rounded-3xl bg-wot-light-green px-6 mt-6 py-1 my-4 font-light text-white shadow-sm hover:bg-wot-yellow hover:scale-105 transition-all duration-300">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/emmettherrick/"
                >
                  My Profile
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal closeFunc={() => setModal(false)} backgroundColor="wot-blue">
          <SignupForm successFunc={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
}
