"use client";

import { Project } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Project[] = [];

const indexOfProject = (num: Number, state: Project[]) => {
  return state.findIndex((project) => project.id === num);
};

export const projectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state = action.payload;
      return state;
    },
    setProjectTasks: (state, action) => {
      const index = indexOfProject(action.payload[0].projectid, state);
      state[index].tasks = action.payload;
      return state;
    },
  },
});

export const { setProjects, setProjectTasks } = projectSlice.actions;
export default projectSlice.reducer;
