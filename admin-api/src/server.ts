import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { seedInitialAdmin } from "./utils/seedAdmin";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialAdmin();

    app.listen(PORT, () => {
      console.log(`[Admin API] Server listening on http://localhost:${PORT}`);
      console.log(`[Admin API] Health check at http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("[Admin API] Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
