import { Request, Response } from "express";
import { Faq } from "../models/Faq";

export const getFaqs = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: any = {};
    if (req.query.active === "true") {
      filter.isActive = true;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFaqById = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      res.status(404).json({ success: false, message: "FAQ item not found." });
      return;
    }
    res.status(200).json({ success: true, data: faq });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await Faq.create(req.body);
    res.status(201).json({ success: true, message: "FAQ created.", data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) {
      res.status(404).json({ success: false, message: "FAQ not found." });
      return;
    }
    res.status(200).json({ success: true, message: "FAQ updated.", data: faq });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      res.status(404).json({ success: false, message: "FAQ not found." });
      return;
    }
    res.status(200).json({ success: true, message: "FAQ deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderFaqs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      const ops = items.map((item) => ({
        updateOne: {
          filter: { _id: item.id },
          update: { order: item.order },
        },
      }));
      await Faq.bulkWrite(ops);
    }
    res.status(200).json({ success: true, message: "FAQs reordered successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
