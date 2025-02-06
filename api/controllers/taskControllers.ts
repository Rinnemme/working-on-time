const db = require("../db/queries");
import { Request, Response } from "express";

exports.addNewTask = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before adding a task." });
  } else
    try {
      const { name, description, projectid } = req.body;
      const user = req.user as any;
      const userOwnsProject = db.verifyProjectOwnership(projectid, user.id);
      if (userOwnsProject) {
        const position = await db.getAdditionPosition(projectid);
        const newTask = await db.addNewTask(
          name,
          description,
          false,
          projectid,
          user.id,
          position
        );
        res.status(200).json(newTask);
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
        const task = await db.getTask(req.params.id);
        await db.deleteTask(task.id);
        await db.accountForRemovedTask(task.position, task.projectid);
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

exports.moveTask = async (req: Request, res: Response) => {
  const { swapToId }: { swapToId: number } = req.body;
  if (!req.user) {
    res.status(400).json({ message: "Please log in before moving a task." });
  } else
    try {
      const user = req.user as any;
      const userOwnsTask = db.verifyTaskOwnership(req.params.id, user.id);
      if (userOwnsTask) {
        const swapFrom = await db.getTask(req.params.id);
        const swapTo = await db.getTask(swapToId);
        await db.accountForReorderedTasks(
          swapFrom.position,
          swapTo.position,
          swapFrom.projectid
        );
        await db.repositionTask(swapTo.position, req.params.id);
        res.status(200).json({ move: "success" });
      } else {
        res
          .status(400)
          .json({ message: "You do not have permission to move this task" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};
