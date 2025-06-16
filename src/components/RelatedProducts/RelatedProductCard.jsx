import React from "react";
import { Link } from "react-router-dom";

const RelatedProductCard = ({ product, onQuoteRequest, onCompare }) => {
  const handleQuoteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuoteRequest(product);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare(product);
  };

  return (
    <div className="related-product-card">
      {/* Product Image */}
      <div className="card-image-wrapper">
        <Link to={`/product/${product.slug}`} className="image-link">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <div className="image-overlay">
            <span className="view-details">View Details</span>
          </div>
        </Link>

        {/* Badges */}
        <div className="product-badges">
          {product.isNew && <span className="badge badge-new">NEW</span>}
          {product.isFeatured && (
            <span className="badge badge-featured">FEATURED</span>
          )}
          {product.isCustomizable && (
            <span className="badge badge-custom">CUSTOM</span>
          )}
        </div>

        {/* Stock Status */}
        <div className="stock-status">
          <span
            className={`status-indicator ${
              product.isInStock ? "in-stock" : "made-to-order"
            }`}
          >
            {product.isInStock ? "In Stock" : "Made to Order"}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="card-content">
        {/* Category */}
        <div className="product-category">{product.category.name}</div>

        {/* Product Name */}
        <h4 className="product-name">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h4>

        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={star <= Math.floor(product.rating) ? "#FF3D24" : "none"}
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

        {/* Price */}
        <div className="product-price">{product.priceRange}</div>

        {/* Key Features */}
        <div className="key-features">
          {product.keyFeatures.slice(0, 2).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
          {product.keyFeatures.length > 2 && (
            <span className="feature-more">
              +{product.keyFeatures.length - 2} more
            </span>
          )}
        </div>

        {/* Compatibility */}
        <div className="compatibility">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
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

        {/* Action Buttons */}
        <div className="card-actions">
          <button
            className="btn-quote"
            onClick={handleQuoteClick}
            title="Request Quote"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Quote
          </button>

          <button
            className="btn-compare"
            onClick={handleCompareClick}
            title="Compare Product"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
    </div>
  );
};

export default RelatedProductCard;
