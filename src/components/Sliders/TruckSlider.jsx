import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Parallax } from "swiper/modules";

// Datos de los trucks
const truckImages = [
  {
    id: 1,
    image: "/assets/img/trucks/truck-hero-1.jpg",
    alt: "Custom Truck Build 1",
    title: "PREMIUM BUILDS",
    subtitle: "Crafting Excellence",
    description: "Discover our premium custom truck builds where engineering meets artistry"
  },
  {
    id: 2,
    image: "/assets/img/trucks/truck-hero-2.jpg", 
    alt: "Custom Truck Build 2",
    title: "CUSTOM DESIGNS",
    subtitle: "Your Vision Realized",
    description: "Transform your ideas into reality with our bespoke truck customization services"
  },
  {
    id: 3,
    image: "/assets/img/trucks/truck-hero-3.jpg",
    alt: "Custom Truck Build 3",
    title: "PERFORMANCE MODS",
    subtitle: "Power & Style",
    description: "Enhance both performance and aesthetics with our expert modifications"
  },
  {
    id: 4,
    image: "/assets/img/trucks/truck-hero-4.jpg",
    alt: "Custom Truck Build 4",
    title: "LUXURY INTERIORS",
    subtitle: "Comfort Redefined",
    description: "Experience ultimate comfort with our premium interior customizations"
  },
  {
    id: 5,
    image: "/assets/img/trucks/truck-hero-5.jpg",
    alt: "Custom Truck Build 5",
    title: "RESTORATION",
    subtitle: "Classic Revival",
    description: "Bringing classic trucks back to life with modern performance and style"
  }
];

const TruckSlider = () => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const openTruckSelector = () => {
    // Función para abrir el selector de trucks
    console.log("Opening truck selector...");
  };

  return (
    <div className={`modern-truck-hero ${isLoaded ? 'loaded' : ''}`}>
      {/* Gradient Overlays */}
      <div className="hero-gradient-overlay"></div>
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              '--delay': `${i * 0.2}s`,
              '--duration': `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Hero Slider */}
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        parallax={true}
        navigation={{
          nextEl: ".hero-nav-next",
          prevEl: ".hero-nav-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        className="hero-swiper"
      >
        {truckImages.map((truck, index) => (
          <SwiperSlide key={truck.id}>
            <div className="hero-slide">
              <div className="hero-image-container">
                <img 
                  src={truck.image} 
                  alt={truck.alt}
                  className="hero-image"
                  data-swiper-parallax="-300"
                />
                <div className="image-overlay"></div>
              </div>
              
              <div className="hero-content">
                <div className="container">
                  <div className="hero-text-container">
                    <div className="hero-text" data-swiper-parallax="-400">
                      <span className="hero-subtitle" data-swiper-parallax="-200">
                        {truck.subtitle}
                      </span>
                      <h1 className="hero-title" data-swiper-parallax="-300">
                        {truck.title}
                      </h1>
                      <p className="hero-description" data-swiper-parallax="-100">
                        {truck.description}
                      </p>
                      <div className="hero-actions" data-swiper-parallax="0">
                        <button className="hero-btn primary" onClick={openTruckSelector}>
                          <span>View Project</span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button className="hero-btn secondary" onClick={openTruckSelector}>
                          <span>Find My Truck</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <div className="hero-navigation">
        <button className="hero-nav-btn hero-nav-prev">
          <div className="nav-btn-bg"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="hero-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentSlide + 1) / truckImages.length) * 100}%` }}
            ></div>
          </div>
          <span className="slide-counter">
            {String(currentSlide + 1).padStart(2, '0')} / {String(truckImages.length).padStart(2, '0')}
          </span>
        </div>
        
        <button className="hero-nav-btn hero-nav-next">
          <div className="nav-btn-bg"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {truckImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => swiperRef.current?.slideToLoop(index)}
          >
            <span className="indicator-line"></span>
          </button>
        ))}
      </div>

      {/* Social Media Links */}
      <div className="hero-social">
        <div className="social-line"></div>
        <a href="#" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
          </svg>
        </a>
        <a href="#" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
          </svg>
        </a>
        <a href="#" className="social-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor"/>
          </svg>
        </a>
        <div className="social-line"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </div>
  );
};

export default TruckSlider;