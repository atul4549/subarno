// // ProductListingPage.jsx
// import { useEffect, useState } from "react";
// // import axios from "axios";
// import {useProductStore} from "../stores/useProductStore";
// import ProductCard from "../component/ProductCard";
// import LoadingSpinner from "../component/LoadingSpinner";
// import axiosInstance from "../lib/axios";

// export const ProductListing = () => {
//   const { products, loading, error, setProducts, setLoading, setError } = useProductStore();
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/products");
//     //   console.log(response)
//       setProducts(response.data);
      
//       // Extract unique categories
//       const uniqueCategories = ["all", ...new Set(response.data.map(product => product.category))];
//       setCategories(uniqueCategories);
//     } catch (err) {
//       setError(err.message || "Failed to fetch products");
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProducts = products.products
// //   console.log(filteredProducts)
// //   .filter(product => {
// //     const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
// //     return matchesSearch && matchesCategory;
// //   });

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>Our Products</h1>
//         <p style={styles.subtitle}>Discover our amazing collection</p>
//       </header>

//       {/* <div style={styles.filtersContainer}>
//         <div style={styles.searchWrapper}>
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={styles.searchInput}
//           />
//         </div>

//         <div style={styles.categoryWrapper}>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             style={styles.categorySelect}
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div> */}

//       {loading ? (
//         <LoadingSpinner />
//       ) : error ? (
//         <div style={styles.errorContainer}>
//           <p style={styles.errorText}>{error}</p>
//           <button onClick={fetchProducts} style={styles.retryButton}>
//             Retry
//           </button>
//         </div>
//       ) : (
//         <>
//           {/* <div style={styles.resultsCount}>
//             Showing {filteredProducts?.length} of {products?.length} products
//           </div> */}
//           <div style={styles.productsGrid}>
//             {filteredProducts?.map(product => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#111827",
//     padding: "20px"
//   },
//   header: {
//     textAlign: "center",
//     marginBottom: "40px",
//     padding: "30px"
//   },
//   title: {
//     fontSize: "2.5rem",
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: "10px"
//   },
//   subtitle: {
//     fontSize: "1.125rem",
//     color: "#9ca3af"
//   },
//   filtersContainer: {
//     maxWidth: "1200px",
//     margin: "0 auto 30px auto",
//     display: "flex",
//     gap: "20px",
//     flexWrap: "wrap",
//     justifyContent: "center"
//   },
//   searchWrapper: {
//     flex: "1",
//     minWidth: "250px"
//   },
//   searchInput: {
//     width: "100%",
//     padding: "12px 16px",
//     fontSize: "1rem",
//     border: "1px solid #374151",
//     borderRadius: "8px",
//     backgroundColor: "#1f2937",
//     color: "white",
//     outline: "none",
//     transition: "border-color 0.2s"
//   },
//   categoryWrapper: {
//     minWidth: "200px"
//   },
//   categorySelect: {
//     width: "100%",
//     padding: "12px 16px",
//     fontSize: "1rem",
//     border: "1px solid #374151",
//     borderRadius: "8px",
//     backgroundColor: "#1f2937",
//     color: "white",
//     cursor: "pointer",
//     outline: "none"
//   },
//   resultsCount: {
//     maxWidth: "1200px",
//     margin: "0 auto 20px auto",
//     color: "#9ca3af",
//     fontSize: "0.875rem"
//   },
//   productsGrid: {
//     maxWidth: "1200px",
//     margin: "0 auto",
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//     gap: "30px",
//     padding: "20px"
//   },
//   errorContainer: {
//     textAlign: "center",
//     padding: "60px 20px"
//   },
//   errorText: {
//     color: "#ef4444",
//     fontSize: "1.125rem",
//     marginBottom: "20px"
//   },
//   retryButton: {
//     padding: "10px 20px",
//     backgroundColor: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "0.875rem",
//     fontWeight: "500"
//   }
// };

// // export default ProductListingPage;

// ProductListing.jsx
import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore"; // Named import with curly braces
import ProductCard from "../component/ProductCard";
import LoadingSpinner from "../component/LoadingSpinner";
import axiosInstance from "../lib/axios";

export const ProductListing = () => {
  const { products, loading, error, setProducts, setLoading, setError } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      // console.log(response.data.products);
      setProducts(response.data);
      
      // Extract unique categories
      const uniqueCategories = ["all", ...new Set(response.data.products.map(product => product.category))];
      // console.log(uniqueCategories)
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fixed: Use 'products' directly, not 'products.products'`
  const filteredProducts = products.products?.filter(product => {
    // console.log(product)
    const matchesSearch = product.name.toLowerCase()
    // const matchesSearch = product.title.toLowerCase()
    .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
    // return matchesSearch
  });
  // console.log(filteredProducts)

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Our Products</h1>
        <p style={styles.subtitle}>Discover our amazing collection</p>
      </header>

      <div style={styles.filtersContainer}>
        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.categoryWrapper}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div style={styles.errorContainer}>
          <p style={styles.errorText}>{error}</p>
          <button onClick={fetchProducts} style={styles.retryButton}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <div style={styles.resultsCount}>
            Showing {filteredProducts?.length} {/* of {products?.length}  */}
            products
          </div>
          <div style={styles.productsGrid}>
            {filteredProducts?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#111827",
    padding: "20px"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    padding: "30px"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "white",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "1.125rem",
    color: "#9ca3af"
  },
  filtersContainer: {
    // maxWidth: "1200px",
    margin: "0 auto 30px auto",
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  searchWrapper: {
    // flex: "1",
    minWidth: "250px"
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    border: "1px solid #374151",
    borderRadius: "8px",
    backgroundColor: "#1f2937",
    color: "white",
    outline: "none",
    transition: "border-color 0.2s"
  },
  categoryWrapper: {
    minWidth: "200px"
  },
  categorySelect: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "1rem",
    border: "1px solid #374151",
    borderRadius: "8px",
    backgroundColor: "#1f2937",
    color: "white",
    cursor: "pointer",
    outline: "none"
  },
  resultsCount: {
    maxWidth: "1200px",
    margin: "0 auto 20px auto",
    color: "#9ca3af",
    fontSize: "0.875rem"
  },
  productsGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    padding: "20px"
  },
  errorContainer: {
    textAlign: "center",
    padding: "60px 20px"
  },
  errorText: {
    color: "#ef4444",
    fontSize: "1.125rem",
    marginBottom: "20px"
  },
  retryButton: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500"
  }
};