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
      <div className="relative flex items-center justify-center h-dvh w-full bg-gradient-to-br from-wot-rose to-wot-light-rose">
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-xl">
          <div className="text-center flex flex-col px-2">
            <span className="inline-block mx-auto mb-6 text-xs font-semibold uppercase tracking-widest bg-white text-wot-rose px-3 py-1 rounded-full shadow-sm">
              Pomodoro-based project management
            </span>
            <h1 className="text-4xl font-black tracking-tight leading-tight text-white sm:text-6xl">
              <span>Working On Time</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white opacity-80 px-6 leading-relaxed">
              Personal project management, simplified
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center py-28 w-full min-w-80 bg-wot-blue">
        <div className="w-full px-5 md:px-10 lg:px-20 max-w-7xl flex-col sm:flex-row gap-6 sm:gap-28 items-center sm:justify-between">
          <div className="text-center flex flex-col items-center sm:items-start sm:text-left flex-1 max-w-xl">
            <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-white opacity-60">
              How it works
            </span>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              <span>It's Your Time</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg w-10/12 sm:w-full text-white opacity-80 leading-relaxed">
              Working On Time offers a simple set up of projects, tasks, and
              timers, that allow you to do your best work leveraging
              customizable iterations of the widely recognized Pomodoro
              Technique.
            </p>
            <Link
              href="/about"
              className="rounded-full mt-6 bg-wot-light-blue px-8 py-2.5 font-semibold text-white text-sm shadow-md hover:shadow-lg hover:bg-wot-light-green transition-all duration-300"
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
        sizes="100vw"
        quality={90}
      ></Image>

      <div className="relative flex items-center justify-center py-28 w-full min-w-80 bg-wot-yellow">
        <div className="w-full max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-28 items-center sm:justify-between px-2 w-full">
            <div className="text-center flex flex-col items-center sm:items-start sm:text-left flex-1 max-w-xl">
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-white opacity-60">
                Pricing
              </span>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                <span>Good work takes time</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg w-10/12 sm:w-full text-white opacity-80 leading-relaxed">
                Coming in at the low, low cost of completely free, you can
                create an account and get started on improving and simplifying
                your working sessions today!
              </p>

              <button
                onClick={() => setModal(true)}
                className="rounded-full bg-white text-wot-yellow px-8 mt-6 py-2.5 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center h-fit py-28 min-h-72 w-full min-w-80 bg-wot-black">
        <div className="w-full max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch sm:justify-between px-2 w-full">
            <div className="text-center flex w-full flex-col justify-center items-center flex-1 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-8">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterLogo}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-semibold text-wrap text-white">
                <span>Created by Emmett Herrick</span>
              </h1>
              <p className="mt-3 text-sm text-wot-gray font-light leading-relaxed">
                A simple portfolio app that is also legitimately useful!
              </p>
            </div>

            <div className="text-center flex w-full flex-col justify-center items-center flex-1 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-8">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterGitHub}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-semibold text-nowrap text-white">
                <span>Other projects on GitHub</span>
              </h1>
              <button className="rounded-full bg-wot-light-green px-6 mt-4 py-1.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:bg-wot-yellow transition-all duration-300">
                <a target="_blank" href="https://github.com/rinnemme">
                  Check It Out
                </a>
              </button>
            </div>

            <div className="text-center flex w-full flex-col justify-center items-center flex-1 bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl p-8">
              <Image
                className="w-14 mb-4 hover:cursor-pointer"
                src={FooterLinkedIn}
                alt="A person working at a computer"
              ></Image>
              <h1 className="text-base font-semibold text-nowrap text-white">
                <span>Let's connect on LinkedIn!</span>
              </h1>
              <button className="rounded-full bg-wot-light-green px-6 mt-4 py-1.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:bg-wot-yellow transition-all duration-300">
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
