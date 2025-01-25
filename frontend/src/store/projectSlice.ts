"use client";

import { Project, Task } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Project[] = [];

const indexOfProject = (projectid: number, state: Project[]) => {
  return state.findIndex((project) => project.id === projectid);
};

const indexOfTask = (
  taskid: number,
  state: Project[],
  projectIndex: number
) => {
  return state[projectIndex].tasks.findIndex((task) => task.id === taskid);
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
    updateTask: (state, action) => {
      const projectIndex = indexOfProject(action.payload.projectid, state);
      const taskIndex = indexOfTask(action.payload.id, state, projectIndex);
      state[projectIndex].tasks[taskIndex] = action.payload;
      return state;
    },
    deleteTask: (state, action) => {
      const projectIndex = indexOfProject(action.payload.projectid, state);
      state[projectIndex].tasks = state[projectIndex].tasks.filter(
        (task) => task.id !== action.payload.id
      );
    },
    addTask: (state, action) => {
      const index = indexOfProject(action.payload.projectid, state);
      state[index].tasks = [...state[index].tasks, action.payload];
      return state;
    },
  },
});

export const { setProjects, setProjectTasks, updateTask, deleteTask, addTask } =
  projectSlice.actions;
export default projectSlice.reducer;
