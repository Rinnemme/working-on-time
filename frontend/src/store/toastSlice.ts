"use client";

import { createSlice } from "@reduxjs/toolkit";
import { ToastState } from "./types";

const initialState: ToastState = {
  display: false,
  message: null,
};

export const toastSlice = createSlice({
  name: "tast",
  initialState: initialState,
  reducers: {
    setToast: (state, action) => {
      state = {
        display: true,
        message: action.payload,
      };
      return state;
    },
    unsetToast: (state) => {
      state = {
        display: false,
        message: null,
      };
      return state;
    },
  },
});

export const { setToast, unsetToast } = toastSlice.actions;
export default toastSlice.reducer;
