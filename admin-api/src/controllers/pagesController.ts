import { Request, Response } from "express";
import { WebsitePage } from "../models/WebsitePage";

export const getPages = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.type) {
      filter.pageType = req.query.type;
    }
    if (req.query.published === "true") {
      filter.isPublished = true;
    }
    const pages = await WebsitePage.find(filter).sort({ sortOrder: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: pages.length, data: pages });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPageBySlugOrId = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.identifier);
    let page;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      page = await WebsitePage.findById(identifier);
    }
    if (!page) {
      page = await WebsitePage.findOne({ slug: identifier });
    }
    if (!page) {
      res.status(404).json({ success: false, message: "Website page not found." });
      return;
    }
    res.status(200).json({ success: true, data: page });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = await WebsitePage.create(req.body);
    res.status(201).json({ success: true, message: "Page created successfully.", data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = await WebsitePage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!page) {
      res.status(404).json({ success: false, message: "Website page not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Page updated successfully.", data: page });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deletePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = await WebsitePage.findByIdAndDelete(req.params.id);
    if (!page) {
      res.status(404).json({ success: false, message: "Website page not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Page deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderPages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { sortOrder: item.sortOrder },
        },
      }));
      await WebsitePage.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Pages reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePageSections = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { sections } = req.body;
    if (!Array.isArray(sections)) {
      res.status(400).json({ success: false, message: "Sections must be an array." });
      return;
    }
    const page = await WebsitePage.findByIdAndUpdate(
      id,
      { sections },
      { new: true, runValidators: true }
    );
    if (!page) {
      res.status(404).json({ success: false, message: "Website page not found." });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Page sections updated successfully.",
      data: page.sections,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
