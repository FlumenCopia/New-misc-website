import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescriptionHtml: string;
  iconImage: string;
  route: string;
  features: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, default: "" },
    fullDescriptionHtml: { type: String, default: "" },
    iconImage: { type: String, default: "" },
    route: { type: String, default: "" },
    features: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>("Service", ServiceSchema);
