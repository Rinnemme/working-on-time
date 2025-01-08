const db = require("../db/queries");
import { Request, Response } from "express";

exports.addNewTask = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before editing a task." });
  } else
    try {
      const { name, description, projectId } = req.body;
      const user = req.user as any;
      const userOwnsProject = db.verifyProjectOwnership(projectId, user.id);
      if (userOwnsProject) {
        await db.addNewTask(name, description, false, projectId, user.id);
        res.status(200).json({ addition: "success" });
      } else {
        res.status(400).json({
          message: "You do not have permission to add a task to this project",
        });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.editTask = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before editing a task." });
  } else
    try {
      const { name, description } = req.body;
      const user = req.user as any;
      const userOwnsTask = db.verifyTaskOwnership(req.params.id, user.id);
      if (userOwnsTask) {
        await db.updateTask(name, description, req.params.id);
        res.status(200).json({ edit: "success" });
      } else {
        res
          .status(400)
          .json({ message: "You do not have permission to edit this task" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.toggleTaskComplete = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before editing a task." });
  } else
    try {
      const user = req.user as any;
      const userOwnsTask = db.verifyTaskOwnership(req.params.id, user.id);
      if (userOwnsTask) {
        await db.toggleTaskComplete(req.params.id);
        res.status(200).json({ toggle: "success" });
      } else {
        res
          .status(400)
          .json({ message: "You do not have permission to edit this task" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.deleteTask = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before deleting a task." });
  } else
    try {
      const user = req.user as any;
      const userOwnsTask = db.verifyTaskOwnership(req.params.id, user.id);
      if (userOwnsTask) {
        await db.deleteTask(req.params.id);
        res.status(200).json({ deletion: "success" });
      } else {
        res
          .status(400)
          .json({ message: "You do not have permission to delete this task" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};
