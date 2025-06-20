import React, { useState, useEffect } from "react";
import TruckCard from "./TruckCard";
import { useTrucks } from "../../helper/useTrucks";

const TruckGrid = ({ filters }) => {
  const { trucks, loading, error, resetPage } = useTrucks(filters);

  const [sortBy, setSortBy] = useState("featured");
  const [sortedTrucks, setSortedTrucks] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const trucksPerPage = 9;

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  useEffect(() => {
    if (!trucks.length) {
      setSortedTrucks([]);
      return;
    }

    let sorted = [...trucks];

    switch (sortBy) {
      case "featured":
        break;
      case "newest":
        sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case "oldest":
        sorted.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      case "make-asc":
        sorted.sort((a, b) => a.make.localeCompare(b.make));
        break;
      case "make-desc":
        sorted.sort((a, b) => b.make.localeCompare(a.make));
        break;
      case "status":
        sorted.sort((a, b) => {
          const statusOrder = { Completed: 1, "In Progress": 2 };
          return (statusOrder[a.status] || 3) - (statusOrder[b.status] || 3);
        });
        break;
      default:
        break;
    }

    setSortedTrucks(sorted);
  }, [trucks, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const totalPages = Math.ceil(sortedTrucks.length / trucksPerPage);
  const startIndex = (currentPage - 1) * trucksPerPage;
  const endIndex = startIndex + trucksPerPage;
  const paginatedTrucks = sortedTrucks.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const gridSection = document.querySelector(".truck-grid-section");
    if (gridSection) {
      gridSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getPaginationNumbers = () => {
    const maxVisible = 3;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (loading) {
    return (
      <div className="truck-grid-loading">
        <div className="grid-header">
          <div className="grid-info">
            <h2 className="grid-title">Loading Trucks...</h2>
            <p className="grid-subtitle">
              Please wait while we load the truck gallery
            </p>
          </div>
        </div>
        <div className="loading-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="truck-card-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="truck-grid-error">
        <div className="error-content">
          <h2>Error Loading Trucks</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!trucks.length) {
    return (
      <div className="truck-grid-empty">
        <div className="empty-content">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7L12 3L4 7L12 11L20 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12L12 16L20 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2>No Trucks Found</h2>
          <p>
            We couldn't find any trucks matching your criteria. Try adjusting
            your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="truck-grid">
      <div className="truck-grid-header">
        <div className="results-info">
          <div className="results-count">
            Showing {paginatedTrucks.length} of {sortedTrucks.length} truck
            {sortedTrucks.length !== 1 ? "s" : ""}
          </div>
          <p className="results-description">
            Custom truck builds from Twelve GA Customs
          </p>
        </div>

        <div className="grid-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => handleViewModeChange("grid")}
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
                  x="3"
                  y="14"
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
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => handleViewModeChange("list")}
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

          <div className="sort-control">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="make-asc">Make (A-Z)</option>
              <option value="make-desc">Make (Z-A)</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`trucks-container ${viewMode}-view`}>
        {paginatedTrucks.map((truck, index) => (
          <TruckCard
            key={truck._id || truck.id}
            truck={truck}
            className={`truck-card-${viewMode}`}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-section">
          <div className="pagination-info">
            Showing {startIndex + 1} - {Math.min(endIndex, sortedTrucks.length)}{" "}
            of {sortedTrucks.length} trucks
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Previous
            </button>

            <div className="pagination-numbers">
              {getPaginationNumbers().map((page) => (
                <button
                  key={page}
                  className={`pagination-number ${
                    page === currentPage ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckGrid;
