"use client";

import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import workingSessionReducer from "./workingSessionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    isLoading: loadingReducer,
    workingSession: workingSessionReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
