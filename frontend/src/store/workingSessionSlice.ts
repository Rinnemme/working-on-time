"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Project } from "./types";

type WorkingSession = Project | null;

const initialState: WorkingSession = null;

export const workingSessionSlice = createSlice({
  name: "workingSession",
  initialState: initialState,
  reducers: {
    setWorkingSession: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setWorkingSession } = workingSessionSlice.actions;
export default workingSessionSlice.reducer;
