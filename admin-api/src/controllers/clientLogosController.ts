import { Request, Response } from "express";
import { ClientLogo } from "../models/ClientLogo";

export const getClientLogos = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const logos = await ClientLogo.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: logos.length, data: logos });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClientLogoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const logo = await ClientLogo.findById(req.params.id);
    if (!logo) {
      res.status(404).json({ success: false, message: "Client logo not found." });
      return;
    }
    res.status(200).json({ success: true, data: logo });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createClientLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const logo = await ClientLogo.create(req.body);
    res.status(201).json({ success: true, message: "Client logo added.", data: logo });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateClientLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const logo = await ClientLogo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!logo) {
      res.status(404).json({ success: false, message: "Client logo not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Client logo updated.", data: logo });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteClientLogo = async (req: Request, res: Response): Promise<void> => {
  try {
    const logo = await ClientLogo.findByIdAndDelete(req.params.id);
    if (!logo) {
      res.status(404).json({ success: false, message: "Client logo not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Client logo deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderClientLogos = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await ClientLogo.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Logos reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
