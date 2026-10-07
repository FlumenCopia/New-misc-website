import { Router } from "express";
import {
  getClientLogos,
  getClientLogoById,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo,
  reorderClientLogos,
} from "../controllers/clientLogosController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getClientLogos);
router.get("/:id", getClientLogoById);
router.post("/", authenticate, createClientLogo);
router.put("/:id", authenticate, updateClientLogo);
router.delete("/:id", authenticate, deleteClientLogo);
router.patch("/reorder", authenticate, reorderClientLogos);

export default router;
