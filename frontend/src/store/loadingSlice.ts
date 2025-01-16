"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = true;

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
