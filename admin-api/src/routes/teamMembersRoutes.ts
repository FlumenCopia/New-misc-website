import { Router } from "express";
import {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} from "../controllers/teamMembersController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getTeamMembers);
router.patch("/reorder", authenticate, reorderTeamMembers);
router.get("/:id", getTeamMemberById);
router.post("/", authenticate, createTeamMember);
router.put("/:id", authenticate, updateTeamMember);
router.delete("/:id", authenticate, deleteTeamMember);

export default router;
