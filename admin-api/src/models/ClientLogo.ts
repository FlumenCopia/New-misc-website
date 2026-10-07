import mongoose, { Document, Schema } from "mongoose";

export interface IClientLogo extends Document {
  clientName: string;
  logoImage: string;
  websiteUrl: string;
  altText: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    clientName: { type: String, required: true, trim: true },
    logoImage: { type: String, required: true },
    websiteUrl: { type: String, default: "" },
    altText: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ClientLogo = mongoose.model<IClientLogo>(
  "ClientLogo",
  ClientLogoSchema
);
