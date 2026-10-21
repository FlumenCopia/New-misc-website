import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { Enquiry } from "../models/Enquiry";
import { Service } from "../models/Service";
import { Banner } from "../models/Banner";
import { Career } from "../models/Career";
import { TeamMember } from "../models/TeamMember";
import { ClientLogo } from "../models/ClientLogo";
import { WebsitePage } from "../models/WebsitePage";
import { Project } from "../models/Project";
import { Faq } from "../models/Faq";
import { Testimonial } from "../models/Testimonial";

export const getDashboardStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalEnquiries,
      newEnquiries,
      totalServices,
      totalBanners,
      totalCareers,
      totalTeam,
      totalLogos,
      totalPages,
      totalProjects,
      totalFaqs,
      totalTestimonials,
      recentEnquiries,
      recentBlogs,
    ] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Blog.countDocuments({ isPublished: false }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Service.countDocuments(),
      Banner.countDocuments(),
      Career.countDocuments(),
      TeamMember.countDocuments(),
      ClientLogo.countDocuments(),
      WebsitePage.countDocuments(),
      Project.countDocuments(),
      Faq.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
      Blog.find().sort({ createdAt: -1 }).limit(5).select("title slug publishDate isPublished category"),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          draft: draftBlogs,
        },
        enquiries: {
          total: totalEnquiries,
          new: newEnquiries,
        },
        services: totalServices,
        banners: totalBanners,
        careers: totalCareers,
        teamMembers: totalTeam,
        clientLogos: totalLogos,
        pages: totalPages,
        projects: totalProjects,
        faqs: totalFaqs,
        testimonials: totalTestimonials,
      },
      recentEnquiries,
      recentBlogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard metrics.",
      error: error.message,
    });
  }
};
