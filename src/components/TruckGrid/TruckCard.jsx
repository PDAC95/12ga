import React, { useState } from "react";
import { Link } from "react-router-dom";

const TruckCard = ({ truck, viewMode = "grid" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (viewMode === "list") {
    return (
      <div className="truck-card truck-card-list">
        <div className="truck-card-image-container">
          <div className="image-wrapper">
            {!imageLoaded && (
              <div className="image-placeholder">
                <div className="placeholder-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}
            
            {imageError ? (
              <div className="image-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Image not available</span>
              </div>
            ) : (
              <img
                src={truck.image}
                alt={truck.title}
                className={`truck-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            <div className="image-overlay">
              <div className="overlay-content">
                <button className="view-details-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="truck-card-content">
          <div className="truck-header">
            <div className="truck-meta">
              <span className="truck-year">{truck.year}</span>
              <span className="truck-make">{truck.make}</span>
              {truck.model && <span className="truck-model">{truck.model}</span>}
            </div>
          </div>

          <h3 className="truck-title">
            <Link to={`/truck-details/${truck.id}`}>{truck.title}</Link>
          </h3>

          <p className="truck-description">
            {truck.description}
          </p>

          <div className="truck-features">
            {truck.features && truck.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>

          <div className="truck-card-footer">
            <div className="truck-category">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 7L12 3L4 7L12 11L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{truck.category}</span>
            </div>
            
            <Link to={`/truck-details/${truck.id}`} className="details-link">
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="truck-card truck-card-grid">
      <div className="truck-card-image-container">
        <div className="image-wrapper">
          {!imageLoaded && (
            <div className="image-placeholder">
              <div className="placeholder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 12L10 14L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
          
          {imageError ? (
            <div className="image-error">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Image not available</span>
            </div>
          ) : (
            <img
              src={truck.image}
              alt={truck.title}
              className={`truck-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          <div className="image-overlay">
            <div className="overlay-content">
              <button className="view-details-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>View Details</span>
              </button>
            </div>
          </div>

          <div className="corner-accents">
            <div className="corner-accent top-left"></div>
            <div className="corner-accent top-right"></div>
            <div className="corner-accent bottom-left"></div>
            <div className="corner-accent bottom-right"></div>
          </div>
        </div>
      </div>

      <div className="truck-card-content">
        <div className="truck-meta">
          <span className="truck-year">{truck.year}</span>
          <span className="truck-make">{truck.make}</span>
          {truck.model && <span className="truck-model">{truck.model}</span>}
        </div>

        <h3 className="truck-title">
          <Link to={`/truck-details/${truck.id}`}>
            {viewMode === "grid" ? truncateText(truck.title, 30) : truck.title}
          </Link>
        </h3>

        <p className="truck-description">
          {viewMode === "grid" 
            ? truncateText(truck.description, 80) 
            : truck.description
          }
        </p>

        <div className="truck-features">
          {truck.features && truck.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
          {truck.features && truck.features.length > 3 && (
            <span className="feature-tag more-features">
              +{truck.features.length - 3} more
            </span>
          )}
        </div>

        <div className="truck-card-footer">
          <div className="truck-category">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 7L12 3L4 7L12 11L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{truck.category}</span>
          </div>
          
          <Link to={`/truck-details/${truck.id}`} className="details-link">
            View Project
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;
