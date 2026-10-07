import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[API Error] ${req.method} ${req.url}:`, err);

  // Mongoose CastError (e.g. invalid ObjectId format)
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: `Invalid format for field: '${err.path}' with value: '${err.value}'`,
    });
    return;
  }

  // Mongoose ValidationError
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
    return;
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0] || "field";
    res.status(409).json({
      success: false,
      message: `Duplicate entry error: Value for '${duplicateField}' already exists.`,
    });
    return;
  }

  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode >= 400 ? statusCode : 500).json({
    success: false,
    message: err.message || "Internal server error occurred.",
  });
};
