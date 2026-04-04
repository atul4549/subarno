import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../component/ProductCard";

export const Category = () => {
  const { fetchProductsByCategory, filteredProducts } = useProductStore();
  const products = filteredProducts
  const { category } = useParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const getGridColumns = () => {
    if (windowWidth >= 1280) return "repeat(4, 1fr)";
    if (windowWidth >= 1024) return "repeat(3, 1fr)";
    if (windowWidth >= 640) return "repeat(2, 1fr)";
    return "repeat(1, 1fr)";
  };

  const getTitleFontSize = () => {
    if (windowWidth >= 640) return "3rem";
    return "2.25rem";
  };

  const getContainerPadding = () => {
    if (windowWidth >= 768) return "0 32px";
    if (windowWidth >= 640) return "0 24px";
    return "0 16px";
  };

  const getCategoryTitle = () => {
    if (!category) return "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const styles = {
    pageContainer: {
      minHeight: "100vh"
    },
    contentContainer: {
      position: "relative",
      zIndex: 10,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: getContainerPadding(),
      paddingTop: "64px",
      paddingBottom: "64px"
    },
    title: {
      textAlign: "center",
      fontSize: getTitleFontSize(),
      fontWeight: "bold",
      color: "#34d399",
      marginBottom: "32px"
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: getGridColumns(),
      gap: "24px",
      justifyItems: "center"
    },
    noProductsMessage: {
      fontSize: "1.875rem",
      fontWeight: 600,
      color: "#d1d5db",
      textAlign: "center",
      gridColumn: "1 / -1"
    }
  };

//   console.log("products:", products);
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {getCategoryTitle()}
        </motion.h1>

        <motion.div
          style={styles.productGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 style={styles.noProductsMessage}>
              {/* No products found */}
              Loading...
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};