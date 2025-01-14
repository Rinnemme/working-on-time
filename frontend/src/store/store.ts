"use client";

import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
