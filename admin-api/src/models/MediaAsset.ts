import mongoose, { Document, Schema } from "mongoose";

export interface IMediaAsset extends Document {
  originalName: string;
  filename: string;
  filePath: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  altText: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    originalName: { type: String, required: true },
    filename: { type: String, required: true, unique: true },
    filePath: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    altText: { type: String, default: "" },
    category: { type: String, default: "general" },
  },
  { timestamps: true }
);

export const MediaAsset = mongoose.model<IMediaAsset>(
  "MediaAsset",
  MediaAssetSchema
);
