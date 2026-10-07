import { Request, Response } from "express";
import { Career } from "../models/Career";

export const getCareers = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const careers = await Career.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: careers.length, data: careers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCareerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      res.status(404).json({ success: false, message: "Career opening not found." });
      return;
    }
    res.status(200).json({ success: true, data: career });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, message: "Career opening posted.", data: career });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!career) {
      res.status(404).json({ success: false, message: "Career opening not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Career opening updated.", data: career });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCareer = async (req: Request, res: Response): Promise<void> => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      res.status(404).json({ success: false, message: "Career opening not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Career opening deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
