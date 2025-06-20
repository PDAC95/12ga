import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch videos and categories on component mount
  useEffect(() => {
    fetchVideosAndCategories();
  }, []);

  const fetchVideosAndCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the new unified endpoint
      const [videosResponse, categoriesResponse] = await Promise.all([
        fetch("http://localhost:5000/api/unified-videos"),
        fetch("http://localhost:5000/api/unified-videos/categories"),
      ]);

      if (!videosResponse.ok || !categoriesResponse.ok) {
        throw new Error("Failed to fetch videos or categories");
      }

      const videosData = await videosResponse.json();
      const categoriesData = await categoriesResponse.json();

      setVideos(videosData.data || []);
      setCategories(["All", ...(categoriesData.data || [])]);

      // Set first video as selected if available
      if (videosData.data && videosData.data.length > 0) {
        setSelectedVideo(videosData.data[0]);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError(err.message || "Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  // Filter videos based on selected category
  const filteredVideos =
    filter === "All"
      ? videos
      : videos.filter((video) => video.category === filter);

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
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get the appropriate link for View Project button
  const getProjectLink = (video) => {
    if (video.type === "truck_project" && video.truckSlug) {
      return `/truck/${video.truckSlug}`;
    }
    // For product showcase videos, link to video detail page
    return `/video/${video._id}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="video-gallery-container">
        <CommonPageHero title={"Video Gallery"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="video-loading" data-aos="fade-up">
            <div className="loading-spinner"></div>
            <p>Loading videos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="video-gallery-container">
        <CommonPageHero title={"Video Gallery"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="video-error" data-aos="fade-up">
            <h2>Error Loading Videos</h2>
            <p>{error}</p>
            <button onClick={fetchVideosAndCategories} className="retry-btn">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No videos state
  if (videos.length === 0) {
    return (
      <div className="video-gallery-container">
        <CommonPageHero title={"Video Gallery"} />
        <div className="container">
          <div className="ak-height-125 ak-height-lg-80"></div>
          <div className="no-videos" data-aos="fade-up">
            <h2>No Videos Available</h2>
            <p>Videos will be added soon. Check back later!</p>
            <Link to="/truck-gallery" className="back-btn">
              View Truck Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                className={`filter-btn ${filter === category ? "active" : ""}`}
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
              <div className="video-player-section-full">
                <div className="video-player-container">
                  <div className="video-wrapper">
                    <iframe
                      ref={videoRef}
                      src={selectedVideo.videoUrl}
                      title={selectedVideo.title}
                      className="main-video"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>
                </div>

                {/* Video Info Separated */}
                <div className="video-info-simple">
                  <h4 className="video-title">{selectedVideo.title}</h4>
                  <div className="video-meta">
                    <span>{formatDate(selectedVideo.publishDate)}</span>
                  </div>

                  <Link
                    to={getProjectLink(selectedVideo)}
                    className="view-project-btn"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 5V19L19 12L8 5Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                  <h3>Select a video to start watching</h3>
                  <p>Choose from our collection of truck build videos below</p>
                </div>
              </div>
            )}
          </div>

          {/* Video Grid Section */}
          <div
            className="video-grid-section"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div className="video-grid">
              {filteredVideos.map((video, index) => (
                <div
                  key={video._id}
                  className={`video-card ${
                    selectedVideo?._id === video._id ? "active" : ""
                  }`}
                  onClick={() => handleVideoSelect(video)}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-overlay">
                      <div className="play-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="video-info">
                    <h4 className="video-title">{video.title}</h4>
                    <div className="video-meta">
                      <span className="video-category">{video.category}</span>
                    </div>
                    <p className="video-description">{video.description}</p>

                    <div className="video-tags">
                      {video.tags &&
                        video.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
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
