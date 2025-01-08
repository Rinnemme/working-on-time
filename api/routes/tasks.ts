import express from "express";
const router = express.Router();
const taskController = require("../controllers/taskControllers");

router.post("/add", taskController.addNewTask);
router.post("/:id/edit", taskController.editTask);
router.post("/:id/toggle", taskController.toggleTaskComplete);
router.delete("/:id/delete", taskController.deleteTask);

module.exports = router;
