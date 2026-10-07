import { Router } from "express";
import {
  getServices,
  getServiceByIdOrSlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/servicesController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getServices);
router.get("/:identifier", getServiceByIdOrSlug);
router.post("/", authenticate, createService);
router.put("/:id", authenticate, updateService);
router.delete("/:id", authenticate, deleteService);

export default router;
