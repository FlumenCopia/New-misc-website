import { Router } from "express";
import {
  getPages,
  getPageBySlugOrId,
  createPage,
  updatePage,
  deletePage,
  reorderPages,
  updatePageSections,
} from "../controllers/pagesController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getPages);
router.get("/:identifier", getPageBySlugOrId);
router.post("/", authenticate, createPage);
router.put("/:id", authenticate, updatePage);
router.delete("/:id", authenticate, deletePage);
router.patch("/reorder", authenticate, reorderPages);
router.put("/:id/sections", authenticate, updatePageSections);

export default router;
