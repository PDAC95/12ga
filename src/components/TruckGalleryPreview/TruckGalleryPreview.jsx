import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const truckImages = [
  {
    id: 1,
    image: "/assets/img/trucks/Truck-1.png",
    alt: "Custom Truck Build 1",
    title: "Peterbilt 379 Custom",
    specs: { grade: "304 SS", finish: "Mirror" },
  },
  {
    id: 2,
    image: "/assets/img/trucks/Truck-2.png",
    alt: "Custom Truck Build 2",
    title: "Kenworth W900 Build",
    specs: { grade: "316 SS", finish: "Brushed" },
  },
  {
    id: 3,
    image: "/assets/img/trucks/Truck-3.png",
    alt: "Custom Truck Build 3",
    title: "Freightliner Classic",
    specs: { grade: "304 SS", finish: "Polished" },
  },
  {
    id: 4,
    image: "/assets/img/trucks/Truck-4.png",
    alt: "Custom Truck Build 4",
    title: "Mack Anthem Custom",
    specs: { grade: "304 SS", finish: "Mirror" },
  },
  {
    id: 5,
    image: "/assets/img/trucks/Truck-5.png",
    alt: "Custom Truck Build 5",
    title: "Volvo VNL Custom",
    specs: { grade: "316 SS", finish: "Satin" },
  },
];

const TruckGalleryPreview = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="truck-gallery-new">
      {/* Header Section */}
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="container">
        <div className="center-section-heading" data-aos="fade-up">
          <div className="ak-section-heading ak-style-1 ak-type-1">
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
          loop={true}
          speed={1800}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
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
          {truckImages.map((truck, index) => (
            <SwiperSlide key={truck.id} className="truck-slide">
              <div className="slide-content">
                <Link to={`/truck/${truck.id}`} className="image-container">
                  <img
                    src={truck.image}
                    alt={truck.alt}
                    className="truck-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <div className="truck-number">
                        #{String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="truck-title">{truck.title}</h3>
                      <p className="truck-subtitle">
                        Handcrafted Excellence by 12GA Customs
                      </p>
                      <div className="truck-specs">
                        <div className="spec">
                          <span className="spec-label">Grade</span>
                          <span className="spec-value">
                            {truck.specs.grade}
                          </span>
                        </div>
                        <div className="spec">
                          <span className="spec-label">Finish</span>
                          <span className="spec-value">
                            {truck.specs.finish}
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

        {/* Navigation */}
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
              {String(truckImages.length).padStart(2, "0")}
            </span>
          </div>

          <button
            className="nav-btn nav-next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
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
            <img src={selectedImage.image} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckGalleryPreview;
