import { Request, Response } from "express";
import { NavigationMenu } from "../models/NavigationMenu";

export const getNavItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.placement) {
      filter.placement = req.query.placement;
    }
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const items = await NavigationMenu.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNavItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await NavigationMenu.findById(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Menu item not found." });
      return;
    }
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNavItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await NavigationMenu.create(req.body);
    res.status(201).json({ success: true, message: "Menu item created.", data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateNavItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await NavigationMenu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404).json({ success: false, message: "Menu item not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Menu item updated.", data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteNavItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await NavigationMenu.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ success: false, message: "Menu item not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Menu item deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderNavItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await NavigationMenu.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Menu items reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
