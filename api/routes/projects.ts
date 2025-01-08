import express from "express";
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.getProjectsForUser);
router.post("/add", projectController.addNewProject);
router.get("/:id", projectController.getProjectDetails);
router.post("/:id/edit", projectController.editProject);
router.delete("/:id/delete", projectController.deleteProject);

module.exports = router;
