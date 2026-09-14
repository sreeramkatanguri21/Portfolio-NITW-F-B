const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// B1: Server Health Check Base Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// B6: Centralized Error Handling & 404s
// Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Express error-handling middleware
app.use((err, req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred",
  });
});

module.exports = app;
