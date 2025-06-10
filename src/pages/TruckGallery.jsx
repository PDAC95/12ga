import React, { useState } from "react";
import TruckSlider from "../components/Sliders/TruckSlider";
import TruckFilters from "../components/TruckFilters/TruckFilters";
import TruckGrid from "../components/TruckGrid/TruckGrid";

const TruckGallery = () => {
  const [filters, setFilters] = useState({
    make: "",
    year: ""
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="truck-gallery-page">
      {/* Hero Slider Section */}
      <div className="truck-slider-section">
        <TruckSlider />
      </div>

      {/* Filters and Grid Section */}
      <div className="truck-content-section">
        <div className="container">
          {/* Filters Section */}
          <div className="truck-filters-section">
            <TruckFilters onFiltersChange={handleFiltersChange} />
          </div>

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