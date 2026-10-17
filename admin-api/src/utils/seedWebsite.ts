import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Models
import { WebsiteSettings } from "../models/WebsiteSettings";
import { BlogCategory } from "../models/BlogCategory";
import { Service } from "../models/Service";
import { SubService } from "../models/SubService";
import { ClientLogo } from "../models/ClientLogo";
import { TeamMember } from "../models/TeamMember";
import { Testimonial } from "../models/Testimonial";
import { Faq } from "../models/Faq";
import { Career } from "../models/Career";
import { Banner } from "../models/Banner";
import { Blog } from "../models/Blog";
import { MediaAsset } from "../models/MediaAsset";

export interface ISeedSummary {
  websiteSettings: number;
  banners: number;
  blogCategories: number;
  services: number;
  subServices: number;
  clientLogos: number;
  teamMembers: number;
  testimonials: number;
  faqs: number;
  careers: number;
  blogs: number;
  mediaAssets: number;
}

export const seedWebsiteData = async (
  options: { verbose?: boolean } = { verbose: true }
): Promise<ISeedSummary> => {
  const log = (msg: string) => {
    if (options.verbose) console.log(msg);
  };

  log("[Seed Website] Loading authentic seed dataset...");
  let dataPath = path.resolve(__dirname, "../data/websiteSeedData.json");
  if (!fs.existsSync(dataPath)) {
    dataPath = path.resolve(process.cwd(), "src/data/websiteSeedData.json");
  }
  if (!fs.existsSync(dataPath)) {
    dataPath = path.resolve(process.cwd(), "dist/data/websiteSeedData.json");
  }
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Seed data file not found at: ${dataPath}`);
  }

  const raw = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(raw);

  // 1. WebsiteSettings (Singleton)
  log("[Seed Website] Seeding WebsiteSettings...");
  await WebsiteSettings.findOneAndUpdate({}, data.websiteSettings, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });

  // 2. Blog Categories (2)
  log("[Seed Website] Seeding Blog Categories...");
  const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const cat of data.blogCategories) {
    const doc = await BlogCategory.findOneAndUpdate(
      { slug: cat.slug },
      cat,
      { upsert: true, new: true }
    );
    categoryMap[cat.name] = doc._id as mongoose.Types.ObjectId;
    categoryMap[cat.slug] = doc._id as mongoose.Types.ObjectId;
  }

  // 3. Services (10)
  log("[Seed Website] Seeding Services...");
  const serviceMap: Record<string, mongoose.Types.ObjectId> = {};
  for (const svc of data.services) {
    const doc = await Service.findOneAndUpdate(
      { slug: svc.slug },
      svc,
      { upsert: true, new: true }
    );
    serviceMap[svc.slug] = doc._id as mongoose.Types.ObjectId;
  }

  // 4. Sub-Services (4)
  log("[Seed Website] Seeding Sub-Services...");
  for (const sub of data.subServices) {
    const parentId = serviceMap[sub.parentServiceSlug];
    if (!parentId) {
      console.warn(`[Seed Website] Warning: Parent service '${sub.parentServiceSlug}' not found for sub-service '${sub.slug}'`);
    }
    const { parentServiceSlug, ...subFields } = sub;
    await SubService.findOneAndUpdate(
      { slug: sub.slug },
      { ...subFields, parentService: parentId },
      { upsert: true, new: true }
    );
  }

  // 5. Client Logos (35)
  log("[Seed Website] Seeding Client Logos...");
  for (const logo of data.clientLogos) {
    await ClientLogo.findOneAndUpdate(
      { logoImage: logo.logoImage },
      logo,
      { upsert: true, new: true }
    );
  }

  // 6. Team Members (4)
  log("[Seed Website] Seeding Team Members...");
  for (const tm of data.teamMembers) {
    await TeamMember.findOneAndUpdate(
      { name: tm.name },
      tm,
      { upsert: true, new: true }
    );
  }

  // 7. FAQs (8)
  log("[Seed Website] Seeding FAQs...");
  for (const faq of data.faqs) {
    await Faq.findOneAndUpdate(
      { question: faq.question },
      faq,
      { upsert: true, new: true }
    );
  }

  // 8. Careers (1)
  log("[Seed Website] Seeding Careers...");
  for (const career of data.careers) {
    await Career.findOneAndUpdate(
      { title: career.title },
      career,
      { upsert: true, new: true }
    );
  }

  // 9. Banners (3)
  log("[Seed Website] Seeding Banners...");
  for (const banner of data.banners) {
    await Banner.findOneAndUpdate(
      { order: banner.order },
      banner,
      { upsert: true, new: true }
    );
  }

  // 10. Blogs (80)
  log("[Seed Website] Seeding Blogs...");
  for (const blog of data.blogs) {
    const categoryId = categoryMap[blog.category] || categoryMap["digital-marketing"];
    await Blog.findOneAndUpdate(
      { slug: blog.slug },
      { ...blog, categoryId },
      { upsert: true, new: true }
    );
  }

  // 11. Media Assets (151)
  log("[Seed Website] Seeding Media Assets...");
  for (const asset of data.mediaAssets) {
    await MediaAsset.findOneAndUpdate(
      { filename: asset.filename },
      asset,
      { upsert: true, new: true }
    );
  }

  // Summary counts from DB
  const [
    websiteSettingsCount,
    bannersCount,
    blogCategoriesCount,
    servicesCount,
    subServicesCount,
    clientLogosCount,
    teamMembersCount,
    testimonialsCount,
    faqsCount,
    careersCount,
    blogsCount,
    mediaAssetsCount,
  ] = await Promise.all([
    WebsiteSettings.countDocuments(),
    Banner.countDocuments(),
    BlogCategory.countDocuments(),
    Service.countDocuments(),
    SubService.countDocuments(),
    ClientLogo.countDocuments(),
    TeamMember.countDocuments(),
    Testimonial.countDocuments(),
    Faq.countDocuments(),
    Career.countDocuments(),
    Blog.countDocuments(),
    MediaAsset.countDocuments(),
  ]);

  const summary: ISeedSummary = {
    websiteSettings: websiteSettingsCount,
    banners: bannersCount,
    blogCategories: blogCategoriesCount,
    services: servicesCount,
    subServices: subServicesCount,
    clientLogos: clientLogosCount,
    teamMembers: teamMembersCount,
    testimonials: testimonialsCount,
    faqs: faqsCount,
    careers: careersCount,
    blogs: blogsCount,
    mediaAssets: mediaAssetsCount,
  };

  log("\n=== WEBSITE SEED COMPLETED SUCCESSFULLY ===");
  log(`WebsiteSettings: ${summary.websiteSettings}`);
  log(`Banners:         ${summary.banners}`);
  log(`Blog Categories: ${summary.blogCategories}`);
  log(`Services:        ${summary.services}`);
  log(`Sub-Services:    ${summary.subServices}`);
  log(`Client Logos:    ${summary.clientLogos}`);
  log(`Team Members:    ${summary.teamMembers}`);
  log(`Testimonials:    ${summary.testimonials}`);
  log(`FAQs:            ${summary.faqs}`);
  log(`Careers:         ${summary.careers}`);
  log(`Blogs:           ${summary.blogs}`);
  log(`Media Assets:    ${summary.mediaAssets}`);

  return summary;
};

// If run directly via CLI
if (require.main === module) {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  mongoose
    .connect(connStr)
    .then(async () => {
      console.log(`[Seed Website] Connected to MongoDB at ${connStr}`);
      await seedWebsiteData({ verbose: true });
      await mongoose.disconnect();
      console.log("[Seed Website] Connection closed. Done.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[Seed Website] Fatal error:", err);
      process.exit(1);
    });
}
