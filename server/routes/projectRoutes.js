const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// GET /api/projects
router.get("/", projectController.getProjects);

// GET /api/projects/:id
router.get("/:id", projectController.getProjectById);

module.exports = router;
