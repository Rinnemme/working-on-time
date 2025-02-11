"use client";

import { Project, Task } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Project[] = [];

const indexOfProject = (projectid: number, state: Project[]) => {
  return state.findIndex((project) => project.id === projectid);
};

const indexOfTask = (taskid: number, project: Project) => {
  return project.tasks.findIndex((task) => task.id === taskid);
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
      const taskIndex = indexOfTask(action.payload.id, state[projectIndex]);
      state[projectIndex].tasks[taskIndex] = action.payload;
      return state;
    },
    toggleTaskCompletion: (state, action) => {
      const projectIndex = indexOfProject(action.payload.projectid, state);
      const taskIndex = indexOfTask(action.payload.id, state[projectIndex]);
      state[projectIndex].completedTasks = action.payload.complete
        ? (+state[projectIndex].completedTasks - 1).toString()
        : (+state[projectIndex].completedTasks + 1).toString();
      state[projectIndex].tasks[taskIndex].complete =
        !state[projectIndex].tasks[taskIndex].complete;
      return state;
    },
    deleteTask: (state, action) => {
      const projectIndex = indexOfProject(action.payload.projectid, state);
      state[projectIndex].tasks = state[projectIndex].tasks.filter(
        (task) => task.id !== action.payload.id
      );
      state[projectIndex].totalTasks = (
        +state[projectIndex].totalTasks - 1
      ).toString();
      if (action.payload.complete)
        state[projectIndex].completedTasks = (
          +state[projectIndex].completedTasks - 1
        ).toString();
      return state;
    },
    addTask: (state, action) => {
      const index = indexOfProject(action.payload.projectid, state);
      state[index].tasks = [...state[index].tasks, action.payload];
      state[index].totalTasks = (+state[index].totalTasks + 1).toString();
      return state;
    },
    updateProject: (state, action) => {
      const projectIndex = indexOfProject(action.payload.id, state);
      state[projectIndex] = action.payload;
      return state;
    },
    deleteProject: (state, action) => {
      state = state.filter((project) => project.id !== action.payload.id);
      return state;
    },
    addProject: (state, action) => {
      state = [...state, action.payload];
      return state;
    },
    resetProjects: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const {
  setProjects,
  setProjectTasks,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
  addTask,
  updateProject,
  deleteProject,
  addProject,
  resetProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
