import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const basename = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExtensions = /jpeg|jpg|png|gif|webp|svg|ico|pdf|avif/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const mime = file.mimetype.toLowerCase();

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/avif",
    "application/pdf",
  ];

  if (allowedExtensions.test(ext) && (allowedMimeTypes.includes(mime) || mime.startsWith("image/"))) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only high-resolution images (JPG, PNG, WebP, AVIF, SVG, GIF) and PDFs under 10 MB are permitted."));
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Enforce 10 MB upload limit
  fileFilter,
});

