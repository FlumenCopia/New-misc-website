import { Request, Response } from "express";
import { BlogCategory } from "../models/BlogCategory";

export const getBlogCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const categories = await BlogCategory.find(filter).sort({ order: 1, name: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Blog category not found." });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlogCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await BlogCategory.create(req.body);
    res.status(201).json({ success: true, message: "Blog category created.", data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlogCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      res.status(404).json({ success: false, message: "Blog category not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Blog category updated.", data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlogCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Blog category not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Blog category deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
