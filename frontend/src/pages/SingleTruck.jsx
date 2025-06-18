import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Thumbs, Zoom } from "swiper/modules";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import { useTruckBySlug, useTrucks } from "../helper/useTrucks";

const SingleTruck = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Use the custom hook instead of hardcoded data
  const { truck, loading, error } = useTruckBySlug(slug);
  const { trucks: allTrucks } = useTrucks(); // For navigation between trucks

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainSwiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className={`single-truck-container ${isLoaded ? "loaded" : ""}`}>
      <CommonPageHero title={truck.title} />

      <div className="container">
        <div className="ak-height-75 ak-height-lg-50"></div>

        {/* Hero Gallery Section */}
        <div className="truck-hero-gallery" data-aos="fade-up">
          <div className="main-gallery">
            <Swiper
              modules={[Navigation, EffectFade, Autoplay, Thumbs, Zoom]}
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
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              zoom={true}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="main-swiper"
            >
              {truck.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="truck-image-container">
                    <div className="swiper-zoom-container">
                      <img
                        src={image}
                        alt={`${truck.title} - View ${index + 1}`}
                        className="truck-main-image"
                      />
                    </div>
                    <div className="image-overlay">
                      <div className="image-counter">
                        {index + 1} / {truck.gallery.length}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
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

          {/* Thumbnails */}
          <div className="thumbs-gallery">
            <Swiper
              modules={[Navigation, Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={15}
              slidesPerView={5}
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbs-swiper"
              breakpoints={{
                320: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {truck.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`thumb-container ${
                      index === activeIndex ? "active" : ""
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

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

        {/* Navigation Section */}
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
        </div>
      </div>
    </div>
  );
};

export default SingleTruck;
