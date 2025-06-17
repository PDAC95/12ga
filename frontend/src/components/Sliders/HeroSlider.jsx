import React from "react";

const HeroSlider = ({ openSidebar }) => {
  const handleOpenSidebar = (e) => {
    e.preventDefault();
    if (openSidebar) {
      openSidebar();
    } else {
      console.log("openSidebar function not provided");
    }
  };

  return (
    <section className="ak-hero-fixed ak-hero ak-style1">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="ak-hero-bg ak-bg object-cover"
      >
        <source src="/assets/video/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        <div className="hero-contact-info">
          <div className="d-flex align-items-center gap-2">
            <div className="heartbeat-icon">
              <a href="#" onClick={handleOpenSidebar}>
                <svg
                  width="61"
                  height="60"
                  viewBox="0 0 61 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <circle
                      opacity="0.3"
                      cx="30.5"
                      cy="30"
                      r="25"
                      fill="#FF3D24"
                    />
                    <circle
                      opacity="0.3"
                      cx="30.5"
                      cy="30"
                      r="30"
                      fill="#FF3D24"
                    />
                    <circle cx="30.5" cy="30" r="20" fill="#FF3D24" />
                  </g>
                  <g transform="translate(20,20)">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                    <line
                      x1="13"
                      y1="13"
                      x2="18"
                      y2="18"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </a>
            </div>
            <a href="#" onClick={openSidebar}>
              <p className="ak-font-18 ak-white-color ak-semi-bold">
                Select my Truck
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="social-hero">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/12gacustoms_truck_lowrider/"
          className="social-icon1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              fill="white"
            />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/people/12-Ga-Customs/100064260026687/#"
          className="social-icon1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="white"
            />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/channel/UCEu6W5lxX5nhbIwG3o9LFhg"
          className="social-icon1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              fill="white"
            />
          </svg>
        </a>

        <div className="social-horizontal"></div>
        <h6 className="social-link">FOLLOW US</h6>
      </div>
    </section>
  );
};

export default HeroSlider;
