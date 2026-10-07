import { Router } from "express";
import {
  getBlogCategories,
  getBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../controllers/blogCategoriesController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBlogCategories);
router.get("/:id", getBlogCategoryById);
router.post("/", authenticate, createBlogCategory);
router.put("/:id", authenticate, updateBlogCategory);
router.delete("/:id", authenticate, deleteBlogCategory);

export default router;
