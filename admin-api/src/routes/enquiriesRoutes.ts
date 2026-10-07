import { Router } from "express";
import {
  getEnquiries,
  getEnquiryById,
  submitEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiriesController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", submitEnquiry); // Public submission endpoint
router.get("/", authenticate, getEnquiries);
router.get("/:id", authenticate, getEnquiryById);
router.patch("/:id/status", authenticate, updateEnquiryStatus);
router.delete("/:id", authenticate, deleteEnquiry);

export default router;
