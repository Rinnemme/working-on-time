import express from "express";

import {
  addNewTask,
  editTask,
  toggleTaskComplete,
  deleteTask,
  moveTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/add", addNewTask);
router.post("/:id/edit", editTask);
router.post("/:id/toggle", toggleTaskComplete);
router.delete("/:id/delete", deleteTask);
router.post("/:id/move", moveTask);

export default router;
