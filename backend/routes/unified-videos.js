import express from "express";
import { query, validationResult } from "express-validator";
import Truck from "../models/Truck.js";
import Video from "../models/Video.js";

const router = express.Router();

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

// GET /api/unified-videos - Get all videos from both trucks and videos collections
router.get(
  "/",
  [
    query("category").optional().trim().escape(),
    query("featured").optional().isBoolean(),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("page").optional().isInt({ min: 1 }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { category, featured, limit = 50, page = 1 } = req.query;

      // Build filter objects
      let truckFilter = { active: true, hasVideo: true };
      let videoFilter = { active: true };

      if (category) {
        truckFilter.category = category;
        videoFilter.category = category;
      }

      if (featured !== undefined) {
        truckFilter.featured = featured === "true";
        videoFilter.featured = featured === "true";
      }

      // Fetch trucks with videos and standalone videos in parallel
      const [trucksWithVideos, standaloneVideos] = await Promise.all([
        Truck.find(truckFilter)
          .select(
            "_id make year model title description category videoUrl image gallery slug createdAt featured"
          )
          .lean(),
        Video.find(videoFilter).sort({ publishDate: -1 }).lean(),
      ]);

      // Transform trucks to video format
      const transformedTrucks = trucksWithVideos.map((truck) => ({
        _id: truck._id,
        title: truck.title,
        description: truck.description,
        videoUrl: truck.videoUrl,
        thumbnail: truck.image,
        duration: "N/A", // Trucks don't have duration field
        category: truck.category,
        type: "truck_project",
        truckSlug: truck.slug,
        publishDate: truck.createdAt,
        views: "N/A", // Trucks don't have views field
        likes: "N/A", // Trucks don't have likes field
        tags: [truck.make, truck.year, truck.model],
        featured: truck.featured,
        active: true,
        source: "truck", // Helper field to identify source
      }));

      // Add source field to standalone videos
      const transformedVideos = standaloneVideos.map((video) => ({
        ...video,
        source: "video",
      }));

      // Combine and sort all videos by publishDate
      const allVideos = [...transformedTrucks, ...transformedVideos].sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );

      // Apply pagination
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      const paginatedVideos = allVideos.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: paginatedVideos,
        pagination: {
          total: allVideos.length,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(allVideos.length / parseInt(limit)),
          trucksCount: transformedTrucks.length,
          videosCount: transformedVideos.length,
        },
      });
    } catch (error) {
      console.error("Error fetching unified videos:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching videos",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// GET /api/unified-videos/categories - Get available categories from both collections
router.get("/categories", async (req, res) => {
  try {
    const [truckCategories, videoCategories] = await Promise.all([
      Truck.distinct("category", { active: true, hasVideo: true }),
      Video.distinct("category", { active: true }),
    ]);

    // Combine and deduplicate categories
    const allCategories = [
      ...new Set([...truckCategories, ...videoCategories]),
    ];

    res.json({
      success: true,
      data: allCategories,
      count: allCategories.length,
    });
  } catch (error) {
    console.error("Error fetching video categories:", error);
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

export default router;
