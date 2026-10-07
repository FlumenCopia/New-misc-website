import { Router } from "express";
import {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  reorderBanners,
} from "../controllers/bannersController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getBanners);
router.get("/:id", getBannerById);
router.post("/", authenticate, createBanner);
router.put("/:id", authenticate, updateBanner);
router.delete("/:id", authenticate, deleteBanner);
router.patch("/reorder", authenticate, reorderBanners);

export default router;
