import { Request, Response } from "express";
import { WebsiteSettings } from "../models/WebsiteSettings";

export const getSettings = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch website settings.",
      error: error.message,
    });
  }
};

export const updateSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    const updated = await settings.save();
    res.status(200).json({
      success: true,
      message: "Website settings saved successfully.",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update website settings.",
      error: error.message,
    });
  }
};
