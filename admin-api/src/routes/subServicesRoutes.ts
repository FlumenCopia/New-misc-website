import { Router } from "express";
import {
  getSubServices,
  getSubServiceById,
  createSubService,
  updateSubService,
  deleteSubService,
} from "../controllers/subServicesController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getSubServices);
router.get("/:id", getSubServiceById);
router.post("/", authenticate, createSubService);
router.put("/:id", authenticate, updateSubService);
router.delete("/:id", authenticate, deleteSubService);

export default router;
