import { Router } from "express";
import {
  getTasks,
  postTasks,
  getTask,
  putTask,
  deleteTask,
} from "../controllers/tasksController.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", postTasks);
router.put("/tasks/:id", putTask);
router.delete("/tasks/:id", deleteTask);

export default router;
