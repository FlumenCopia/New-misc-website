import { Request, Response } from "express";
import { Banner } from "../models/Banner";

export const getBanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const banners = await Banner.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: banners.length, data: banners });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBannerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner slide not found." });
      return;
    }
    res.status(200).json({ success: true, data: banner });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, message: "Banner created successfully.", data: banner });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Banner updated.", data: banner });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req: Request, res: Response): Promise<void> => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      res.status(404).json({ success: false, message: "Banner not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Banner deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderBanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body; // [{ id: string, order: number }]
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await Banner.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Banners reordered." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
