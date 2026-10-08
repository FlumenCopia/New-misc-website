import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { Blog } from "../models/Blog";

const SLUG = "social-media-builds-trust-before-sales";

async function run() {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  console.log(`Connecting to MongoDB at: ${connStr}...`);
  await mongoose.connect(connStr);

  const existing = await Blog.findOne({ slug: SLUG });
  if (!existing) {
    console.error(`Blog with slug "${SLUG}" not found!`);
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`Found blog: "${existing.title}" (_id: ${existing._id})`);
  console.log(`Before update:`);
  console.log(`  contentHtml length: ${existing.contentHtml.length}`);
  console.log(`  featuredImage: ${existing.featuredImage}`);

  // Load the authentic clean HTML from scratch_clean_content.html
  const cleanHtmlPath = path.resolve(__dirname, "../../../scratch_clean_content.html");
  const cleanContentHtml = fs.readFileSync(cleanHtmlPath, "utf8");

  existing.contentHtml = cleanContentHtml;
  existing.featuredImage = "/assets/images/blogs/bl63.webp";
  await existing.save();

  console.log(`\nSuccessfully updated blog in MongoDB!`);
  console.log(`After update:`);
  console.log(`  contentHtml length: ${existing.contentHtml.length}`);
  console.log(`  featuredImage: ${existing.featuredImage}`);
  console.log(`  H3 count: ${(existing.contentHtml.match(/<h3/g) || []).length}`);
  console.log(`  P count: ${(existing.contentHtml.match(/<p/g) || []).length}`);

  await mongoose.disconnect();
  console.log(`Disconnected from MongoDB.`);
}

run().catch((err) => {
  console.error("Error executing fixTargetBlogFidelity:", err);
  process.exit(1);
});
