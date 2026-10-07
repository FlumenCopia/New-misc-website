import { Request, Response } from "express";
import { Blog } from "../models/Blog";
import { Enquiry } from "../models/Enquiry";
import { Service } from "../models/Service";
import { Banner } from "../models/Banner";
import { Career } from "../models/Career";
import { TeamMember } from "../models/TeamMember";
import { ClientLogo } from "../models/ClientLogo";

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
