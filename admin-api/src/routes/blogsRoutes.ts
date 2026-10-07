import { Router } from "express";
import {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogsController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBlogs);
router.get("/:identifier", getBlogByIdOrSlug);
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;
