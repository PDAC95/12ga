import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import routes
import trucksRoutes from "./routes/trucks.js";
import videosRoutes from "./routes/videos.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Middleware
app.use(helmet()); // Security headers
app.use(morgan("combined")); // Logging
app.use(limiter); // Rate limiting
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/twelve-ga-customs";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    console.log(`📍 Database: ${mongoose.connection.name}`);
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// MongoDB event listeners
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("❌ MongoDB error:", error);
});

// Basic health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Twelve GA Customs API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API routes
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Twelve GA Customs API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      trucks: "/api/trucks",
      videos: "/api/videos",
      products: "/api/products (coming soon)",
    },
  });
});

// Use routes
app.use("/api/trucks", trucksRoutes);
app.use("/api/videos", videosRoutes);

// TODO: Add more routes when ready
// import videosRoutes from './routes/videos.js';
// import productsRoutes from './routes/products.js';
// app.use('/api/videos', videosRoutes);
// app.use('/api/products', productsRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: ["/health", "/api", "/api/trucks"],
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);

  res.status(error.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error.message,
    timestamp: new Date().toISOString(),
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log("🚀 ====================================");
  console.log("🚛 Twelve GA Customs Backend Server");
  console.log("🚀 ====================================");
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API info: http://localhost:${PORT}/api`);
  console.log(`🔗 Trucks API: http://localhost:${PORT}/api/trucks`);
  console.log(`📅 Started at: ${new Date().toLocaleString()}`);
  console.log("🚀 ====================================");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("📊 MongoDB connection closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("📊 MongoDB connection closed");
    process.exit(0);
  });
});
