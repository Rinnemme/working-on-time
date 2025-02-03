"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Project } from "./types";

type WorkingSession = {
  projectid: number | null;
  timer: {
    workingDuration: number | null;
    restingDuration: number | null;
    currentRemainingTime: number | null;
  };
};

const initialState: WorkingSession = {
  projectid: null,
  timer: {
    workingDuration: null,
    restingDuration: null,
    currentRemainingTime: null,
  },
};

export const workingSessionSlice = createSlice({
  name: "workingSession",
  initialState: initialState,
  reducers: {
    setWorkingProject: (state, action) => {
      state.projectid = action.payload;
      return state;
    },
    setSessionTimer: (state, action) => {
      state.timer.workingDuration = action.payload.workingDuration;
      state.timer.restingDuration = action.payload.restingDuration;
      return state;
    },
    setRemainingTime: (state, action) => {
      state.timer.currentRemainingTime = action.payload;
      return state;
    },
  },
});

export const { setWorkingProject, setSessionTimer, setRemainingTime } =
  workingSessionSlice.actions;
export default workingSessionSlice.reducer;
