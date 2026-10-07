import { Router } from "express";
import {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMembersController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getTeamMembers);
router.get("/:id", getTeamMemberById);
router.post("/", authenticate, createTeamMember);
router.put("/:id", authenticate, updateTeamMember);
router.delete("/:id", authenticate, deleteTeamMember);

export default router;
