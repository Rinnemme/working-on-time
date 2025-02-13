"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0.5;

export const volumeSlice = createSlice({
  name: "workingSession",
  initialState: initialState,
  reducers: {
    muteVolume: (state) => {
      state = 0;
      return state;
    },
    setVolume: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setVolume, muteVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
