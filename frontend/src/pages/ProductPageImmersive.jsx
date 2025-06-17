import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// Import Components
import ProductTabs from "../components/ProductTabs/ProductTabs";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const ProductPageImmersive = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Same mock product data as classic page
  const mockProduct = {
    id: 1,
    name: "Premium Chrome Grille Assembly",
    slug: "premium-chrome-grille-assembly",
    sku: "12GA-GRL-001",
    category: {
      name: "GRILLES",
      slug: "grilles",
    },
    shortDescription:
      "Transform your truck's front end with our premium chrome grille assembly, designed for perfect fit and superior durability.",
    description:
      "Our Premium Chrome Grille Assembly represents the pinnacle of truck customization excellence. Crafted from high-grade materials and finished with a mirror-like chrome coating, this grille assembly is designed to make a bold statement while maintaining the highest standards of quality and durability.",
    image: "/assets/img/products/product-1.png",
    gallery: [
      "/assets/img/products/product-1.png",
      "/assets/img/products/product-2.png",
      "/assets/img/products/product-3.png",
      "/assets/img/products/product-4.png",
    ],
    priceRange: "$450 - $650",
    inStock: true,
    leadTime: "2-3 weeks",
    isNew: true,
    isFeatured: true,
    isCustomizable: true,
    rating: 4.8,
    reviewCount: 127,
    compatibility: [
      "Peterbilt 579 (2013-2024)",
      "Peterbilt 567 (2013-2024)",
      "Kenworth T680 (2013-2024)",
      "Kenworth T880 (2013-2024)",
    ],
    keyFeatures: [
      "Mirror-finish chrome coating for superior shine",
      "Precision-engineered for perfect OEM fit",
      "Corrosion-resistant multi-layer plating",
      "High-strength steel construction",
      "Professional installation recommended",
      "Lifetime warranty on finish",
      "Made in USA with premium materials",
      "Compatible with OEM mounting hardware",
    ],
    specifications: {
      Material: "High-strength steel with chrome plating",
      Finish: "Triple-layer chrome (copper/nickel/chrome)",
      Mounting: "OEM-compatible bolt-on installation",
      Warranty: "Lifetime finish warranty",
      Manufacturing: "Made in USA",
      Weight: "18.5 lbs",
      "Package Dimensions": '48" x 24" x 8"',
      "Installation Time": "2-3 hours professional installation",
      "Hardware Included": "Complete mounting hardware kit",
      "Compatibility Check": "VIN verification recommended",
    },
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (slug === mockProduct.slug) {
          setProduct(mockProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsInfoVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRequestQuote = () => {
    console.log("Quote requested for:", product.name);
    alert(`Quote requested for ${product.name}`);
  };

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  if (loading) {
    return (
      <div className="immersive-loading">
        <div className="loading-hero-immersive">
          <div className="loading-content">
            <h2>Loading premium experience...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="immersive-error">
        <div className="error-content">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <div className="error-actions">
            <button onClick={() => navigate(-1)}>Go Back</button>
            <button onClick={() => navigate("/parts")}>Browse Parts</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page immersive-layout">
      {/* Immersive Hero Section */}
      <section className="immersive-hero">
        {/* Background Image with Parallax */}
        <div
          className="hero-background"
          style={{
            backgroundImage: `url(${product.gallery[selectedImage]})`,
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="hero-overlay"></div>
        </div>

        {/* Navigation Bar */}
        <nav className="immersive-nav">
          <div className="nav-content">
            <Link to="/parts" className="nav-back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Parts
            </Link>

            <div className="nav-actions">
              <button className="nav-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="18"
                    cy="5"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="6"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="18"
                    cy="19"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="8.59"
                    y1="13.51"
                    x2="15.42"
                    y2="17.49"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="15.41"
                    y1="6.51"
                    x2="8.59"
                    y2="10.49"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <button className="nav-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Product Info Overlay */}
        <div className="hero-content">
          <div className="hero-left-content">
            <div className="product-badges-immersive">
              {product.isNew && (
                <span className="badge-immersive new">New</span>
              )}
              {product.isFeatured && (
                <span className="badge-immersive featured">Featured</span>
              )}
              {product.isCustomizable && (
                <span className="badge-immersive custom">Customizable</span>
              )}
            </div>

            <div className="product-title-section">
              <h1 className="immersive-title">{product.name}</h1>
              <p className="immersive-subtitle">{product.shortDescription}</p>
            </div>

            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={handleRequestQuote}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Request Custom Quote
              </button>

              <button className="btn-hero-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Speak with Expert
              </button>
            </div>
          </div>

          <div className="hero-right-content">
            <div className="product-meta-immersive">
              <div className="meta-item">
                <span className="meta-label">SKU:</span>
                <span className="meta-value">{product.sku}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category.name}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Compatibility:</span>
                <span className="meta-value">
                  {product.compatibility[0]} +{product.compatibility.length - 1}{" "}
                  more
                </span>
              </div>
            </div>

            <div className="pricing-immersive">
              <span className="price-range-immersive">
                {product.priceRange}
              </span>
              <div className="availability-immersive">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{product.inStock ? "In Stock" : "Made to Order"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery Navigation */}
        {product.gallery && product.gallery.length > 1 && (
          <div className="gallery-nav-immersive">
            <div className="gallery-thumbnails-immersive">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-immersive ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => handleImageChange(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 13l3 3 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Reveal Section */}
      <section className="features-reveal" data-aos="fade-up">
        <div className="container">
          <div className="features-content">
            <h2 className="features-title">Why Choose This Product?</h2>
            <div className="features-grid-immersive">
              {product.keyFeatures.slice(0, 6).map((feature, index) => (
                <div
                  key={index}
                  className="feature-card-immersive"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="feature-title">{feature}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Preview */}
      <section className="specs-preview-immersive" data-aos="fade-up">
        <div className="container">
          <div className="specs-content">
            <h2 className="specs-title">Technical Excellence</h2>
            <div className="specs-grid-immersive">
              {Object.entries(product.specifications)
                .slice(0, 6)
                .map(([key, value], index) => (
                  <div
                    key={index}
                    className="spec-item-immersive"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <dt className="spec-label-immersive">{key}</dt>
                    <dd className="spec-value-immersive">{value}</dd>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="product-details-immersive">
        <div className="container">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} category={product.category} />

      {/* Sticky Product Info (shows on scroll) */}
      <div className={`sticky-product-info ${isInfoVisible ? "visible" : ""}`}>
        <div className="sticky-content">
          <div className="sticky-product">
            <img
              src={product.image}
              alt={product.name}
              className="sticky-image"
            />
            <div className="sticky-info">
              <h4 className="sticky-name">{product.name}</h4>
              <span className="sticky-price">{product.priceRange}</span>
            </div>
          </div>

          <div className="sticky-actions">
            <button className="btn-sticky-quote" onClick={handleRequestQuote}>
              Request Quote
            </button>
            <button className="btn-sticky-call">Call Expert</button>
          </div>
        </div>
      </div>

      {/* Floating Contact Button */}
      <button className="floating-contact-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductPageImmersive;
