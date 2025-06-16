import React, { useState, useEffect } from "react";
import TruckCard from "./TruckCard";

// Mock data for commercial trucks
const trucksData = [
  {
    id: 1,
    make: "Peterbilt",
    year: "2023",
    model: "579",
    image: "/assets/img/trucks/peterbilt-579-custom.jpg",
    title: "Custom Peterbilt 579",
    description:
      "Full custom paint job with performance exhaust and interior upgrade",
    features: ["Custom Paint", "Performance Exhaust", "Interior Upgrade"],
    status: "Completed",
    category: "Long Haul",
  },
  {
    id: 2,
    make: "Kenworth",
    year: "2022",
    model: "W900",
    image: "/assets/img/trucks/kenworth-w900-custom.png",
    title: "Classic Kenworth W900",
    description:
      "Chrome package with custom lighting and polished aluminum wheels",
    features: ["Chrome Package", "Custom Lighting", "Polished Wheels"],
    status: "Completed",
    category: "Show Truck",
  },
  {
    id: 3,
    make: "Freightliner",
    year: "2024",
    model: "Cascadia",
    image: "/assets/img/trucks/freightliner-cascadia-custom.png",
    title: "Freightliner Cascadia Elite",
    description: "Aerodynamic modifications with fuel efficiency upgrades",
    features: ["Aero Mods", "Fuel Efficiency", "Custom Bumper"],
    status: "In Progress",
    category: "Efficiency",
  },
  {
    id: 4,
    make: "Volvo",
    year: "2023",
    model: "VNL",
    image: "/assets/img/trucks/volvo-vnl-custom.png",
    title: "Volvo VNL Custom Build",
    description: "Luxury sleeper conversion with high-end entertainment system",
    features: ["Luxury Sleeper", "Entertainment", "Custom Interior"],
    status: "Completed",
    category: "Luxury",
  },
  {
    id: 5,
    make: "Mack",
    year: "2022",
    model: "Anthem",
    image: "/assets/img/trucks/mack-anthem-custom.png",
    title: "Mack Anthem Power Build",
    description: "Performance engine tuning with heavy-duty suspension upgrade",
    features: ["Engine Tuning", "HD Suspension", "Custom Grille"],
    status: "Completed",
    category: "Performance",
  },
  {
    id: 6,
    make: "International",
    year: "2023",
    model: "LT",
    image: "/assets/img/trucks/international-lt-custom.png",
    title: "International LT Custom",
    description: "Complete exterior makeover with LED light package",
    features: ["Exterior Makeover", "LED Package", "Custom Mirrors"],
    status: "Completed",
    category: "Styling",
  },
  {
    id: 7,
    make: "Peterbilt",
    year: "2021",
    model: "389",
    image: "/assets/img/trucks/peterbilt-389-custom.png",
    title: "Peterbilt 389 Classic",
    description: "Traditional styling with modern performance enhancements",
    features: ["Traditional Style", "Modern Performance", "Custom Stack"],
    status: "Completed",
    category: "Classic",
  },
  {
    id: 8,
    make: "Kenworth",
    year: "2024",
    model: "T680",
    image: "/assets/img/trucks/kenworth-t680-custom.png",
    title: "Kenworth T680 Efficiency",
    description: "Fuel-efficient build with aerodynamic enhancements",
    features: ["Fuel Efficient", "Aero Enhanced", "Smart Technology"],
    status: "In Progress",
    category: "Efficiency",
  },
  {
    id: 9,
    make: "Peterbilt",
    year: "2023",
    model: "567",
    image: "/assets/img/trucks/peterbilt-567-custom.png",
    title: "Red Dragon Peterbilt",
    description:
      "Fire-themed custom paint with flame details and performance upgrades",
    features: ["Flame Paint", "Performance Upgrades", "Custom Interior"],
    status: "Completed",
    category: "Show Truck",
  },
  {
    id: 10,
    make: "Freightliner",
    year: "2022",
    model: "Columbia",
    image: "/assets/img/trucks/freightliner-columbia-custom.png",
    title: "Blue Thunder Columbia",
    description: "Electric blue finish with chrome accents and LED underglow",
    features: ["Electric Blue Paint", "Chrome Accents", "LED Underglow"],
    status: "Completed",
    category: "Show Truck",
  },
];

const TruckGrid = ({ filters = {} }) => {
  const [filteredTrucks, setFilteredTrucks] = useState(trucksData);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, make, status
  const [isLoading, setIsLoading] = useState(false);

  // Filter trucks based on selected filters
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      let filtered = trucksData;

      // Apply name filter (search in title and description)
      if (filters.name && filters.name.trim() !== "") {
        const searchTerm = filters.name.toLowerCase().trim();
        filtered = filtered.filter(
          (truck) =>
            truck.title.toLowerCase().includes(searchTerm) ||
            truck.description.toLowerCase().includes(searchTerm) ||
            truck.make.toLowerCase().includes(searchTerm) ||
            truck.model.toLowerCase().includes(searchTerm) ||
            truck.category.toLowerCase().includes(searchTerm) ||
            (truck.features &&
              truck.features.some((feature) =>
                feature.toLowerCase().includes(searchTerm)
              ))
        );
      }

      // Apply make filter
      if (filters.make && filters.make !== "") {
        filtered = filtered.filter(
          (truck) => truck.make.toLowerCase() === filters.make.toLowerCase()
        );
      }

      // Apply year filter
      if (filters.year && filters.year !== "") {
        filtered = filtered.filter((truck) => truck.year === filters.year);
      }

      // Sort results
      switch (sortBy) {
        case "newest":
          filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
          break;
        case "oldest":
          filtered.sort((a, b) => parseInt(a.year) - parseInt(b.year));
          break;
        case "make":
          filtered.sort((a, b) => a.make.localeCompare(b.make));
          break;
        case "status":
          filtered.sort((a, b) => a.status.localeCompare(b.status));
          break;
        default:
          break;
      }

      setFilteredTrucks(filtered);
      setIsLoading(false);
    }, 300); // Reduced delay for better responsiveness with search

    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Helper function to get filter description
  const getFilterDescription = () => {
    const activeFilters = [];

    if (filters.name && filters.name.trim() !== "") {
      activeFilters.push(`searching for "${filters.name}"`);
    }
    if (filters.make && filters.make !== "") {
      activeFilters.push(`${filters.make} trucks`);
    }
    if (filters.year && filters.year !== "") {
      activeFilters.push(`from ${filters.year}`);
    }

    if (activeFilters.length === 0) {
      return "Showing all our custom truck builds";
    }

    return `Showing ${activeFilters.join(", ")}`;
  };

  return (
    <div className="truck-grid">
      {/* Results Header */}
      <div className="truck-grid-header" data-aos="fade-up">
        <div className="results-info">
          <h3 className="results-count">
            {isLoading
              ? "Searching..."
              : `${filteredTrucks.length} Truck${
                  filteredTrucks.length !== 1 ? "s" : ""
                } Found`}
          </h3>
          <p className="results-description">{getFilterDescription()}</p>
        </div>

        <div className="grid-controls">
          {/* Sort Dropdown */}
          <div className="sort-control">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="make">Make (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => handleViewModeChange("grid")}
              title="Grid View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => handleViewModeChange("list")}
              title="List View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <line
                  x1="8"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="8"
                  y1="12"
                  x2="21"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="8"
                  y1="18"
                  x2="21"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="6"
                  x2="3.01"
                  y2="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="12"
                  x2="3.01"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="3"
                  y1="18"
                  x2="3.01"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="ak-height-50 ak-height-lg-30"></div>

      {/* Loading State */}
      {isLoading && (
        <div className="loading-state" data-aos="fade-up">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <p>Searching trucks...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredTrucks.length === 0 && (
        <div className="empty-state" data-aos="fade-up">
          <div className="empty-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3>No trucks found</h3>
          <p>
            {filters.name && filters.name.trim() !== ""
              ? `No results found for "${filters.name}". Try a different search term.`
              : filters.make || filters.year
              ? "Try adjusting your filters to see more results"
              : "No trucks available at the moment"}
          </p>
        </div>
      )}

      {/* Trucks Grid/List */}
      {!isLoading && filteredTrucks.length > 0 && (
        <div
          className={`trucks-container ${
            viewMode === "list" ? "list-view" : "grid-view"
          }`}
        >
          {filteredTrucks.map((truck, index) => (
            <div
              key={truck.id}
              className="truck-item"
              data-aos="fade-up"
              data-aos-delay={index < 6 ? index * 100 : 0}
            >
              <TruckCard truck={truck} viewMode={viewMode} />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {!isLoading &&
        filteredTrucks.length > 0 &&
        filteredTrucks.length >= 8 && (
          <div className="load-more-section" data-aos="fade-up">
            <button className="btn-load-more">
              <span>Load More Trucks</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5V19M5 12L12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
    </div>
  );
};

export default TruckGrid;
