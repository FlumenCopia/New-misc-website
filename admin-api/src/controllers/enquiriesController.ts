import { Request, Response } from "express";
import { Enquiry } from "../models/Enquiry";

export const getEnquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, "i");
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { message: searchRegex },
        { subject: searchRegex },
      ];
    }
    if (req.query.formSource) {
      filter.formSource = req.query.formSource;
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Enquiry.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEnquiryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      res.status(404).json({ success: false, message: "Enquiry not found." });
      return;
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, service, subject, message, formSource } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields.",
      });
      return;
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone: phone || "",
      service: service || "",
      subject: subject || "",
      message,
      formSource: formSource || "general",
      status: "new",
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your enquiry has been received successfully.",
      data: { id: enquiry._id },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!enquiry) {
      res.status(404).json({ success: false, message: "Enquiry not found." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Enquiry updated.",
      data: enquiry,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      res.status(404).json({ success: false, message: "Enquiry not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Enquiry deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
