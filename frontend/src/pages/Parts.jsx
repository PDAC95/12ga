import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

// Zone definitions with English names and colors
const zonesData = {
  frontal: {
    name: "Front",
    color: "#FF3D24",
    categories: [
      "GRILLES",
      "BUMPERS",
      "LIGHTS",
      "FLIP BUMPERS",
      "LIFT BUMPERS",
    ],
  },
  motor: {
    name: "Engine/Air System",
    color: "#FF8C24",
    categories: [
      "AIR CLEANER LIGHT BARS",
      "AIR CLEANER SCREENS",
      "AIR CLEANER STRAPS",
      "AIR CLEANER BAR STRAPLESS",
      "AIR CLEANER WRAPS",
      "DPF COVERS",
    ],
  },
  superior: {
    name: "Top/Cabin",
    color: "#FFD624",
    categories: [
      "VISORS",
      "OVERHEAD CONSOLES",
      "MIRROR BRACKETS",
      "LIGHT PANELS",
      "CAB AND COWL PANELS",
    ],
  },
  lateral: {
    name: "Side/Storage",
    color: "#24FF57",
    categories: [
      "FENDERS",
      "FENDER BRACES",
      "BATTERY/TOOL BOXES",
      "BATTERY/TOOL STEP PLATES",
      "FUEL TANK PANELS",
      "FUEL TANK STRAPS",
      "FUEL TANK WRAPS",
      "FUEL TANK BRACKET COVERS",
    ],
  },
  escape: {
    name: "Exhaust/Air",
    color: "#2489FF",
    categories: [
      "AIR TANK STRAPS",
      "AIR LINE BOX",
      "AIR RIDE GEN III",
      "SHOCK BOXES",
    ],
  },
  sleeper: {
    name: "Sleeper/Interior",
    color: "#8A24FF",
    categories: [
      "BUNK/SLEEPER PANELS",
      "CUSTOM FLOORS",
      "DECK PLATES",
      "WINDOW ACCESSORIES",
    ],
  },
  trasera: {
    name: "Rear/Accessories",
    color: "#24FFED",
    categories: [
      "TAIL LIGHT BARS",
      "ONE OFF CUSTOM PARTS",
      "APPAREL",
      "SAFETY MANUAL/WARRANTY",
    ],
  },
};

// Parts categories data with zone assignments
const categoriesData = [
  {
    id: 1,
    name: "AIR RIDE GEN III",
    slug: "air-ride-gen-iii",
    image: "/assets/img/parts/air-ride-gen-iii.png",
    zone: "escape",
    hotspot: { x: 21, y: 81 },
  },
  {
    id: 2,
    name: "AIR CLEANER LIGHT BARS",
    slug: "air-cleaner-light-bars",
    image: "/assets/img/parts/air-cleaner-light-bars.png",
    zone: "motor",
    hotspot: { x: 50, y: 53 },
  },
  {
    id: 3,
    name: "AIR CLEANER SCREENS",
    slug: "air-cleaner-screens",
    image: "/assets/img/parts/air-cleaner-screens.png",
    zone: "motor",
    hotspot: { x: 46, y: 60 },
  },
  {
    id: 4,
    name: "AIR CLEANER STRAPS",
    slug: "air-cleaner-straps",
    image: "/assets/img/parts/air-cleaner-straps.png",
    zone: "motor",
    hotspot: { x: 46, y: 55 },
  },
  {
    id: 5,
    name: "AIR CLEANER BAR STRAPLESS",
    slug: "air-cleaner-bar-strapless",
    image: "/assets/img/parts/air-cleaner-bar-strapless.png",
    zone: "motor",
    hotspot: { x: 46, y: 50 },
  },
  {
    id: 6,
    name: "AIR CLEANER WRAPS",
    slug: "air-cleaner-wraps",
    image: "/assets/img/parts/air-cleaner-wraps.png",
    zone: "motor",
    hotspot: { x: 46, y: 45 },
  },
  {
    id: 7,
    name: "AIR LINE BOX",
    slug: "air-line-box",
    image: "/assets/img/parts/air-line-box.png",
    zone: "escape",
    hotspot: { x: 20, y: 75 },
  },
  {
    id: 8,
    name: "AIR TANK STRAPS",
    slug: "air-tank-straps",
    image: "/assets/img/parts/air-tank-straps.png",
    zone: "escape",
    hotspot: { x: 24, y: 81 },
  },
  {
    id: 9,
    name: "BATTERY/TOOL BOXES",
    slug: "battery-tool-boxes",
    image: "/assets/img/parts/battery-tool-boxes.png",
    zone: "lateral",
    hotspot: { x: 41, y: 75 },
  },
  {
    id: 10,
    name: "BATTERY/TOOL STEP PLATES",
    slug: "battery-tool-step-plates",
    image: "/assets/img/parts/battery-tool-step-plates.png",
    zone: "lateral",
    hotspot: { x: 40, y: 80 },
  },
  {
    id: 11,
    name: "BUMPERS",
    slug: "bumpers",
    image: "/assets/img/parts/bumpers.png",
    zone: "frontal",
    hotspot: { x: 85, y: 81 },
  },
  {
    id: 12,
    name: "BUNK/SLEEPER PANELS",
    slug: "bunk-sleeper-panels",
    image: "/assets/img/parts/bunk-sleeper-panels.png",
    zone: "sleeper",
    hotspot: { x: 28, y: 45 },
  },
  {
    id: 13,
    name: "CAB AND COWL PANELS",
    slug: "cab-cowl-panels",
    image: "/assets/img/parts/cab-cowl-panels.png",
    zone: "superior",
    hotspot: { x: 52, y: 40 },
  },
  {
    id: 14,
    name: "CUSTOM FLOORS",
    slug: "custom-floors",
    image: "/assets/img/parts/custom-floors.png",
    zone: "sleeper",
    hotspot: { x: 40, y: 65 },
  },
  {
    id: 15,
    name: "DECK PLATES",
    slug: "deck-plates",
    image: "/assets/img/parts/deck-plates.png",
    zone: "sleeper",
    hotspot: { x: 22, y: 58 },
  },
  {
    id: 16,
    name: "DPF COVERS",
    slug: "dpf-covers",
    image: "/assets/img/parts/dpf-covers.png",
    zone: "motor",
    hotspot: { x: 45, y: 75 },
  },
  {
    id: 17,
    name: "FENDERS",
    slug: "fenders",
    image: "/assets/img/parts/fenders.png",
    zone: "lateral",
    hotspot: { x: 15, y: 65 },
  },
  {
    id: 18,
    name: "FENDER BRACES",
    slug: "fender-braces",
    image: "/assets/img/parts/fender-braces.png",
    zone: "lateral",
    hotspot: { x: 70, y: 72 },
  },
  {
    id: 19,
    name: "FLIP BUMPERS",
    slug: "flip-bumpers",
    image: "/assets/img/parts/flip-bumpers.png",
    zone: "frontal",
    hotspot: { x: 80, y: 82 },
  },
  {
    id: 20,
    name: "FUEL TANK BRACKET COVERS",
    slug: "fuel-tank-bracket-covers",
    image: "/assets/img/parts/fuel-tank-bracket-covers.png",
    zone: "lateral",
    hotspot: { x: 33, y: 70 },
  },
  {
    id: 21,
    name: "FUEL TANK PANELS",
    slug: "fuel-tank-panels",
    image: "/assets/img/parts/fuel-tank-panels.png",
    zone: "lateral",
    hotspot: { x: 32, y: 76 },
  },
  {
    id: 22,
    name: "FUEL TANK STRAPS",
    slug: "fuel-tank-straps",
    image: "/assets/img/parts/fuel-tank-straps.png",
    zone: "lateral",
    hotspot: { x: 27, y: 70 },
  },
  {
    id: 23,
    name: "FUEL TANK WRAPS",
    slug: "fuel-tank-wraps",
    image: "/assets/img/parts/fuel-tank-wraps.png",
    zone: "lateral",
    hotspot: { x: 26, y: 76 },
  },
  {
    id: 24,
    name: "GRILLES",
    slug: "grilles",
    image: "/assets/img/parts/grilles.png",
    zone: "frontal",
    hotspot: { x: 80, y: 61 },
  },
  {
    id: 25,
    name: "LIFT BUMPERS",
    slug: "lift-bumpers",
    image: "/assets/img/parts/lift-bumpers.png",
    zone: "frontal",
    hotspot: { x: 75, y: 83 },
  },
  {
    id: 26,
    name: "LIGHT PANELS",
    slug: "light-panels",
    image: "/assets/img/parts/light-panels.png",
    zone: "superior",
    hotspot: { x: 8, y: 71 },
  },
  {
    id: 27,
    name: "MIRROR BRACKETS",
    slug: "mirror-brackets",
    image: "/assets/img/parts/mirror-brackets.png",
    zone: "superior",
    hotspot: { x: 40, y: 36 },
  },
  {
    id: 28,
    name: "OVERHEAD CONSOLES",
    slug: "overhead-consoles",
    image: "/assets/img/parts/overhead-consoles.png",
    zone: "superior",
    hotspot: { x: 55, y: 36 },
  },
  {
    id: 29,
    name: "SHOCK BOXES",
    slug: "shock-boxes",
    image: "/assets/img/parts/shock-boxes.png",
    zone: "escape",
    hotspot: { x: 25, y: 60 },
  },
  {
    id: 30,
    name: "TAIL LIGHT BARS",
    slug: "tail-light-bars",
    image: "/assets/img/parts/tail-light-bars.png",
    zone: "trasera",
    hotspot: { x: 8, y: 65 },
  },
  {
    id: 31,
    name: "VISORS",
    slug: "visors",
    image: "/assets/img/parts/visors.png",
    zone: "superior",
    hotspot: { x: 58, y: 32 },
  },
  {
    id: 32,
    name: "WINDOW ACCESSORIES",
    slug: "window-accessories",
    image: "/assets/img/parts/window-accessories.png",
    zone: "sleeper",
    hotspot: { x: 43, y: 36 },
  },
  {
    id: 33,
    name: "LIGHTS",
    slug: "lights",
    image: "/assets/img/parts/lights.png",
    zone: "frontal",
    hotspot: { x: 55, y: 27 },
  },
];

// Vehicle data for search
const vehicleData = {
  years: [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ],
  makes: {
    2024: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2023: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2022: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2021: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2020: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2019: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2018: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2017: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2016: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
    2015: [
      "Peterbilt",
      "Kenworth",
      "Freightliner",
      "Mack",
      "Volvo",
      "International",
    ],
  },
  models: {
    Peterbilt: ["579", "389", "567", "520", "348"],
    Kenworth: ["T680", "W900", "T880", "T800", "T270"],
    Freightliner: ["Cascadia", "Columbia", "Century", "M2"],
    Mack: ["Anthem", "Granite", "Pinnacle", "TerraPro"],
    Volvo: ["VNL", "VHD", "VAH", "VED"],
    International: ["LT", "HX", "CV", "MV"],
  },
};

const Parts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [visualZoneFilter, setVisualZoneFilter] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categoriesData);
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [viewMode, setViewMode] = useState("areas");
  const [currentStep, setCurrentStep] = useState(1);
  const [openSteps, setOpenSteps] = useState({});

  // Load filters from URL parameters on component mount
  useEffect(() => {
    const year = searchParams.get("year");
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const category = searchParams.get("category");
    const zone = searchParams.get("zone");

    if (year || make || model || category || zone) {
      // Set filters from URL
      if (year) setSelectedYear(year);
      if (make) setSelectedMake(make);
      if (model) setSelectedModel(model);

      // Handle both category and zone parameters
      if (category) {
        const categoryItem = categoriesData.find(
          (cat) => cat.slug === category
        );
        if (categoryItem) {
          setSelectedZone(categoryItem.zone);
          setVisualZoneFilter(categoryItem.zone);
        }
      } else if (zone) {
        // Direct zone parameter from sidebar
        setSelectedZone(zone);
        setVisualZoneFilter(zone);
      }

      // Auto-open appropriate steps based on URL params
      const stepsToOpen = {};
      if (year) stepsToOpen[1] = false; // Close year step since it's selected
      if (make) stepsToOpen[2] = false; // Close make step since it's selected
      if (model) stepsToOpen[3] = false; // Close model step since it's selected

      setOpenSteps(stepsToOpen);

      // Apply filters - use zone directly if available, otherwise get zone from category
      const filterZone =
        zone ||
        (category
          ? categoriesData.find((cat) => cat.slug === category)?.zone || ""
          : "");
      filterCategories(year || "", make || "", model || "", filterZone);
    }
  }, [searchParams]);

  // Auto-scroll to search section when coming from sidebar
  useEffect(() => {
    const hasFiltersFromURL =
      searchParams.get("year") ||
      searchParams.get("make") ||
      searchParams.get("model") ||
      searchParams.get("zone") ||
      searchParams.get("category");

    if (hasFiltersFromURL) {
      // Small delay to ensure the page has rendered
      const timer = setTimeout(() => {
        const searchSection = document.querySelector(".parts-search-section");
        if (searchSection) {
          searchSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 500); // Aumenté el delay a 500ms para mejor estabilidad

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Update URL when filters change manually
  const updateURLParams = (year, make, model, zone) => {
    const params = new URLSearchParams();
    if (year) params.set("year", year);
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (zone) {
      // Use zone parameter directly instead of converting to category
      params.set("zone", zone);
    }

    setSearchParams(params);
  };

  // Fixed: Zone click handler to sync with legend buttons
  const handleVisualZoneClick = (zoneKey) => {
    setVisualZoneFilter(zoneKey);
    setSelectedZone(zoneKey); // Sync with legend filter state

    if (zoneKey) {
      const zoneCategories = categoriesData.filter(
        (cat) => cat.zone === zoneKey
      );
      setFilteredCategories(zoneCategories);
    } else {
      filterCategories(selectedYear, selectedMake, selectedModel, "");
    }

    // Update URL
    updateURLParams(selectedYear, selectedMake, selectedModel, zoneKey);
  };

  // Fixed: Zone change handler to sync with visual zones
  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
    setVisualZoneFilter(zone); // Sync with visual filter state
    filterCategories(selectedYear, selectedMake, selectedModel, zone);
    updateURLParams(selectedYear, selectedMake, selectedModel, zone);
  };

  // Fixed: Hover handlers with debouncing to prevent flickering
  const handleZoneMouseEnter = (zoneKey) => {
    // Clear any pending timeouts
    if (window.zoneHoverTimeout) {
      clearTimeout(window.zoneHoverTimeout);
    }
    setHoveredZone(zoneKey);
  };

  const handleZoneMouseLeave = () => {
    // Delay the hover state change to prevent flickering
    window.zoneHoverTimeout = setTimeout(() => {
      setHoveredZone(null);
    }, 100);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMake("");
    setSelectedModel("");
    setSelectedZone("");

    // Automatically advance to next step
    setCurrentStep(2);

    // Close current step and open next step
    setOpenSteps((prev) => ({
      ...prev,
      1: false, // Close year step
      2: true, // Open make step
    }));
    updateURLParams(year, "", "", "");
  };

  const handleStepToggle = (stepNumber) => {
    setOpenSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const handleMakeChange = (make) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedZone("");

    // Only advance to next step if we came from step progression
    // If user clicked directly on step 2, just close it
    if (selectedYear) {
      setCurrentStep(3);
      setOpenSteps((prev) => ({
        ...prev,
        2: false, // Close make step
        3: true, // Open model step
      }));
    } else {
      // User selected make directly, just close the step
      setOpenSteps((prev) => ({
        ...prev,
        2: false, // Close make step only
      }));
    }
    updateURLParams(selectedYear, make, "", "");
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedZone("");

    // Automatically advance to next step
    setCurrentStep(4);

    // Close current step and open next step
    setOpenSteps((prev) => ({
      ...prev,
      3: false, // Close model step
    }));
    updateURLParams(selectedYear, selectedMake, model, "");
  };

  const filterCategories = (year, make, model, zone) => {
    let filtered = categoriesData;

    // Filter by vehicle compatibility
    if (year && make && model) {
      // Simulate filtering based on vehicle compatibility
      const universalCategories = [
        "APPAREL",
        "SAFETY MANUAL/WARRANTY",
        "ONE OFF CUSTOM PARTS",
      ];
      filtered = filtered.filter((category) => {
        return (
          universalCategories.includes(category.name) || Math.random() > 0.3
        );
      });
    }

    // Filter by zone
    if (zone) {
      const zoneCategories = zonesData[zone]?.categories || [];
      filtered = filtered.filter((category) =>
        zoneCategories.includes(category.name)
      );
    }

    setFilteredCategories(filtered);
  };

  const resetSearch = () => {
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setSelectedZone("");
    setVisualZoneFilter("");
    setFilteredCategories(categoriesData);
    setSearchParams({}); // Clear URL parameters
  };

  const availableMakes = selectedYear
    ? vehicleData.makes[selectedYear] || []
    : [...new Set(Object.values(vehicleData.makes).flat())]; // All unique makes when no year selected
  const availableModels = selectedMake
    ? vehicleData.models[selectedMake] || []
    : [];

  const getFilterTitle = () => {
    if (visualZoneFilter) {
      return `${zonesData[visualZoneFilter].name} Parts`;
    }
    if (selectedYear && selectedMake && selectedModel) {
      const zoneText = selectedZone ? ` - ${zonesData[selectedZone].name}` : "";
      return `Compatible Parts for ${selectedYear} ${selectedMake} ${selectedModel}${zoneText}`;
    }
    if (selectedZone) {
      return `${zonesData[selectedZone].name} Parts`;
    }
    return "All Part Categories";
  };

  return (
    <div className="parts-container">
      <CommonPageHero title={"Parts Catalogue"} />
      <div className="container">
        <div className="ak-height-50 ak-height-lg-30"></div>

        {/* Interactive Truck Image */}
        <div className="truck-interactive-section" data-aos="fade-up">
          {/* View Mode Toggle */}
          <div className="view-mode-toggle" data-aos="fade-up">
            <h4>Choose your search method:</h4>
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${viewMode === "areas" ? "active" : ""}`}
                onClick={() => setViewMode("areas")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Search by Areas
              </button>
              <button
                className={`toggle-btn ${
                  viewMode === "hotspots" ? "active" : ""
                }`}
                onClick={() => setViewMode("hotspots")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="2" r="1" fill="currentColor" />
                  <circle cx="12" cy="22" r="1" fill="currentColor" />
                  <circle cx="20" cy="8" r="1" fill="currentColor" />
                  <circle cx="20" cy="16" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="16" r="1" fill="currentColor" />
                </svg>
                Search by Parts
              </button>
            </div>
          </div>

          <div className="truck-image-container">
            <img
              src="/assets/img/parts/truck-diagram.jpg"
              alt="Interactive Truck Parts Diagram"
              className="truck-diagram"
            />

            {/* Areas Mode - Magnifying glass SVG icons */}
            {viewMode === "areas" && (
              <>
                {Object.entries(zonesData).map(([zoneKey, zone]) => (
                  <div
                    key={zoneKey}
                    className={`zone-circle-container zone-${zoneKey}`}
                  >
                    <div
                      className={`zone-circle ${
                        visualZoneFilter === zoneKey ? "active" : ""
                      }`}
                      onClick={() =>
                        handleVisualZoneClick(
                          visualZoneFilter === zoneKey ? "" : zoneKey
                        )
                      }
                      onMouseEnter={() => handleZoneMouseEnter(zoneKey)}
                      onMouseLeave={handleZoneMouseLeave}
                    >
                      <svg
                        width="18"
                        height="18"
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

                    <div
                      className={`zone-overlay zone-${zoneKey} ${
                        visualZoneFilter === zoneKey ? "active" : ""
                      } ${hoveredZone === zoneKey ? "hovered" : ""}`}
                    >
                      <div className="zone-label">
                        <span>{zone.name}</span>
                        <small>{zone.categories.length} parts</small>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Hotspots Mode - Fixed tooltip always on hover */}
            {viewMode === "hotspots" && (
              <>
                {categoriesData
                  .filter((category) => category.hotspot)
                  .map((category) => (
                    <Link
                      key={category.id}
                      to={`/parts/${category.slug}`}
                      className="parts-hotspot"
                      style={{
                        left: `${category.hotspot.x}%`,
                        top: `${category.hotspot.y}%`,
                      }}
                    >
                      <div className="hotspot-indicator">
                        <div className="hotspot-pulse"></div>
                        <div className="hotspot-dot"></div>
                      </div>

                      <div className="hotspot-tooltip">
                        <span>{category.name}</span>
                      </div>
                    </Link>
                  ))}
              </>
            )}
          </div>

          {/* Instructions based on mode - Fixed */}
          <div
            className="mode-instructions"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {viewMode === "areas" ? (
              <>
                <h4>Click on circles to filter by truck area</h4>
                <div className="legend-items">
                  {Object.entries(zonesData).map(([zoneKey, zone]) => (
                    <button
                      key={zoneKey}
                      className={`legend-item ${
                        visualZoneFilter === zoneKey ? "active" : ""
                      }`}
                      onClick={() =>
                        handleVisualZoneClick(
                          visualZoneFilter === zoneKey ? "" : zoneKey
                        )
                      }
                    >
                      <span>{zone.name}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <h4>Click on any point to go directly to that part category</h4>
            )}
          </div>
        </div>

        {/* OR Separator */}
        <div className="or-separator" data-aos="fade-in">
          <div className="separator-line"></div>
          <span className="separator-text">OR</span>
          <div className="separator-line"></div>
        </div>

        {/* Horizontal Search Section */}
        <div
          className="parts-search-section"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3 className="search-title">Find Parts for Your Truck</h3>
          <p className="search-subtitle">
            Select your vehicle specifications to see compatible parts
          </p>

          <div className="search-steps">
            <div className="steps-container">
              {/* Step 1: Year */}
              <div className="search-step step-year">
                <div
                  className="step-header"
                  onClick={() => handleStepToggle(1)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="step-number">1</div>
                  <h4 className="step-title">Select Year</h4>
                </div>
                {openSteps[1] && (
                  <div className="step-options">
                    {vehicleData.years.map((year) => (
                      <button
                        key={year}
                        className={`option-btn ${
                          selectedYear === year ? "active" : ""
                        }`}
                        onClick={() => handleYearChange(year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 2: Make */}
              <div className="search-step step-make">
                <div
                  className="step-header"
                  onClick={() => handleStepToggle(2)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="step-number">2</div>
                  <h4 className="step-title">Select Make</h4>
                </div>
                {openSteps[2] && (
                  <div className="step-options">
                    {availableMakes.map((make) => (
                      <button
                        key={make}
                        className={`option-btn ${
                          selectedMake === make ? "active" : ""
                        }`}
                        onClick={() => handleMakeChange(make)}
                      >
                        {make}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 3: Model */}
              <div className="search-step step-model">
                <div
                  className="step-header"
                  onClick={() => handleStepToggle(3)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="step-number">3</div>
                  <h4 className="step-title">Select Model</h4>
                </div>
                {openSteps[3] && (
                  <div className="step-options">
                    {availableModels.map((model) => (
                      <button
                        key={model}
                        className={`option-btn ${
                          selectedModel === model ? "active" : ""
                        } ${!selectedMake ? "disabled" : ""}`}
                        onClick={() => selectedMake && handleModelChange(model)}
                        disabled={!selectedMake}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 4: Zone */}
              <div className="search-step step-zone">
                <div
                  className="step-header"
                  onClick={() => handleStepToggle(4)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="step-number">4</div>
                  <h4 className="step-title">Select Zone (Optional)</h4>
                </div>
                {openSteps[4] && (
                  <div className="step-options">
                    {Object.entries(zonesData).map(([zoneKey, zone]) => (
                      <button
                        key={zoneKey}
                        className={`option-btn ${
                          selectedZone === zoneKey ? "active" : ""
                        }`}
                        onClick={() =>
                          handleZoneChange(
                            selectedZone === zoneKey ? "" : zoneKey
                          )
                        }
                      >
                        {zone.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Selected Filters Display */}
            {(selectedYear ||
              selectedMake ||
              selectedModel ||
              selectedZone) && (
              <div className="selected-filters-display">
                <h4 className="filters-title">Current Selection:</h4>
                <div className="filters-list">
                  {selectedYear && (
                    <span className="filter-item">
                      <strong>Year:</strong> {selectedYear}
                    </span>
                  )}
                  {selectedMake && (
                    <span className="filter-item">
                      <strong>Make:</strong> {selectedMake}
                    </span>
                  )}
                  {selectedModel && (
                    <span className="filter-item">
                      <strong>Model:</strong> {selectedModel}
                    </span>
                  )}
                  {selectedZone && (
                    <span className="filter-item">
                      <strong>Zone:</strong> {zonesData[selectedZone].name}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Reset Button */}
            {(selectedYear ||
              selectedMake ||
              selectedModel ||
              selectedZone ||
              visualZoneFilter) && (
              <div className="search-reset">
                <button className="reset-btn" onClick={resetSearch}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 12A9 9 0 1 0 9 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 3L9 9L3 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="ak-height-50 ak-height-lg-30"></div>

        {/* Categories Grid */}
        <div
          className="categories-section"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="categories-header">
            <h3 className="categories-title">{getFilterTitle()}</h3>
            <p className="categories-count">
              {filteredCategories.length} categories available
            </p>
          </div>

          <div className="categories-grid">
            {filteredCategories.map((category, index) => (
              <Link
                key={category.id}
                to={`/parts/${category.slug}`}
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="category-info">
                  <h4 className="category-name">{category.name}</h4>
                  <span
                    className="category-zone"
                    style={{ "--zone-color": zonesData[category.zone]?.color }}
                  >
                    {zonesData[category.zone]?.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    </div>
  );
};

export default Parts;
