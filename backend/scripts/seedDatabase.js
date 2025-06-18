import mongoose from "mongoose";
import dotenv from "dotenv";
import Truck from "../models/Truck.js";

// Load environment variables
dotenv.config();

// Sample trucks data to insert
const sampleTrucks = [
  {
    make: "Peterbilt",
    year: "2023",
    model: "579",
    image: "/assets/img/trucks/peterbilt-579-custom.jpg",
    title: "Custom Peterbilt 579 Elite Build",
    description:
      "A masterpiece of engineering and aesthetics. This Peterbilt 579 underwent a complete transformation featuring premium paint work, performance exhaust system, and luxury interior upgrades. Every detail has been meticulously crafted to deliver both stunning visual impact and enhanced functionality.",
    features: [
      "Custom Metallic Paint Job",
      "Performance Exhaust System",
      "Premium Interior Upgrade",
      "LED Lighting Package",
      "Chrome Accent Package",
      "Custom Bumper & Grille",
    ],
    category: "Long Haul",
    status: "Completed",
    specifications: {
      engine: "PACCAR MX-13",
      transmission: "Eaton Fuller 18-Speed",
      horsepower: "500 HP",
      torque: "1,850 lb-ft",
    },
    gallery: [
      "/assets/img/trucks/peterbilt-579-custom.jpg",
      "/assets/img/trucks/peterbilt-579-front.jpg",
      "/assets/img/trucks/peterbilt-579-side.jpg",
      "/assets/img/trucks/peterbilt-579-interior.jpg",
      "/assets/img/trucks/peterbilt-579-engine.jpg",
      "/assets/img/trucks/peterbilt-579-rear.jpg",
    ],
    projectDetails: {
      duration: "6 weeks",
      client: "TransLogistics Corp",
      completedDate: "March 2024",
    },
    featured: true,
    active: true,
    sliderConfig: {
      isSliderItem: true,
      heroTitle: "PREMIUM BUILDS",
      heroSubtitle: "Crafting Excellence",
      heroDescription:
        "Discover our premium custom truck builds where engineering meets artistry",
      heroImage: "/assets/img/trucks/truck-hero-1.jpg",
      sliderOrder: 1,
    },
  },
  {
    make: "Kenworth",
    year: "2022",
    model: "W900",
    image: "/assets/img/trucks/kenworth-w900-custom.png",
    title: "Classic Kenworth W900 Chrome Edition",
    description:
      "A tribute to the golden age of trucking with modern performance. This W900 features our signature chrome package, custom lighting system, and polished aluminum wheels that make it a true head-turner on any highway.",
    features: [
      "Premium Chrome Package",
      "Custom LED Lighting System",
      "Polished Aluminum Wheels",
      "Luxury Leather Interior",
      "Sound System Upgrade",
      "Custom Dashboard",
    ],
    category: "Show Truck",
    status: "Completed",
    specifications: {
      engine: "Cummins X15",
      transmission: "Eaton Fuller 13-Speed",
      horsepower: "565 HP",
      torque: "2,050 lb-ft",
    },
    gallery: [
      "/assets/img/trucks/kenworth-w900-custom.png",
      "/assets/img/trucks/kenworth-w900-chrome.jpg",
      "/assets/img/trucks/kenworth-w900-lights.jpg",
      "/assets/img/trucks/kenworth-w900-wheels.jpg",
      "/assets/img/trucks/kenworth-w900-cabin.jpg",
    ],
    projectDetails: {
      duration: "8 weeks",
      client: "Miller Transport",
      completedDate: "January 2024",
    },
    featured: true,
    active: true,
    sliderConfig: {
      isSliderItem: true,
      heroTitle: "PREMIUM BUILDS",
      heroSubtitle: "Crafting Excellence",
      heroDescription:
        "Discover our premium custom truck builds where engineering meets artistry",
      heroImage: "/assets/img/trucks/truck-hero-1.jpg",
      sliderOrder: 1,
    },
  },
  {
    make: "Freightliner",
    year: "2024",
    model: "Cascadia",
    image: "/assets/img/trucks/freightliner-cascadia-custom.png",
    title: "Freightliner Cascadia Elite Performance",
    description:
      "The future of trucking optimization. Featuring advanced aerodynamic modifications, fuel efficiency upgrades, and smart technology integration for maximum performance and minimal environmental impact.",
    features: [
      "Aerodynamic Body Kit",
      "Fuel Efficiency Upgrades",
      "Smart Technology Integration",
      "Custom Dashboard Display",
      "Advanced Safety Systems",
      "Eco-Friendly Modifications",
    ],
    category: "Efficiency",
    status: "In Progress",
    specifications: {
      engine: "Detroit DD15",
      transmission: "Detroit DT12",
      horsepower: "505 HP",
      torque: "1,750 lb-ft",
    },
    gallery: [
      "/assets/img/trucks/freightliner-cascadia-custom.png",
      "/assets/img/trucks/freightliner-cascadia-aero.jpg",
      "/assets/img/trucks/freightliner-cascadia-tech.jpg",
      "/assets/img/trucks/freightliner-cascadia-dashboard.jpg",
    ],
    projectDetails: {
      duration: "10 weeks",
      client: "EcoFleet Solutions",
      completedDate: "In Progress",
    },
    featured: false,
    active: true,
    sliderConfig: {
      isSliderItem: true,
      heroTitle: "PREMIUM BUILDS",
      heroSubtitle: "Crafting Excellence",
      heroDescription:
        "Discover our premium custom truck builds where engineering meets artistry",
      heroImage: "/assets/img/trucks/truck-hero-1.jpg",
      sliderOrder: 1,
    },
  },
  {
    make: "Volvo",
    year: "2023",
    model: "VNL",
    image: "/assets/img/trucks/volvo-vnl-custom.png",
    title: "Volvo VNL Luxury Sleeper Build",
    description:
      "Transform your long hauls into luxury experiences. This Volvo VNL features a complete sleeper conversion with premium materials, entertainment system, and comfort upgrades that make the road feel like home.",
    features: [
      "Luxury Sleeper Conversion",
      "Premium Entertainment System",
      "Custom Interior Design",
      "Climate Control Upgrade",
      "Memory Foam Mattress",
      "LED Ambient Lighting",
    ],
    category: "Luxury",
    status: "Completed",
    specifications: {
      engine: "Volvo D13",
      transmission: "Volvo I-Shift",
      horsepower: "455 HP",
      torque: "1,750 lb-ft",
    },
    gallery: [
      "/assets/img/trucks/volvo-vnl-custom.png",
      "/assets/img/trucks/volvo-vnl-interior.jpg",
      "/assets/img/trucks/volvo-vnl-sleeper.jpg",
      "/assets/img/trucks/volvo-vnl-entertainment.jpg",
    ],
    projectDetails: {
      duration: "5 weeks",
      client: "Highway Express",
      completedDate: "February 2024",
    },
    featured: false,
    active: true,
  },
  {
    make: "Mack",
    year: "2022",
    model: "Anthem",
    image: "/assets/img/trucks/mack-anthem-custom.png",
    title: "Mack Anthem Power Build",
    description:
      "Built for power and performance. This Mack Anthem received engine tuning, heavy-duty suspension upgrades, and custom styling that matches its incredible performance capabilities.",
    features: [
      "Engine Performance Tuning",
      "Heavy-Duty Suspension",
      "Custom Grille Design",
      "Performance Exhaust",
      "Reinforced Frame",
      "Custom Paint Scheme",
    ],
    category: "Performance",
    status: "Completed",
    specifications: {
      engine: "Mack MP8",
      transmission: "Mack mDRIVE",
      horsepower: "505 HP",
      torque: "1,860 lb-ft",
    },
    gallery: [
      "/assets/img/trucks/mack-anthem-custom.png",
      "/assets/img/trucks/mack-anthem-engine.jpg",
      "/assets/img/trucks/mack-anthem-suspension.jpg",
      "/assets/img/trucks/mack-anthem-grille.jpg",
    ],
    projectDetails: {
      duration: "7 weeks",
      client: "Power Logistics",
      completedDate: "December 2023",
    },
    featured: false,
    active: true,
  },
];

// Database seeding function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to MongoDB
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/twelve-ga-customs";
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing trucks (optional - comment out if you want to keep existing data)
    await Truck.deleteMany({});
    console.log("🗑️ Cleared existing trucks");

    // Insert sample trucks
    const insertedTrucks = await Truck.insertMany(sampleTrucks);
    console.log(`📦 Inserted ${insertedTrucks.length} trucks successfully`);

    // Display inserted trucks info
    insertedTrucks.forEach((truck, index) => {
      console.log(
        `   ${index + 1}. ${truck.year} ${truck.make} ${truck.model} - ${
          truck.status
        }`
      );
    });

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("📊 Database connection closed");
    process.exit(0);
  }
};

// Run the seeding if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase();
}

export default seedDatabase;
