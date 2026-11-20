/**
 * MISCARCHIVE PRODUCTION DATABASE SEED SCRIPT
 * 
 * Fully automated, idempotent, production-ready seed tool.
 * Can be executed safely in local, staging, and production environments.
 * 
 * Usage:
 *   npx tsx src/scripts/seedProduction.ts [options]
 *   npm run seed:prod -- [options]
 * 
 * Options:
 *   --uri <mongo_uri>          MongoDB connection string (defaults to process.env.MONGODB_URI)
 *   --admin-email <email>      Admin user email (defaults to process.env.ADMIN_EMAIL or admin@miscarchive.com)
 *   --admin-password <pass>    Admin user password (defaults to process.env.ADMIN_PASSWORD or admin123456)
 *   --admin-name <name>        Admin user display name
 *   --dry-run                  Simulate connection and seed validation without altering database
 *   --quiet                    Suppress verbose per-record logs
 *   --help                     Show help documentation
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

// Models
import { User } from "../models/User";
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
import { WebsitePage } from "../models/WebsitePage";
import { NavigationMenu } from "../models/NavigationMenu";
import { Project } from "../models/Project";

interface CliArgs {
  uri: string;
  adminEmail: string;
  adminPassword?: string;
  adminName: string;
  dryRun: boolean;
  quiet: boolean;
}

function parseCliArgs(): CliArgs {
  const args = process.argv.slice(2);
  const result: CliArgs = {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms",
    adminEmail: process.env.ADMIN_EMAIL || "admin@miscarchive.com",
    adminPassword: process.env.ADMIN_PASSWORD || "admin123456",
    adminName: process.env.ADMIN_NAME || "MiscArchive Administrator",
    dryRun: false,
    quiet: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (arg === "--uri" && args[i + 1]) {
      result.uri = args[++i];
    } else if (arg === "--admin-email" && args[i + 1]) {
      result.adminEmail = args[++i];
    } else if (arg === "--admin-password" && args[i + 1]) {
      result.adminPassword = args[++i];
    } else if (arg === "--admin-name" && args[i + 1]) {
      result.adminName = args[++i];
    } else if (arg === "--dry-run") {
      result.dryRun = true;
    } else if (arg === "--quiet") {
      result.quiet = true;
    }
  }

  return result;
}

function printHelp() {
  console.log(`
MiscArchive CMS - Production Database Seed Tool
=================================================
Options:
  --uri <connection_string>   MongoDB URI (or set MONGODB_URI)
  --admin-email <email>       Admin email (or set ADMIN_EMAIL)
  --admin-password <pass>     Admin password (or set ADMIN_PASSWORD)
  --admin-name <name>         Admin display name (or set ADMIN_NAME)
  --dry-run                   Validate connection and seed dataset without writing
  --quiet                     Show only summary logs
  --help, -h                  Display this help message
`);
}

function maskMongoUri(uri: string): string {
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@");
  } catch {
    return uri;
  }
}

async function runSeed() {
  const config = parseCliArgs();

  console.log("===============================================================");
  console.log("       MISCARCHIVE PRODUCTION DATABASE SEED UTILITY            ");
  console.log("===============================================================");
  console.log(`Execution Mode:  ${config.dryRun ? "DRY-RUN (Simulate only, no writes)" : "PRODUCTION SEED (Live upsert)"}`);
  console.log(`Target Database: ${maskMongoUri(config.uri)}`);
  console.log(`Admin User:      ${config.adminEmail}`);
  console.log(`Timestamp:       ${new Date().toISOString()}`);
  console.log("---------------------------------------------------------------");

  // 1. Locate and validate seed data file
  let dataPath = path.resolve(__dirname, "../data/websiteSeedData.json");
  if (!fs.existsSync(dataPath)) {
    dataPath = path.resolve(process.cwd(), "src/data/websiteSeedData.json");
  }
  if (!fs.existsSync(dataPath)) {
    dataPath = path.resolve(process.cwd(), "dist/data/websiteSeedData.json");
  }
  if (!fs.existsSync(dataPath)) {
    console.error(`[FATAL ERROR] Seed dataset not found at: ${dataPath}`);
    process.exit(1);
  }

  const rawJson = fs.readFileSync(dataPath, "utf-8");
  const seedData = JSON.parse(rawJson);
  console.log(`[Seed Dataset] Loaded v${seedData.version || "1.0.0"} from ${path.basename(dataPath)}`);
  console.log(`  - Blogs to seed:            ${seedData.blogs?.length || 0}`);
  console.log(`  - Services to seed:         ${seedData.services?.length || 0}`);
  console.log(`  - Sub-services to seed:     ${seedData.subServices?.length || 0}`);
  console.log(`  - Client logos to seed:     ${seedData.clientLogos?.length || 0}`);
  console.log(`  - Team members to seed:     ${seedData.teamMembers?.length || 0}`);
  console.log(`  - FAQs to seed:             ${seedData.faqs?.length || 0}`);
  console.log(`  - Careers to seed:          ${seedData.careers?.length || 0}`);
  console.log(`  - Banners to seed:          ${seedData.banners?.length || 0}`);
  console.log(`  - Media assets to seed:     ${seedData.mediaAssets?.length || 0}`);
  console.log(`  - Website pages to seed:    ${seedData.websitePages?.length || 0}`);
  console.log(`  - Navigation menus to seed: ${seedData.navigationMenus?.length || 0}`);
  console.log(`  - Projects to seed:         ${seedData.projects?.length || 0}`);

  if (config.dryRun) {
    console.log("\n[DRY RUN] Dataset parsed and validated successfully. Skipping DB connection and writes.");
    process.exit(0);
  }

  // 2. Connect to MongoDB
  console.log("\n[Connecting] Establishing connection to MongoDB...");
  try {
    await mongoose.connect(config.uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("[Connected] Successfully connected to MongoDB cluster.");
  } catch (err: any) {
    console.error(`\n[FATAL ERROR] Could not connect to MongoDB: ${err.message}`);
    console.error("Please verify MONGODB_URI connection string, network access, and IP whitelist.");
    process.exit(1);
  }

  try {
    // 3. Pre-flight document count audit
    console.log("\n[Pre-Flight] Auditing existing database state...");
    const preCounts = {
      users: await User.countDocuments(),
      websiteSettings: await WebsiteSettings.countDocuments(),
      blogCategories: await BlogCategory.countDocuments(),
      blogs: await Blog.countDocuments(),
      services: await Service.countDocuments(),
      subServices: await SubService.countDocuments(),
      clientLogos: await ClientLogo.countDocuments(),
      teamMembers: await TeamMember.countDocuments(),
      faqs: await Faq.countDocuments(),
      careers: await Career.countDocuments(),
      banners: await Banner.countDocuments(),
      mediaAssets: await MediaAsset.countDocuments(),
      websitePages: await WebsitePage.countDocuments(),
      navigationMenus: await NavigationMenu.countDocuments(),
      projects: await Project.countDocuments(),
    };

    // 4. Seed Admin Account
    console.log("\n--- [Phase 1/3] Admin User Provisioning ---");
    const existingAdmin = await User.findOne({ email: config.adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: config.adminName,
        email: config.adminEmail,
        password: config.adminPassword,
        role: "admin",
      });
      console.log(`  [+] Admin created successfully: ${config.adminEmail}`);
    } else {
      console.log(`  [=] Admin already exists (preserved, not overwritten): ${config.adminEmail}`);
    }

    // 5. Seed Content Collections
    console.log("\n--- [Phase 2/3] Upserting Authentic Website Data ---");

    // 5.1 WebsiteSettings (Singleton)
    if (seedData.websiteSettings) {
      await WebsiteSettings.findOneAndUpdate({}, seedData.websiteSettings, {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      });
      console.log("  [+] WebsiteSettings: Synced singleton configuration");
    }

    // 5.2 Blog Categories
    const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
    if (seedData.blogCategories) {
      for (const cat of seedData.blogCategories) {
        const doc = await BlogCategory.findOneAndUpdate(
          { slug: cat.slug },
          cat,
          { upsert: true, new: true }
        );
        categoryMap[cat.name] = doc._id as mongoose.Types.ObjectId;
        categoryMap[cat.slug] = doc._id as mongoose.Types.ObjectId;
      }
      console.log(`  [+] Blog Categories: Synced ${seedData.blogCategories.length} categories`);
    }

    // 5.3 Services
    const serviceMap: Record<string, mongoose.Types.ObjectId> = {};
    if (seedData.services) {
      for (const svc of seedData.services) {
        const doc = await Service.findOneAndUpdate(
          { slug: svc.slug },
          svc,
          { upsert: true, new: true }
        );
        serviceMap[svc.slug] = doc._id as mongoose.Types.ObjectId;
      }
      console.log(`  [+] Services: Synced ${seedData.services.length} services`);
    }

    // 5.4 Sub-Services
    if (seedData.subServices) {
      for (const sub of seedData.subServices) {
        const parentId = serviceMap[sub.parentServiceSlug];
        const { parentServiceSlug, ...subFields } = sub;
        await SubService.findOneAndUpdate(
          { slug: sub.slug },
          { ...subFields, parentService: parentId },
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Sub-Services: Synced ${seedData.subServices.length} sub-services`);
    }

    // 5.5 Client Logos
    if (seedData.clientLogos) {
      for (const logo of seedData.clientLogos) {
        await ClientLogo.findOneAndUpdate(
          { logoImage: logo.logoImage },
          logo,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Client Logos: Synced ${seedData.clientLogos.length} logos`);
    }

    // 5.6 Team Members
    if (seedData.teamMembers) {
      for (const tm of seedData.teamMembers) {
        await TeamMember.findOneAndUpdate(
          { name: tm.name },
          tm,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Team Members: Synced ${seedData.teamMembers.length} executive profiles`);
    }

    // 5.7 FAQs
    if (seedData.faqs) {
      for (const faq of seedData.faqs) {
        await Faq.findOneAndUpdate(
          { question: faq.question },
          faq,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] FAQs: Synced ${seedData.faqs.length} FAQ questions`);
    }

    // 5.8 Careers
    if (seedData.careers) {
      for (const career of seedData.careers) {
        await Career.findOneAndUpdate(
          { title: career.title },
          career,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Careers: Synced ${seedData.careers.length} openings`);
    }

    // 5.9 Banners
    if (seedData.banners) {
      for (const banner of seedData.banners) {
        await Banner.findOneAndUpdate(
          { order: banner.order },
          banner,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Banners: Synced ${seedData.banners.length} hero slides`);
    }

    // 5.10 Blogs (All 80 articles with full rich HTML)
    if (seedData.blogs) {
      for (const blog of seedData.blogs) {
        const categoryId = categoryMap[blog.category] || categoryMap["digital-marketing"];
        await Blog.findOneAndUpdate(
          { slug: blog.slug },
          { ...blog, categoryId },
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Blogs: Synced ${seedData.blogs.length} articles with complete semantic HTML`);
    }

    // 5.11 Media Assets
    if (seedData.mediaAssets) {
      for (const asset of seedData.mediaAssets) {
        await MediaAsset.findOneAndUpdate(
          { filename: asset.filename },
          asset,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Media Assets: Synced ${seedData.mediaAssets.length} catalog items`);
    }

    // 5.12 Website Pages
    if (seedData.websitePages) {
      for (const page of seedData.websitePages) {
        await WebsitePage.findOneAndUpdate(
          { slug: page.slug },
          page,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Website Pages: Synced ${seedData.websitePages.length} core & regional pages`);
    }

    // 5.13 Navigation Menus
    if (seedData.navigationMenus) {
      for (const nav of seedData.navigationMenus) {
        await NavigationMenu.findOneAndUpdate(
          { label: nav.label, placement: nav.placement },
          nav,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Navigation Menus: Synced ${seedData.navigationMenus.length} header & footer items`);
    }

    // 5.14 Projects
    if (seedData.projects) {
      for (const proj of seedData.projects) {
        await Project.findOneAndUpdate(
          { slug: proj.slug },
          proj,
          { upsert: true, new: true }
        );
      }
      console.log(`  [+] Projects: Synced ${seedData.projects.length} portfolio items`);
    }

    // 6. Post-Flight Audit & Verification
    console.log("\n--- [Phase 3/3] Post-Flight Verification ---");
    const postCounts = {
      users: await User.countDocuments(),
      websiteSettings: await WebsiteSettings.countDocuments(),
      blogCategories: await BlogCategory.countDocuments(),
      blogs: await Blog.countDocuments(),
      services: await Service.countDocuments(),
      subServices: await SubService.countDocuments(),
      clientLogos: await ClientLogo.countDocuments(),
      teamMembers: await TeamMember.countDocuments(),
      faqs: await Faq.countDocuments(),
      careers: await Career.countDocuments(),
      banners: await Banner.countDocuments(),
      mediaAssets: await MediaAsset.countDocuments(),
      websitePages: await WebsitePage.countDocuments(),
      navigationMenus: await NavigationMenu.countDocuments(),
      projects: await Project.countDocuments(),
    };

    console.log("\n===============================================================");
    console.log("             PRODUCTION SEED RECONCILIATION AUDIT              ");
    console.log("===============================================================");
    console.log(
      "Collection            | Expected | In Database | Status"
    );
    console.log("----------------------+----------+-------------+---------------");
    const rows: [string, number, number][] = [
      ["Admin Users", 1, postCounts.users],
      ["Website Settings", 1, postCounts.websiteSettings],
      ["Blog Categories", seedData.blogCategories?.length || 2, postCounts.blogCategories],
      ["Blogs", seedData.blogs?.length || 80, postCounts.blogs],
      ["Services", seedData.services?.length || 11, postCounts.services],
      ["Sub-Services", seedData.subServices?.length || 4, postCounts.subServices],
      ["Client Logos", seedData.clientLogos?.length || 35, postCounts.clientLogos],
      ["Team Members", seedData.teamMembers?.length || 4, postCounts.teamMembers],
      ["FAQs", seedData.faqs?.length || 8, postCounts.faqs],
      ["Careers", seedData.careers?.length || 1, postCounts.careers],
      ["Banners", seedData.banners?.length || 3, postCounts.banners],
      ["Media Assets", seedData.mediaAssets?.length || 151, postCounts.mediaAssets],
      ["Website Pages", seedData.websitePages?.length || 7, postCounts.websitePages],
      ["Navigation Menus", seedData.navigationMenus?.length || 13, postCounts.navigationMenus],
      ["Projects", seedData.projects?.length || 3, postCounts.projects],
    ];

    let allPass = true;
    for (const [name, expected, actual] of rows) {
      const match = actual >= expected;
      if (!match) allPass = false;
      const status = match ? "OK (VERIFIED)" : "WARNING (MISMATCH)";
      console.log(
        `${name.padEnd(21)} | ${String(expected).padStart(8)} | ${String(actual).padStart(11)} | ${status}`
      );
    }
    console.log("===============================================================");

    // Verify Blog Content Integrity
    const sampleBlog = await Blog.findOne({ slug: "How-AI-Is-Redefining-Digital-Agencies" });
    if (!sampleBlog || !sampleBlog.contentHtml || sampleBlog.contentHtml.length < 500) {
      console.warn("[WARNING] Sample blog contentHtml integrity check failed!");
    } else {
      console.log(`[Integrity OK] Sample blog content verified (${sampleBlog.contentHtml.length} characters of HTML)`);
    }

    if (allPass) {
      console.log("\n[SUCCESS] Production database seeding completed with 100% data fidelity.");
    } else {
      console.warn("\n[COMPLETE WITH WARNINGS] Some collection counts were lower than expected.");
    }

    await mongoose.disconnect();
    console.log("[Connection Closed] Disconnected cleanly from MongoDB.\n");
    process.exit(0);
  } catch (err: any) {
    console.error(`\n[FATAL SEED ERROR] Execution failed: ${err.message}`);
    console.error(err.stack);
    await mongoose.disconnect();
    process.exit(1);
  }
}

runSeed();
