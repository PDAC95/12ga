import React, { useState, useEffect } from "react";
import TruckSlider from "../components/Sliders/TruckSlider";
import TruckFilters from "../components/TruckFilters/TruckFilters";
import TruckGrid from "../components/TruckGrid/TruckGrid";

const TruckGallery = () => {
  const [filters, setFilters] = useState({
    make: "",
    year: "",
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Add data attribute to body for CSS targeting
  useEffect(() => {
    document.body.setAttribute("data-page", "truck-gallery");

    return () => {
      document.body.removeAttribute("data-page");
    };
  }, []);

  return (
    <div className="truck-gallery-page">
      {/* Hero Slider Section */}
      <div className="truck-slider-section">
        <TruckSlider />
      </div>

      {/* Filters and Grid Section */}
      <div className="truck-content-section">
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>

          {/* Filters Section */}
          <div className="truck-filters-section">
            <TruckFilters onFiltersChange={handleFiltersChange} />
          </div>

          <div className="ak-height-75 ak-height-lg-50"></div>

          {/* Results Grid Section */}
          <div className="truck-grid-section">
            <TruckGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckGallery;
