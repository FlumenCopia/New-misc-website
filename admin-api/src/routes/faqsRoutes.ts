import { Router } from "express";
import {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
} from "../controllers/faqsController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getFaqs);
router.patch("/reorder", authenticate, reorderFaqs);
router.get("/:id", getFaqById);
router.post("/", authenticate, createFaq);
router.put("/:id", authenticate, updateFaq);
router.delete("/:id", authenticate, deleteFaq);

export default router;
