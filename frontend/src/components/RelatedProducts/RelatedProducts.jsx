import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RelatedProductsSlider from "./RelatedProductsSlider";

const RelatedProducts = ({ currentProduct, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("similar");

  // Mock data simplificada y realista
  const mockRelatedProducts = [
    {
      id: 1,
      name: "Premium Grille Set",
      slug: "premium-grille-set",
      image: "/assets/img/products/grille-1.png",
      category: { name: "GRILLES", slug: "grilles" },
      priceRange: "$450 - $650",
      rating: 4.8,
      reviewCount: 45,
      compatibility: [
        "Peterbilt 579",
        "Kenworth T680",
        "Freightliner Cascadia",
      ],
      keyFeatures: ["Stainless Steel", "Custom Finish"],
      isInStock: true,
      leadTime: "2-3 weeks",
    },
    {
      id: 2,
      name: "LED Light Bar System",
      slug: "led-light-bar-system",
      image: "/assets/img/products/grille-2.png",
      category: { name: "LIGHTS", slug: "lights" },
      priceRange: "$320 - $480",
      rating: 4.9,
      reviewCount: 78,
      compatibility: ["Universal Fit"],
      keyFeatures: ["High Brightness", "Weather Resistant"],
      isInStock: true,
      leadTime: "In Stock",
    },
    {
      id: 3,
      name: "Custom Bumper Assembly",
      slug: "custom-bumper-assembly",
      image: "/assets/img/products/grille-1.png",
      category: { name: "BUMPERS", slug: "bumpers" },
      priceRange: "$800 - $1200",
      rating: 4.7,
      reviewCount: 32,
      compatibility: ["Freightliner Cascadia", "Volvo VNL"],
      keyFeatures: ["Heavy Duty", "Chrome Finish"],
      isInStock: false,
      leadTime: "4-6 weeks",
    },
    {
      id: 4,
      name: "Visor Shield Pro",
      slug: "visor-shield-pro",
      image: "/assets/img/products/grille-2.png",
      category: { name: "VISORS", slug: "visors" },
      priceRange: "$180 - $280",
      rating: 4.6,
      reviewCount: 56,
      compatibility: ["Peterbilt 389", "Kenworth W900"],
      keyFeatures: ["UV Protection", "Easy Mount"],
      isInStock: true,
      leadTime: "1-2 weeks",
    },
    {
      id: 5,
      name: "Air Cleaner Screen Deluxe",
      slug: "air-cleaner-screen-deluxe",
      image: "/assets/img/products/grille-1.png",
      category: { name: "AIR CLEANER SCREENS", slug: "air-cleaner-screens" },
      priceRange: "$125 - $180",
      rating: 4.5,
      reviewCount: 23,
      compatibility: ["Peterbilt 579", "Kenworth T680"],
      keyFeatures: ["Laser Cut", "Stainless Steel"],
      isInStock: true,
      leadTime: "1-2 weeks",
    },
    {
      id: 6,
      name: "Chrome Mirror Brackets",
      slug: "chrome-mirror-brackets",
      image: "/assets/img/products/grille-2.png",
      category: { name: "MIRROR BRACKETS", slug: "mirror-brackets" },
      priceRange: "$95 - $145",
      rating: 4.4,
      reviewCount: 67,
      compatibility: ["Universal Fit", "Most Peterbilt Models"],
      keyFeatures: ["Chrome Finish", "Universal Mount"],
      isInStock: true,
      leadTime: "In Stock",
    },
  ];

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        let filtered = [...mockRelatedProducts];

        if (currentProduct) {
          filtered = filtered.filter(
            (product) => product.id !== currentProduct.id
          );
        }

        switch (selectedFilter) {
          case "similar":
            if (currentProduct?.category) {
              filtered = filtered.filter(
                (product) =>
                  product.category.slug === currentProduct.category.slug
              );
            }
            break;
          case "compatible":
            if (currentProduct?.compatibility) {
              filtered = filtered.filter((product) =>
                product.compatibility.some((compat) =>
                  currentProduct.compatibility.includes(compat)
                )
              );
            }
            break;
          case "popular":
            filtered = filtered.sort(
              (a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount
            );
            break;
          default:
            break;
        }

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct, selectedFilter]);

  const handleQuoteRequest = (product) => {
    console.log("Quote requested for:", product.name);
    alert(`Quote requested for: ${product.name}`);
  };

  const handleCompare = (product) => {
    console.log("Compare product:", product.name);
    alert(`Added to compare: ${product.name}`);
  };

  const filterOptions = [
    {
      id: "similar",
      label: "Similar Products",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      id: "compatible",
      label: "Compatible Parts",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "popular",
      label: "Popular Choices",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="related-products-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <div className="header-content">
            <h2 className="section-title">You Might Also Like</h2>
            <p className="section-subtitle">
              Discover complementary products and popular alternatives
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                className={`filter-tab ${
                  selectedFilter === option.id ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(option.id)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Slider */}
        <div
          className="slider-container"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <RelatedProductsSlider
            products={relatedProducts}
            onQuoteRequest={handleQuoteRequest}
            onCompare={handleCompare}
            loading={loading}
          />
        </div>

        {/* View All Section */}
        <div
          className="view-all-section"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Link
            to={
              currentProduct?.category
                ? `/parts/${currentProduct.category.slug}`
                : "/parts"
            }
            className="btn-view-all"
          >
            <span>View All {currentProduct?.category?.name || "Products"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
