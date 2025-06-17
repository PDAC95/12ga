import React from 'react';

const ImageModal = ({ 
  isOpen, 
  selectedImage, 
  onClose, 
  onOverlayClick 
}) => {
  if (!isOpen || !selectedImage) return null;

  return (
    <div 
      className="image-modal-overlay"
      onClick={onOverlayClick}
    >
      <div className="image-modal">
        <button 
          className="modal-close-btn"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="modal-content">
          <div className="modal-image-container">
            <img 
              src={selectedImage.image} 
              alt={selectedImage.alt}
              className="modal-image"
            />
          </div>
          
          <div className="modal-info">
            <h3 className="modal-title">{selectedImage.alt}</h3>
            <p className="modal-subtitle">Handcrafted Excellence by 12GA Customs</p>
            <div className="modal-details">
              <div className="detail-item">
                <span className="detail-label">Material</span>
                <span className="detail-value">304 Stainless Steel</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Finish</span>
                <span className="detail-value">Mirror Polish</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gauge</span>
                <span className="detail-value">16 GA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;