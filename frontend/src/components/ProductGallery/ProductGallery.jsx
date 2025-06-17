import React, { useState, useEffect } from "react";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default images if product doesn't have gallery
  const defaultImages = [
    "/assets/img/parts/default-product-1.jpg",
    "/assets/img/parts/default-product-2.jpg",
    "/assets/img/parts/default-product-3.jpg",
  ];

  const images =
    product?.gallery || product?.images || [product?.image] || defaultImages;

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const handleModalPrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
      if (e.key === "ArrowRight") {
        handleModalNextImage();
      }
      if (e.key === "ArrowLeft") {
        handleModalPrevImage();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="product-gallery" data-aos="fade-right">
        {/* Main Image Display */}
        <div className="gallery-main">
          <div
            className={`main-image-container ${isZoomed ? "zoomed" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={handleImageClick}
          >
            <img
              src={images[selectedImage]}
              alt={`${product?.name || "Product"} - Image ${selectedImage + 1}`}
              className="main-image"
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      transform: "scale(1.5)",
                    }
                  : {}
              }
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="gallery-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  className="gallery-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Click to Expand Icon */}
            <div className="expand-hint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Click to expand</span>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="image-counter">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="gallery-thumbnails">
            <div className="thumbnails-container">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-item ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => handleImageSelect(index)}
                  onMouseEnter={() => handleImageSelect(index)}
                >
                  <img
                    src={image}
                    alt={`${product?.name || "Product"} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                  {selectedImage === index && (
                    <div className="thumbnail-overlay">
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
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Actions */}
        <div className="gallery-actions">
          <button className="action-btn" onClick={handleImageClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Full Size
          </button>

          <button className="action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="7,10 12,15 17,10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="12"
                y1="15"
                x2="12"
                y2="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Download Images
          </button>

          <button className="action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle
                cx="18"
                cy="5"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="6"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="19"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="8.59"
                y1="13.51"
                x2="15.42"
                y2="17.49"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="15.41"
                y1="6.51"
                x2="8.59"
                y2="10.49"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Full Size Modal */}
      {isModalOpen && (
        <div className="image-modal-overlay" onClick={handleCloseModal}>
          <div className="image-modal-container">
            <div className="image-modal-content">
              <img
                src={images[selectedImage]}
                alt={`${product?.name || "Product"} - Full size`}
                className="modal-image"
              />

              {/* Modal Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    className="modal-nav prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalPrevImage();
                    }}
                    aria-label="Previous image"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    className="modal-nav next"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModalNextImage();
                    }}
                    aria-label="Next image"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              {/* Modal Counter */}
              {images.length > 1 && (
                <div className="modal-counter">
                  {selectedImage + 1} / {images.length}
                </div>
              )}

              {/* Modal Info */}
              <div className="modal-info">
                <h4>{product?.name || "Product Image"}</h4>
                <p>
                  Image {selectedImage + 1} of {images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
