import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const TruckGalleryPreview = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured trucks from backend
  useEffect(() => {
    const fetchFeaturedTrucks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/trucks/featured"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch featured trucks");
        }

        const data = await response.json();
        // Take only first 5 trucks for preview
        setTrucks(data.trucks?.slice(0, 5) || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching featured trucks:", err);
        setError(err.message);
        // Fallback to empty array if fetch fails
        setTrucks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTrucks();
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex + 1);
  };

  const openModal = (truck) => {
    setSelectedImage(truck);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="truck-gallery-new">
        {/* Header Section - ALWAYS VISIBLE */}
        <div className="ak-height-125 ak-height-lg-80"></div>
        <div className="container">
          <div className="center-section-heading" data-aos="fade-up">
            <div className="ak-section-heading ak-style-1">
              <div className="background-text" data-aos="fade-left">
                Trucks
              </div>
              <div className="text-md-center">
                <h2 className="ak-section-title">Trucks</h2>
                <p className="ak-section-subtitle">
                  Loading our featured truck gallery...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ak-height-75 ak-height-lg-50"></div>
        <div className="gallery-loading">
          <div className="loading-spinner"></div>
        </div>
        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="truck-gallery-new">
        {/* Header Section - ALWAYS VISIBLE */}
        <div className="ak-height-125 ak-height-lg-80"></div>
        <div className="container">
          <div className="center-section-heading" data-aos="fade-up">
            <div className="ak-section-heading ak-style-1">
              <div className="background-text" data-aos="fade-left">
                Trucks
              </div>
              <div className="text-md-center">
                <h2 className="ak-section-title">Trucks</h2>
                <p className="ak-section-subtitle">
                  Unable to load truck gallery. Please try again later.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    );
  }

  // No trucks available
  if (trucks.length === 0) {
    return (
      <div className="truck-gallery-new">
        {/* Header Section - ALWAYS VISIBLE */}
        <div className="ak-height-125 ak-height-lg-80"></div>
        <div className="container">
          <div className="center-section-heading" data-aos="fade-up">
            <div className="ak-section-heading ak-style-1">
              <div className="background-text" data-aos="fade-left">
                Trucks
              </div>
              <div className="text-md-center">
                <h2 className="ak-section-title">Trucks</h2>
                <p className="ak-section-subtitle">
                  No featured trucks available at the moment.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    );
  }

  return (
    <div className="truck-gallery-new">
      {/* Header Section - ALWAYS VISIBLE */}
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="container">
        <div className="center-section-heading" data-aos="fade-up">
          <div className="ak-section-heading ak-style-1">
            <div className="background-text" data-aos="fade-left">
              Trucks
            </div>
            <div className="text-md-center">
              <h2 className="ak-section-title">Trucks</h2>
              <p className="ak-section-subtitle">
                Explore our Truck Gallery and witness the power of
                customization.
                <br />
                From rugged builds to standout details — this is where bold
                design meets top-tier craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="ak-height-75 ak-height-lg-50"></div>
      <div className="gallery-slider-container">
        <Swiper
          modules={[Navigation, EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={0}
          loop={trucks.length >= 3}
          speed={1800}
          autoplay={
            trucks.length > 1
              ? {
                  delay: 6000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          coverflowEffect={{
            rotate: 12,
            stretch: -45,
            depth: 300,
            modifier: 1.5,
            slideShadows: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          className="truck-swiper"
        >
          {trucks.map((truck, index) => (
            <SwiperSlide key={truck._id} className="truck-slide">
              <div className="slide-content">
                <Link to={`/truck/${truck.slug}`} className="image-container">
                  <img
                    src={
                      truck.images?.[0] ||
                      truck.image ||
                      "/assets/img/trucks/default-truck.jpg"
                    }
                    alt={truck.name || `Custom Truck Build ${index + 1}`}
                    className="truck-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <div className="truck-number">
                        #{String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="truck-title">
                        {truck.title ||
                          truck.name ||
                          `${truck.year} ${truck.make} ${truck.model}`}
                      </h3>
                      <p className="truck-subtitle">
                        Handcrafted Excellence by 12GA Customs
                      </p>
                      <div className="truck-specs">
                        <div className="spec">
                          <span className="spec-label">Make</span>
                          <span className="spec-value">
                            {truck.make || "Custom"}
                          </span>
                        </div>
                        <div className="spec">
                          <span className="spec-label">Year</span>
                          <span className="spec-value">
                            {truck.year || "2024"}
                          </span>
                        </div>
                      </div>
                      <div className="view-details-btn">
                        <span>View Details</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation - Only show if 3 or more trucks */}
        {trucks.length >= 3 && (
          <div className="slider-navigation">
            <button
              className="nav-btn nav-prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            <div className="slide-counter">
              <span className="current">
                {String(currentSlide).padStart(2, "0")}
              </span>
              <span className="divider">—</span>
              <span className="total">
                {String(trucks.length).padStart(2, "0")}
              </span>
            </div>

            <button
              className="nav-btn nav-next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* View All Button */}
      <div className="ak-height-75 ak-height-lg-50"></div>
      <div className="container text-center">
        <Link to="/truck-gallery" className="view-all-btn">
          <span>VIEW ALL TRUCKS</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </Link>
      </div>
      <div className="ak-height-125 ak-height-lg-80"></div>

      {/* Simple Modal */}
      {isModalOpen && selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <img
              src={
                selectedImage.images?.[0] ||
                selectedImage.image ||
                "/assets/img/trucks/default-truck.jpg"
              }
              alt={selectedImage.name || "Custom Truck"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckGalleryPreview;
