"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import { setUser } from "@/src/store/userSlice";
import { setProjects } from "@/src/store/projectSlice";
import { setIsLoading } from "@/src/store/loadingSlice";
import { setToast } from "@/src/store/toastSlice";
import {
  setWorkingProject,
  setSessionTimer,
  setRemainingTime,
  setWorking,
} from "@/src/store/workingSessionSlice";

export default function AppInitializer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = usePathname();

  const getAndSetProjects = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/my-projects`,
    })
      .then((res) => {
        dispatch(setProjects(res.data.projects));
      })
      .catch(() => {
        dispatch(
          setToast({ error: true, message: "Unable to find your projects." }),
        );
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  const getAndSetWorkingProjectId = () => {
    const storedId = localStorage.getItem("workingid");
    if (typeof storedId === "string") {
      dispatch(setWorkingProject(+storedId));
    }
  };

  const getAndSetWorkingTimer = () => {
    const workingDuration = localStorage.getItem("workingDuration");
    const restingDuration = localStorage.getItem("restingDuration");
    const timeRemaining = localStorage.getItem("remainingTime");
    if (
      typeof workingDuration === "string" &&
      typeof restingDuration === "string"
    ) {
      dispatch(
        setSessionTimer({
          workingDuration: +workingDuration,
          restingDuration: +restingDuration,
        }),
      );
    }
    if (typeof timeRemaining === "string") {
      dispatch(setRemainingTime(+timeRemaining));
    }
  };

  const getAndSetWorkingState = () => {
    const working = localStorage.getItem("working");
    if (typeof working === "string") {
      dispatch(setWorking(!!+working));
    }
  };

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: `${process.env.NEXT_PUBLIC_BASE_URI}/auth/me`,
    })
      .then((res) => {
        dispatch(setUser(res.data));
        getAndSetWorkingProjectId();
        getAndSetWorkingTimer();
        getAndSetWorkingState();
        getAndSetProjects();
      })
      .catch(() => {
        localStorage.removeItem("workingid");
        localStorage.removeItem("remainingTime");
        localStorage.removeItem("workingDuration");
        localStorage.removeItem("restingDuration");
        localStorage.removeItem("working");
        if (path !== "/" && path !== "/about") {
          router.push("/");
          dispatch(setToast({ error: true, message: "You are not logged in." }));
        }
        dispatch(setIsLoading(false));
      });
  }, []);

  return null;
}
