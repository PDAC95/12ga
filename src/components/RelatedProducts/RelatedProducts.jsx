import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ currentProduct, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("similar");

  // Mock data - In real app, this would come from API
  const mockRelatedProducts = [
    {
      id: 1,
      name: "Premium Grille Set",
      slug: "premium-grille-set",
      image: "/assets/img/parts/grilles.png",
      category: { name: "GRILLES", slug: "grilles" },
      priceRange: "$450 - $650",
      rating: 4.8,
      reviewCount: 45,
      isNew: true,
      compatibility: ["Peterbilt 579", "Kenworth T680"],
      keyFeatures: ["Stainless Steel", "Custom Finish", "Easy Install"],
    },
    {
      id: 2,
      name: "LED Light Bar System",
      slug: "led-light-bar-system",
      image: "/assets/img/parts/lights.png",
      category: { name: "LIGHTS", slug: "lights" },
      priceRange: "$320 - $480",
      rating: 4.9,
      reviewCount: 78,
      isFeatured: true,
      compatibility: ["Universal Fit"],
      keyFeatures: ["High Brightness", "Weather Resistant", "5-Year Warranty"],
    },
    {
      id: 3,
      name: "Custom Bumper Assembly",
      slug: "custom-bumper-assembly",
      image: "/assets/img/parts/bumpers.png",
      category: { name: "BUMPERS", slug: "bumpers" },
      priceRange: "$800 - $1200",
      rating: 4.7,
      reviewCount: 32,
      isCustomizable: true,
      compatibility: ["Freightliner Cascadia", "Volvo VNL"],
      keyFeatures: ["Heavy Duty", "Chrome Finish", "Made to Order"],
    },
    {
      id: 4,
      name: "Visor Shield Pro",
      slug: "visor-shield-pro",
      image: "/assets/img/parts/visors.png",
      category: { name: "VISORS", slug: "visors" },
      priceRange: "$180 - $280",
      rating: 4.6,
      reviewCount: 56,
      compatibility: ["Peterbilt 389", "Kenworth W900"],
      keyFeatures: ["UV Protection", "Easy Mount", "Multiple Colors"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchRelatedProducts = () => {
      setLoading(true);
      setTimeout(() => {
        let filtered = mockRelatedProducts;

        // Filter out current product
        if (currentProduct) {
          filtered = filtered.filter(
            (product) => product.id !== currentProduct.id
          );
        }

        // Apply selected filter
        switch (selectedFilter) {
          case "similar":
            // Products from same category
            if (currentProduct?.category) {
              filtered = filtered.filter(
                (product) =>
                  product.category.slug === currentProduct.category.slug
              );
            }
            break;
          case "compatible":
            // Products compatible with same vehicles
            if (currentProduct?.compatibility) {
              filtered = filtered.filter((product) =>
                product.compatibility.some((compat) =>
                  currentProduct.compatibility.includes(compat)
                )
              );
            }
            break;
          case "popular":
            // Sort by rating and review count
            filtered = filtered.sort(
              (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
            );
            break;
          default:
            break;
        }

        setRelatedProducts(filtered.slice(0, 4));
        setLoading(false);
      }, 800);
    };

    fetchRelatedProducts();
  }, [currentProduct, selectedFilter]);

  const filterOptions = [
    { id: "similar", label: "Similar Products", icon: "🔗" },
    { id: "compatible", label: "Compatible Parts", icon: "✅" },
    { id: "popular", label: "Popular Choices", icon: "⭐" },
  ];

  if (loading) {
    return (
      <div className="related-products-loading">
        <div className="container">
          <h3>Loading related products...</h3>
          <div className="loading-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="loading-card">
                <div className="loading-image"></div>
                <div className="loading-content">
                  <div className="loading-line"></div>
                  <div className="loading-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="related-products-empty">
        <div className="container">
          <h3>No related products found</h3>
          <p>Explore our full catalog to discover more products.</p>
          <Link to="/parts" className="btn-explore">
            Browse All Parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="related-products" data-aos="fade-up">
      <div className="container">
        {/* Section Header */}
        <div className="related-header">
          <div className="header-content">
            <h3 className="section-title">You Might Also Like</h3>
            <p className="section-subtitle">
              Discover complementary products and popular alternatives
            </p>
          </div>

          {/* Filter Options */}
          <div className="filter-options">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`filter-btn ${
                  selectedFilter === option.id ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(option.id)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="related-products-grid">
          {relatedProducts.map((product, index) => (
            <div
              key={product.id}
              className="related-product-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link to={`/product/${product.slug}`} className="product-link">
                {/* Product Image */}
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  {/* Product Badges */}
                  <div className="product-badges">
                    {product.isNew && (
                      <span className="badge badge-new">New</span>
                    )}
                    {product.isFeatured && (
                      <span className="badge badge-featured">Featured</span>
                    )}
                    {product.isCustomizable && (
                      <span className="badge badge-custom">Custom</span>
                    )}
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="product-overlay">
                    <button className="quick-action-btn" title="Quick View">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                    <button className="quick-action-btn" title="Request Quote">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                  <div className="product-category">
                    {product.category.name}
                  </div>

                  <h4 className="product-name">{product.name}</h4>

                  <div className="product-rating">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <polygon
                            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                            fill={
                              star <= Math.floor(product.rating)
                                ? "#FF3D24"
                                : "none"
                            }
                            stroke="#FF3D24"
                            strokeWidth="1"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <div className="product-price">{product.priceRange}</div>

                  {/* Key Features Preview */}
                  {product.keyFeatures && product.keyFeatures.length > 0 && (
                    <div className="key-features-preview">
                      {product.keyFeatures
                        .slice(0, 2)
                        .map((feature, featureIndex) => (
                          <span key={featureIndex} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      {product.keyFeatures.length > 2 && (
                        <span className="feature-more">
                          +{product.keyFeatures.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Compatibility Info */}
                  {product.compatibility &&
                    product.compatibility.length > 0 && (
                      <div className="compatibility-preview">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>
                          {product.compatibility.length === 1
                            ? product.compatibility[0]
                            : `${product.compatibility[0]} +${
                                product.compatibility.length - 1
                              } more`}
                        </span>
                      </div>
                    )}
                </div>
              </Link>

              {/* Product Actions */}
              <div className="product-actions">
                <button className="btn-quote-small">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Quote
                </button>

                <button className="btn-compare-small">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 21v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7h18zM3 10h18M12 13v8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="view-all-section">
          <Link
            to={
              currentProduct?.category
                ? `/parts/${currentProduct.category.slug}`
                : "/parts"
            }
            className="btn-view-all"
          >
            <span>View All {currentProduct?.category?.name || "Products"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
