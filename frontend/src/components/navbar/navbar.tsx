"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Logo from "../../../public/Logo.svg";
import Modal from "../modal/modal";
import LoginForm from "../login-form/loginForm";

import axios from "axios";
import { useDispatch } from "react-redux";
import { setProjects } from "@/src/store/projectSlice";
import { setIsLoading } from "@/src/store/loadingSlice";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import type { AppState } from "@/src/store/store";
import ProjectDropdown from "./project-dropdown/projectDropdown";
import SignupForm from "../signup-form/signupForm";
import Toast from "../toast/toast";
import UserTools from "../user-tools/userTools";

type ModalTypes = "Login" | "SignUp" | null;

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const [modal, setModal] = useState<ModalTypes>(null);
  const username = useSelector((state: AppState) => state.user.username);
  const projects = useSelector((state: AppState) => state.projects);
  const isLoading = useSelector((state: AppState) => state.isLoading);
  const displayToast = useSelector((state: AppState) => state.toast.display);
  const dispatch = useDispatch();

  const [projectDropdown, setProjectDropdown] = useState<boolean>(false);

  const getAndSetProjects = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/my-projects`,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setProjects(res.data.projects));
        }
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const loginSuccess = () => {
    dispatch(setIsLoading(true));
    router.push("/projects");
    getAndSetProjects();
    setModal(null);
  };

  const signupSuccess = () => {
    setModal("Login");
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white z-10 shadow-sm sticky top-0 border-b border-wot-lighter-gray"
      >
        <>
          <div className="mx-auto  px-4">
            <div className="flex h-14 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-wot-gray hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                        "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer " +
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
                        "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer " +
                        (path === "/about"
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
                    <button
                      onClick={() => setProjectDropdown(!projectDropdown)}
                      className={
                        "rounded-md relative px-3 flex items-center gap-1 py-2 text-sm font-medium hover:cursor-pointer " +
                        (path.includes("/projects")
                          ? "text-wot-rose"
                          : "text-wot-black hover:text-wot-yellow hover:bg-slate-100")
                      }
                    >
                      Projects
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                        stroke="currentColor"
                        className="size-3 hover:cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                      {projectDropdown && (
                        <ProjectDropdown
                          projects={projects}
                          path={path}
                          onLeave={() => setProjectDropdown(false)}
                        />
                      )}
                    </button>
                    <Link
                      href="/working-session"
                      className={
                        "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer " +
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

              {!isLoading && !username && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-medium hover:cursor-pointer transition hover:text-wot-rose"
                    onClick={() => setModal("Login")}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="text-sm font-semibold bg-wot-rose text-white px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition hover:cursor-pointer"
                    onClick={() => setModal("SignUp")}
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {!isLoading && username && <UserTools />}
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {!username && !isLoading && (
                <div className="flex flex-col items-start fade-in">
                  <Link
                    href="/"
                    className={
                      "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer " +
                      (path === "/"
                        ? "text-wot-rose"
                        : "text-wot-black hover:text-wot-yellow hover:bg-slate-100")
                    }
                  >
                    <DisclosureButton>Home</DisclosureButton>
                  </Link>
                  <Link
                    href="/about"
                    className={
                      "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer " +
                      (path === "/about"
                        ? "text-wot-rose"
                        : "text-wot-black hover:text-wot-yellow transition-all duration-200  hover:bg-slate-100")
                    }
                  >
                    <DisclosureButton>About</DisclosureButton>
                  </Link>
                </div>
              )}

              {username && !isLoading && (
                <div className="flex flex-col items-start fade-in">
                  <Link
                    href="/working-session"
                    className={
                      "rounded-md px-3 py-2 font-medium hover:cursor-pointer " +
                      (path === "/working-session"
                        ? "text-wot-rose"
                        : "text-wot-black hover:text-wot-yellow transition-all duration-200  hover:bg-slate-100")
                    }
                  >
                    <DisclosureButton>Working Session</DisclosureButton>
                  </Link>

                  <Link
                    href="/projects"
                    className={
                      "rounded-md relative px-3 py-2 hover:cursor-pointer " +
                      (path === "/projects"
                        ? "text-wot-rose"
                        : "text-wot-black hover:text-wot-yellow hover:bg-slate-100")
                    }
                  >
                    <DisclosureButton>Projects</DisclosureButton>
                  </Link>

                  <ul className="flex flex-col fade-in border-wot-light-gray border-s ms-3">
                    {projects.map((project) => {
                      return (
                        <li
                          key={project.id}
                          className="text-start ps-3 leading-none"
                        >
                          <Link
                            className="text-nowrap"
                            href={`/projects/${project.id}`}
                          >
                            <DisclosureButton>
                              <div
                                className={
                                  "max-w-72 overflow-hidden text-ellipsis px-3 py-2 rounded-md hover:cursor-pointer " +
                                  (path === `/projects/${project.id}`
                                    ? "text-wot-rose"
                                    : "text-wot-black hover:text-wot-yellow transition-all duration-200  hover:bg-slate-100")
                                }
                              >
                                {project.name}
                              </div>
                            </DisclosureButton>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </>
      </Disclosure>
      {modal && (
        <Modal
          closeFunc={() => setModal(null)}
          backgroundColor={modal === "SignUp" ? "bg-wot-blue" : "bg-wot-rose"}
        >
          {modal === "Login" && (
            <LoginForm
              successFunc={loginSuccess}
              signUpFunc={() => setModal("SignUp")}
            />
          )}
          {modal === "SignUp" && <SignupForm successFunc={signupSuccess} />}
        </Modal>
      )}
      {displayToast && <Toast />}
    </>
  );
}
