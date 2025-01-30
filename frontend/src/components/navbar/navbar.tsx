"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../../public/Logo.svg";
import Modal from "../modal/modal";
import LoginForm from "../login-form/loginForm";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../src/store/userSlice";
import { setProjects } from "@/src/store/projectSlice";
import { setIsLoading } from "@/src/store/loadingSlice";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const username = useSelector((state: AppState) => state.user.username);
  const isLoading = useSelector((state: AppState) => state.isLoading);
  const dispatch = useDispatch();

  const getAndSetUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: process.env.baseURI,
    })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        if (path !== "/" && path !== "/about") router.push("/");
      });
  };

  const getAndSetProjects = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.baseURI}/my-projects`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setProjects(res.data.projects));
        }
      })
      .catch((err) => {
        return;
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  useEffect(() => {
    getAndSetUser();
    getAndSetProjects();
  }, []);

  const loginSuccess = () => {
    router.push("/projects");
    getAndSetProjects();
    setModalOpen(false);
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white z-10 shadow-md sticky top-0">
        {({ open }) => (
          <>
            <div className="mx-auto  px-4">
              <div className="flex h-14 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5 hover:cursor-pointer" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 hover:cursor-pointer"
                      >
                        <path
                          className="hover:cursor-pointer"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </DisclosureButton>
                  </div>

                  <div className="flex flex-shrink-0 items-center hover:cursor-pointer">
                    <Link href="/">
                      <Image
                        className="h-9 w-auto hover:cursor-pointer"
                        src={Logo}
                        alt="Nerdy Recs"
                      ></Image>
                    </Link>
                  </div>

                  {!username && !isLoading && (
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 fade-in">
                      <Link
                        href="/"
                        className={
                          "rounded-md px-3 py-2 text-sm hover:cursor-pointer " +
                          (path === "/"
                            ? "text-wot-rose"
                            : "text-wot-black hover:text-wot-yellow hover:bg-slate-100")
                        }
                      >
                        Home
                      </Link>
                      <Link
                        href="/about"
                        className={
                          "rounded-md px-3 py-2 text-sm hover:cursor-pointer " +
                          (path === "/movies"
                            ? "text-wot-rose"
                            : "text-wot-black hover:text-wot-yellow transition-all duration-200  hover:bg-slate-100")
                        }
                      >
                        About
                      </Link>
                    </div>
                  )}

                  {username && !isLoading && (
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4 fade-in">
                      <Link
                        href="/projects"
                        className={
                          "rounded-md px-3 py-2 text-sm hover:cursor-pointer " +
                          (path === "/projects"
                            ? "text-wot-rose"
                            : "text-wot-black hover:text-wot-yellow hover:bg-slate-100")
                        }
                      >
                        Projects
                      </Link>
                      <Link
                        href="/working-session"
                        className={
                          "rounded-md px-3 py-2 text-sm hover:cursor-pointer " +
                          (path === "/working-session"
                            ? "text-wot-rose"
                            : "text-wot-black hover:text-wot-yellow transition-all duration-200  hover:bg-slate-100")
                        }
                      >
                        Working Session
                      </Link>
                    </div>
                  )}
                </div>

                {!isLoading && (
                  <div className="flex items-center hover:cursor-pointer">
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="rounded-md px-3 py-2 text-sm hover:cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:text-wot-rose"
                        onClick={() => setModalOpen(true)}
                      >
                        {!username && "Log In"}
                        {username && `Welcome, ${username}`}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <DisclosureButton>
                  <Link
                    href="/games"
                    className={
                      "block px-3 py-2 text-sm text-gray-800 font-medium border-l-4 hover:cursor-pointer " +
                      (path === "/games"
                        ? " border-cyan-600"
                        : "border-white hover:bg-slate-100 hover:text-cyan-700")
                    }
                  >
                    Games
                  </Link>
                  <Link
                    href="/movies"
                    className={
                      "block px-3 py-2 text-sm text-gray-800 font-medium border-l-4 hover:cursor-pointer " +
                      (path === "/movies"
                        ? " border-cyan-600"
                        : "border-white hover:bg-slate-100 hover:text-cyan-700")
                    }
                  >
                    Movies
                  </Link>
                  <Link
                    href="/shows"
                    className={
                      "block px-3 py-2 text-sm text-gray-800 font-medium border-l-4 hover:cursor-pointer " +
                      (path === "/shows"
                        ? " border-cyan-600"
                        : "border-white hover:bg-slate-100 hover:text-cyan-700")
                    }
                  >
                    Shows
                  </Link>
                </DisclosureButton>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
      {modalOpen && (
        <Modal closeFunc={() => setModalOpen(false)}>
          <LoginForm successFunc={loginSuccess} />
        </Modal>
      )}
    </>
  );
}
