import React, { useState } from "react";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return (
      <div className="product-tabs-loading">Loading product details...</div>
    );
  }

  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="14,2 14,8 20,8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="13"
            x2="8"
            y2="13"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="17"
            x2="8"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="10,9 9,9 8,9"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      id: "specifications",
      label: "Specifications",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="9"
            y1="9"
            x2="15"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="9"
            y1="12"
            x2="15"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="9"
            y1="15"
            x2="15"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      id: "installation",
      label: "Installation",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      id: "compatibility",
      label: "Compatibility",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            x="8"
            y="2"
            width="8"
            height="4"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M9 14l2 2 4-4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="tab-content-description">
            <div className="description-main">
              <h4>Product Overview</h4>
              <p>
                {product.description ||
                  product.longDescription ||
                  "Detailed product description will be displayed here."}
              </p>
            </div>

            {product.keyFeatures && (
              <div className="features-detailed">
                <h4>Key Features & Benefits</h4>
                <ul className="features-list-detailed">
                  {product.keyFeatures.map((feature, index) => (
                    <li key={index} className="feature-detailed">
                      <svg
                        width="20"
                        height="20"
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.materials && (
              <div className="materials-info">
                <h4>Materials & Construction</h4>
                <div className="materials-grid">
                  {product.materials.map((material, index) => (
                    <div key={index} className="material-item">
                      <strong>{material.type}:</strong> {material.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "specifications":
        return (
          <div className="tab-content-specifications">
            {product.specifications ? (
              <div className="specs-table">
                <h4>Technical Specifications</h4>
                <table className="specifications-table">
                  <tbody>
                    {Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <tr key={index}>
                          <td className="spec-label">{key}</td>
                          <td className="spec-value">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="specs-placeholder">
                <p>Detailed specifications will be provided upon request.</p>
                <button className="btn-request-specs">
                  Request Detailed Specs
                </button>
              </div>
            )}

            {product.dimensions && (
              <div className="dimensions-info">
                <h4>Dimensions</h4>
                <div className="dimensions-grid">
                  <div className="dimension-item">
                    <span className="dimension-label">Length:</span>
                    <span className="dimension-value">
                      {product.dimensions.length}
                    </span>
                  </div>
                  <div className="dimension-item">
                    <span className="dimension-label">Width:</span>
                    <span className="dimension-value">
                      {product.dimensions.width}
                    </span>
                  </div>
                  <div className="dimension-item">
                    <span className="dimension-label">Height:</span>
                    <span className="dimension-value">
                      {product.dimensions.height}
                    </span>
                  </div>
                  <div className="dimension-item">
                    <span className="dimension-label">Weight:</span>
                    <span className="dimension-value">
                      {product.dimensions.weight}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "installation":
        return (
          <div className="tab-content-installation">
            <div className="installation-overview">
              <h4>Installation Information</h4>
              <p>
                Professional installation is recommended for optimal performance
                and warranty coverage.
              </p>
            </div>

            <div className="installation-options">
              <div className="installation-option">
                <div className="option-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 21v-2a4 4 0 0 0-3-3.87"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 3.13a4 4 0 0 1 0 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <h5>Professional Installation</h5>
                </div>
                <p>Our certified technicians ensure perfect fit and finish.</p>
                <ul>
                  <li>Expert installation by certified technicians</li>
                  <li>Full warranty coverage</li>
                  <li>Installation time: 2-4 hours</li>
                  <li>Includes all necessary hardware</li>
                </ul>
              </div>

              <div className="installation-option">
                <div className="option-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <h5>DIY Installation</h5>
                </div>
                <p>
                  Detailed instructions and support for experienced installers.
                </p>
                <ul>
                  <li>Comprehensive installation guide included</li>
                  <li>Video tutorials available</li>
                  <li>Technical support hotline</li>
                  <li>Required tools list provided</li>
                </ul>
              </div>
            </div>

            <div className="installation-requirements">
              <h4>Installation Requirements</h4>
              <div className="requirements-grid">
                <div className="requirement-item">
                  <strong>Tools Required:</strong>
                  <span>Basic hand tools, drill, measuring tape</span>
                </div>
                <div className="requirement-item">
                  <strong>Estimated Time:</strong>
                  <span>2-4 hours for experienced installer</span>
                </div>
                <div className="requirement-item">
                  <strong>Difficulty Level:</strong>
                  <span>Intermediate to Advanced</span>
                </div>
                <div className="requirement-item">
                  <strong>Support Available:</strong>
                  <span>Phone and video assistance</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "compatibility":
        return (
          <div className="tab-content-compatibility">
            <div className="compatibility-overview">
              <h4>Vehicle Compatibility</h4>
              <p>
                This product is designed to fit the following vehicle
                configurations:
              </p>
            </div>

            {product.compatibility && (
              <div className="compatibility-list">
                <h5>Compatible Models:</h5>
                <div className="compatibility-grid">
                  {product.compatibility.map((model, index) => (
                    <div key={index} className="compatibility-item">
                      <svg
                        width="16"
                        height="16"
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
                      <span>{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="compatibility-note">
              <div className="note-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="8"
                    x2="12.01"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="note-content">
                <h5>Need Help with Compatibility?</h5>
                <p>
                  Not sure if this part fits your vehicle? Our experts can help
                  verify compatibility.
                </p>
                <button className="btn-compatibility-check">
                  Check Compatibility
                </button>
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="tab-content-reviews">
            <div className="reviews-summary">
              <h4>Customer Reviews</h4>
              <div className="rating-overview">
                <div className="rating-score">
                  <span className="score">4.8</span>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill={star <= 4 ? "#FF3D24" : "none"}
                          stroke="#FF3D24"
                          strokeWidth="2"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="review-count">Based on 127 reviews</span>
                </div>
              </div>
            </div>

            <div className="reviews-list">
              {/* Sample reviews - in real app, this would come from props */}
              <div className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <strong>Mike Johnson</strong>
                    <span className="review-date">2 weeks ago</span>
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill="#FF3D24"
                          stroke="#FF3D24"
                          strokeWidth="2"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="review-text">
                  "Excellent quality and perfect fit. Installation was
                  straightforward with the provided instructions. The finish is
                  outstanding and really transforms the look of my truck."
                </p>
                <div className="review-helpful">
                  <button className="helpful-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Helpful (12)
                  </button>
                </div>
              </div>

              <div className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <strong>Sarah Wilson</strong>
                    <span className="review-date">1 month ago</span>
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <polygon
                          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                          fill="#FF3D24"
                          stroke="#FF3D24"
                          strokeWidth="2"
                        />
                      </svg>
                    ))}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polygon
                        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                        fill="none"
                        stroke="#FF3D24"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
                <p className="review-text">
                  "Great product overall. The quality is impressive and customer
                  service was very helpful. Only minor issue was delivery took a
                  bit longer than expected."
                </p>
                <div className="review-helpful">
                  <button className="helpful-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Helpful (8)
                  </button>
                </div>
              </div>
            </div>

            <div className="reviews-actions">
              <button className="btn-write-review">Write a Review</button>
              <button className="btn-load-more">Load More Reviews</button>
            </div>
          </div>
        );

      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="product-tabs" data-aos="fade-up" data-aos-offset="150">
      {/* Tab Navigation */}
      <div className="tabs-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        <div className={`tab-panel tab-${activeTab}`}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProductTabs;
