import type { RequestHandler } from "express";
import type { User } from "../types/user";

import * as db from "../db/queries";

export const addNewTask: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before adding a task.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const { name, description, projectid } = req.body;

    const userOwnsProject = await db.verifyProjectOwnership(projectid, user.id);

    if (!userOwnsProject) {
      res.status(403).json({
        message: "You do not have permission to add a task to this project",
      });
      return;
    }

    const position = await db.getAdditionPosition(projectid);

    const newTask = await db.addNewTask(
      name,
      description,
      false,
      projectid,
      user.id,
      position,
    );

    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
};

export const editTask: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before editing a task.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const { name, description } = req.body;

    const userOwnsTask = await db.verifyTaskOwnership(req.params.id, user.id);

    if (!userOwnsTask) {
      res.status(403).json({
        message: "You do not have permission to edit this task",
      });
      return;
    }

    await db.updateTask(name, description, req.params.id);

    res.status(200).json({ edit: "success" });
  } catch (err) {
    next(err);
  }
};

export const toggleTaskComplete: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before editing a task.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const userOwnsTask = await db.verifyTaskOwnership(req.params.id, user.id);

    if (!userOwnsTask) {
      res.status(403).json({
        message: "You do not have permission to edit this task",
      });
      return;
    }

    await db.toggleTaskComplete(req.params.id);

    res.status(200).json({ toggle: "success" });
  } catch (err) {
    next(err);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before deleting a task.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const userOwnsTask = await db.verifyTaskOwnership(req.params.id, user.id);

    if (!userOwnsTask) {
      res.status(403).json({
        message: "You do not have permission to delete this task",
      });
      return;
    }

    const task = await db.getTask(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found." });
      return;
    }

    await db.deleteTask(task.id);
    await db.accountForRemovedTask(task.position, task.projectid);

    res.status(200).json({ deletion: "success" });
  } catch (err) {
    next(err);
  }
};

export const moveTask: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Please log in before moving a task.",
    });
    return;
  }

  const user = req.user as User;

  try {
    const { swapToId }: { swapToId: number } = req.body;

    const userOwnsTask = await db.verifyTaskOwnership(req.params.id, user.id);

    if (!userOwnsTask) {
      res.status(403).json({
        message: "You do not have permission to move this task",
      });
      return;
    }

    const swapFrom = await db.getTask(req.params.id);
    const swapTo = await db.getTask(swapToId);

    if (!swapFrom || !swapTo) {
      res.status(404).json({ message: "Task not found." });
      return;
    }

    await db.accountForReorderedTasks(
      swapFrom.position,
      swapTo.position,
      swapFrom.projectid,
    );

    await db.repositionTask(swapTo.position, req.params.id);

    res.status(200).json({ move: "success" });
  } catch (err) {
    next(err);
  }
};
