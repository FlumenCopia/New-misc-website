import mongoose, { Document, Schema } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  subject: string;
  message: string;
  formSource:
    | "modal_sidebar"
    | "contact_page"
    | "neyyattinkara"
    | "career_apply"
    | "general";
  status: "new" | "in_progress" | "replied" | "archived";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    service: { type: String, default: "", trim: true },
    subject: { type: String, default: "", trim: true },
    message: { type: String, required: true },
    formSource: {
      type: String,
      enum: [
        "modal_sidebar",
        "contact_page",
        "neyyattinkara",
        "career_apply",
        "general",
      ],
      default: "general",
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "replied", "archived"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
