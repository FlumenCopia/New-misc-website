import { Request, Response } from "express";
import { TeamMember } from "../models/TeamMember";

export const getTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const members = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTeamMemberById = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      res.status(404).json({ success: false, message: "Team member not found." });
      return;
    }
    res.status(200).json({ success: true, data: member });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, message: "Team member added.", data: member });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      res.status(404).json({ success: false, message: "Team member not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Team member updated.", data: member });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTeamMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404).json({ success: false, message: "Team member not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Team member deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await TeamMember.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Team members reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
