import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { seedInitialAdmin } from "./seedAdmin";
import { seedWebsiteData } from "./seedWebsite";

export const seedAll = async (): Promise<void> => {
  console.log("==========================================");
  console.log("   MISCARCHIVE CMS - MASTER SEED SCRIPT   ");
  console.log("==========================================");

  // 1. Initial Admin
  console.log("\n--- STEP 1: ADMIN USER SEED ---");
  await seedInitialAdmin();

  // 2. Website Authentic Content
  console.log("\n--- STEP 2: WEBSITE CONTENT SEED ---");
  await seedWebsiteData({ verbose: true });

  console.log("\n==========================================");
  console.log("   MASTER SEED COMPLETED SUCCESSFULLY!    ");
  console.log("==========================================");
};

// If run directly via CLI
if (require.main === module) {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  mongoose
    .connect(connStr)
    .then(async () => {
      console.log(`[Master Seed] Connected to MongoDB at ${connStr}`);
      await seedAll();
      await mongoose.disconnect();
      console.log("[Master Seed] Connection closed. Done.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[Master Seed] Fatal error:", err);
      process.exit(1);
    });
}
