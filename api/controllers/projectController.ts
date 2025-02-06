const db = require("../db/queries");
import { Request, Response } from "express";

exports.getProjectsForUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in." });
  } else
    try {
      const user = req.user as any;
      const projects = await db.getUserProjectsBulk(user.id);
      const projectsWithTasks: any[] = [];
      for (let project of projects) {
        let taskList = await db.getProjectTasks(project.id);
        projectsWithTasks.push({ ...project, tasks: taskList });
      }
      res.status(200).json({ projects: projectsWithTasks });
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.getProjectDetails = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in." });
  } else
    try {
      const user = req.user as any;
      const details = await db.getUserProject(req.params.id);
      const tasks = await db.getProjectTasks(req.params.id);
      if (user.id === details[0].userid) {
        res.status(200).json({ details: details[0], tasks: tasks });
      } else {
        res.status(400).json({
          message: "This project is not associated with your account.",
        });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.addNewProject = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ message: "Please log in before adding a project." });
  } else
    try {
      const { name, priority, description, due } = req.body;
      const user = req.user as any;
      const userid = user.id;
      const newProject = await db.addNewProject(
        name,
        userid,
        priority,
        description,
        due
      );
      res.status(200).json(newProject);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.editProject = async (req: Request, res: Response) => {
  if (!req.user) {
    res
      .status(400)
      .json({ message: "Please log in before editing a project." });
  } else
    try {
      const { name, priority, description, due } = req.body;
      const user = req.user as any;
      const userOwnsProject = db.verifyProjectOwnership(req.params.id, user.id);
      if (userOwnsProject) {
        await db.updateProject(name, priority, description, due, req.params.id);
        res.status(200).json({ edit: "success" });
      } else {
        res
          .status(400)
          .json({ message: "You do not have permission to edit this project" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

exports.deleteProject = async (req: Request, res: Response) => {
  if (!req.user) {
    res
      .status(400)
      .json({ message: "Please log in before editing a project." });
  } else
    try {
      const user = req.user as any;
      const userOwnsProject = db.verifyProjectOwnership(req.params.id, user.id);
      if (userOwnsProject) {
        await db.deleteProject(req.params.id);
        res.status(200).json({ deletion: "success" });
      } else {
        res.status(400).json({
          message: "You do not have permission to delete this project",
        });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
};
