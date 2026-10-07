import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/User";
import { WebsiteSettings } from "../models/WebsiteSettings";

export const seedInitialAdmin = async (): Promise<void> => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@miscarchive.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
  const adminName = process.env.ADMIN_NAME || "MiscArchive Administrator";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    console.log(`[Seed] Initial admin user created: ${adminEmail}`);
  } else {
    console.log(`[Seed] Admin user already exists: ${adminEmail}`);
  }

  // Ensure singleton website settings exist
  const existingSettings = await WebsiteSettings.findOne();
  if (!existingSettings) {
    await WebsiteSettings.create({});
    console.log("[Seed] Default WebsiteSettings initialized.");
  } else {
    console.log("[Seed] WebsiteSettings already present.");
  }
};

// If run directly via CLI
if (require.main === module) {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  mongoose
    .connect(connStr)
    .then(async () => {
      console.log("[Seed Script] Connected to MongoDB.");
      await seedInitialAdmin();
      await mongoose.disconnect();
      console.log("[Seed Script] Done.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[Seed Script] Error:", err);
      process.exit(1);
    });
}
