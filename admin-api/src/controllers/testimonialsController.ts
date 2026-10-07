import { Request, Response } from "express";
import { Testimonial } from "../models/Testimonial";

export const getTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    const testimonials = await Testimonial.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: "Testimonial not found." });
      return;
    }
    res.status(200).json({ success: true, data: testimonial });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, message: "Testimonial added.", data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      res.status(404).json({ success: false, message: "Testimonial not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Testimonial updated.", data: testimonial });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      res.status(404).json({ success: false, message: "Testimonial not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Testimonial deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
