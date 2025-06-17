import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";

import aboutVideoBg from "/assets/img/videos/videomain.png";

const Videos = ({ videoId }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="ak-height-125 ak-height-lg-80"></div>

      {/* Section Heading */}
      <div className="center-section-heading" data-aos="fade-up">
        <div className="ak-section-heading ak-style-1">
          <div
            className="background-text"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="2500"
          >
            Videos
          </div>
          <div className="text-md-center">
            <h2 className="ak-section-title">Video Gallery</h2>
            <p className="ak-section-subtitle">
              Check out our video gallery to see our custom truck builds in
              action.
              <br />
              From raw power to head-turning details — this is where our
              craftsmanship comes to life.
            </p>
          </div>
        </div>
      </div>

      <div className="ak-height-75 ak-height-lg-50"></div>

      {/* Video Section */}
      <div className="video-home">
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />

        <div
          className="ak-video-block ak-style1 ak-video-open ak-bg ak-parallax_bg imagesZoom"
          data-aos="zoom-out-down"
          data-aos-duration="2500"
          data-aos-delay="200"
          onClick={() => setOpen(true)}
        >
          <img
            src={aboutVideoBg}
            alt="12GA Customs Video Gallery"
            className="video-section-bg-img ak-bg"
          />

          <div className="video-overlay">
            <div className="video-content">
              <span className="ak-heartbeat-btn">
                <span></span>
              </span>

              <div className="video-info">
                <h3 className="video-title">Watch Our Work</h3>
                <p className="video-subtitle">
                  See our custom truck builds in action
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* Call to Action */}
      <div className="ak-height-125 ak-height-lg-80 text-md-center">
        <Link to="/gallery" className="video-cta-link">
          <h4 className="ak-section-title video-cta-title">
            View All Trucks
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="cta-arrow"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h4>
        </Link>
      </div>
    </>
  );
};

export default Videos;
