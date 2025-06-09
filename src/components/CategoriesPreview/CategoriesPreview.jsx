import React, { useState } from "react";
import { Link } from "react-router-dom";

const categoriesData = [
  {
    id: 1,
    title: "BUMPERS",
    image: "/assets/img/categories/BUMPERS 3-2.png",
    link: "#"
  },
  {
    id: 2,
    title: "GRILLES",
    image: "/assets/img/categories/GRILL 3-2.png",
    link: "#"
  },
  {
    id: 3,
    title: "FENDERS",
    image: "/assets/img/categories/FENDERS 3-2.png",
    link: "#"
  },
  {
    id: 4,
    title: "VISORS",
    image: "/assets/img/categories/Visors 3-2.png",
    link: "#"
  },
  {
    id: 5,
    title: "FLIP BUMPERS",
    image: "/assets/img/categories/BUMPERS 3-2.png",
    link: "#"
  },
  {
    id: 6,
    title: "AIR TANK STRAPS",
    image: "/assets/img/categories/AIR TANK STRAPS 3-2.png",
    link: "#"
  },
  {
    id: 7,
    title: "TOOL BOXES",
    image: "/assets/img/categories/BUMPERS 3-2.png",
    link: "#"
  },
  {
    id: 8,
    title: "BATTERY BOXES",
    image: "/assets/img/categories/GRILL 3-2.png",
    link: "#"
  },
  {
    id: 9,
    title: "EXHAUST SYSTEMS",
    image: "/assets/img/categories/FENDERS 3-2.png",
    link: "#"
  },
  {
    id: 10,
    title: "MIRROR BRACKETS",
    image: "/assets/img/categories/Visors 3-2.png",
    link: "#"
  },
  {
    id: 11,
    title: "FUEL TANK STRAPS",
    image: "/assets/img/categories/BUMPERS 3-2.png",
    link: "#"
  },
  {
    id: 12,
    title: "CAB PANELS",
    image: "/assets/img/categories/AIR TANK STRAPS 3-2.png",
    link: "#"
  }
];

const CategoriesPreview = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(categoriesData.length / itemsPerPage);
  
  // Calcular índices para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categoriesData.slice(startIndex, endIndex);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="categories-preview">
      <div className="ak-height-75 ak-height-lg-50"></div>
      <div className="center-section-heading" data-aos="fade-up">
        <div className="ak-section-heading ak-style-1">
          <div 
            className="background-text" 
            data-aos="fade-left" 
            data-aos-delay="200" 
            data-aos-duration="1000"
          >
            Categories
          </div>
          <div className="text-md-center">
            <h2 className="ak-section-title">Categories</h2>
            <p className="ak-section-subtitle">
              Browse by category to find the custom truck parts that fit your style and needs —
              <br />
              from lighting and grilles to full body kits and performance upgrades.
            </p>
          </div>
        </div>
      </div>
      <div className="ak-height-75 ak-height-lg-50"></div>
      <div className="ak-height-50 ak-height-lg-50"></div>
      
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 categories-grid">
          {currentCategories.map((category, index) => (
            <div className="col" key={category.id}>
              <div className="blog-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <Link to={category.link}>
                  <div className="blog-header-info">
                    <img src={category.image} alt={category.title} />
                  </div>
                </Link>
                <div className="blog-body-info">
                  <Link to={category.link} className="blog-title">
                    {category.title}
                  </Link>
                </div>
                <div className="blog-footer-info">
                  <Link to={category.link} className="more-btn">
                    + MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="ak-height-100 ak-height-lg-60"></div>
        
        {/* Paginación */}
        <div id="pagination-container" className="pagination-style">
          <div className="pagination-wrapper d-flex justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <br />
        
        <div className="ak-height-125 ak-height-lg-80 text-md-center">
          <Link to="/parts">
            <h4 className="ak-height-125 ak-height-lg-80 ak-section-title">All Categories</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPreview;