"use client";

import { Project, Task } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Project[] = [];

// const indexOfProject = (num: Number, state: Project[]) => {
//   return state.findIndex((project) => project.id === num);
// };

// const indexOfTask = (num: Number, taskList: Task[]) => {
//   return taskList.findIndex((task) => task.id === num)
// }

export const projectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
