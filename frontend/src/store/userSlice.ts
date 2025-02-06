"use client";

import { User } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: null,
  username: null,
  nickname: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      return state;
    },
    resetUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
