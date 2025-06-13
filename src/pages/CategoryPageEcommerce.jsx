import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import FrequentlyQuestions from "../components/FrequentlyQuestions/FrequentlyQuestions";

// Same dummy data as before
const productsData = {
  grilles: [
    {
      id: 1,
      name: "Custom Chrome Grille",
      slug: "custom-chrome-grille",
      image: "/assets/img/products/grille-1.png",
      startingPrice: 299,
      description:
        "Premium chrome-finished grille designed for maximum style and airflow optimization.",
      features: [
        "High-Grade Chrome Finish",
        "Custom Logo Integration",
        "Enhanced Airflow Design",
        "Easy Installation Kit",
        "5-Year Warranty",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-01-20",
      category: "Performance",
    },
    {
      id: 2,
      name: "Blackout Performance Grille",
      slug: "blackout-performance-grille",
      image: "/assets/img/products/grille-2.png",
      startingPrice: 275,
      description:
        "Aggressive blackout design for enhanced performance and bold appearance.",
      features: [
        "Matte Black Finish",
        "Performance Optimized",
        "Durable Steel Construction",
        "Weather Resistant",
        "Custom Fitment Available",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-05",
      category: "Styling",
    },
  ],
  "air-cleaner-screens": [
    {
      id: 1,
      name: "Premium Mesh Air Cleaner Screen",
      slug: "premium-mesh-air-cleaner-screen",
      image: "/assets/img/products/air-cleaner-screen-1.png",
      startingPrice: 89,
      description:
        "High-performance stainless steel mesh screen designed for maximum airflow and filtration.",
      features: [
        "304 Stainless Steel Construction",
        "Laser-Cut Precision Holes",
        "Weather Resistant Finish",
        "Easy Installation",
        "Custom Sizing Available",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-01-15",
      category: "Performance",
    },
    {
      id: 2,
      name: "Diamond Pattern Air Screen",
      slug: "diamond-pattern-air-screen",
      image: "/assets/img/products/air-cleaner-screen-2.png",
      startingPrice: 125,
      description:
        "Distinctive diamond pattern design combining style with superior protection.",
      features: [
        "Unique Diamond Pattern",
        "Heavy-Duty Steel Frame",
        "Powder Coated Finish",
        "Universal Mounting",
        "Lifetime Warranty",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-01",
      category: "Styling",
    },
    {
      id: 3,
      name: "Custom Logo Air Cleaner Screen",
      slug: "custom-logo-air-cleaner-screen",
      image: "/assets/img/products/air-cleaner-screen-3.png",
      startingPrice: 180,
      description:
        "Personalized air cleaner screen with your company logo or custom design.",
      features: [
        "Custom Logo Integration",
        "Laser Engraving Available",
        "Multiple Finish Options",
        "Professional Installation",
        "Design Consultation Included",
      ],
      isCustomizable: true,
      availability: "Made to Order",
      createdAt: "2024-01-28",
      category: "Custom",
    },
  ],
};

const categoriesInfo = {
  grilles: {
    name: "Grilles",
    zone: "Front",
    description:
      "Transform your truck's front end with our premium custom grilles.",
    productCount: 15,
  },
  "air-cleaner-screens": {
    name: "Air Cleaner Screens",
    zone: "Engine/Air System",
    description: "Protect your engine while maintaining optimal airflow.",
    productCount: 12,
  },
};

const CategoryPageEcommerce = () => {
  const { slug } = useParams();
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    availability: "all",
  });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get category info and products
  const categoryInfo = categoriesInfo[slug] || {
    name: "Category Not Found",
    zone: "Unknown",
    description: "This category doesn't exist.",
    productCount: 0,
  };

  const products = productsData[slug] || [];

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category)
      return false;
    if (
      filters.availability !== "all" &&
      product.availability !== filters.availability
    )
      return false;
    if (filters.priceRange !== "all") {
      const price = product.startingPrice;
      switch (filters.priceRange) {
        case "under-100":
          if (price >= 100) return false;
          break;
        case "100-200":
          if (price < 100 || price > 200) return false;
          break;
        case "over-200":
          if (price <= 200) return false;
          break;
      }
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.startingPrice - b.startingPrice;
      case "price-high":
        return b.startingPrice - a.startingPrice;
      default:
        return 0;
    }
  });

  return (
    <div className="ecommerce-category-page">
      {/* Clean Header */}
      <div className="ecommerce-header">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/parts">Parts</Link>
            <span>›</span>
            <span>{categoryInfo.name}</span>
          </nav>

          <div className="page-title-section">
            <h1 className="page-title">{categoryInfo.name}</h1>
            <p className="page-subtitle">{categoryInfo.description}</p>
            <div className="results-count">
              {sortedProducts.length} product
              {sortedProducts.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </div>

      <div className="ecommerce-content">
        <div className="container">
          {/* Mobile Backdrop */}
          {sidebarOpen && (
            <div
              className="sidebar-backdrop"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="content-layout">
            {/* Sidebar Filters */}
            <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
              <div className="sidebar-header">
                <h3>Filters</h3>
                <button
                  className="close-sidebar"
                  onClick={() => setSidebarOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="filter-group">
                <h4>Category</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={filters.category === "all"}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>All Categories</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Performance"
                      checked={filters.category === "Performance"}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Performance</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Styling"
                      checked={filters.category === "Styling"}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Styling</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value="Custom"
                      checked={filters.category === "Custom"}
                      onChange={(e) =>
                        setFilters({ ...filters, category: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Custom</span>
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h4>Price Range</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="radio"
                      name="priceRange"
                      value="all"
                      checked={filters.priceRange === "all"}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>All Prices</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="priceRange"
                      value="under-100"
                      checked={filters.priceRange === "under-100"}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Under $100</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="priceRange"
                      value="100-200"
                      checked={filters.priceRange === "100-200"}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>$100 - $200</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="priceRange"
                      value="over-200"
                      checked={filters.priceRange === "over-200"}
                      onChange={(e) =>
                        setFilters({ ...filters, priceRange: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Over $200</span>
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <h4>Availability</h4>
                <div className="filter-options">
                  <label>
                    <input
                      type="radio"
                      name="availability"
                      value="all"
                      checked={filters.availability === "all"}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>All Items</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="availability"
                      value="Available"
                      checked={filters.availability === "Available"}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>In Stock</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="availability"
                      value="Made to Order"
                      checked={filters.availability === "Made to Order"}
                      onChange={(e) =>
                        setFilters({ ...filters, availability: e.target.value })
                      }
                    />
                    <div className="custom-radio"></div>
                    <span>Made to Order</span>
                  </label>
                </div>
              </div>

              <button
                className="clear-filters"
                onClick={() =>
                  setFilters({
                    category: "all",
                    priceRange: "all",
                    availability: "all",
                  })
                }
              >
                Clear All Filters
              </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
              {/* Toolbar */}
              <div className="toolbar">
                <div className="toolbar-left">
                  <button
                    className="filter-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 7H21L19 12H5L3 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 7L7 2H17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Filters
                  </button>

                  <div className="view-toggle">
                    <button
                      className={`view-btn ${
                        viewMode === "grid" ? "active" : ""
                      }`}
                      onClick={() => setViewMode("grid")}
                    >
                      <svg
                        width="18"
                        height="18"
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
                      className={`view-btn ${
                        viewMode === "list" ? "active" : ""
                      }`}
                      onClick={() => setViewMode("list")}
                    >
                      <svg
                        width="18"
                        height="18"
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

                <div className="toolbar-right">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`products-grid ${viewMode}`}>
                {sortedProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-actions">
                        <button
                          className="quick-view-btn"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Quick View
                        </button>
                        <Link
                          to={`/product/${product.slug}`}
                          className="details-btn"
                        >
                          Details
                        </Link>
                      </div>
                      {product.isCustomizable && (
                        <span className="custom-badge">Custom</span>
                      )}
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">
                        <Link to={`/product/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <div className="product-footer">
                        <div className="price-section">
                          <span className="price-label">Starting from</span>
                          <span className="price">
                            ${product.startingPrice}
                          </span>
                        </div>
                        <button className="quote-btn">Get Quote</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="no-results">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FrequentlyQuestions />

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          className="quick-view-modal"
          onClick={() => setSelectedProduct(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <div className="modal-grid">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-info">
                <h3>{selectedProduct.name}</h3>
                <p>{selectedProduct.description}</p>
                <div className="modal-features">
                  {selectedProduct.features
                    .slice(0, 3)
                    .map((feature, index) => (
                      <div key={index}>• {feature}</div>
                    ))}
                </div>
                <div className="modal-price">
                  Starting from{" "}
                  <strong>${selectedProduct.startingPrice}</strong>
                </div>
                <div className="modal-actions">
                  <Link
                    to={`/product/${selectedProduct.slug}`}
                    className="btn primary"
                  >
                    View Full Details
                  </Link>
                  <button className="btn secondary">Request Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPageEcommerce;
