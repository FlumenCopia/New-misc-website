import { Router } from "express";
import {
  getMediaAssets,
  uploadMedia,
  deleteMediaAsset,
} from "../controllers/mediaController";
import { authenticate } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = Router();

router.get("/", authenticate, getMediaAssets);
router.post("/upload", authenticate, upload.array("files", 10), uploadMedia);
router.delete("/:id", authenticate, deleteMediaAsset);

export default router;
