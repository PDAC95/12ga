import React from "react";
import { Link } from "react-router-dom";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";

const SiteMap = () => {
  const siteStructure = [
    {
      category: "Main Pages",
      icon: "🏠",
      pages: [
        { name: "Home", path: "/", description: "Welcome to 12GA Customs" },
        {
          name: "About",
          path: "/about",
          description: "Learn about our company",
        },
        {
          name: "Contact Us",
          path: "/contact",
          description: "Get in touch with us",
        },
      ],
    },
    {
      category: "Gallery",
      icon: "🚛",
      pages: [
        {
          name: "Truck Gallery",
          path: "/truck-gallery",
          description: "Browse our custom truck builds",
        },
        {
          name: "Video Gallery",
          path: "/video-gallery",
          description: "Watch our work in action",
        },
      ],
    },
    {
      category: "Parts & Products",
      icon: "🔧",
      pages: [
        {
          name: "Parts",
          path: "/parts",
          description: "Browse all part categories (25+ categories)",
        },
        {
          name: "Individual Categories",
          path: "/parts",
          description: "Air Ride Gen III, Air Cleaners, Battery Boxes, etc.",
        },
        {
          name: "Product Details",
          path: "/parts",
          description: "Detailed product pages with specifications",
        },
      ],
    },
    {
      category: "Legal & Support",
      icon: "📋",
      pages: [
        {
          name: "FAQ",
          path: "/faq",
          description: "Frequently asked questions",
        },
        {
          name: "Privacy Policy",
          path: "/privacy",
          description: "How we protect your privacy",
        },
        {
          name: "Terms & Conditions",
          path: "/terms",
          description: "Legal terms and conditions",
        },
        {
          name: "Site Map",
          path: "/sitemap",
          description: "Navigate our website",
        },
      ],
    },
  ];

  return (
    <>
      <CommonPageHero title={"Site Map"} />

      <div className="ak-height-125 ak-height-lg-80"></div>

      <div className="site-map-page">
        <div className="container">
          {/* Introduction */}
          <div className="sitemap-intro" data-aos="fade-up">
            <h2 className="intro-title">Navigate Our Website</h2>
            <p className="intro-description">
              Find everything you're looking for with our complete site
              navigation. Explore our services, view our work, and learn more
              about 12GA Customs.
            </p>
          </div>

          <div className="ak-height-80 ak-height-lg-60"></div>

          {/* Site Structure */}
          <div className="sitemap-grid">
            {siteStructure.map((section, index) => (
              <div
                key={index}
                className="sitemap-section"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="section-header">
                  <span className="section-icon">{section.icon}</span>
                  <h3 className="section-title">{section.category}</h3>
                </div>

                <div className="section-pages">
                  {section.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="page-item">
                      <Link to={page.path} className="page-link">
                        <div className="page-info">
                          <h4 className="page-name">{page.name}</h4>
                          <p className="page-description">{page.description}</p>
                        </div>
                        <div className="page-arrow">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="ak-height-80 ak-height-lg-60"></div>

          {/* Contact CTA */}
          <div className="sitemap-cta" data-aos="fade-up">
            <div className="cta-content">
              <h3 className="cta-title">Can't Find What You're Looking For?</h3>
              <p className="cta-description">
                Our team is here to help you with any questions about our
                services or website.
              </p>
              <div className="cta-actions">
                <Link to="/contact" className="cta-btn primary">
                  Contact Us
                </Link>
                <Link to="/faq" className="cta-btn secondary">
                  View FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className="ak-height-60 ak-height-lg-40"></div>

          {/* Quick Links */}
          <div className="quick-access" data-aos="fade-up">
            <h3 className="quick-title">Quick Access</h3>
            <div className="quick-links">
              <Link to="/parts" className="quick-link">
                <span className="quick-icon">🔧</span>
                <span>Browse Parts</span>
              </Link>
              <Link to="/truck-gallery" className="quick-link">
                <span className="quick-icon">🚛</span>
                <span>View Gallery</span>
              </Link>
              <Link to="/contact" className="quick-link">
                <span className="quick-icon">📞</span>
                <span>Get Quote</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="ak-height-125 ak-height-lg-80"></div>
    </>
  );
};

export default SiteMap;
