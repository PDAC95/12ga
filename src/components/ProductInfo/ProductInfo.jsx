import React, { useState } from "react";

const ProductInfo = ({ product, onRequestQuote }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  if (!product) {
    return (
      <div className="product-info-loading">Loading product information...</div>
    );
  }

  const handleOptionChange = (optionType, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: value,
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleRequestQuote = () => {
    const quoteData = {
      product: product,
      selectedOptions: selectedOptions,
      quantity: quantity,
    };
    onRequestQuote(quoteData);
  };

  return (
    <div className="product-info" data-aos="fade-left">
      {/* Product Summary */}
      <div className="product-summary">
        <div className="price-section">
          {product.priceRange ? (
            <div className="price-range">
              <span className="price-label">Price Range:</span>
              <span className="price-value">{product.priceRange}</span>
            </div>
          ) : (
            <div className="price-custom">
              <span className="price-label">Custom Pricing</span>
              <span className="price-note">Quote required</span>
            </div>
          )}
        </div>

        {/* Availability Status */}
        <div className="availability-section">
          <div
            className={`availability-status ${
              product.inStock ? "in-stock" : "out-stock"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              {product.inStock ? (
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
            <span>{product.inStock ? "In Stock" : "Made to Order"}</span>
          </div>

          {product.leadTime && (
            <div className="lead-time">
              <span>Lead Time: {product.leadTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Options */}
      {product.options && product.options.length > 0 && (
        <div className="product-options">
          <h4>Customization Options</h4>
          {product.options.map((option, index) => (
            <div key={index} className="option-group">
              <label className="option-label">{option.name}</label>
              {option.type === "select" && (
                <select
                  className="option-select"
                  value={selectedOptions[option.name] || ""}
                  onChange={(e) =>
                    handleOptionChange(option.name, e.target.value)
                  }
                >
                  <option value="">Select {option.name}</option>
                  {option.values.map((value, valueIndex) => (
                    <option key={valueIndex} value={value.name}>
                      {value.name} {value.price && `(+${value.price})`}
                    </option>
                  ))}
                </select>
              )}

              {option.type === "color" && (
                <div className="color-options">
                  {option.values.map((color, colorIndex) => (
                    <button
                      key={colorIndex}
                      className={`color-option ${
                        selectedOptions[option.name] === color.name
                          ? "selected"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() =>
                        handleOptionChange(option.name, color.name)
                      }
                      title={color.name}
                    >
                      {selectedOptions[option.name] === color.name && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {option.type === "radio" && (
                <div className="radio-options">
                  {option.values.map((value, valueIndex) => (
                    <label key={valueIndex} className="radio-option">
                      <input
                        type="radio"
                        name={option.name}
                        value={value.name}
                        checked={selectedOptions[option.name] === value.name}
                        onChange={(e) =>
                          handleOptionChange(option.name, e.target.value)
                        }
                      />
                      <span className="radio-label">
                        {value.name} {value.price && `(+${value.price})`}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selector */}
      <div className="quantity-section">
        <label className="quantity-label">Quantity</label>
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <input
            type="number"
            className="quantity-input"
            value={quantity}
            onChange={(e) =>
              handleQuantityChange(parseInt(e.target.value) || 1)
            }
            min="1"
          />

          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="product-actions-main">
        <button
          className="btn-primary btn-quote-main"
          onClick={handleRequestQuote}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Request Custom Quote
        </button>

        <button className="btn-secondary btn-consultation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Schedule Consultation
        </button>
      </div>

      {/* Quick Specifications */}
      {product.specifications && (
        <div className="quick-specs">
          <h4>Quick Specifications</h4>
          <div className="specs-grid">
            {Object.entries(product.specifications)
              .slice(0, showFullSpecs ? undefined : 6)
              .map(([key, value], index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{key}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
          </div>

          {Object.entries(product.specifications).length > 6 && (
            <button
              className="specs-toggle"
              onClick={() => setShowFullSpecs(!showFullSpecs)}
            >
              {showFullSpecs
                ? "Show Less"
                : `Show All (${Object.entries(product.specifications).length})`}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d={showFullSpecs ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Trust Signals */}
      <div className="trust-signals">
        <div className="trust-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Lifetime Warranty</span>
        </div>

        <div className="trust-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Expert Installation</span>
        </div>

        <div className="trust-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polyline
              points="9,22 9,12 15,12 15,22"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <span>Made in USA</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
