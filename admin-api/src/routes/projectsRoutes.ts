import { Router } from "express";
import {
  getProjects,
  getProjectByIdOrSlug,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "../controllers/projectsController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProjects);
router.get("/:identifier", getProjectByIdOrSlug);
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);
router.patch("/reorder", authenticate, reorderProjects);

export default router;
