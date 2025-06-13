import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import FrequentlyQuestions from "../components/FrequentlyQuestions/FrequentlyQuestions";

// Dummy data for products (will be replaced with API calls later)
const productsData = {
  grilles: [
    {
      id: 1,
      name: "Custom Chrome Grille",
      slug: "custom-chrome-grille",
      image: "/assets/img/products/grille-1.png",
      startingPrice: 299,
      description:
        "Premium chrome-finished grille designed for maximum style and airflow optimization.",
      features: [
        "High-Grade Chrome Finish",
        "Custom Logo Integration",
        "Enhanced Airflow Design",
        "Easy Installation Kit",
        "5-Year Warranty",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-01-20",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Blackout Performance Grille",
      slug: "blackout-performance-grille",
      image: "/assets/img/products/grille-2.png",
      startingPrice: 275,
      description:
        "Aggressive blackout design for enhanced performance and bold appearance.",
      features: [
        "Matte Black Finish",
        "Performance Optimized",
        "Durable Steel Construction",
        "Weather Resistant",
        "Custom Fitment Available",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-05",
      isFeatured: false,
    },
    {
      id: 3,
      name: "LED Light Grille",
      slug: "led-light-grille",
      image: "/assets/img/products/grille-1.png", // reutilizar imagen
      startingPrice: 450,
      description:
        "Integrated LED lighting system with premium grille design for maximum visibility.",
      features: [
        "Built-in LED Light Bar",
        "Weather Sealed Housing",
        "Custom Wiring Harness",
        "Impact Resistant Design",
        "Professional Installation",
      ],
      isCustomizable: true,
      availability: "Made to Order",
      createdAt: "2024-01-10",
      category: "Performance",
      isFeatured: false,
    },
    {
      id: 4,
      name: "Racing Sport Grille",
      slug: "racing-sport-grille",
      image: "/assets/img/products/grille-2.png", // reutilizar imagen
      startingPrice: 350,
      description:
        "Aerodynamic racing-inspired grille design for enhanced performance and aggressive styling.",
      features: [
        "Aerodynamic Design",
        "Lightweight Construction",
        "Racing Inspired Mesh",
        "Quick Release Mounting",
        "Track Tested",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-15",
      category: "Performance",
      isFeatured: false,
    },
  ],
  "air-cleaner-screens": [
    {
      id: 1,
      name: "Premium Mesh Air Cleaner Screen",
      slug: "premium-mesh-air-cleaner-screen",
      image: "/assets/img/products/air-cleaner-screen-1.png",
      startingPrice: 89,
      description:
        "High-performance stainless steel mesh screen designed for maximum airflow and filtration.",
      features: [
        "304 Stainless Steel Construction",
        "Laser-Cut Precision Holes",
        "Weather Resistant Finish",
        "Easy Installation",
        "Custom Sizing Available",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-01-15",
      isFeatured: true,
    },
    {
      id: 2,
      name: "Diamond Pattern Air Screen",
      slug: "diamond-pattern-air-screen",
      image: "/assets/img/products/air-cleaner-screen-2.png",
      startingPrice: 125,
      description:
        "Distinctive diamond pattern design combining style with superior protection.",
      features: [
        "Unique Diamond Pattern",
        "Heavy-Duty Steel Frame",
        "Powder Coated Finish",
        "Universal Mounting",
        "Lifetime Warranty",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-01",
      isFeatured: false,
    },
    {
      id: 3,
      name: "Custom Logo Air Cleaner Screen",
      slug: "custom-logo-air-cleaner-screen",
      image: "/assets/img/products/air-cleaner-screen-3.png",
      startingPrice: 180,
      description:
        "Personalized air cleaner screen with your company logo or custom design.",
      features: [
        "Custom Logo Integration",
        "Laser Engraving Available",
        "Multiple Finish Options",
        "Professional Installation",
        "Design Consultation Included",
      ],
      isCustomizable: true,
      availability: "Made to Order",
      createdAt: "2024-01-28",
      isFeatured: false,
    },
    {
      id: 4,
      name: "Heavy Duty Mesh Screen",
      slug: "heavy-duty-mesh-screen",
      image: "/assets/img/products/air-cleaner-screen-1.png", // reutilizar imagen
      startingPrice: 65,
      description:
        "Industrial grade mesh screen designed for extreme conditions and heavy-duty applications.",
      features: [
        "Industrial Grade Steel",
        "Extreme Weather Resistant",
        "High Flow Design",
        "Heavy Duty Mounting",
        "Extended Warranty",
      ],
      isCustomizable: false,
      availability: "Available",
      createdAt: "2024-01-05",
      category: "Performance",
      isFeatured: false,
    },
    {
      id: 5,
      name: "Decorative Pattern Screen",
      slug: "decorative-pattern-screen",
      image: "/assets/img/products/air-cleaner-screen-2.png", // reutilizar imagen
      startingPrice: 95,
      description:
        "Stylish decorative pattern screen that combines protection with aesthetic appeal.",
      features: [
        "Decorative Pattern Design",
        "Anodized Finish Options",
        "Style Enhancement",
        "Easy Maintenance",
        "Color Options Available",
      ],
      isCustomizable: true,
      availability: "Available",
      createdAt: "2024-02-20",
      category: "Styling",
      isFeatured: false,
    },
    {
      id: 6,
      name: "Performance Flow Screen",
      slug: "performance-flow-screen",
      image: "/assets/img/products/air-cleaner-screen-3.png", // reutilizar imagen
      startingPrice: 110,
      description:
        "Optimized airflow screen designed for maximum performance and engine efficiency.",
      features: [
        "Optimized Flow Pattern",
        "Performance Tested",
        "Dyno Proven Results",
        "Racing Application",
        "Flow Certification",
      ],
      isCustomizable: true,
      availability: "Made to Order",
      createdAt: "2024-01-25",
      category: "Performance",
      isFeatured: false,
    },
  ],
};

// Category information data
const categoriesInfo = {
  grilles: {
    name: "Grilles",
    zone: "Front",
    description:
      "Transform your truck's front end with our premium custom grilles. Built for style, performance, and durability.",
    productCount: 15,
  },
  "air-cleaner-screens": {
    name: "Air Cleaner Screens",
    zone: "Engine/Air System",
    description:
      "Protect your engine while maintaining optimal airflow with our premium air cleaner screens. Built for durability and performance.",
    productCount: 12,
  },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("featured");

  // Get category info and products
  const categoryInfo = categoriesInfo[slug] || {
    name: "Category Not Found",
    zone: "Unknown",
    description: "This category doesn't exist.",
    productCount: 0,
  };

  const products = productsData[slug] || [];

  // Get featured product and other products
  const featuredProduct =
    products.find((product) => product.isFeatured) || products[0];
  const otherProducts = products.filter((product) => !product.isFeatured);

  // Sort products
  const sortedProducts = [...otherProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.startingPrice - b.startingPrice;
      case "price-high":
        return b.startingPrice - a.startingPrice;
      default:
        return 0;
    }
  });

  return (
    <div className="magazine-category-page">
      {/* Compact Header */}
      <div className="magazine-header">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/parts">Parts</Link>
            <span>/</span>
            <span>{categoryInfo.name}</span>
          </nav>

          {/* Category Title & Stats */}
          <div className="category-header">
            <div className="category-title-section">
              <span className="zone-tag">{categoryInfo.zone}</span>
              <h1 className="category-title">{categoryInfo.name}</h1>
              <p className="category-description">{categoryInfo.description}</p>
            </div>

            <div className="category-stats">
              <div className="stat">
                <span className="number">{products.length}</span>
                <span className="label">Available</span>
              </div>
              <div className="stat">
                <span className="number">Custom</span>
                <span className="label">Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Product Section */}
      {featuredProduct && (
        <div className="featured-product-section">
          <div className="container">
            <h2 className="section-title">Featured Product</h2>

            <div className="featured-product">
              <div className="featured-image">
                <img src={featuredProduct.image} alt={featuredProduct.name} />
                <div className="featured-badges">
                  {featuredProduct.isCustomizable && (
                    <span className="badge featured-badge">Featured</span>
                  )}
                  <span className="badge availability-badge">
                    {featuredProduct.availability}
                  </span>
                </div>
              </div>

              <div className="featured-content">
                <h3 className="featured-title">{featuredProduct.name}</h3>
                <p className="featured-description">
                  {featuredProduct.description}
                </p>

                <div className="featured-features">
                  {featuredProduct.features
                    .slice(0, 4)
                    .map((feature, index) => (
                      <div key={index} className="feature">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                </div>

                <div className="featured-footer">
                  <div className="pricing">
                    <span className="price-label">Starting from</span>
                    <span className="price">
                      ${featuredProduct.startingPrice}
                    </span>
                  </div>

                  <div className="actions">
                    <Link
                      to={`/product/${featuredProduct.slug}`}
                      className="btn primary"
                    >
                      View Details
                    </Link>
                    <button className="btn secondary">Request Quote</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Products Grid */}
      <div className="products-grid-section">
        <div className="container">
          <div className="grid-header">
            <h2 className="section-title">All {categoryInfo.name}</h2>

            <div className="sort-controls">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                  <div className="card-overlay">
                    <Link
                      to={`/product/${product.slug}`}
                      className="overlay-btn"
                    >
                      View Details
                    </Link>
                  </div>
                  <div className="card-badges">
                    {product.isCustomizable && (
                      <span className="badge custom-badge">Custom</span>
                    )}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="card-description">{product.description}</p>

                  <div className="card-footer">
                    <div className="pricing">
                      <span className="price-label">From</span>
                      <span className="price">${product.startingPrice}</span>
                    </div>
                    <button className="quote-btn">Get Quote</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="ak-height-75 ak-height-lg-50"></div>
      <FrequentlyQuestions />
      <div className="ak-height-50 ak-height-lg-30"></div>
    </div>
  );
};

export default CategoryPage;
