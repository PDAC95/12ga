import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay, Thumbs, Zoom } from "swiper/modules";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

// Enhanced mock data for trucks with gallery images
const trucksData = [
  {
    id: 1,
    make: "Peterbilt",
    year: "2023",
    model: "579",
    image: "/assets/img/trucks/peterbilt-579-custom.jpg",
    title: "Custom Peterbilt 579 Elite Build",
    description: "A masterpiece of engineering and aesthetics. This Peterbilt 579 underwent a complete transformation featuring premium paint work, performance exhaust system, and luxury interior upgrades. Every detail has been meticulously crafted to deliver both stunning visual impact and enhanced functionality.",
    features: [
      "Custom Metallic Paint Job",
      "Performance Exhaust System", 
      "Premium Interior Upgrade",
      "LED Lighting Package",
      "Chrome Accent Package",
      "Custom Bumper & Grille"
    ],
    category: "Long Haul",
    status: "Completed",
    specifications: {
      engine: "PACCAR MX-13",
      transmission: "Eaton Fuller 18-Speed",
      horsepower: "500 HP",
      torque: "1,850 lb-ft"
    },
    gallery: [
      "/assets/img/trucks/peterbilt-579-custom.jpg",
      "/assets/img/trucks/peterbilt-579-front.jpg",
      "/assets/img/trucks/peterbilt-579-side.jpg",
      "/assets/img/trucks/peterbilt-579-interior.jpg",
      "/assets/img/trucks/peterbilt-579-engine.jpg",
      "/assets/img/trucks/peterbilt-579-rear.jpg"
    ],
    projectDetails: {
      duration: "6 weeks",
      client: "TransLogistics Corp",
      completedDate: "March 2024"
    }
  },
  {
    id: 2,
    make: "Kenworth",
    year: "2022", 
    model: "W900",
    image: "/assets/img/trucks/kenworth-w900-custom.png",
    title: "Classic Kenworth W900 Chrome Edition",
    description: "A tribute to the golden age of trucking with modern performance. This W900 features our signature chrome package, custom lighting system, and polished aluminum wheels that make it a true head-turner on any highway.",
    features: [
      "Premium Chrome Package",
      "Custom LED Lighting System",
      "Polished Aluminum Wheels",
      "Luxury Leather Interior",
      "Sound System Upgrade",
      "Custom Dashboard"
    ],
    category: "Show Truck",
    status: "Completed",
    specifications: {
      engine: "Cummins X15",
      transmission: "Eaton Fuller 13-Speed",
      horsepower: "565 HP", 
      torque: "2,050 lb-ft"
    },
    gallery: [
      "/assets/img/trucks/kenworth-w900-custom.png",
      "/assets/img/trucks/kenworth-w900-chrome.jpg",
      "/assets/img/trucks/kenworth-w900-lights.jpg",
      "/assets/img/trucks/kenworth-w900-wheels.jpg",
      "/assets/img/trucks/kenworth-w900-cabin.jpg"
    ],
    projectDetails: {
      duration: "8 weeks",
      client: "Miller Transport",
      completedDate: "January 2024"
    }
  },
  {
    id: 3,
    make: "Freightliner",
    year: "2024",
    model: "Cascadia",
    image: "/assets/img/trucks/freightliner-cascadia-custom.png",
    title: "Freightliner Cascadia Elite Performance",
    description: "The future of trucking optimization. Featuring advanced aerodynamic modifications, fuel efficiency upgrades, and smart technology integration for maximum performance and minimal environmental impact.",
    features: [
      "Aerodynamic Body Kit",
      "Fuel Efficiency Upgrades",
      "Smart Technology Integration",
      "Custom Dashboard Display",
      "Advanced Safety Systems",
      "Eco-Friendly Modifications"
    ],
    category: "Efficiency",
    status: "In Progress",
    specifications: {
      engine: "Detroit DD15",
      transmission: "Detroit DT12",
      horsepower: "505 HP",
      torque: "1,750 lb-ft"
    },
    gallery: [
      "/assets/img/trucks/freightliner-cascadia-custom.png",
      "/assets/img/trucks/freightliner-cascadia-aero.jpg",
      "/assets/img/trucks/freightliner-cascadia-tech.jpg",
      "/assets/img/trucks/freightliner-cascadia-dashboard.jpg"
    ],
    projectDetails: {
      duration: "10 weeks",
      client: "EcoFleet Solutions",
      completedDate: "In Progress"
    }
  }
];

const SingleTruck = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const truck = trucksData.find((truck) => truck.id === parseInt(id));
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const mainSwiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const navigateToTruck = (direction) => {
    const currentId = parseInt(id);
    const targetId = direction === 'next' ? currentId + 1 : currentId - 1;
    const targetTruck = trucksData.find(truck => truck.id === targetId);
    
    if (targetTruck) {
      navigate(`/truck/${targetId}`);
    }
  };

  // Check if navigation is available
  const currentId = parseInt(id);
  const hasPrevTruck = trucksData.some(truck => truck.id === currentId - 1);
  const hasNextTruck = trucksData.some(truck => truck.id === currentId + 1);

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
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`single-truck-container ${isLoaded ? 'loaded' : ''}`}>
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
                nextEl: '.truck-swiper-next',
                prevEl: '.truck-swiper-prev',
              }}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              zoom={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="main-truck-swiper"
            >
              {truck.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img 
                      src={image} 
                      alt={`${truck.title} - View ${index + 1}`}
                      className="truck-main-image"
                    />
                  </div>
                  <div className="image-counter">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="separator">/</span>
                    <span>{String(truck.gallery.length).padStart(2, '0')}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation */}
            <div className="swiper-navigation">
              <button className="truck-swiper-prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="truck-swiper-next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="gallery-thumbnails" data-aos="fade-up" data-aos-delay="200">
            <Swiper
              modules={[Navigation]}
              onSwiper={setThumbsSwiper}
              spaceBetween={15}
              slidesPerView={5}
              watchSlidesProgress={true}
              breakpoints={{
                320: { slidesPerView: 3, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 12 },
                1024: { slidesPerView: 5, spaceBetween: 15 }
              }}
              className="thumbnails-swiper"
            >
              {truck.gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={`thumbnail-item ${index === activeIndex ? 'active' : ''}`}>
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
                    <span className={`status-badge ${truck.status.toLowerCase().replace(' ', '-')}`}>
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
                      <div key={index} className="feature-item" data-aos="fade-up" data-aos-delay={index * 50}>
                        <div className="feature-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <div className="truck-specs-sidebar" data-aos="fade-left" data-aos-delay="100">
                
                {/* Technical Specs */}
                <div className="specs-card">
                  <h3 className="card-title">Technical Specifications</h3>
                  <div className="specs-list">
                    {Object.entries(truck.specifications).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="project-card">
                  <h3 className="card-title">Project Details</h3>
                  <div className="project-list">
                    <div className="project-item">
                      <span className="project-label">Duration:</span>
                      <span className="project-value">{truck.projectDetails.duration}</span>
                    </div>
                    <div className="project-item">
                      <span className="project-label">Client:</span>
                      <span className="project-value">{truck.projectDetails.client}</span>
                    </div>
                    <div className="project-item">
                      <span className="project-label">Completed:</span>
                      <span className="project-value">{truck.projectDetails.completedDate}</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="cta-section">
                  <Link to="/contact" className="cta-button">
                    <span>Start Your Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Gallery</span>
          </Link>
          
          <div className="truck-nav-arrows">
            <button 
              className={`nav-button prev-truck ${!hasPrevTruck ? 'disabled' : ''}`}
              onClick={() => navigateToTruck('prev')}
              disabled={!hasPrevTruck}
              title={hasPrevTruck ? "Previous Truck" : "No previous truck"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`nav-button next-truck ${!hasNextTruck ? 'disabled' : ''}`}
              onClick={() => navigateToTruck('next')}
              disabled={!hasNextTruck}
              title={hasNextTruck ? "Next Truck" : "No next truck"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    </div>
  );
};

export default SingleTruck;