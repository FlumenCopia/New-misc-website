import mongoose, { Document, Schema } from "mongoose";

export interface ICareer extends Document {
  title: string;
  flyerImage: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  descriptionHtml: string;
  requirements: string[];
  responsibilities: string[];
  status: "open" | "closed";
  deadline?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true, trim: true },
    flyerImage: { type: String, default: "" },
    department: { type: String, default: "Digital Marketing" },
    location: { type: String, default: "Trivandrum, Kerala" },
    employmentType: { type: String, default: "Full Time" },
    experience: { type: String, default: "" },
    descriptionHtml: { type: String, default: "" },
    requirements: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    deadline: { type: Date },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Career = mongoose.model<ICareer>("Career", CareerSchema);
