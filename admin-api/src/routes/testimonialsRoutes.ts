import { Router } from "express";
import {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialsController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", authenticate, createTestimonial);
router.put("/:id", authenticate, updateTestimonial);
router.delete("/:id", authenticate, deleteTestimonial);

export default router;
