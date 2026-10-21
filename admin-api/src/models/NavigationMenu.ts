import mongoose, { Document, Schema } from "mongoose";

export interface INavigationMenu extends Document {
  label: string;
  url: string;
  placement: "header" | "footer";
  parentId?: mongoose.Types.ObjectId;
  order: number;
  isOpenNewTab: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NavigationMenuSchema = new Schema<INavigationMenu>(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    placement: {
      type: String,
      enum: ["header", "footer"],
      default: "header",
      index: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "NavigationMenu",
      default: null,
    },
    order: { type: Number, default: 0 },
    isOpenNewTab: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const NavigationMenu = mongoose.model<INavigationMenu>(
  "NavigationMenu",
  NavigationMenuSchema
);
