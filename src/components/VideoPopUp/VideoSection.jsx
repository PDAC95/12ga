import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";

const VideoSection = ({ videoId = "VcaAVWtP48A" }) => {
  const [isOpen, setOpen] = useState(false);
  
  return (
    <div className="video-section-new">
      <div className="ak-height-125 ak-height-lg-80"></div>
      
      {/* Section Header */}
      <div className="video-header" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">VIDEO GALLERY</h2>
          <p className="section-description">
            Check out our video gallery to see our custom truck builds in action.
            <br />
            From raw power to head-turning details — this is where our craftsmanship comes to life.
          </p>
        </div>
      </div>
      
      <div className="ak-height-75 ak-height-lg-50"></div>
      
      {/* Video Player */}
      <div className="video-container" data-aos="zoom-in" data-aos-delay="200">
        <div className="container">
          <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId={videoId}
            onClose={() => setOpen(false)}
          />
          
          <div className="video-wrapper">
            <div 
              className="video-player"
              onClick={() => setOpen(true)}
            >
              <img 
                src="/assets/img/videos/videomain.png" 
                alt="12GA Customs Video"
                className="video-thumbnail"
              />
              
              <div className="video-overlay">
                <div className="play-button">
                  <div className="play-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="video-info">
              <h3 className="video-title">Watch Our Work</h3>
              <p className="video-subtitle">See our custom truck builds in action</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ak-height-80"></div>
      
      {/* Call to Action */}
      <div className="ak-height-75 ak-height-lg-50"></div>
                    <div className="container text-center">
                      <Link to="/video-gallery" className="view-all-btn">
                        <span>VIEW ALL VIDEOS</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </Link>
                    </div>
      <div className="ak-height-125 ak-height-lg-80"></div>
      
      <div className="ak-height-125 ak-height-lg-80"></div>
    </div>
  );
};

export default VideoSection;