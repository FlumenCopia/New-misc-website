import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  clientName: string;
  designation: string;
  company: string;
  avatarImage: string;
  feedback: string;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    company: { type: String, default: "" },
    avatarImage: { type: String, default: "" },
    feedback: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  TestimonialSchema
);
