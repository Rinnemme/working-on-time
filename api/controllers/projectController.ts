import type { RequestHandler } from "express";
import type { User } from "../types/user";

import * as db from "../db/queries";

export const getProjectsForUser: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in." });
    return;
  }

  const user = req.user as User;

  try {
    const projects = await db.getUserProjectsBulk(user.id);

    const projectsWithTasks = await Promise.all(
      projects.map(async (project: any) => {
        const taskList = await db.getProjectTasks(project.id);

        return {
          ...project,
          tasks: taskList,
        };
      }),
    );

    res.status(200).json({ projects: projectsWithTasks });
  } catch (err) {
    next(err);
  }
};

export const getProjectDetails: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Please log in." });
    return;
  }

  const user = req.user as User;

  try {
    const details = await db.getUserProject(req.params.id);
    const project = details[0];

    if (!project) {
      res.status(404).json({ message: "Project not found." });
      return;
    }

    if (user.id !== project.userid) {
      res.status(403).json({
        message: "This project is not associated with your account.",
      });
      return;
    }

    const tasks = await db.getProjectTasks(req.params.id);

    res.status(200).json({
      details: project,
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const addNewProject: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before adding a project.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const { name, priority, description, due } = req.body;

    const newProject = await db.addNewProject(
      name,
      user.id,
      priority,
      description,
      due,
    );

    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
};

export const editProject: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before editing a project.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const { name, priority, description, due } = req.body;

    const userOwnsProject = await db.verifyProjectOwnership(
      req.params.id,
      user.id,
    );

    if (!userOwnsProject) {
      res.status(403).json({
        message: "You do not have permission to edit this project",
      });
      return;
    }

    await db.updateProject(name, priority, description, due, req.params.id);

    res.status(200).json({ edit: "success" });
  } catch (err) {
    next(err);
  }
};

export const deleteProject: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before deleting a project.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const userOwnsProject = await db.verifyProjectOwnership(
      req.params.id,
      user.id,
    );

    if (!userOwnsProject) {
      res.status(403).json({
        message: "You do not have permission to delete this project",
      });
      return;
    }

    await db.deleteProject(req.params.id);

    res.status(200).json({ deletion: "success" });
  } catch (err) {
    next(err);
  }
};
