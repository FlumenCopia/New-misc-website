import mongoose from "mongoose";

async function checkDb() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    const db = mongoose.connection.db;
    if (!db) throw new Error("DB connection not established");

    console.log("==========================================");
    console.log("   MONGODB READ-ONLY AUDIT VERIFICATION   ");
    console.log("==========================================");
    console.log("Connected URI:", uri);
    console.log("Database Name:", db.databaseName);

    // Collection counts
    const blogs = await db.collection("blogs").find({}).toArray();
    const categories = await db.collection("blogcategories").find({}).toArray();
    const services = await db.collection("services").find({}).toArray();
    const subservices = await db.collection("subservices").find({}).toArray();
    const clientlogos = await db.collection("clientlogos").find({}).toArray();
    const teammembers = await db.collection("teammembers").find({}).toArray();
    const testimonials = await db.collection("testimonials").find({}).toArray();
    const faqs = await db.collection("faqs").find({}).toArray();
    const careers = await db.collection("careers").find({}).toArray();
    const banners = await db.collection("banners").find({}).toArray();
    const settings = await db.collection("websitesettings").find({}).toArray();
    const mediaassets = await db.collection("mediaassets").find({}).toArray();
    const users = await db.collection("users").find({}).toArray();

    const activeServices = services.filter((s) => s.isActive === true);
    const inactiveServices = services.filter((s) => s.isActive === false);

    console.log("\n--- VERIFIED COUNTS ---");
    console.log(`Blogs:             ${blogs.length}`);
    console.log(`Blog Categories:   ${categories.length}`);
    console.log(`Active Services:   ${activeServices.length}`);
    console.log(`Inactive Services: ${inactiveServices.length}`);
    console.log(`Total Services:    ${services.length}`);
    console.log(`Sub-services:      ${subservices.length}`);
    console.log(`Client Logos:      ${clientlogos.length}`);
    console.log(`Team Members:      ${teammembers.length}`);
    console.log(`Testimonials:      ${testimonials.length}`);
    console.log(`FAQs:              ${faqs.length}`);
    console.log(`Careers:           ${careers.length}`);
    console.log(`Banners:           ${banners.length}`);
    console.log(`Global Settings:   ${settings.length}`);
    console.log(`CMS Media Assets:  ${mediaassets.length}`);
    console.log(`Users:             ${users.length}`);

    // Duplicate Checks
    console.log("\n--- DUPLICATE CHECKS ---");
    const blogSlugs = blogs.map((b) => b.slug);
    const uniqueBlogSlugs = new Set(blogSlugs);
    const dupBlogSlugs = blogSlugs.length - uniqueBlogSlugs.size;
    console.log(`Duplicate blog slugs: ${dupBlogSlugs} (Total: ${blogSlugs.length}, Unique: ${uniqueBlogSlugs.size})`);

    const logoImgs = clientlogos.map((l) => l.logoImage);
    const uniqueLogoImgs = new Set(logoImgs);
    const dupLogos = logoImgs.length - uniqueLogoImgs.size;
    console.log(`Duplicate client logos: ${dupLogos} (Total: ${logoImgs.length}, Unique: ${uniqueLogoImgs.size})`);

    const serviceSlugs = services.map((s) => s.slug);
    const uniqueServiceSlugs = new Set(serviceSlugs);
    const dupServices = serviceSlugs.length - uniqueServiceSlugs.size;
    console.log(`Duplicate services: ${dupServices} (Total: ${serviceSlugs.length}, Unique: ${uniqueServiceSlugs.size})`);

    // 80th Blog Verification
    console.log("\n--- 80TH BLOG VERIFICATION ---");
    const blog80 = blogs.find((b) => b.slug === "digital-marketing-solutions-overview");
    if (blog80) {
      console.log("80th Blog present: YES");
      console.log(`  Title: ${blog80.title}`);
      console.log(`  Slug: ${blog80.slug}`);
      console.log(`  Component: ${blog80.originalAuthoredComponent}`);
      console.log(`  HTML Length: ${blog80.contentHtml?.length} characters`);
      console.log(`  Contains Rich HTML (<p>, <section>): ${blog80.contentHtml?.includes("<p") && blog80.contentHtml?.includes("<section")}`);
    } else {
      console.log("80th Blog present: NO");
    }

    // Rich HTML Content Check across all blogs
    console.log("\n--- RICH HTML AUDIT ---");
    const emptyHtmlBlogs = blogs.filter((b) => !b.contentHtml || b.contentHtml.length < 50);
    console.log(`Blogs with empty/short HTML: ${emptyHtmlBlogs.length}`);
    const avgLen = blogs.reduce((sum, b) => sum + (b.contentHtml?.length || 0), 0) / blogs.length;
    console.log(`Average blog contentHtml length: ${Math.round(avgLen)} characters`);

    // Admin Account Verification
    console.log("\n--- ADMIN ACCOUNT VERIFICATION ---");
    const adminUser = users.find((u) => u.email === "admin@miscarchive.com");
    if (adminUser) {
      console.log("Admin account present: YES");
      console.log(`  Email: ${adminUser.email}`);
      console.log(`  Role: ${adminUser.role}`);
      console.log(`  Name: ${adminUser.name}`);
    } else {
      console.log("Admin account present: NO");
    }

  } catch (err) {
    console.error("DB check failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

checkDb();
