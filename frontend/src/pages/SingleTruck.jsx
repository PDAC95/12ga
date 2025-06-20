import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Thumbs } from "swiper/modules";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import { useTruckBySlug } from "../helper/useTrucks";

const SingleTruck = () => {
  const { slug } = useParams();

  // Use the custom hook instead of hardcoded data
  const { truck, loading, error } = useTruckBySlug(slug);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // 🆕 NEW: Add video tab support
  const [activeTab, setActiveTab] = useState("gallery");
  const mainSwiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 🆕 NEW: Set default tab based on available content
  useEffect(() => {
    if (truck) {
      const hasVideo = truck.hasVideo && truck.videoUrl;
      const hasGallery = truck.gallery && truck.gallery.length > 0;

      if (hasVideo && !hasGallery) {
        setActiveTab("video");
      } else {
        setActiveTab("gallery");
      }
    }
  }, [truck]);

  // Handle lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setLightboxIndex((prev) =>
      prev === truck.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setLightboxIndex((prev) =>
      prev === 0 ? truck.gallery.length - 1 : prev - 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Loading state
  if (loading) {
    return (
      <div className="single-truck-container">
        <CommonPageHero title={"Loading..."} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="truck-loading" data-aos="fade-up">
            <div className="loading-spinner"></div>
            <p>Loading truck details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="single-truck-container">
        <CommonPageHero title={"Error"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="truck-error" data-aos="fade-up">
            <h2>Error Loading Truck</h2>
            <p>{error}</p>
            <Link to="/truck-gallery" className="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Truck not found
  if (!truck) {
    return (
      <div className="single-truck-container">
        <CommonPageHero title={"Truck Not Found"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="truck-not-found" data-aos="fade-up">
            <h2>Truck Not Found</h2>
            <p>The truck you're looking for doesn't exist in our gallery.</p>
            <Link to="/truck-gallery" className="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 🆕 NEW: Check available content
  const hasVideo = truck.hasVideo && truck.videoUrl;
  const hasGallery = truck.gallery && truck.gallery.length > 0;

  return (
    <div className={`single-truck-container ${isLoaded ? "loaded" : ""}`}>
      <CommonPageHero title={truck.title} />

      <div className="container">
        <div className="ak-height-75 ak-height-lg-50"></div>

        {/* 🆕 NEW: Media Tabs - only show if both video and gallery exist */}
        {hasVideo && hasGallery && (
          <div className="media-tabs" data-aos="fade-up">
            <button
              className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`}
              onClick={() => setActiveTab("gallery")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8L15 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M14 3V9H20" stroke="currentColor" strokeWidth="2" />
              </svg>
              Photos ({truck.gallery.length} photos)
            </button>
            <button
              className={`tab-btn ${activeTab === "video" ? "active" : ""}`}
              onClick={() => setActiveTab("video")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
              Video
            </button>
          </div>
        )}

        {/* 🆕 NEW: Video Section */}
        {hasVideo && (activeTab === "video" || !hasGallery) && (
          <div
            className="video-section"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="video-container">
              <div className="video-wrapper">
                <iframe
                  src={truck.videoUrl}
                  title={`${truck.title} Build Video`}
                  className="truck-video"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>

              <div className="video-info">
                <h3 className="video-title">{truck.title} Video</h3>
                <div className="video-meta">
                  <span className="video-category">Video</span>
                  <span className="video-separator">•</span>
                  <span className="video-make">
                    {truck.year} {truck.make} {truck.model}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Original Gallery Section - now conditional */}
        {hasGallery && (activeTab === "gallery" || !hasVideo) && (
          <div className="truck-hero-gallery" data-aos="fade-up">
            <div className="main-gallery">
              <Swiper
                modules={[Navigation, EffectFade, Autoplay, Thumbs]}
                ref={mainSwiperRef}
                spaceBetween={30}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                navigation={{
                  nextEl: ".truck-swiper-next",
                  prevEl: ".truck-swiper-prev",
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="main-truck-swiper"
              >
                {truck.gallery.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="truck-image-container"
                      onClick={() => openLightbox(index)}
                    >
                      <img
                        src={image}
                        alt={`${truck.title} - View ${index + 1}`}
                        className="truck-main-image"
                        style={{ cursor: "pointer" }}
                      />
                      <div className="image-overlay">
                        <div className="image-counter">
                          {index + 1} / {truck.gallery.length}
                        </div>
                        <div className="zoom-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="11"
                              cy="11"
                              r="8"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="m21 21-4.35-4.35"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="8"
                              y1="11"
                              x2="14"
                              y2="11"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <line
                              x1="11"
                              y1="8"
                              x2="11"
                              y2="14"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Controls */}
              <div className="swiper-navigation">
                <button className="truck-swiper-prev swiper-nav-btn">
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
                <button className="truck-swiper-next swiper-nav-btn">
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
              </div>
            </div>

            {/* Thumbnails Gallery */}
            <div className="gallery-thumbnails">
              <Swiper
                modules={[Navigation, Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={15}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                className="thumbnails-swiper"
                breakpoints={{
                  320: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {truck.gallery.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`thumbnail-item ${
                        index === activeIndex ? "active" : ""
                      }`}
                      onClick={() => openLightbox(index)}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}

        <div className="ak-height-100 ak-height-lg-60"></div>

        {/* Truck Information Grid */}
        <div className="truck-info-grid">
          <div className="row g-4">
            {/* Main Info Column */}
            <div className="col-lg-8">
              <div className="truck-main-info" data-aos="fade-right">
                <div className="truck-header">
                  <div className="truck-meta">
                    <span className="meta-item year">{truck.year}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item make">{truck.make}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item model">{truck.model}</span>
                  </div>
                  <h1 className="truck-title">{truck.title}</h1>
                  <div className="status-category">
                    <span
                      className={`status-badge ${truck.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {truck.status}
                    </span>
                    <span className="category-badge">{truck.category}</span>
                  </div>
                </div>

                <div className="truck-description">
                  <p>{truck.description}</p>
                </div>

                {/* Features Grid */}
                <div className="features-section">
                  <h3 className="section-title">Custom Features</h3>
                  <div className="features-grid">
                    {truck.features.map((feature, index) => (
                      <div
                        key={index}
                        className="feature-item"
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        <div className="feature-icon">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Sidebar */}
            <div className="col-lg-4">
              <div
                className="truck-specs-sidebar"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                {/* 🆕 NEW: Media Status Card */}
                <div className="media-status-card">
                  <h3 className="card-title">Available Content</h3>
                  <div className="media-status-list">
                    <div className="media-status-item">
                      <span className="media-icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M15 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8L15 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </span>
                      <span className="media-label">Photos:</span>
                      <span
                        className={`media-value ${
                          hasGallery ? "available" : "unavailable"
                        }`}
                      >
                        {hasGallery
                          ? `${truck.gallery.length} images`
                          : "Not available"}
                      </span>
                    </div>
                    <div className="media-status-item">
                      <span className="media-icon">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="media-label">Video:</span>
                      <span
                        className={`media-value ${
                          hasVideo ? "available" : "unavailable"
                        }`}
                      >
                        {hasVideo ? "Available" : "Not available"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Specs */}
                <div className="specs-card">
                  <h3 className="card-title">Technical Specifications</h3>
                  <div className="specs-list">
                    {Object.entries(truck.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="spec-item">
                          <span className="spec-label">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <span className="spec-value">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-card">
                  <h3 className="card-title">Project Details</h3>
                  <div className="project-list">
                    <div className="project-item">
                      <span className="project-label">Duration:</span>
                      <span className="project-value">
                        {truck.projectDetails.duration}
                      </span>
                    </div>
                    <div className="project-item">
                      <span className="project-label">Client:</span>
                      <span className="project-value">
                        {truck.projectDetails.client}
                      </span>
                    </div>
                    <div className="project-item">
                      <span className="project-label">Completed:</span>
                      <span className="project-value">
                        {truck.projectDetails.completedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="cta-section">
                  <Link to="/contact" className="cta-button">
                    <span>Start Your Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ak-height-75 ak-height-lg-50"></div>

        {/* 🆕 UPDATED: Navigation Section with dual buttons */}
        <div className="truck-navigation" data-aos="fade-up">
          <Link to="/truck-gallery" className="nav-button back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to Gallery</span>
          </Link>

          <Link to="/video-gallery" className="nav-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            <span>View All Videos</span>
          </Link>
        </div>
      </div>

      {/* Original Lightbox Modal - unchanged */}
      {lightboxOpen && hasGallery && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <button className="lightbox-prev" onClick={prevImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <button className="lightbox-next" onClick={nextImage}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className="lightbox-image-wrapper">
              <img
                src={truck.gallery[lightboxIndex]}
                alt={`${truck.title} - View ${lightboxIndex + 1}`}
                className="lightbox-image"
              />
            </div>

            <div className="lightbox-counter">
              {lightboxIndex + 1} / {truck.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTruck;
