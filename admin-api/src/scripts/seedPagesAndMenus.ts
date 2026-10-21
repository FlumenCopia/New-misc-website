import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { WebsitePage } from "../models/WebsitePage";
import { NavigationMenu } from "../models/NavigationMenu";
import { Project } from "../models/Project";

export const seedPagesAndMenus = async () => {
  console.log("[Seed] Seeding Website Pages...");

  const pagesData = [
    {
      title: "Home",
      slug: "home",
      route: "/",
      pageType: "core",
      description: "MiscArchive main homepage for digital solutions, agency services, and media production.",
      metaTitle: "MiscArchive | Digital Marketing & Creative Agency",
      metaDescription: "Elevate your brand with data-driven digital marketing, modern web development, and creative strategy.",
      isPublished: true,
      sortOrder: 1,
      sections: [
        { sectionKey: "hero", name: "Hero Banners", title: "Creative Agency & Digital Solutions", isEnabled: true, sortOrder: 1 },
        { sectionKey: "about", name: "About Intro", title: "Transforming Ideas into Digital Realities", isEnabled: true, sortOrder: 2 },
        { sectionKey: "services", name: "Featured Services", title: "Comprehensive Solutions for Modern Brands", isEnabled: true, sortOrder: 3 },
        { sectionKey: "clientLogos", name: "Client & Partner Logos", title: "Trusted by Industry Leaders", isEnabled: true, sortOrder: 4 },
        { sectionKey: "whyChoose", name: "Why Choose Us", title: "Strategic Precision Meets Creative Passion", isEnabled: true, sortOrder: 5 },
        { sectionKey: "testimonials", name: "Client Testimonials", title: "What Our Partners Say", isEnabled: true, sortOrder: 6 },
        { sectionKey: "blogs", name: "Latest Insights", title: "Articles, Case Studies & Digital Trends", isEnabled: true, sortOrder: 7 },
        { sectionKey: "cta", name: "Call To Action", title: "Ready to Scale Your Brand?", isEnabled: true, sortOrder: 8 },
      ],
    },
    {
      title: "About Us",
      slug: "about",
      route: "/about",
      pageType: "core",
      description: "Our agency journey, culture, philosophy, and creative team.",
      metaTitle: "About Us | MiscArchive Creative Agency",
      metaDescription: "Learn about the MiscArchive story, our creative minds, and our commitment to high-impact digital craftsmanship.",
      isPublished: true,
      sortOrder: 2,
      sections: [
        { sectionKey: "banner", name: "About Banner", title: "Who We Are", isEnabled: true, sortOrder: 1 },
        { sectionKey: "story", name: "Our Story", title: "From Vision to Multi-Disciplinary Digital Agency", isEnabled: true, sortOrder: 2 },
        { sectionKey: "team", name: "Leadership & Team", title: "Meet the Creators & Strategists", isEnabled: true, sortOrder: 3 },
        { sectionKey: "values", name: "Core Principles", title: "Integrity, Innovation & Execution", isEnabled: true, sortOrder: 4 },
        { sectionKey: "cta", name: "Call To Action", title: "Let's Build Something Great Together", isEnabled: true, sortOrder: 5 },
      ],
    },
    {
      title: "Services",
      slug: "services",
      route: "/services",
      pageType: "core",
      description: "Full spectrum of digital marketing, web engineering, SEO, and multimedia production.",
      metaTitle: "Services | MiscArchive",
      metaDescription: "Discover our full range of tailored digital marketing, performance ads, web design, and media production services.",
      isPublished: true,
      sortOrder: 3,
      sections: [
        { sectionKey: "hero", name: "Services Overview Banner", title: "Specialized Services Engineered for Growth", isEnabled: true, sortOrder: 1 },
        { sectionKey: "servicesList", name: "Complete Services Grid", title: "Our Core Capabilities", isEnabled: true, sortOrder: 2 },
        { sectionKey: "whyWorkWithUs", name: "Our Approach", title: "Why Brands Partner With MiscArchive", isEnabled: true, sortOrder: 3 },
        { sectionKey: "cta", name: "Consultation CTA", title: "Get a Tailored Proposal For Your Business", isEnabled: true, sortOrder: 4 },
      ],
    },
    {
      title: "Neyyattinkara Agency",
      slug: "neyyattinkara",
      route: "/Neyyattinkara",
      pageType: "location",
      description: "Dedicated regional landing page for digital marketing and creative services in Neyyattinkara and South Kerala.",
      heroHeading: "Digital Marketing & Creative Agency in Neyyattinkara",
      heroSubheading: "Driving measurable growth for local businesses with high-converting websites, targeted advertising, and localized digital strategy.",
      metaTitle: "Digital Marketing & Creative Agency in Neyyattinkara | MiscArchive",
      metaDescription: "Top digital marketing agency in Neyyattinkara, Trivandrum. SEO, website development, social media marketing, and branding services tailored for high growth.",
      isPublished: true,
      sortOrder: 4,
      sections: [
        { sectionKey: "hero", name: "Location Hero", title: "Digital Marketing in Neyyattinkara", isEnabled: true, sortOrder: 1 },
        { sectionKey: "about", name: "About Neyyattinkara Hub", title: "Local Market Knowledge, Global Digital Standards", isEnabled: true, sortOrder: 2 },
        { sectionKey: "services", name: "Regional Services", title: "Tailored Growth Solutions for Neyyattinkara", isEnabled: true, sortOrder: 3 },
        { sectionKey: "whyChoose", name: "Why Choose MiscArchive", title: "Real Results, Transparent Analytics", isEnabled: true, sortOrder: 4 },
        { sectionKey: "process", name: "Our Working Process", title: "From Strategy to Execution", isEnabled: true, sortOrder: 5 },
        { sectionKey: "whoWeWorkWith", name: "Who We Work With", title: "Partnering With Growing Businesses", isEnabled: true, sortOrder: 6 },
        { sectionKey: "faqs", name: "Neyyattinkara FAQs", title: "Frequently Asked Questions", isEnabled: true, sortOrder: 7 },
        { sectionKey: "cta", name: "Location CTA", title: "Grow Your Local Business in Neyyattinkara", isEnabled: true, sortOrder: 8 },
      ],
    },
    {
      title: "Contact Us",
      slug: "contact",
      route: "/contact",
      pageType: "core",
      description: "Get in touch with our team in Maruthankuzhy, Trivandrum or reach out for regional consultations.",
      metaTitle: "Contact Us | MiscArchive",
      metaDescription: "Have a project in mind? Reach out to MiscArchive for a consultation, quote, or agency partnership inquiry.",
      isPublished: true,
      sortOrder: 5,
      sections: [
        { sectionKey: "contactInfo", name: "Direct Contact Details", title: "Let's Connect", isEnabled: true, sortOrder: 1 },
        { sectionKey: "enquiryForm", name: "Interactive Enquiry Form", title: "Send Us a Message", isEnabled: true, sortOrder: 2 },
        { sectionKey: "mapEmbed", name: "Office Map Location", title: "Visit Our Office", isEnabled: true, sortOrder: 3 },
      ],
    },
  ];

  for (const page of pagesData) {
    await WebsitePage.findOneAndUpdate({ slug: page.slug }, page, {
      upsert: true,
      new: true,
    });
  }
  console.log(`[Seed] Seeded ${pagesData.length} website pages.`);

  console.log("[Seed] Seeding Navigation Menus...");
  const navMenus = [
    // Header
    { label: "Home", url: "/", placement: "header", order: 1, isOpenNewTab: false, isActive: true },
    { label: "About", url: "/about", placement: "header", order: 2, isOpenNewTab: false, isActive: true },
    { label: "Services", url: "/services", placement: "header", order: 3, isOpenNewTab: false, isActive: true },
    { label: "Blog", url: "/blogs", placement: "header", order: 4, isOpenNewTab: false, isActive: true },
    { label: "Careers", url: "/career", placement: "header", order: 5, isOpenNewTab: false, isActive: true },
    { label: "Neyyattinkara", url: "/Neyyattinkara", placement: "header", order: 6, isOpenNewTab: false, isActive: true },
    { label: "Contact", url: "/contact", placement: "header", order: 7, isOpenNewTab: false, isActive: true },

    // Footer
    { label: "Home", url: "/", placement: "footer", order: 1, isOpenNewTab: false, isActive: true },
    { label: "About Us", url: "/about", placement: "footer", order: 2, isOpenNewTab: false, isActive: true },
    { label: "Services", url: "/services", placement: "footer", order: 3, isOpenNewTab: false, isActive: true },
    { label: "Articles & News", url: "/blogs", placement: "footer", order: 4, isOpenNewTab: false, isActive: true },
    { label: "Terms & Conditions", url: "/terms-and-conditions", placement: "footer", order: 5, isOpenNewTab: false, isActive: true },
    { label: "Contact", url: "/contact", placement: "footer", order: 6, isOpenNewTab: false, isActive: true },
  ];

  for (const nav of navMenus) {
    await NavigationMenu.findOneAndUpdate(
      { label: nav.label, placement: nav.placement },
      nav,
      { upsert: true, new: true }
    );
  }
  console.log(`[Seed] Seeded ${navMenus.length} navigation menu items.`);

  console.log("[Seed] Seeding Portfolio Projects...");
  const projectsData = [
    {
      title: "Audibles Studio Platform",
      slug: "audibles-studio-platform",
      client: "MiscArchive Audibles",
      category: "Web Development",
      thumbnailImage: "/assets/images/project/1.png",
      galleryImages: ["/assets/images/project/1.png"],
      shortDescription: "Interactive audio portfolio and digital production showcase platform.",
      descriptionHtml: "<p>Engineered an immersive music production showcase platform featuring high-fidelity audio streams and dynamic artist discovery.</p>",
      servicesDelivered: ["Next.js", "Web Audio API", "UI/UX Design"],
      projectUrl: "https://audible.miscarchive.com/",
      isFeatured: true,
      order: 1,
      isPublished: true,
    },
    {
      title: "FlumenX Digital Infrastructure",
      slug: "flumenx-digital-infrastructure",
      client: "FlumenX",
      category: "Software & Web",
      thumbnailImage: "/assets/images/project/2.png",
      galleryImages: ["/assets/images/project/2.png"],
      shortDescription: "Cloud application architecture and corporate enterprise web portal.",
      descriptionHtml: "<p>Custom corporate web application with real-time analytics and scalable microservices architecture.</p>",
      servicesDelivered: ["Cloud Engineering", "React", "Node.js"],
      projectUrl: "https://flumenx.com/",
      isFeatured: true,
      order: 2,
      isPublished: true,
    },
    {
      title: "Neyyattinkara Regional Commerce Hub",
      slug: "neyyattinkara-regional-commerce",
      client: "South Kerala Retailers",
      category: "Digital Marketing",
      thumbnailImage: "/assets/images/project/3.png",
      galleryImages: ["/assets/images/project/3.png"],
      shortDescription: "Localized performance marketing and high-converting landing experiences.",
      descriptionHtml: "<p>Generated 400%+ inbound enquiries for local retail and healthcare businesses using targeted local search optimization and social performance campaigns.</p>",
      servicesDelivered: ["Local SEO", "Meta Ads", "Conversion Rate Optimization"],
      projectUrl: "/Neyyattinkara",
      isFeatured: true,
      order: 3,
      isPublished: true,
    },
  ];

  for (const proj of projectsData) {
    await Project.findOneAndUpdate({ slug: proj.slug }, proj, {
      upsert: true,
      new: true,
    });
  }
  console.log(`[Seed] Seeded ${projectsData.length} portfolio projects.`);
};

if (require.main === module) {
  const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/miscarchive_cms";
  mongoose
    .connect(connStr)
    .then(async () => {
      console.log(`Connected to MongoDB at ${connStr}`);
      await seedPagesAndMenus();
      await mongoose.disconnect();
      console.log("Pages and Menus seeding completed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error:", err);
      process.exit(1);
    });
}
