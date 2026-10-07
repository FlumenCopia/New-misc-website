import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: string;
  category: string;
  categoryId?: mongoose.Types.ObjectId;
  author: string;
  publishDate: Date;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  isPublished: boolean;
  viewsCount: number;
  originalAuthoredComponent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    excerpt: { type: String, default: "" },
    contentHtml: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    category: { type: String, default: "Digital Marketing" },
    categoryId: { type: Schema.Types.ObjectId, ref: "BlogCategory" },
    author: { type: String, default: "MiscArchive Team" },
    publishDate: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    viewsCount: { type: Number, default: 0 },
    originalAuthoredComponent: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
