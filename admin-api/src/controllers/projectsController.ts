import { Request, Response } from "express";
import { Project } from "../models/Project";

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.published === "true") {
      filter.isPublished = true;
    }
    if (req.query.featured === "true") {
      filter.isFeatured = true;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectByIdOrSlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.identifier);
    let project;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(identifier);
    }
    if (!project) {
      project = await Project.findOne({ slug: identifier });
    }
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: "Project created.", data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Project updated.", data: project });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, message: "Project not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Project deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await Project.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "Projects reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};