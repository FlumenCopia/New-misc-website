import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";

// Import route modules
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import bannersRoutes from "./routes/bannersRoutes";
import servicesRoutes from "./routes/servicesRoutes";
import subServicesRoutes from "./routes/subServicesRoutes";
import clientLogosRoutes from "./routes/clientLogosRoutes";
import teamMembersRoutes from "./routes/teamMembersRoutes";
import testimonialsRoutes from "./routes/testimonialsRoutes";
import blogCategoriesRoutes from "./routes/blogCategoriesRoutes";
import blogsRoutes from "./routes/blogsRoutes";
import faqsRoutes from "./routes/faqsRoutes";
import careersRoutes from "./routes/careersRoutes";
import enquiriesRoutes from "./routes/enquiriesRoutes";
import mediaRoutes from "./routes/mediaRoutes";

const app: Application = express();

// Global Middleware
app.use(
  cors({
    origin: "*", // Configurable for production
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static uploads directory
const uploadDir = path.resolve(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadDir));

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "MiscArchive Admin API",
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/sub-services", subServicesRoutes);
app.use("/api/client-logos", clientLogosRoutes);
app.use("/api/team-members", teamMembersRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/blog-categories", blogCategoriesRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/careers", careersRoutes);
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/media", mediaRoutes);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
