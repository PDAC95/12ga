import React, { useState, useEffect } from "react";

// Mock data for commercial truck filters
const truckData = {
  makes: [
    { id: 1, name: "Peterbilt" },
    { id: 2, name: "Kenworth" },
    { id: 3, name: "Freightliner" },
    { id: 4, name: "Volvo" },
    { id: 5, name: "Mack" },
    { id: 6, name: "International" }
  ],
  years: Array.from({ length: 25 }, (_, i) => 2024 - i) // 2024 to 2000
};

const TruckFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    make: "",
    year: ""
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    make: false,
    year: false
  });

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // Close dropdown after selection
    setIsDropdownOpen(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  const toggleDropdown = (filterType) => {
    setIsDropdownOpen(prev => ({
      make: false,
      year: false,
      [filterType]: !prev[filterType]
    }));
  };

  const clearFilters = () => {
    setFilters({
      make: "",
      year: ""
    });
    setIsDropdownOpen({
      make: false,
      year: false
    });
  };

  const hasActiveFilters = filters.make || filters.year;

  return (
    <div className="truck-filters">
      <div className="ak-height-75 ak-height-lg-50"></div>
      
      {/* Section Heading */}
      <div className="center-section-heading" data-aos="fade-up">
        <div className="ak-section-heading ak-style-1">
          <div className="background-text" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
            FILTER
          </div>
          <div className="text-md-center">
            <h2 className="ak-section-title">Find Your Perfect Truck</h2>
            <p className="ak-section-subtitle">
              Filter our commercial truck collection by make and year to discover 
              the exact custom build that matches your hauling and business needs.
            </p>
          </div>
        </div>
      </div>

      <div className="ak-height-75 ak-height-lg-50"></div>

      {/* Filters Container */}
      <div className="filters-container" data-aos="fade-up" data-aos-delay="100">
        <div className="filters-wrapper">
          
          {/* Make Filter */}
          <div className="filter-group">
            <label className="filter-label">Make</label>
            <div className="custom-dropdown">
              <button 
                className={`dropdown-toggle ${filters.make ? 'has-value' : ''} ${isDropdownOpen.make ? 'active' : ''}`}
                onClick={() => toggleDropdown('make')}
                type="button"
              >
                <span className="dropdown-text">
                  {filters.make || "Select Make"}
                </span>
                <svg 
                  className={`dropdown-arrow ${isDropdownOpen.make ? 'rotated' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isDropdownOpen.make && (
                <div className="dropdown-menu">
                  <div className="dropdown-item placeholder" onClick={() => handleFilterChange('make', '')}>
                    All Makes
                  </div>
                  {truckData.makes.map((make) => (
                    <div 
                      key={make.id}
                      className={`dropdown-item ${filters.make === make.name ? 'selected' : ''}`}
                      onClick={() => handleFilterChange('make', make.name)}
                    >
                      {make.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Year Filter */}
          <div className="filter-group">
            <label className="filter-label">Year</label>
            <div className="custom-dropdown">
              <button 
                className={`dropdown-toggle ${filters.year ? 'has-value' : ''} ${isDropdownOpen.year ? 'active' : ''}`}
                onClick={() => toggleDropdown('year')}
                type="button"
              >
                <span className="dropdown-text">
                  {filters.year || "Select Year"}
                </span>
                <svg 
                  className={`dropdown-arrow ${isDropdownOpen.year ? 'rotated' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isDropdownOpen.year && (
                <div className="dropdown-menu scrollable">
                  <div className="dropdown-item placeholder" onClick={() => handleFilterChange('year', '')}>
                    All Years
                  </div>
                  {truckData.years.map((year) => (
                    <div 
                      key={year}
                      className={`dropdown-item ${filters.year === year.toString() ? 'selected' : ''}`}
                      onClick={() => handleFilterChange('year', year.toString())}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="filter-actions">
            <button 
              className="btn-search"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Search</span>
            </button>
            
            {hasActiveFilters && (
              <button 
                className="btn-clear"
                onClick={clearFilters}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="active-filters" data-aos="fade-up" data-aos-delay="200">
            <div className="active-filters-label">Active Filters:</div>
            <div className="active-filters-list">
              {filters.make && (
                <span className="filter-tag">
                  <span>Make: {filters.make}</span>
                  <button onClick={() => handleFilterChange('make', '')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </span>
              )}
              {filters.year && (
                <span className="filter-tag">
                  <span>Year: {filters.year}</span>
                  <button onClick={() => handleFilterChange('year', '')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ak-height-75 ak-height-lg-50"></div>
    </div>
  );
};

export default TruckFilters;