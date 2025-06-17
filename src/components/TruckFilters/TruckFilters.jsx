import React, { useState, useEffect } from "react";

// Mock data for commercial truck filters
const truckData = {
  makes: [
    { id: 1, name: "Peterbilt" },
    { id: 2, name: "Kenworth" },
    { id: 3, name: "Freightliner" },
    { id: 4, name: "Volvo" },
    { id: 5, name: "Mack" },
    { id: 6, name: "International" },
  ],
  years: Array.from({ length: 25 }, (_, i) => 2024 - i), // 2024 to 2000
};

const TruckFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    name: "", // AÑADIDO: campo para búsqueda por nombre
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    make: false,
    year: false,
  });

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  // Handle name search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only trigger onChange if there's actual name content
      if (filters.name.trim() !== "") {
        onFiltersChange?.(filters);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters.name]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-dropdown")) {
        setIsDropdownOpen({
          make: false,
          year: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));

    // Close dropdown after selection (only for dropdowns)
    if (filterType !== "name") {
      setIsDropdownOpen((prev) => ({
        ...prev,
        [filterType]: false,
      }));
    }
  };

  const toggleDropdown = (filterType) => {
    setIsDropdownOpen((prev) => {
      // Si el dropdown que queremos abrir ya está abierto, lo cerramos
      if (prev[filterType]) {
        return {
          make: false,
          year: false,
        };
      }

      // Si no, cerramos todos y abrimos solo el seleccionado
      return {
        make: filterType === "make",
        year: filterType === "year",
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      make: "",
      year: "",
      name: "", // AÑADIDO: limpiar también el campo nombre
    });
    setIsDropdownOpen({
      make: false,
      year: false,
    });
  };

  const hasActiveFilters = filters.make || filters.year || filters.name; // MODIFICADO: incluir name

  // Base styles for dropdowns
  const baseDropdownMenuStyle = {
    display: "block",
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    width: "100%",
    background: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    marginTop: "0.5rem",
    maxHeight: "300px",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    animation: "dropdownFadeIn 0.2s ease-out",
  };

  // Make dropdown style
  const makeDropdownStyle = {
    ...baseDropdownMenuStyle,
    zIndex: "99999",
  };

  // Year dropdown style
  const yearDropdownStyle = {
    ...baseDropdownMenuStyle,
    maxHeight: "250px",
    zIndex: "99999",
  };

  const dropdownItemStyle = {
    display: "block",
    padding: "0.75rem 1.25rem",
    color: "rgba(255, 255, 255, 0.9)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    backgroundColor: "transparent",
  };

  const placeholderItemStyle = {
    ...dropdownItemStyle,
    color: "rgba(255, 255, 255, 0.6)",
    fontStyle: "italic",
  };

  const selectedItemStyle = {
    ...dropdownItemStyle,
    backgroundColor: "rgba(255, 61, 36, 0.3)",
    color: "#ff3d24",
    fontWeight: "600",
  };

  const handleItemHover = (e, isLeaving = false, isSelected = false) => {
    if (isLeaving) {
      if (isSelected) {
        e.target.style.backgroundColor = "rgba(255, 61, 36, 0.3)";
        e.target.style.color = "#ff3d24";
      } else {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "rgba(255, 255, 255, 0.9)";
      }
    } else {
      if (!isSelected) {
        e.target.style.backgroundColor = "rgba(255, 61, 36, 0.2)";
        e.target.style.color = "white";
      }
    }
  };

  const handlePlaceholderHover = (e, isLeaving = false) => {
    if (isLeaving) {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "rgba(255, 255, 255, 0.6)";
    } else {
      e.target.style.backgroundColor = "rgba(255, 61, 36, 0.2)";
      e.target.style.color = "white";
    }
  };

  return (
    <div className="truck-filters">
      <div className="ak-height-75 ak-height-lg-50"></div>

      {/* Section Heading */}
      <div className="center-section-heading" data-aos="fade-up">
        <div className="ak-section-heading ak-style-1">
          <div
            className="background-text"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="2500"
          >
            FILTER
          </div>
          <div className="text-md-center">
            <h2 className="ak-section-title">Find Your Perfect Truck</h2>
            <p className="ak-section-subtitle">
              Filter our commercial truck collection by name, make and year to
              discover the exact custom build that matches your hauling and
              business needs.
            </p>
          </div>
        </div>
      </div>

      <div className="ak-height-75 ak-height-lg-50"></div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div
          className="filters-container"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          <div className="active-filters">
            <div className="active-filters-label">Active Filters:</div>
            <div className="active-filters-list">
              {filters.name && (
                <span className="filter-tag">
                  <span>Name: {filters.name}</span>
                  <button onClick={() => handleFilterChange("name", "")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {filters.make && (
                <span className="filter-tag">
                  <span>Make: {filters.make}</span>
                  <button onClick={() => handleFilterChange("make", "")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {filters.year && (
                <span className="filter-tag">
                  <span>Year: {filters.year}</span>
                  <button onClick={() => handleFilterChange("year", "")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer cuando hay filtros activos */}
      {hasActiveFilters && <div className="ak-height-50 ak-height-lg-30"></div>}

      {/* Filters Container */}
      <div
        className="filters-container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="filters-wrapper">
          {/* NUEVO: Name Search Field */}
          <div className="filter-group">
            <label className="filter-label">Truck Name</label>
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by truck name..."
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
              />
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
          </div>

          {/* Make Filter */}
          <div className="filter-group">
            <label className="filter-label">Make</label>
            <div
              className="custom-dropdown"
              style={{ position: "relative", zIndex: "99998" }}
            >
              <button
                className={`dropdown-toggle ${
                  filters.make ? "has-value" : ""
                } ${isDropdownOpen.make ? "active" : ""}`}
                onClick={() => toggleDropdown("make")}
                type="button"
              >
                <span className="dropdown-text">
                  {filters.make || "Select Make"}
                </span>
                <svg
                  className={`dropdown-arrow ${
                    isDropdownOpen.make ? "rotated" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen.make && (
                <div style={makeDropdownStyle}>
                  <div
                    style={placeholderItemStyle}
                    onClick={() => handleFilterChange("make", "")}
                    onMouseEnter={(e) => handlePlaceholderHover(e, false)}
                    onMouseLeave={(e) => handlePlaceholderHover(e, true)}
                  >
                    All Makes
                  </div>
                  {truckData.makes.map((make) => (
                    <div
                      key={make.id}
                      style={
                        filters.make === make.name
                          ? selectedItemStyle
                          : dropdownItemStyle
                      }
                      onClick={() => handleFilterChange("make", make.name)}
                      onMouseEnter={(e) =>
                        handleItemHover(e, false, filters.make === make.name)
                      }
                      onMouseLeave={(e) =>
                        handleItemHover(e, true, filters.make === make.name)
                      }
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
            <div
              className="custom-dropdown"
              style={{ position: "relative", zIndex: "99998" }}
            >
              <button
                className={`dropdown-toggle ${
                  filters.year ? "has-value" : ""
                } ${isDropdownOpen.year ? "active" : ""}`}
                onClick={() => toggleDropdown("year")}
                type="button"
              >
                <span className="dropdown-text">
                  {filters.year || "Select Year"}
                </span>
                <svg
                  className={`dropdown-arrow ${
                    isDropdownOpen.year ? "rotated" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen.year && (
                <div style={yearDropdownStyle}>
                  <div
                    style={placeholderItemStyle}
                    onClick={() => handleFilterChange("year", "")}
                    onMouseEnter={(e) => handlePlaceholderHover(e, false)}
                    onMouseLeave={(e) => handlePlaceholderHover(e, true)}
                  >
                    All Years
                  </div>
                  {truckData.years.map((year) => (
                    <div
                      key={year}
                      style={
                        filters.year === year.toString()
                          ? selectedItemStyle
                          : dropdownItemStyle
                      }
                      onClick={() =>
                        handleFilterChange("year", year.toString())
                      }
                      onMouseEnter={(e) =>
                        handleItemHover(
                          e,
                          false,
                          filters.year === year.toString()
                        )
                      }
                      onMouseLeave={(e) =>
                        handleItemHover(
                          e,
                          true,
                          filters.year === year.toString()
                        )
                      }
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
              onClick={() => {
                console.log("🔍 Search clicked with filters:", filters);
                // Aquí puedes agregar la lógica de búsqueda
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <span>Search</span>
            </button>

            {hasActiveFilters && (
              <button
                className="btn-clear"
                onClick={clearFilters}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="ak-height-75 ak-height-lg-50"></div>
    </div>
  );
};

export default TruckFilters;
