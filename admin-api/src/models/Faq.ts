import mongoose, { Document, Schema } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answerHtml: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true, trim: true },
    answerHtml: { type: String, required: true },
    category: { type: String, default: "general" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Faq = mongoose.model<IFaq>("Faq", FaqSchema);
