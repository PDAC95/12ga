import express from "express";
import { body, param, query, validationResult } from "express-validator";
import Video from "../models/Video.js";

const router = express.Router();

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }
  next();
};

// GET /api/videos - Get all videos with filtering
router.get("/", async (req, res) => {
  try {
    const {
      category,
      type,
      featured,
      truckSlug,
      limit = 50,
      page = 1,
    } = req.query;

    // Build filter object
    const filter = { active: true };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (featured === "true") filter.featured = true;
    if (truckSlug) filter.truckSlug = truckSlug;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get videos with filters
    const videos = await Video.find(filter)
      .sort({ publishDate: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();

    // Get total count for pagination
    const total = await Video.countDocuments(filter);

    res.json({
      success: true,
      data: videos,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: videos.length,
        totalVideos: total,
      },
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching videos",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// GET /api/videos/featured - Get featured videos
router.get("/featured", async (req, res) => {
  try {
    const videos = await Video.getFeatured();

    res.json({
      success: true,
      data: videos,
      count: videos.length,
    });
  } catch (error) {
    console.error("Error fetching featured videos:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured videos",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// GET /api/videos/categories - Get available categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Video.distinct("category", { active: true });

    res.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// GET /api/videos/by-truck/:slug - Get videos for a specific truck
router.get(
  "/by-truck/:slug",
  [param("slug").notEmpty().trim().escape()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { slug } = req.params;
      const videos = await Video.getByTruckSlug(slug);

      res.json({
        success: true,
        data: videos,
        count: videos.length,
        truckSlug: slug,
      });
    } catch (error) {
      console.error("Error fetching videos by truck:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching videos for truck",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// GET /api/videos/:id - Get single video by ID
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid video ID")],
  handleValidationErrors,
  async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);

      if (!video || !video.active) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      res.json({
        success: true,
        data: video,
      });
    } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching video",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// POST /api/videos - Create new video (for future admin use)
router.post(
  "/",
  [
    body("title").notEmpty().trim().escape(),
    body("description").notEmpty().trim().escape(),
    body("videoUrl").isURL().withMessage("Video URL must be valid"),
    body("thumbnail").notEmpty().trim(),
    body("category").isIn([
      "Build Process",
      "Installation",
      "Performance",
      "Paint Work",
      "Interior",
      "Lighting",
      "Product Showcase",
    ]),
    body("type").isIn(["truck_project", "product_showcase"]),
    body("truckSlug").optional().trim().toLowerCase(),
    body("duration")
      .optional()
      .matches(/^\d{1,2}:\d{2}$/),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const video = new Video(req.body);
      await video.save();

      res.status(201).json({
        success: true,
        message: "Video created successfully",
        data: video,
      });
    } catch (error) {
      console.error("Error creating video:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }

      res.status(500).json({
        success: false,
        message: "Error creating video",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// PUT /api/videos/:id - Update video (for future admin use)
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid video ID"),
    body("title").optional().notEmpty().trim().escape(),
    body("description").optional().notEmpty().trim().escape(),
    body("videoUrl").optional().isURL(),
    body("thumbnail").optional().notEmpty().trim(),
    body("category")
      .optional()
      .isIn([
        "Build Process",
        "Installation",
        "Performance",
        "Paint Work",
        "Interior",
        "Lighting",
        "Product Showcase",
      ]),
    body("type").optional().isIn(["truck_project", "product_showcase"]),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!video) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      res.json({
        success: true,
        message: "Video updated successfully",
        data: video,
      });
    } catch (error) {
      console.error("Error updating video:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }

      res.status(500).json({
        success: false,
        message: "Error updating video",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// DELETE /api/videos/:id - Soft delete video (for future admin use)
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid video ID")],
  handleValidationErrors,
  async (req, res) => {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      );

      if (!video) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      res.json({
        success: true,
        message: "Video deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting video",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

export default router;
