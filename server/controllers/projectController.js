const fs = require("fs");
const path = require("path");

const PROJECTS_FILE = path.join(__dirname, "..", "data", "projects.json");

// Helper to read projects from JSON file
function readProjects() {
  const data = fs.readFileSync(PROJECTS_FILE, "utf8");
  return JSON.parse(data);
}

// B2: GET /api/projects
exports.getProjects = (req, res, _next) => {
  try {
    const projects = readProjects();
    res.status(200).json(projects);
  } catch (error) {
    _next(error);
  }
};

// B3: GET /api/projects/:id
exports.getProjectById = (req, res, _next) => {
  try {
    const { id } = req.params;
    const projects = readProjects();
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    _next(error);
  }
};
