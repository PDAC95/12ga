import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Truck make is required"],
      trim: true,
      maxlength: [50, "Make cannot be more than 50 characters"],
    },
    year: {
      type: String,
      required: [true, "Truck year is required"],
      trim: true,
      match: [/^\d{4}$/, "Year must be a 4-digit number"],
    },
    model: {
      type: String,
      required: [true, "Truck model is required"],
      trim: true,
      maxlength: [100, "Model cannot be more than 100 characters"],
    },
    image: {
      type: String,
      required: [true, "Main image is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Truck title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [100, "Slug cannot be more than 100 characters"],
      match: [
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot be more than 2000 characters"],
    },
    features: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Feature cannot be more than 100 characters"],
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Long Haul",
          "Show Truck",
          "Efficiency",
          "Performance",
          "Luxury",
          "Classic",
        ],
        message:
          "Category must be one of: Long Haul, Show Truck, Efficiency, Performance, Luxury, Classic",
      },
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Completed", "In Progress", "Planning"],
        message: "Status must be one of: Completed, In Progress, Planning",
      },
      default: "Planning",
    },
    specifications: {
      engine: {
        type: String,
        trim: true,
        maxlength: [
          100,
          "Engine specification cannot be more than 100 characters",
        ],
      },
      transmission: {
        type: String,
        trim: true,
        maxlength: [
          100,
          "Transmission specification cannot be more than 100 characters",
        ],
      },
      horsepower: {
        type: String,
        trim: true,
        maxlength: [
          50,
          "Horsepower specification cannot be more than 50 characters",
        ],
      },
      torque: {
        type: String,
        trim: true,
        maxlength: [
          50,
          "Torque specification cannot be more than 50 characters",
        ],
      },
    },
    gallery: [
      {
        type: String,
        trim: true,
      },
    ],
    projectDetails: {
      duration: {
        type: String,
        trim: true,
        maxlength: [50, "Duration cannot be more than 50 characters"],
      },
      client: {
        type: String,
        trim: true,
        maxlength: [100, "Client name cannot be more than 100 characters"],
      },
      completedDate: {
        type: String,
        trim: true,
        maxlength: [50, "Completed date cannot be more than 50 characters"],
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    // Slider-specific fields
    sliderConfig: {
      isSliderItem: {
        type: Boolean,
        default: false,
        index: true, // For better query performance
      },
      heroTitle: {
        type: String,
        trim: true,
        maxlength: [100, "Hero title cannot be more than 100 characters"],
      },
      heroSubtitle: {
        type: String,
        trim: true,
        maxlength: [60, "Hero subtitle cannot be more than 60 characters"],
      },
      heroDescription: {
        type: String,
        trim: true,
        maxlength: [300, "Hero description cannot be more than 300 characters"],
      },
      heroImage: {
        type: String,
        trim: true,
      },
      sliderOrder: {
        type: Number,
        default: 0,
        min: [0, "Slider order cannot be negative"],
        max: [100, "Slider order cannot exceed 100"],
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
truckSchema.index({ make: 1, year: -1 });
truckSchema.index({ category: 1 });
truckSchema.index({ status: 1 });
truckSchema.index({ featured: -1, createdAt: -1 });

// Virtual for truck display name
truckSchema.virtual("displayName").get(function () {
  return `${this.year} ${this.make} ${this.model}`;
});

// Virtual for short description
truckSchema.virtual("shortDescription").get(function () {
  if (this.description.length <= 150) return this.description;
  return this.description.substring(0, 150) + "...";
});

// Pre-save middleware to update updatedAt
truckSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get featured trucks
truckSchema.statics.getFeatured = function () {
  return this.find({ featured: true, active: true })
    .sort({ createdAt: -1 })
    .limit(6);
};

// Static method to get trucks by category
truckSchema.statics.getByCategory = function (category) {
  return this.find({ category, active: true }).sort({ createdAt: -1 });
};

// Static method to search trucks
truckSchema.statics.search = function (searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return this.find({
    active: true,
    $or: [
      { title: regex },
      { make: regex },
      { model: regex },
      { description: regex },
    ],
  }).sort({ createdAt: -1 });
};

const Truck = mongoose.model("Truck", truckSchema);

export default Truck;
