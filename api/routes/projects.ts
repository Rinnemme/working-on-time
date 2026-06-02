import express from "express";

import {
  getProjectsForUser,
  addNewProject,
  getProjectDetails,
  editProject,
  deleteProject,
} from "../controllers/projectController";

const router = express.Router();

router.get("/", getProjectsForUser);
router.post("/add", addNewProject);
router.get("/:id", getProjectDetails);
router.post("/:id/edit", editProject);
router.delete("/:id/delete", deleteProject);

export default router;
