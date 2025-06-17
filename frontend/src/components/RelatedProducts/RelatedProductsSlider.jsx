import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import RelatedProductCard from "./RelatedProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RelatedProductsSlider = ({
  products,
  onQuoteRequest,
  onCompare,
  loading,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (loading) {
    return (
      <div className="related-slider-loading">
        <div className="loading-cards">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="loading-card">
              <div className="loading-image"></div>
              <div className="loading-content">
                <div className="loading-line"></div>
                <div className="loading-line short"></div>
                <div className="loading-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="related-slider-empty">
        <div className="empty-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h4>No related products available</h4>
          <p>Check back later for more recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="related-products-slider">
      {/* Navigation Buttons */}
      <div className="slider-navigation">
        <button
          ref={prevRef}
          className="nav-btn prev-btn"
          aria-label="Previous products"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          ref={nextRef}
          className="nav-btn next-btn"
          aria-label="Next products"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={products.length > 1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 3.5,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="related-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <RelatedProductCard
              product={product}
              onQuoteRequest={onQuoteRequest}
              onCompare={onCompare}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Products Counter */}
      <div className="slider-info">
        <span className="products-count">
          Showing {products.length} related product
          {products.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

export default RelatedProductsSlider;
