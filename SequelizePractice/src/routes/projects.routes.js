import { Router } from "express";
import {
  getProjects,
  postProjects,
  getProject,
  putProject,
  deleteProject,
  getTasksByProject,
} from "../controllers/projectsController.js";
const router = Router();

router.get("/projects", getProjects);

router.get("/projects/:id/tasks", getTasksByProject);

router.post("/projects", postProjects);

router.get("/projects/:id", getProject);

router.put("/projects/:id", putProject);

router.delete("/projects/:id", deleteProject);

export default router;
