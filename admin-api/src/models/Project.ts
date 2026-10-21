import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  client: string;
  category: string;
  thumbnailImage: string;
  galleryImages: string[];
  shortDescription: string;
  descriptionHtml: string;
  servicesDelivered: string[];
  projectUrl: string;
  isFeatured: boolean;
  order: number;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    client: { type: String, default: "" },
    category: { type: String, default: "Web Development" },
    thumbnailImage: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },
    shortDescription: { type: String, default: "" },
    descriptionHtml: { type: String, default: "" },
    servicesDelivered: { type: [String], default: [] },
    projectUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
