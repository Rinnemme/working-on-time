"use client";

import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import userReducer from "./userSlice";
import loadingReducer from "./loadingSlice";
import workingSessionReducer from "./workingSessionSlice";
import toastReducer from "./toastSlice";
import volumeReducer from "./volumeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    projects: projectReducer,
    isLoading: loadingReducer,
    workingSession: workingSessionReducer,
    toast: toastReducer,
    volume: volumeReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
