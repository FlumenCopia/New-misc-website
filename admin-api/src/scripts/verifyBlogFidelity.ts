import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Blog } from "../models/Blog";
import { BlogCategory } from "../models/BlogCategory";

async function verify() {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  await mongoose.connect(connStr);

  const totalBlogs = await Blog.countDocuments();
  console.log(`Registered BlogCategory model: ${BlogCategory.modelName}`);
  console.log(`Total Blogs in DB: ${totalBlogs}`);

  // Check 80th unrouted blog
  const unroutedBlog = await Blog.findOne({ slug: "digital-marketing-solutions-overview" });
  if (unroutedBlog) {
    console.log("\n[Check 80th Unrouted Blog]");
    console.log(`  Title: ${unroutedBlog.title}`);
    console.log(`  Slug: ${unroutedBlog.slug}`);
    console.log(`  Component: ${unroutedBlog.originalAuthoredComponent}`);
    console.log(`  Content Length: ${unroutedBlog.contentHtml.length} chars`);
    console.log(`  Snippet: ${unroutedBlog.contentHtml.slice(0, 150)}...`);
  } else {
    console.error("Missing 80th unrouted blog!");
  }

  // Check a routed blog with vestigial imports in source
  const sample1 = await Blog.findOne({ slug: "AI-Without-Losing-Your-Marketing-Soul" }).populate("categoryId");
  if (sample1) {
    console.log("\n[Check Sample Blog 1 (AI-Without-Losing-Your-Marketing-Soul)]");
    console.log(`  Title: ${sample1.title}`);
    console.log(`  Slug: ${sample1.slug}`);
    console.log(`  Component: ${sample1.originalAuthoredComponent}`);
    console.log(`  Category: ${sample1.category}`);
    console.log(`  Category Object: ${(sample1.categoryId as any)?.name}`);
    console.log(`  Content Length: ${sample1.contentHtml.length} chars`);
    console.log(`  Has <h3>: ${sample1.contentHtml.includes("<h3>")}`);
    console.log(`  Has <p>: ${sample1.contentHtml.includes("<p>")}`);
    console.log(`  Snippet: ${sample1.contentHtml.slice(0, 180)}...`);
  }

  // Check SEO metadata
  const sampleWithSeo = await Blog.findOne({ seoTitle: { $ne: "" } });
  if (sampleWithSeo) {
    console.log("\n[Check Sample Blog with SEO]");
    console.log(`  Slug: ${sampleWithSeo.slug}`);
    console.log(`  SEO Title: ${sampleWithSeo.seoTitle}`);
    console.log(`  SEO Description: ${sampleWithSeo.seoDescription.slice(0, 100)}...`);
  }

  // Check blogs with empty content
  const emptyBlogs = await Blog.find({ $or: [{ contentHtml: "" }, { contentHtml: { $exists: false } }] });
  console.log(`\nBlogs with empty content: ${emptyBlogs.length}`);

  // Slugs uniqueness check
  const allBlogs = await Blog.find({}, { slug: 1, title: 1 });
  const slugs = allBlogs.map((b) => b.slug);
  const uniqueSlugs = new Set(slugs);
  console.log(`All slugs count: ${slugs.length}, Unique slugs count: ${uniqueSlugs.size}`);

  await mongoose.disconnect();
}

verify().catch(console.error);
