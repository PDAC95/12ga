import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

// Enhanced video data with detailed project info
const videosData = [
  {
    id: 1,
    title: "Peterbilt 579 Complete Build Timelapse",
    description: "Watch the complete transformation of this Peterbilt 579 from stock to show-stopper in this amazing timelapse video. This project showcases our expertise in full truck customization, from mechanical upgrades to aesthetic enhancements.",
    thumbnail: "/assets/img/videos/peterbilt-579-thumb.jpg",
    videoUrl: "/assets/videos/peterbilt-579-build.mp4",
    duration: "8:45",
    category: "Build Process",
    make: "Peterbilt",
    model: "579",
    year: "2023",
    views: "15.2K",
    likes: "324",
    publishDate: "2024-03-15",
    tags: ["Timelapse", "Custom Build", "Peterbilt", "Transformation"],
    projectDetails: {
      client: "TransLogistics Corp",
      duration: "6 weeks",
      completedDate: "March 2024",
      budget: "$45,000",
      location: "Atlanta, GA"
    },
    specifications: {
      engine: "PACCAR MX-13 500HP",
      transmission: "Eaton Fuller 18-Speed",
      wheelbase: "244 inches",
      modifications: "Custom exhaust, air ride suspension, LED lighting package"
    },
    workPerformed: [
      "Complete engine rebuild and performance tuning",
      "Custom metallic paint job with airbrushed details", 
      "Premium interior upholstery and dashboard upgrade",
      "LED lighting package installation (interior/exterior)",
      "Air ride suspension system installation",
      "Custom chrome package and detailing"
    ],
    gallery: [
      "/assets/img/videos/peterbilt-579-before.jpg",
      "/assets/img/videos/peterbilt-579-progress1.jpg",
      "/assets/img/videos/peterbilt-579-progress2.jpg",
      "/assets/img/videos/peterbilt-579-after.jpg"
    ]
  },
  {
    id: 2,
    title: "Kenworth W900 Chrome Installation",
    description: "Step by step chrome package installation on this classic Kenworth W900. See how we achieve that mirror finish and professional installation techniques.",
    thumbnail: "/assets/img/videos/kenworth-w900-thumb.jpg",
    videoUrl: "/assets/videos/kenworth-w900-chrome.mp4",
    duration: "12:30",
    category: "Installation",
    make: "Kenworth",
    model: "W900",
    year: "2022",
    views: "8.7K",
    likes: "189",
    publishDate: "2024-02-28",
    tags: ["Chrome", "Installation", "Kenworth", "Detail Work"],
    projectDetails: {
      client: "Miller Transport",
      duration: "3 weeks",
      completedDate: "February 2024",
      budget: "$28,000",
      location: "Houston, TX"
    },
    specifications: {
      engine: "Cummins X15 565HP",
      transmission: "Eaton Fuller 13-Speed",
      wheelbase: "265 inches",
      modifications: "Full chrome package, polished aluminum wheels, custom lighting"
    },
    workPerformed: [
      "Complete chrome bumper and grille installation",
      "Polished aluminum fuel tanks and toolboxes",
      "Custom mirror and light installation",
      "Chrome exhaust stack and heat shields",
      "Interior dashboard chrome accents",
      "Professional polishing and detailing"
    ],
    gallery: [
      "/assets/img/videos/kenworth-w900-before.jpg",
      "/assets/img/videos/kenworth-w900-chrome1.jpg",
      "/assets/img/videos/kenworth-w900-chrome2.jpg",
      "/assets/img/videos/kenworth-w900-after.jpg"
    ]
  },
  {
    id: 3,
    title: "Freightliner Cascadia Performance Mods",
    description: "Performance modifications and aerodynamic upgrades on this Freightliner Cascadia for maximum efficiency and power output.",
    thumbnail: "/assets/img/videos/freightliner-cascadia-thumb.jpg",
    videoUrl: "/assets/videos/freightliner-cascadia-performance.mp4",
    duration: "15:20",
    category: "Performance",
    make: "Freightliner",
    model: "Cascadia",
    year: "2024",
    views: "22.1K",
    likes: "567",
    publishDate: "2024-01-20",
    tags: ["Performance", "Aerodynamics", "Freightliner", "Efficiency"],
    projectDetails: {
      client: "EcoFleet Solutions",
      duration: "4 weeks",
      completedDate: "January 2024",
      budget: "$35,000",
      location: "Phoenix, AZ"
    },
    specifications: {
      engine: "Detroit DD15 505HP",
      transmission: "Detroit DT12 Automated",
      wheelbase: "228 inches",
      modifications: "Aerodynamic package, performance tuning, efficiency upgrades"
    },
    workPerformed: [
      "Engine performance tuning and calibration",
      "Aerodynamic body kit installation",
      "Fuel efficiency optimization",
      "Advanced driver assistance systems",
      "Smart dashboard and monitoring setup",
      "Emissions system optimization"
    ],
    gallery: [
      "/assets/img/videos/freightliner-cascadia-before.jpg",
      "/assets/img/videos/freightliner-cascadia-aero.jpg",
      "/assets/img/videos/freightliner-cascadia-engine.jpg",
      "/assets/img/videos/freightliner-cascadia-after.jpg"
    ]
  }
];

const SingleVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videosData.find((video) => video.id === parseInt(id));
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const navigateToVideo = (direction) => {
    const currentId = parseInt(id);
    const targetId = direction === 'next' ? currentId + 1 : currentId - 1;
    const targetVideo = videosData.find(video => video.id === targetId);
    
    if (targetVideo) {
      navigate(`/video/${targetId}`);
    }
  };

  // Check if navigation is available
  const currentId = parseInt(id);
  const hasPrevVideo = videosData.some(video => video.id === currentId - 1);
  const hasNextVideo = videosData.some(video => video.id === currentId + 1);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatViews = (views) => {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!video) {
    return (
      <div className="single-video-container">
        <CommonPageHero title={"Video Not Found"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="video-not-found" data-aos="fade-up">
            <h2>Video Not Found</h2>
            <p>The video you're looking for doesn't exist in our gallery.</p>
            <Link to="/video-gallery" className="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Video Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`single-video-container ${isLoaded ? 'loaded' : ''}`}>
      <CommonPageHero title={video.title} />
      
      <div className="container">
        <div className="ak-height-75 ak-height-lg-50"></div>
        
        {/* Main Video Player */}
        <div className="video-hero-section" data-aos="fade-up">
          <div className="main-video-player">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnail}
                className="main-video"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Custom Video Controls */}
              <div className="video-controls-overlay">
                <button className="play-pause-btn" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
                
                <div className="video-overlay-info">
                  <div className="video-meta">
                    <span className="video-duration">{video.duration}</span>
                    <span className="video-views">{formatViews(video.views)} views</span>
                    <span className="video-date">{formatDate(video.publishDate)}</span>
                  </div>
                  
                  <div className="video-actions">
                    <button className="control-btn" onClick={handleFullscreen}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M8 21H5C3.89543 21 3 20.1046 3 19V16" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="ak-height-100 ak-height-lg-60"></div>
        
        {/* Project Information Grid */}
        <div className="video-info-grid">
          <div className="row g-4">
            
            {/* Main Info Column */}
            <div className="col-lg-8">
              <div className="video-main-info" data-aos="fade-right">
                <div className="video-header">
                  <div className="video-meta-tags">
                    <span className="meta-item category">{video.category}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-item truck">{video.year} {video.make} {video.model}</span>
                  </div>
                  <h1 className="video-title">{video.title}</h1>
                  <div className="video-stats">
                    <div className="stat-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{formatViews(video.views)} views</span>
                    </div>
                    <div className="stat-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{video.likes} likes</span>
                    </div>
                    <div className="stat-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{formatDate(video.publishDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="video-description">
                  <p>{video.description}</p>
                </div>
                
                {/* Work Performed Section */}
                <div className="work-performed-section">
                  <h3 className="section-title">Work Performed</h3>
                  <div className="work-list">
                    {video.workPerformed.map((work, index) => (
                      <div key={index} className="work-item" data-aos="fade-up" data-aos-delay={index * 50}>
                        <div className="work-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="work-text">{work}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Project Gallery */}
                <div className="project-gallery-section">
                  <h3 className="section-title">Project Gallery</h3>
                  <div className="gallery-grid">
                    {video.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className={`gallery-item ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        data-aos="fade-up" 
                        data-aos-delay={index * 100}
                      >
                        <img src={image} alt={`Project step ${index + 1}`} />
                        <div className="gallery-overlay">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8L15 3Z" stroke="currentColor" strokeWidth="2"/>
                            <path d="M14 3V9H20" stroke="currentColor" strokeWidth="2"/>
                            <path d="M10 12L14 16L10 20" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Specifications Sidebar */}
            <div className="col-lg-4">
              <div className="video-specs-sidebar" data-aos="fade-left" data-aos-delay="100">
                
                {/* Technical Specs */}
                <div className="specs-card">
                  <h3 className="card-title">Vehicle Specifications</h3>
                  <div className="specs-list">
                    {Object.entries(video.specifications).map(([key, value]) => (
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
                    {Object.entries(video.projectDetails).map(([key, value]) => (
                      <div key={key} className="project-item">
                        <span className="project-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                        <span className="project-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="tags-card">
                  <h3 className="card-title">Tags</h3>
                  <div className="tags-list">
                    {video.tags.map((tag, index) => (
                      <span key={index} className="tag-item">{tag}</span>
                    ))}
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
        <div className="video-navigation" data-aos="fade-up">
          <Link to="/video-gallery" className="nav-button back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Video Gallery</span>
          </Link>
          
          <div className="video-nav-arrows">
            <button 
              className={`nav-button prev-video ${!hasPrevVideo ? 'disabled' : ''}`}
              onClick={() => navigateToVideo('prev')}
              disabled={!hasPrevVideo}
              title={hasPrevVideo ? "Previous Video" : "No previous video"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`nav-button next-video ${!hasNextVideo ? 'disabled' : ''}`}
              onClick={() => navigateToVideo('next')}
              disabled={!hasNextVideo}
              title={hasNextVideo ? "Next Video" : "No next video"}
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

export default SingleVideo;