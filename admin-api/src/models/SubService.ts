import mongoose, { Document, Schema } from "mongoose";

export interface ISubService extends Document {
  parentService: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescriptionHtml: string;
  iconImage: string;
  route: string;
  benefits: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubServiceSchema = new Schema<ISubService>(
  {
    parentService: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, default: "" },
    fullDescriptionHtml: { type: String, default: "" },
    iconImage: { type: String, default: "" },
    route: { type: String, default: "" },
    benefits: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SubService = mongoose.model<ISubService>(
  "SubService",
  SubServiceSchema
);
