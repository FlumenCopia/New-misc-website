import mongoose, { Document, Schema } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  designation: string;
  photoImage: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    photoImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model<ITeamMember>(
  "TeamMember",
  TeamMemberSchema
);
