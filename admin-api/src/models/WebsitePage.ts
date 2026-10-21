import mongoose, { Document, Schema } from "mongoose";

export interface IPageSection {
  _id?: mongoose.Types.ObjectId;
  sectionKey: string;
  name: string;
  title: string;
  subtitle?: string;
  isEnabled: boolean;
  sortOrder: number;
  content?: Record<string, any>;
}

export interface IWebsitePage extends Document {
  title: string;
  slug: string;
  route: string;
  pageType: "core" | "location" | "custom";
  description: string;
  heroHeading?: string;
  heroSubheading?: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  isPublished: boolean;
  sortOrder: number;
  sections: IPageSection[];
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    sectionKey: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    isEnabled: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    content: { type: Schema.Types.Mixed, default: {} },
  },
  { _id: true }
);

const WebsitePageSchema = new Schema<IWebsitePage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, index: true },
    route: { type: String, required: true, trim: true },
    pageType: {
      type: String,
      enum: ["core", "location", "custom"],
      default: "core",
    },
    description: { type: String, default: "" },
    heroHeading: { type: String, default: "" },
    heroSubheading: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    sections: { type: [PageSectionSchema], default: [] },
  },
  { timestamps: true }
);

export const WebsitePage = mongoose.model<IWebsitePage>(
  "WebsitePage",
  WebsitePageSchema
);
