"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Project } from "./types";

type WorkingSession = {
  project: Project | null;
  timer: {
    workingDuration: number | null;
    restingDuration: number | null;
  };
};

const initialState: WorkingSession = {
  project: null,
  timer: {
    workingDuration: null,
    restingDuration: null,
  },
};

export const workingSessionSlice = createSlice({
  name: "workingSession",
  initialState: initialState,
  reducers: {
    setWorkingProject: (state, action) => {
      state.project = action.payload;
      return state;
    },
    setSessionTimer: (state, action) => {
      state.timer = action.payload;
      return state;
    },
  },
});

export const { setWorkingProject } = workingSessionSlice.actions;
export default workingSessionSlice.reducer;
