import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

// Mock data for video projects
const videosData = [
  {
    id: 1,
    title: "Peterbilt 579 Complete Build Timelapse",
    description: "Watch the complete transformation of this Peterbilt 579 from stock to show-stopper in this amazing timelapse video.",
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
    tags: ["Timelapse", "Custom Build", "Peterbilt", "Transformation"]
  },
  {
    id: 2,
    title: "Kenworth W900 Chrome Installation",
    description: "Step by step chrome package installation on this classic Kenworth W900. See how we achieve that mirror finish.",
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
    tags: ["Chrome", "Installation", "Kenworth", "Detail Work"]
  },
  {
    id: 3,
    title: "Freightliner Cascadia Performance Mods",
    description: "Performance modifications and aerodynamic upgrades on this Freightliner Cascadia for maximum efficiency.",
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
    tags: ["Performance", "Aerodynamics", "Freightliner", "Efficiency"]
  },
  {
    id: 4,
    title: "Mack Anthem Custom Paint Job",
    description: "Professional custom paint application on this Mack Anthem. From prep to final clear coat.",
    thumbnail: "/assets/img/videos/mack-anthem-thumb.jpg",
    videoUrl: "/assets/videos/mack-anthem-paint.mp4",
    duration: "18:15",
    category: "Paint Work",
    make: "Mack",
    model: "Anthem",
    year: "2023",
    views: "12.5K",
    likes: "298",
    publishDate: "2024-01-05",
    tags: ["Paint", "Custom", "Mack", "Airbrushing"]
  },
  {
    id: 5,
    title: "Volvo VNL Interior Transformation",
    description: "Complete interior makeover of this Volvo VNL including custom upholstery and entertainment system.",
    thumbnail: "/assets/img/videos/volvo-vnl-thumb.jpg",
    videoUrl: "/assets/videos/volvo-vnl-interior.mp4",
    duration: "10:55",
    category: "Interior",
    make: "Volvo",
    model: "VNL",
    year: "2023",
    views: "9.8K",
    likes: "234",
    publishDate: "2023-12-18",
    tags: ["Interior", "Upholstery", "Volvo", "Custom"]
  },
  {
    id: 6,
    title: "International LT LED Lighting Setup",
    description: "Complete LED lighting package installation on this International LT. From headlights to underglow.",
    thumbnail: "/assets/img/videos/international-lt-thumb.jpg",
    videoUrl: "/assets/videos/international-lt-lighting.mp4",
    duration: "14:40",
    category: "Lighting",
    make: "International",
    model: "LT",
    year: "2024",
    views: "18.3K",
    likes: "445",
    publishDate: "2023-11-25",
    tags: ["LED", "Lighting", "International", "Electronics"]
  }
];

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filter, setFilter] = useState("All");
  const videoRef = useRef(null);

  const categories = ["All", "Build Process", "Installation", "Performance", "Paint Work", "Interior", "Lighting"];
  
  const filteredVideos = filter === "All" 
    ? videosData 
    : videosData.filter(video => video.category === filter);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

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
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    }
  };

  const formatViews = (views) => {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="video-gallery-container">
      <CommonPageHero title={"Video Gallery"} />
      
      <div className="container">
        <div className="ak-height-125 ak-height-lg-80"></div>
        
        {/* Filter Section */}
        <div className="video-filters" data-aos="fade-up">
          <h3 className="filters-title">Filter by Category</h3>
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="ak-height-75 ak-height-lg-50"></div>
        
        {/* Main Content Layout */}
        <div className="video-layout">
          
          {/* Video Player Section */}
          <div className="video-player-section" data-aos="fade-right">
            {selectedVideo ? (
              <div className="video-player-container">
                <div className="video-wrapper">
                  <video
                    ref={videoRef}
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.thumbnail}
                    className="main-video"
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  
                  {/* Custom Video Controls */}
                  <div className="video-controls">
                    <button className="play-pause-btn" onClick={handlePlayPause}>
                      {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                      )}
                    </button>
                    
                    <div className="video-info">
                      <h4 className="video-title">{selectedVideo.title}</h4>
                      <div className="video-meta">
                        <span>{formatViews(selectedVideo.views)} views</span>
                        <span>•</span>
                        <span>{formatDate(selectedVideo.publishDate)}</span>
                      </div>
                    </div>
                    
                    <div className="video-actions">
                      <button className="action-btn" onClick={handleFullscreen}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M8 21H5C3.89543 21 3 20.1046 3 19V16" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Fullscreen</span>
                      </button>
                      
                      <Link to={`/video/${selectedVideo.id}`} className="action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>View Project</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" opacity="0.3"/>
                  </svg>
                  <h3>Select a video to start watching</h3>
                  <p>Choose from our collection of truck build videos below</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Video Grid Section */}
          <div className="video-grid-section" data-aos="fade-left" data-aos-delay="100">
            <div className="video-grid">
              {filteredVideos.map((video, index) => (
                <div 
                  key={video.id} 
                  className={`video-card ${selectedVideo?.id === video.id ? 'active' : ''}`}
                  onClick={() => handleVideoSelect(video)}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-overlay">
                      <div className="play-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span className="video-duration">{video.duration}</span>
                    </div>
                  </div>
                  
                  <div className="video-info">
                    <h4 className="video-title">{video.title}</h4>
                    <div className="video-meta">
                      <span className="video-category">{video.category}</span>
                      <span className="video-views">{formatViews(video.views)} views</span>
                    </div>
                    <p className="video-description">{video.description}</p>
                    
                    <div className="video-tags">
                      {video.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="ak-height-125 ak-height-lg-80"></div>
      </div>
    </div>
  );
};

export default VideoGallery;