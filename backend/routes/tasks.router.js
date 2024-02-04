import { Router } from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/", getAllTasks);
router.post("/new", createNewTask);
router.patch("/update", updateTask);
router.delete("/delete", deleteTask);

export default router;
