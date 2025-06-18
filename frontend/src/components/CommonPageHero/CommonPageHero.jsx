import React from "react";
import { Link, useLocation } from "react-router-dom";

const CommonPageHero = ({ title }) => {
  const location = useLocation();

  // Function to generate breadcrumb based on current path
  const generateBreadcrumb = () => {
    const path = location.pathname;

    // For truck detail pages (e.g., /truck/klos-custom)
    if (path.startsWith("/truck/")) {
      return (
        <>
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/truck-gallery">Truck Gallery</Link>
          <span> / {title}</span>
        </>
      );
    }

    // For truck gallery page
    if (path === "/truck-gallery") {
      return (
        <>
          <Link to="/">Home</Link>
          <span> / {title}</span>
        </>
      );
    }

    // For parts detail pages (e.g., /parts/grilles)
    if (path.startsWith("/parts/")) {
      return (
        <>
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/parts">Parts</Link>
          <span> / {title}</span>
        </>
      );
    }

    // For video detail pages (e.g., /video/1)
    if (path.startsWith("/video/")) {
      return (
        <>
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/video-gallery">Video Gallery</Link>
          <span> / {title}</span>
        </>
      );
    }

    // For product detail pages (e.g., /product/exhaust-kit)
    if (path.startsWith("/product/")) {
      return (
        <>
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/parts">Parts</Link>
          <span> / {title}</span>
        </>
      );
    }

    // Default breadcrumb for other pages
    return (
      <>
        <Link to="/">Home</Link>
        <span> / {title}</span>
      </>
    );
  };

  return (
    <div className="container">
      <div className="common-page-title">
        <h3 className="page-title">{title}</h3>
        <div className="d-flex gap-2 align-items-center">
          {generateBreadcrumb()}
        </div>
      </div>
      <div className="primary-color-border"></div>
    </div>
  );
};

export default CommonPageHero;
