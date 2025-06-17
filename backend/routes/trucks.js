import express from "express";
import { body, param, query, validationResult } from "express-validator";
import Truck from "../models/Truck.js";

const router = express.Router();

// Helper function to handle validation errors
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

// GET /api/trucks - Get all trucks with optional filtering
router.get(
  "/",
  [
    query("make").optional().trim().escape(),
    query("year").optional().trim().escape(),
    query("category").optional().trim().escape(),
    query("status").optional().trim().escape(),
    query("featured").optional().isBoolean(),
    query("search").optional().trim().escape(),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("page").optional().isInt({ min: 1 }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        make,
        year,
        category,
        status,
        featured,
        search,
        limit = 10,
        page = 1,
      } = req.query;

      // Build filter object
      let filter = { active: true };

      if (make) filter.make = new RegExp(make, "i");
      if (year) filter.year = year;
      if (category) filter.category = category;
      if (status) filter.status = status;
      if (featured !== undefined) filter.featured = featured === "true";

      // Handle search across multiple fields
      if (search) {
        const searchRegex = new RegExp(search, "i");
        filter.$or = [
          { title: searchRegex },
          { make: searchRegex },
          { model: searchRegex },
          { description: searchRegex },
        ];
      }

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute query with pagination
      const trucks = await Truck.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination
      const total = await Truck.countDocuments(filter);

      res.json({
        success: true,
        data: trucks,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      console.error("Error fetching trucks:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching trucks",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// GET /api/trucks/featured - Get featured trucks
router.get("/featured", async (req, res) => {
  try {
    const trucks = await Truck.getFeatured();

    res.json({
      success: true,
      data: trucks,
    });
  } catch (error) {
    console.error("Error fetching featured trucks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured trucks",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// GET /api/trucks/:id - Get single truck by ID
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid truck ID")],
  handleValidationErrors,
  async (req, res) => {
    try {
      const truck = await Truck.findById(req.params.id).lean();

      if (!truck) {
        return res.status(404).json({
          success: false,
          message: "Truck not found",
        });
      }

      if (!truck.active) {
        return res.status(404).json({
          success: false,
          message: "Truck not available",
        });
      }

      res.json({
        success: true,
        data: truck,
      });
    } catch (error) {
      console.error("Error fetching truck:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching truck",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// POST /api/trucks - Create new truck (for future admin use)
router.post(
  "/",
  [
    body("make").notEmpty().trim().escape().withMessage("Make is required"),
    body("year")
      .notEmpty()
      .trim()
      .isLength({ min: 4, max: 4 })
      .withMessage("Year must be 4 digits"),
    body("model").notEmpty().trim().escape().withMessage("Model is required"),
    body("title").notEmpty().trim().escape().withMessage("Title is required"),
    body("description")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Description is required"),
    body("image").notEmpty().trim().withMessage("Main image is required"),
    body("category")
      .isIn([
        "Long Haul",
        "Show Truck",
        "Efficiency",
        "Performance",
        "Luxury",
        "Classic",
      ])
      .withMessage("Invalid category"),
    body("status")
      .optional()
      .isIn(["Completed", "In Progress", "Planning"])
      .withMessage("Invalid status"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const truck = new Truck(req.body);
      const savedTruck = await truck.save();

      res.status(201).json({
        success: true,
        message: "Truck created successfully",
        data: savedTruck,
      });
    } catch (error) {
      console.error("Error creating truck:", error);

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
        message: "Error creating truck",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// PUT /api/trucks/:id - Update truck (for future admin use)
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid truck ID"),
    body("make").optional().notEmpty().trim().escape(),
    body("year").optional().notEmpty().trim().isLength({ min: 4, max: 4 }),
    body("model").optional().notEmpty().trim().escape(),
    body("title").optional().notEmpty().trim().escape(),
    body("description").optional().notEmpty().trim().escape(),
    body("category")
      .optional()
      .isIn([
        "Long Haul",
        "Show Truck",
        "Efficiency",
        "Performance",
        "Luxury",
        "Classic",
      ]),
    body("status").optional().isIn(["Completed", "In Progress", "Planning"]),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!truck) {
        return res.status(404).json({
          success: false,
          message: "Truck not found",
        });
      }

      res.json({
        success: true,
        message: "Truck updated successfully",
        data: truck,
      });
    } catch (error) {
      console.error("Error updating truck:", error);

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
        message: "Error updating truck",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

// DELETE /api/trucks/:id - Soft delete truck (for future admin use)
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid truck ID")],
  handleValidationErrors,
  async (req, res) => {
    try {
      const truck = await Truck.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      );

      if (!truck) {
        return res.status(404).json({
          success: false,
          message: "Truck not found",
        });
      }

      res.json({
        success: true,
        message: "Truck deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting truck:", error);
      res.status(500).json({
        success: false,
        message: "Error deleting truck",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
);

export default router;
