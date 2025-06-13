import React from "react";
import { useParams, Link } from "react-router-dom";

const ProductHero = ({ product, onRequestQuote }) => {
  if (!product) {
    return (
      <div className="product-hero-loading">
        <div className="container">
          <div className="loading-content">
            <h2>Loading product...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="product-hero">
      <div className="container">
        {/* Breadcrumb */}
        <div className="product-breadcrumb" data-aos="fade-up">
          <Link to="/parts" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Parts
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link
            to={`/parts/${product.category?.slug}`}
            className="breadcrumb-link"
          >
            {product.category?.name}
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        {/* Product Header */}
        <div className="product-header" data-aos="fade-up" data-aos-delay="100">
          <div className="product-badges">
            {product.isNew && (
              <span className="product-badge badge-new">New</span>
            )}
            {product.isFeatured && (
              <span className="product-badge badge-featured">Featured</span>
            )}
            {product.isCustomizable && (
              <span className="product-badge badge-custom">Customizable</span>
            )}
          </div>

          <h1 className="product-title">{product.name}</h1>

          <div className="product-meta">
            <span className="product-sku">SKU: {product.sku}</span>
            <span className="product-category">{product.category?.name}</span>
            {product.compatibility && (
              <span className="product-compatibility">
                Compatible: {product.compatibility.join(", ")}
              </span>
            )}
          </div>

          <p className="product-short-description">
            {product.shortDescription}
          </p>

          {/* Quick Actions */}
          <div className="product-actions">
            <button className="btn-quote primary" onClick={onRequestQuote}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Request Quote
            </button>

            <button className="btn-quote secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Call Expert
            </button>

            <button className="btn-quote tertiary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Save to Favorites
            </button>
          </div>

          {/* Key Features Quick Preview */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="product-key-features">
              <h4>Key Features:</h4>
              <ul className="features-list">
                {product.keyFeatures.slice(0, 4).map((feature, index) => (
                  <li key={index} className="feature-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
