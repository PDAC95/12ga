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

  // Mock product data - In real app, this would come from API
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
      "Our Premium Chrome Grille Assembly represents the pinnacle of truck customization excellence. Crafted from high-grade materials and finished with a mirror-like chrome coating, this grille assembly is designed to make a bold statement while maintaining the highest standards of quality and durability. Each piece is precision-engineered for your specific truck model, ensuring a perfect fit that integrates seamlessly with your vehicle's existing design elements.",
    longDescription:
      "This premium grille assembly features advanced manufacturing techniques and premium materials that set it apart from standard alternatives. The chrome finish is applied using a multi-layer process that includes copper plating, nickel plating, and final chrome coating for maximum durability and resistance to corrosion. The structural components are made from high-strength steel that's designed to withstand the rigors of daily use while maintaining its appearance for years to come.",
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
  };

  useEffect(() => {
    // Simulate API call to fetch product
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In real app, you would make an API call here
        // const response = await fetch(`/api/products/${slug}`);
        // const productData = await response.json();

        // For now, use mock data
        if (slug === mockProduct.slug) {
          setProduct(mockProduct);
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
    </div>
  );
};

export default ProductPage;
