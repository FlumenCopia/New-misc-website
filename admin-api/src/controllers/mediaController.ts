import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { MediaAsset } from "../models/MediaAsset";

export const getMediaAssets = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 24;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.search) {
      filter.originalName = new RegExp(req.query.search as string, "i");
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const [assets, total] = await Promise.all([
      MediaAsset.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      MediaAsset.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: assets,
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

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const singleFile = req.file;

    const uploadedFiles: Express.Multer.File[] = [];
    if (files && Array.isArray(files)) {
      uploadedFiles.push(...files);
    } else if (singleFile) {
      uploadedFiles.push(singleFile);
    }

    if (uploadedFiles.length === 0) {
      res.status(400).json({ success: false, message: "No files uploaded." });
      return;
    }

    const port = process.env.PORT || 5000;
    const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

    const createdRecords = await Promise.all(
      uploadedFiles.map((f) => {
        const fileUrl = `${baseUrl}/uploads/${f.filename}`;
        return MediaAsset.create({
          originalName: f.originalname,
          filename: f.filename,
          filePath: f.path,
          fileUrl,
          mimeType: f.mimetype,
          fileSize: f.size,
          altText: req.body.altText || f.originalname,
          category: req.body.category || "general",
        });
      })
    );

    res.status(201).json({
      success: true,
      message: `${createdRecords.length} file(s) uploaded successfully.`,
      data: createdRecords.length === 1 ? createdRecords[0] : createdRecords,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMediaAsset = async (req: Request, res: Response): Promise<void> => {
  try {
    const asset = await MediaAsset.findById(req.params.id);
    if (!asset) {
      res.status(404).json({ success: false, message: "Media asset not found." });
      return;
    }

    // Try deleting physical file
    if (fs.existsSync(asset.filePath)) {
      try {
        fs.unlinkSync(asset.filePath);
      } catch (err) {
        console.warn(`Could not delete physical file: ${asset.filePath}`, err);
      }
    }

    await MediaAsset.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Media asset deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
