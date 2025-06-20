import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Video URL must be a valid URL",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
      match: [/^\d{1,2}:\d{2}$/, "Duration must be in format MM:SS or H:MM"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Full Builds",
          "Show Trucks",
          "Custom Fabrication",
          "Performance",
          "Interior & Details",
          "Installation",
        ],
        message: "Category must be one of the allowed values",
      },
    },
    type: {
      type: String,
      required: [true, "Video type is required"],
      enum: {
        values: ["truck_project", "product_showcase"],
        message: "Type must be either 'truck_project' or 'product_showcase'",
      },
      default: "truck_project",
    },

    // Connection to Truck via slug - only for truck_project type
    truckSlug: {
      type: String,
      trim: true,
      lowercase: true,
      index: true, // For better query performance
    },

    // Product details for product_showcase type
    productInfo: {
      productType: {
        type: String,
        trim: true,
        maxlength: [100, "Product type cannot be more than 100 characters"],
      },
      productName: {
        type: String,
        trim: true,
        maxlength: [200, "Product name cannot be more than 200 characters"],
      },
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: String,
      default: "0",
      match: [
        /^\d+(\.\d+)?[KM]?$/,
        "Views must be in format like '1.5K' or '500'",
      ],
    },
    likes: {
      type: String,
      default: "0",
      match: [
        /^\d+(\.\d+)?[KM]?$/,
        "Likes must be in format like '1.5K' or '500'",
      ],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot be more than 50 characters"],
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
videoSchema.index({ type: 1, active: 1 });
videoSchema.index({ truckSlug: 1 });
videoSchema.index({ category: 1 });
videoSchema.index({ featured: -1, publishDate: -1 });

// Pre-save validation middleware
videoSchema.pre("save", async function (next) {
  try {
    // Validate truck_project requirements
    if (this.type === "truck_project") {
      if (!this.truckSlug) {
        throw new Error("truckSlug is required for truck_project videos");
      }

      // Verify truck exists and is active
      const Truck = mongoose.model("Truck");
      const truck = await Truck.findOne({
        slug: this.truckSlug,
        active: true,
      });

      if (!truck) {
        throw new Error(
          `Truck with slug "${this.truckSlug}" does not exist or is not active`
        );
      }
    }

    // Validate product_showcase requirements
    if (this.type === "product_showcase") {
      if (!this.productInfo?.productType && !this.productInfo?.productName) {
        throw new Error("Product info is required for product_showcase videos");
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Static method to get videos by truck slug
videoSchema.statics.getByTruckSlug = function (truckSlug) {
  return this.find({
    truckSlug,
    type: "truck_project",
    active: true,
  }).sort({ publishDate: -1 });
};

// Static method to get featured videos
videoSchema.statics.getFeatured = function () {
  return this.find({
    featured: true,
    active: true,
  })
    .sort({ publishDate: -1 })
    .limit(6);
};

// Static method to get videos by category
videoSchema.statics.getByCategory = function (category) {
  return this.find({
    category,
    active: true,
  }).sort({ publishDate: -1 });
};

// Virtual for formatted duration
videoSchema.virtual("formattedDuration").get(function () {
  if (!this.duration) return "N/A";
  return this.duration;
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
