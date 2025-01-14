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
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
