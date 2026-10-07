import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getSettings);
router.put("/", authenticate, updateSettings);

export default router;
