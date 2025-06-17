import React from "react";
import { Link } from "react-router-dom";

const CategoryHero = ({
  categoryName,
  categoryZone,
  productCount,
  categoryDescription,
}) => {
  return (
    <div className="category-hero-section">
      <div className="container">
        <div className="category-hero-content" data-aos="fade-up">
          {/* Breadcrumb */}
          <nav className="category-breadcrumb">
            <Link to="/parts" className="breadcrumb-link">
              Parts
            </Link>
            <span className="breadcrumb-separator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="breadcrumb-current">{categoryName}</span>
          </nav>

          {/* Category Info */}
          <div className="category-info">
            <div className="category-zone-tag">
              <span className="zone-indicator"></span>
              {categoryZone}
            </div>

            <h1 className="category-title">{categoryName}</h1>

            <p className="category-description">{categoryDescription}</p>

            <div className="category-stats">
              <div className="stat-item">
                <span className="stat-number">{productCount}</span>
                <span className="stat-label">Products Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Custom</span>
                <span className="stat-label">Solutions</span>
              </div>
            </div>

            <div className="category-actions">
              <button className="action-btn primary-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92V3A2 2 0 0 0 20 1H4A2 2 0 0 0 2 3V16.92A2 2 0 0 0 4 18.92H20A2 2 0 0 0 22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7H17M7 12H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View All Specifications
              </button>

              <button className="action-btn secondary-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 8L10.89 13.26A2 2 0 0 0 13.11 13.26L21 8M5 19H19A2 2 0 0 0 21 17V7A2 2 0 0 0 19 5H5A2 2 0 0 0 3 7V17A2 2 0 0 0 5 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Contact for Bulk Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
