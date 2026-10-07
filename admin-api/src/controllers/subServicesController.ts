import { Request, Response } from "express";
import { SubService } from "../models/SubService";

export const getSubServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.parentService) {
      filter.parentService = req.query.parentService;
    }
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const subServices = await SubService.find(filter)
      .populate("parentService", "title slug")
      .sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: subServices.length, data: subServices });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const subService = await SubService.findById(req.params.id).populate(
      "parentService",
      "title slug"
    );
    if (!subService) {
      res.status(404).json({ success: false, message: "Sub-service not found." });
      return;
    }
    res.status(200).json({ success: true, data: subService });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSubService = async (req: Request, res: Response): Promise<void> => {
  try {
    const subService = await SubService.create(req.body);
    res.status(201).json({ success: true, message: "Sub-service created.", data: subService });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateSubService = async (req: Request, res: Response): Promise<void> => {
  try {
    const subService = await SubService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!subService) {
      res.status(404).json({ success: false, message: "Sub-service not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Sub-service updated.", data: subService });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSubService = async (req: Request, res: Response): Promise<void> => {
  try {
    const subService = await SubService.findByIdAndDelete(req.params.id);
    if (!subService) {
      res.status(404).json({ success: false, message: "Sub-service not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Sub-service deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
