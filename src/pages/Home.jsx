import { useEffect, useState, useMemo, useCallback } from "react";
import { Package } from "lucide-react";
import CategoryItem from "../component/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../component/ProductCard";
import FeaturedProducts from "../component/FeaturedProducts";

const CATEGORIES = [
  {
    href: "/floor_tile",
    name: "Floor Tiles",
    imageUrl: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1600",
    types: ["24x24 Matt", "24x24 GVT", "24x24 Double Charge", "24x48"]
  },
  {
    href: "/wall_tile",
    name: "Wall Tiles",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    types: ["Bathroom", "Kitchen", "Elevation"]
  },
  {
    href: "/bathroom_tiles",
    name: "Bathroom Tiles",
    imageUrl: "https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=1600",
    types: ["Wall Tiles", "Floor Tiles", "Mosaic"]
  },
  {
    href: "/kitchen_tiles",
    name: "Kitchen Tiles",
    imageUrl: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1600",
    types: ["Backsplash", "Floor Tiles", "Wall Tiles"]
  }
];

const GRADIENTS = [
  "linear-gradient(135deg, #134e5e, #2b7a4b, #71b280)",
  "linear-gradient(135deg, #4a00e0, #8e2de2, #d585ff)",
  "linear-gradient(135deg, #ff6b6b, #feca57, #ff9f43)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #ff0844, #ffb199, #ff7e5f)",
  "linear-gradient(135deg, #2c3e50, #3498db, #e0eaf5)",
  "linear-gradient(135deg, #1e3c72, #2a5298, #4facfe)",
  "linear-gradient(135deg, #8B7355, #D2B48C, #F5DEB3)",
  "linear-gradient(to bottom right, #e5e7eb, #f3f4f6, #e5e7eb)"
];

const TEXT_GRADIENTS = [
  "linear-gradient(135deg, #FFD700, #FFA500, #FF6347)",
  "linear-gradient(135deg, #00CED1, #1E90FF, #9400D3)",
  "linear-gradient(135deg, #7CFC00, #32CD32, #006400)",
  "linear-gradient(135deg, #FF69B4, #FF1493, #C71585)",
];

export const Home = () => {
  const { fetchAllProducts, products, isLoading } = useProductStore();
  const [windowWidth, setWindowWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [gradientIndex, setGradientIndex] = useState(0);
  const [textGradientIndex, setTextGradientIndex] = useState(0);

  // Memoized responsive values
  const gridColumns = useMemo(() => {
    if (windowWidth >= 1024) return "repeat(3, 1fr)";
    if (windowWidth >= 768) return "repeat(2, 1fr)";
    return "repeat(1, 1fr)";
  }, [windowWidth]);

  const titleFontSize = useMemo(() => {
    if (windowWidth >= 1024) return "3.75rem";
    if (windowWidth >= 768) return "3rem";
    return "2.5rem";
  }, [windowWidth]);

  const heroImageHeight = useMemo(() => 
    windowWidth >= 1024 ? "18rem" : "16rem", 
    [windowWidth]
  );

  const heroTitleFontSize = useMemo(() => 
    windowWidth >= 1024 ? "3rem" : "2.25rem", 
    [windowWidth]
  );

  const productGridTemplate = useMemo(() => {
    if (windowWidth >= 1024) return "repeat(3, 1fr)";
    if (windowWidth >= 640) return "repeat(2, 1fr)";
    return "1fr";
  }, [windowWidth]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Gradient animations
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % GRADIENTS.length);
    }, 2000);

    const textInterval = setInterval(() => {
      setTextGradientIndex((prev) => (prev + 1) % TEXT_GRADIENTS.length);
    }, 2000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Styles object - moved outside component or memoized to prevent recreation
  const styles = useMemo(() => ({
    pageContainer: {
      position: "relative",
      minHeight: "100vh",
      color: "white",
      overflow: "hidden"
    },
    contentContainer: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 16px",
      paddingTop: "64px",
      paddingBottom: "64px"
    },
    mainTitle: {
      textAlign: "center",
      fontSize: titleFontSize,
      fontWeight: "bold",
      color: "#34d399",
      marginBottom: "16px"
    },
    subtitle: {
      textAlign: "center",
      fontSize: "1.25rem",
      color: "#d1d5db",
      marginBottom: "48px"
    },
    categoryGrid: {
      display: "grid",
      gridTemplateColumns: gridColumns,
      gap: "24px",
      marginBottom: "48px"
    },
    hero: {
      container: {
        background: GRADIENTS[gradientIndex],
        borderRadius: "0.75rem",
        overflow: "hidden",
        padding: "2.5rem 1rem",
        ...(windowWidth >= 1024 && {
          padding: "2.5rem 2rem",
        })
      },
      content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.5rem",
        ...(windowWidth >= 1024 && {
          flexDirection: "row-reverse",
        })
      },
      textContainer: {
        textAlign: windowWidth >= 1024 ? "left" : "center",
        flex: 1,
      },
      title: {
        fontSize: heroTitleFontSize,
        fontWeight: "bold",
        lineHeight: "1.2",
        color: "white",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      },
      titleSpan: {
        // background: TEXT_GRADIENTS[textGradientIndex],
        // color: TEXT_GRADIENTS[textGradientIndex],
        // WebkitBackgroundClip: "text",
        // WebkitTextFillColor: "transparent",
        // backgroundClip: "text",
        // transition: "background 0.5s ease-in-out",
        // display: "inline-block",
      },
      description: {
        paddingTop: "1rem",
        paddingBottom: "1rem",
        color: "rgba(0, 0, 0, 0.6)",
        fontSize: "1rem",
      },
      button: {
        backgroundColor: "#3b82f6",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
      },
    },
    products: {
      section: {
        marginTop: "2.5rem",
      },
      header: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "1rem",
      },
      title: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "#fff",
      },
      icon: {
        color: "#3b82f6",
      },
      emptyState: {
        backgroundColor: "#f3f4f6",
        borderRadius: "0.5rem",
      },
      emptyStateBody: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 1rem",
      },
      emptyIcon: {
        width: "4rem",
        height: "4rem",
        color: "rgba(0, 0, 0, 0.2)",
        marginBottom: "1rem",
      },
      emptyTitle: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.5)",
        marginBottom: "0.5rem",
      },
      grid: {
        display: "grid",
        gridTemplateColumns: productGridTemplate,
        gap: "1rem",
      },
    },
  }), [
    windowWidth, 
    gradientIndex, 
    textGradientIndex, 
    gridColumns, 
    titleFontSize, 
    heroTitleFontSize, 
    productGridTemplate
  ]);

  // Loading state renderer
  const renderLoadingState = () => (
    <div style={styles.products.emptyState}>
      <div style={styles.products.emptyStateBody}>
        <div>Loading products...</div>
      </div>
    </div>
  );

  // Empty state renderer
  const renderEmptyState = () => (
    <div style={styles.products.emptyState}>
      <div style={styles.products.emptyStateBody}>
        <Package style={styles.products.emptyIcon} />
        {/* <h3 style={styles.products.emptyTitle}>No products yet</h3> */}
        <h3 style={styles.products.emptyTitle}>Loading...</h3>
      </div>
    </div>
  );

  // Products grid renderer
  const renderProducts = () => {
    if (isLoading) return renderLoadingState();
    if (!products?.length) return renderEmptyState();
    
    return (
      <div style={styles.products.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      {/* <div style={styles.hero.container}>
        <div style={styles.hero.content}>
          <div style={styles.hero.textContainer}>
            <h1 style={styles.hero.title}>
              Share Your{' '}
              <span style={styles.hero.titleSpan}>
                Products
              </span>
            </h1>
            <p style={styles.hero.description}>
              Upload, discover, and connect with creators.
            </p>
          </div>
        </div>
      </div>
       */}
      <div style={styles.contentContainer}>
        <h1 style={styles.mainTitle}>
          Explore Our Tile Collections
        </h1>
        <p style={styles.subtitle}>
          Premium quality tiles for every space in your home
        </p>

        <div style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        
        {/* <div style={styles.products.section}>
          <div style={styles.products.header}>
            <Package style={{ ...styles.products.icon, width: "1.25rem", height: "1.25rem" }} />
            <h2 style={styles.products.title}>All Products</h2>
          </div>
        </div> */}
        {/* {!isLoading && products && products.length > 0 && ( */}
           {/* <FeaturedProducts featuredProducts={products} /> */}
        {/* )} */}
        {/* {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />} */}
        {renderProducts()}
      </div>
    </div>
  );
};