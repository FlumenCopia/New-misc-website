import { Request, Response } from "express";
import mongoose from "mongoose";
import { Blog } from "../models/Blog";

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 20, 1), 100);
    const skip = (page - 1) * limit;

    const filter: any = {};

    // Search by title or slug
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search as string, "i");
      filter.$or = [{ title: searchRegex }, { slug: searchRegex }, { excerpt: searchRegex }];
    }

    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filter by publication status
    if (req.query.status === "published") {
      filter.isPublished = true;
    } else if (req.query.status === "draft") {
      filter.isPublished = false;
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ publishDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-contentHtml") // Exclude full HTML body from listing for performance
        .lean(),
      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogByIdOrSlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const identifier = String(req.params.identifier);
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    const blog = await Blog.findOne(
      isObjectId ? { $or: [{ _id: identifier }, { slug: identifier }] } : { slug: identifier }
    );

    if (!blog) {
      res.status(404).json({ success: false, message: "Blog article not found." });
      return;
    }

    // Increment views counter if viewed
    await Blog.updateOne({ _id: blog._id }, { $inc: { viewsCount: 1 } });

    res.status(200).json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, contentHtml, excerpt, featuredImage, category, author, publishDate, tags, seoTitle, seoDescription, seoKeywords, isPublished } = req.body;

    if (!title || !slug || !contentHtml) {
      res.status(400).json({
        success: false,
        message: "Title, slug, and full rich content body are required.",
      });
      return;
    }

    // Check slug collision
    const existing = await Blog.findOne({ slug: slug.trim() });
    if (existing) {
      res.status(409).json({
        success: false,
        message: `A blog article with slug '${slug}' already exists. Please choose a unique slug.`,
      });
      return;
    }

    const blog = await Blog.create({
      title,
      slug: slug.trim(),
      excerpt,
      contentHtml,
      featuredImage,
      category: category || "Digital Marketing",
      author: author || "MiscArchive Team",
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      tags: Array.isArray(tags) ? tags : [],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      seoKeywords: Array.isArray(seoKeywords) ? seoKeywords : [],
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, message: "Blog article created.", data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // If slug is being updated, verify uniqueness
    if (req.body.slug) {
      const existing = await Blog.findOne({
        slug: req.body.slug.trim(),
        _id: { $ne: id },
      });
      if (existing) {
        res.status(409).json({
          success: false,
          message: `Slug '${req.body.slug}' is already taken by another article.`,
        });
        return;
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      res.status(404).json({ success: false, message: "Blog article not found." });
      return;
    }

    res.status(200).json({ success: true, message: "Blog article updated.", data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: "Blog article not found." });
      return;
    }
    res.status(200).json({ success: true, message: "Blog article deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
