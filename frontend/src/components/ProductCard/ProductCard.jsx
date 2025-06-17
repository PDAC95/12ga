import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    slug,
    image,
    startingPrice,
    description,
    features,
    isCustomizable,
    availability,
  } = product;

  return (
    <div className="product-card" data-aos="fade-up">
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" />

        {/* Overlay with action buttons */}
        <div className="product-overlay">
          <div className="overlay-actions">
            <Link to={`/product/${slug}`} className="overlay-btn view-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
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
              View Details
            </Link>

            <button className="overlay-btn quote-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 8L10.89 13.26A2 2 0 0 0 13.11 13.26L21 8M5 19H19A2 2 0 0 0 21 17V7A2 2 0 0 0 19 5H5A2 2 0 0 0 3 7V17A2 2 0 0 0 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Request Quote
            </button>
          </div>
        </div>

        {/* Status badges */}
        <div className="product-badges">
          {isCustomizable && (
            <span className="badge customizable-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Custom
            </span>
          )}

          <span
            className={`badge availability-badge ${availability.toLowerCase()}`}
          >
            {availability}
          </span>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${slug}`}>{name}</Link>
        </h3>

        <p className="product-description">{description}</p>

        {/* Features list */}
        {features && features.length > 0 && (
          <ul className="product-features">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {feature}
              </li>
            ))}
            {features.length > 3 && (
              <li className="feature-item more-features">
                +{features.length - 3} more features
              </li>
            )}
          </ul>
        )}

        <div className="product-footer">
          <div className="pricing-info">
            <span className="price-label">Starting from</span>
            <span className="starting-price">${startingPrice}</span>
          </div>

          <div className="product-actions">
            <button className="action-btn quick-quote-btn">Quick Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
