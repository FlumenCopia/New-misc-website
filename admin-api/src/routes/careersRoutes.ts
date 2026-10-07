import { Router } from "express";
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from "../controllers/careersController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getCareers);
router.get("/:id", getCareerById);
router.post("/", authenticate, createCareer);
router.put("/:id", authenticate, updateCareer);
router.delete("/:id", authenticate, deleteCareer);

export default router;
