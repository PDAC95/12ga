import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import Components
import ProductHero from "../components/ProductHero/ProductHero";
import ProductGallery from "../components/ProductGallery/ProductGallery";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import ProductTabs from "../components/ProductTabs/ProductTabs";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Mock product data - In real app, this would come from API
  const mockProducts = {
    "premium-chrome-grille-assembly": {
      id: 1,
      name: "Premium Chrome Grille Assembly",
      slug: "premium-chrome-grille-assembly",
      sku: "12GA-GRL-001",
      category: { name: "GRILLES", slug: "grilles" },
      shortDescription:
        "Transform your truck's front end with our premium chrome grille assembly, designed for perfect fit and superior durability.",
      description:
        "Our Premium Chrome Grille Assembly represents the pinnacle of truck customization excellence. Crafted from high-grade materials and finished with a mirror-like chrome coating, this grille assembly is designed to make a bold statement while maintaining the highest standards of quality and durability.",
      longDescription:
        "This premium grille assembly features advanced manufacturing techniques and premium materials that set it apart from standard alternatives. The chrome finish is applied using a multi-layer process that includes copper plating, nickel plating, and final chrome coating for maximum durability and resistance to corrosion.",
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
      dimensions: {
        length: "47.5 inches",
        width: "23.2 inches",
        height: "7.8 inches",
        weight: "18.5 lbs",
      },
      materials: [
        {
          type: "Base Material",
          description: "High-strength automotive grade steel",
        },
        {
          type: "Plating Process",
          description: "Multi-layer chrome plating with copper and nickel base",
        },
        {
          type: "Hardware",
          description:
            "Stainless steel mounting hardware with corrosion protection",
        },
      ],
      options: [
        {
          name: "Finish Type",
          type: "select",
          values: [
            { name: "Mirror Chrome", price: null },
            { name: "Satin Chrome", price: "+$50" },
            { name: "Black Chrome", price: "+$100" },
          ],
        },
        {
          name: "Logo Placement",
          type: "radio",
          values: [
            { name: "No Logo", price: null },
            { name: "12GA Custom Logo", price: "+$75" },
            { name: "Custom Logo (Customer Provided)", price: "+$125" },
          ],
        },
        {
          name: "Installation Service",
          type: "select",
          values: [
            { name: "Self Installation", price: null },
            { name: "Professional Installation", price: "+$200" },
            { name: "White Glove Service", price: "+$350" },
          ],
        },
      ],
    },
    "custom-chrome-grille": {
      id: 2,
      name: "Custom Chrome Grille",
      slug: "custom-chrome-grille",
      sku: "12GA-GRL-002",
      category: { name: "GRILLES", slug: "grilles" },
      shortDescription:
        "Premium chrome-finished grille designed for maximum style and airflow optimization.",
      description:
        "Our Custom Chrome Grille combines exceptional craftsmanship with innovative design to deliver a premium aftermarket solution that enhances both the appearance and performance of your truck.",
      longDescription:
        "Engineered for the discerning truck owner who demands nothing but the best, this custom chrome grille features precision-cut openings that optimize airflow while maintaining structural integrity. The high-grade chrome finish is applied through a rigorous multi-step process that ensures long-lasting brilliance and protection against the elements.",
      image: "/assets/img/products/grille-1.png",
      gallery: [
        "/assets/img/products/grille-1.png",
        "/assets/img/products/product-2.png",
        "/assets/img/products/product-3.png",
      ],
      priceRange: "$299 - $450",
      inStock: true,
      leadTime: "1-2 weeks",
      isNew: false,
      isFeatured: true,
      isCustomizable: true,
      rating: 4.6,
      reviewCount: 89,
      compatibility: [
        "Peterbilt 579 (2013-2024)",
        "Peterbilt 567 (2013-2024)",
        "Kenworth T680 (2013-2024)",
      ],
      keyFeatures: [
        "High-Grade Chrome Finish",
        "Custom Logo Integration",
        "Enhanced Airflow Design",
        "Easy Installation Kit",
        "5-Year Warranty",
      ],
      specifications: {
        Material: "High-strength steel with chrome plating",
        Finish: "Premium chrome coating",
        Mounting: "Bolt-on installation",
        Warranty: "5-year finish warranty",
        Manufacturing: "Made in USA",
        Weight: "16.2 lbs",
        "Package Dimensions": '46" x 22" x 6"',
        "Installation Time": "1-2 hours",
        "Hardware Included": "Complete mounting kit",
      },
      dimensions: {
        length: "45.5 inches",
        width: "21.8 inches",
        height: "6.5 inches",
        weight: "16.2 lbs",
      },
      materials: [
        {
          type: "Base Material",
          description: "High-strength automotive steel",
        },
        { type: "Finish", description: "Premium chrome plating process" },
        { type: "Hardware", description: "Stainless steel mounting hardware" },
      ],
      options: [
        {
          name: "Finish Type",
          type: "select",
          values: [
            { name: "Chrome", price: null },
            { name: "Black Chrome", price: "+$75" },
          ],
        },
        {
          name: "Logo Options",
          type: "radio",
          values: [
            { name: "No Logo", price: null },
            { name: "12GA Logo", price: "+$50" },
          ],
        },
      ],
    },
    "blackout-performance-grille": {
      id: 3,
      name: "Blackout Performance Grille",
      slug: "blackout-performance-grille",
      sku: "12GA-GRL-003",
      category: { name: "GRILLES", slug: "grilles" },
      shortDescription:
        "Aggressive blackout design for enhanced performance and bold appearance.",
      description:
        "The Blackout Performance Grille delivers an aggressive, stealth aesthetic while maintaining optimal airflow for enhanced engine performance. Perfect for operators who prefer a bold, understated look.",
      longDescription:
        "Featuring a sophisticated matte black finish that resists glare and maintains its appearance in all weather conditions. The performance-oriented design includes strategically placed openings that maximize airflow while providing protection from road debris.",
      image: "/assets/img/products/grille-2.png",
      gallery: [
        "/assets/img/products/grille-2.png",
        "/assets/img/products/product-1.png",
        "/assets/img/products/product-4.png",
      ],
      priceRange: "$275 - $400",
      inStock: true,
      leadTime: "1-2 weeks",
      isNew: false,
      isFeatured: false,
      isCustomizable: true,
      rating: 4.7,
      reviewCount: 112,
      compatibility: [
        "Peterbilt 579 (2013-2024)",
        "Kenworth T680 (2013-2024)",
        "Freightliner Cascadia (2015-2024)",
      ],
      keyFeatures: [
        "Matte Black Finish",
        "Performance Optimized",
        "Durable Steel Construction",
        "Weather Resistant",
        "Custom Fitment Available",
      ],
      specifications: {
        Material: "High-strength steel",
        Finish: "Matte black powder coating",
        Mounting: "OEM-compatible mounting",
        Warranty: "3-year finish warranty",
        Manufacturing: "Made in USA",
        Weight: "17.1 lbs",
      },
      dimensions: {
        length: "47.0 inches",
        width: "22.5 inches",
        height: "7.2 inches",
        weight: "17.1 lbs",
      },
      materials: [
        {
          type: "Base Material",
          description: "High-strength steel construction",
        },
        { type: "Finish", description: "Durable matte black powder coating" },
      ],
      options: [
        {
          name: "Mesh Style",
          type: "select",
          values: [
            { name: "Standard Mesh", price: null },
            { name: "Fine Mesh", price: "+$25" },
          ],
        },
      ],
    },
  };

  useEffect(() => {
    // Simulate API call to fetch product
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if product exists in our mock data
        const productData = mockProducts[slug];

        if (productData) {
          setProduct(productData);
        } else {
          // Product not found
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
      setIsInfoVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRequestQuote = (quoteData) => {
    console.log("Quote requested for:", quoteData);
    // In real app, this would send data to backend
    // For now, just show an alert
    alert(
      `Quote requested for ${product.name}\nOptions: ${JSON.stringify(
        quoteData.selectedOptions,
        null,
        2
      )}\nQuantity: ${quoteData.quantity}`
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-page-loading">
        <div className="container">
          <div className="loading-hero">
            <div className="loading-breadcrumb"></div>
            <div className="loading-title"></div>
            <div className="loading-subtitle"></div>
          </div>
          <div className="loading-content">
            <div className="loading-gallery"></div>
            <div className="loading-info"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-page-error">
        <div className="container">
          <div className="error-content">
            <h2>Product Not Found</h2>
            <p>
              The product you're looking for doesn't exist or has been moved.
            </p>
            <div className="error-actions">
              <button className="btn-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
              <button className="btn-browse" onClick={() => navigate("/parts")}>
                Browse All Parts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main product page content
  return (
    <div className="product-page classic-layout">
      <div className="ak-height-100 ak-height-lg-80"></div>

      {/* Product Hero Section */}
      <ProductHero product={product} onRequestQuote={handleRequestQuote} />

      {/* Main Product Content */}
      <section className="product-main-content">
        <div className="container">
          <div className="ak-height-60 ak-height-lg-40"></div>
          <div className="product-content-grid">
            {/* Product Gallery */}
            <div className="product-gallery-section">
              <ProductGallery product={product} />
            </div>

            {/* Product Information */}
            <div className="product-info-section">
              <ProductInfo
                product={product}
                onRequestQuote={handleRequestQuote}
                layout="sidebar"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="ak-height-125 ak-height-lg-80"></div>

      {/* Product Details Tabs */}
      <section className="product-details-section">
        <div className="container">
          <div data-aos="fade-up" data-aos-offset="200">
            <ProductTabs product={product} />
          </div>
        </div>
      </section>

      <div className="ak-height-125 ak-height-lg-80"></div>

      {/* Related Products */}
      <RelatedProducts currentProduct={product} category={product.category} />

      {/* Sticky Related Products (shows on scroll) */}
      <div
        className={`sticky-related-products ${isInfoVisible ? "visible" : ""}`}
      >
        <div className="sticky-content">
          <div className="sticky-header">
            <h4>You might also like</h4>
            <span className="sticky-category">{product.category?.name}</span>
          </div>

          <div className="sticky-products-grid">
            <div className="sticky-product-item">
              <img
                src="/assets/img/products/product-2.png"
                alt="LED Light Bar"
                className="sticky-product-image"
              />
              <div className="sticky-product-info">
                <span className="sticky-product-name">LED Light Bar</span>
                <span className="sticky-product-price">$320 - $480</span>
              </div>
            </div>

            <div className="sticky-product-item">
              <img
                src="/assets/img/products/product-3.png"
                alt="Custom Bumper"
                className="sticky-product-image"
              />
              <div className="sticky-product-info">
                <span className="sticky-product-name">Custom Bumper</span>
                <span className="sticky-product-price">$800 - $1200</span>
              </div>
            </div>

            <div className="sticky-product-item">
              <img
                src="/assets/img/products/product-4.png"
                alt="Visor Shield"
                className="sticky-product-image"
              />
              <div className="sticky-product-info">
                <span className="sticky-product-name">Visor Shield</span>
                <span className="sticky-product-price">$180 - $280</span>
              </div>
            </div>
          </div>

          <div className="sticky-actions">
            <button className="btn-sticky-view-all">View All Parts</button>
            <button
              className="btn-sticky-quote"
              onClick={() =>
                handleRequestQuote({
                  product,
                  selectedOptions: {},
                  quantity: 1,
                })
              }
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
