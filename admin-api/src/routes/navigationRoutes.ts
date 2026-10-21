import { Router } from "express";
import {
  getNavItems,
  getNavItemById,
  createNavItem,
  updateNavItem,
  deleteNavItem,
  reorderNavItems,
} from "../controllers/navigationController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getNavItems);
router.get("/:id", getNavItemById);
router.post("/", authenticate, createNavItem);
router.put("/:id", authenticate, updateNavItem);
router.delete("/:id", authenticate, deleteNavItem);
router.patch("/reorder", authenticate, reorderNavItems);

export default router;
