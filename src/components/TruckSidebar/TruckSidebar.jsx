import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Modelos para cada marca de camión
const truckModels = {
  peterbilt: [
    "359",
    "379",
    "388",
    "389",
    "567",
    "579",
    "367",
    "348",
    "386",
    "384",
    "587",
  ],
  kenworth: [
    "W900",
    "T800",
    "T680",
    "T880",
    "T600",
    "T660",
    "T270",
    "T370",
    "T440",
  ],
  freightliner: [
    "Cascadia",
    "Century",
    "Columbia",
    "Coronado",
    "FLD120",
    "Classic XL",
    "Argosy",
  ],
  volvo: ["VNL", "VNM", "VHD", "VAH", "VNR", "VT"],
  mack: ["Anthem", "Granite", "Pinnacle", "TerraPro", "Titan", "Vision"],
  international: ["LT", "RH", "HX", "LoneStar", "ProStar", "TranStar"],
};

// Zonas del camión
const truckZones = [
  { value: "frontal", label: "Front" },
  { value: "motor", label: "Engine/Air System" },
  { value: "superior", label: "Top/Cabin" },
  { value: "lateral", label: "Side/Storage" },
  { value: "escape", label: "Exhaust/Air" },
  { value: "sleeper", label: "Sleeper/Interior" },
  { value: "trasera", label: "Rear/Accessories" },
];

const TruckSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [years, setYears] = useState([]);

  // Generar años de 1980 al actual
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let year = currentYear; year >= 1980; year--) {
      yearList.push(year);
    }
    setYears(yearList);
  }, []);

  // Cerrar sidebar al presionar Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Manejar selección de año
  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  // Manejar cambio de marca
  const handleMakeChange = (e) => {
    const make = e.target.value;
    setSelectedMake(make);
    setSelectedModel(""); // Reset model when make changes
  };

  // Manejar búsqueda de partes con navegación y filtros
  const handleSearchParts = () => {
    if (!selectedYear && !selectedMake && !selectedModel && !selectedZone) {
      alert("Please select at least one filter to search for parts.");
      return;
    }

    // Crear parámetros URL con los filtros seleccionados
    const searchParams = new URLSearchParams();

    if (selectedYear) searchParams.append("year", selectedYear);
    if (selectedMake) searchParams.append("make", selectedMake);
    if (selectedModel) searchParams.append("model", selectedModel);
    if (selectedZone) {
      // Para las zonas, necesitamos encontrar una categoría representativa
      // Esto se manejará en la página Parts
      searchParams.append("zone", selectedZone);
    }

    // Navegar a la página Parts con los filtros como query parameters
    navigate(`/parts?${searchParams.toString()}`);

    // Cerrar el sidebar
    onClose();
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    setSelectedYear(null);
    setSelectedMake("");
    setSelectedModel("");
    setSelectedZone("");
  };

  // Manejar clic en overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={handleOverlayClick}
      />

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Select My Truck</span>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="sidebar-content">
          {/* Year Selection */}
          <div className="filter-section">
            <label className="filter-label">Year</label>
            <div className="year-grid">
              {years.map((year) => (
                <button
                  key={year}
                  className={`year-btn ${
                    selectedYear === year ? "selected" : ""
                  }`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Make Selection */}
          <div className="filter-section">
            <label className="filter-label">Make</label>
            <select
              className="filter-select"
              value={selectedMake}
              onChange={handleMakeChange}
            >
              <option value="">Select Make</option>
              <option value="peterbilt">Peterbilt</option>
              <option value="kenworth">Kenworth</option>
              <option value="freightliner">Freightliner</option>
              <option value="volvo">Volvo</option>
              <option value="mack">Mack</option>
              <option value="international">International</option>
            </select>
          </div>

          {/* Model Selection */}
          <div className="filter-section">
            <label className="filter-label">Model</label>
            <select
              className="filter-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select Model</option>
              {selectedMake &&
                truckModels[selectedMake] &&
                truckModels[selectedMake].map((model) => (
                  <option
                    key={model}
                    value={model.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {model}
                  </option>
                ))}
            </select>
          </div>

          {/* Truck Zone Selection */}
          <div className="filter-section">
            <label className="filter-label">Truck Area</label>
            <select
              className="filter-select"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
            >
              <option value="">All Areas</option>
              {truckZones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.label}
                </option>
              ))}
            </select>
          </div>

          <button className="search-btn" onClick={handleSearchParts}>
            SEARCH PARTS
          </button>

          <button className="clear-btn" onClick={handleClearFilters}>
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};

export default TruckSidebar;
