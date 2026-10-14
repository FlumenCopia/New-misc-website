import mongoose, { Document, Schema } from "mongoose";

export interface IBanner extends Document {
  title?: string;
  subtitle?: string;
  description?: string;
  desktopImage: string;
  mobileImage?: string;
  linkUrl: string;
  theme?: "light" | "dark";
  buttonText?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    desktopImage: { type: String, required: true },
    mobileImage: { type: String, default: "" },
    linkUrl: { type: String, default: "" },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    buttonText: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>("Banner", BannerSchema);
