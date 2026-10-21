import { Request, Response } from "express";
import mongoose from "mongoose";
import { Service } from "../models/Service";
import { SubService } from "../models/SubService";

export const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServiceByIdOrSlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.identifier);
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    const service = await Service.findOne(
      isObjectId ? { _id: identifier } : { slug: identifier }
    );

    if (!service) {
      res.status(404).json({ success: false, message: "Service not found." });
      return;
    }

    // Attach sub-services if any
    const subServices = await SubService.find({ parentService: service._id, isActive: true }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: {
        ...service.toObject(),
        subServices,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, message: "Service created.", data: service });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Service updated.", data: service });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ success: false, message: "Service not found." });
      return;
    }
    // Also remove associated subservices
    await SubService.deleteMany({ parentService: req.params.id });
    res.status(200).json({ success: true, message: "Service and associated sub-services removed." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await Service.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Services reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
