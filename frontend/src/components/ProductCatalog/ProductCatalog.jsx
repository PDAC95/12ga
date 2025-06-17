import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductCatalog = ({ products, categoryName }) => {
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Filter products based on availability
  const filteredProducts = products.filter((product) => {
    if (filterBy === "all") return true;
    if (filterBy === "available") return product.availability === "Available";
    if (filterBy === "custom") return product.isCustomizable;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return a.startingPrice - b.startingPrice;
      case "newest":
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="product-catalog-section">
      <div className="container">
        {/* Catalog Header */}
        <div className="catalog-header" data-aos="fade-up">
          <div className="catalog-info">
            <h2 className="catalog-title">{categoryName} Products</h2>
            <p className="catalog-count">
              {sortedProducts.length} product
              {sortedProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Controls */}
          <div className="catalog-controls">
            {/* View Mode Toggle */}
            <div className="view-mode-controls">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
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
              </button>

              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

            {/* Filter Dropdown */}
            <div className="filter-controls">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="control-select filter-select"
              >
                <option value="all">All Products</option>
                <option value="available">Available Now</option>
                <option value="custom">Customizable</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="control-select sort-select"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="newest">Sort by Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`products-grid ${viewMode}`}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              />
            ))
          ) : (
            <div className="no-products-message">
              <div className="no-products-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
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
              <h3>No products found</h3>
              <p>
                Try adjusting your filters or check back later for new products.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button (for future pagination) */}
        {sortedProducts.length > 0 && (
          <div
            className="catalog-footer"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <button className="load-more-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19M5 12L12 19L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
