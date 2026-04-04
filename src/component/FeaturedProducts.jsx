// import { useEffect, useState } from "react";
// import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
// import { useCartStore } from "../stores/useCartStore";

// const FeaturedProducts = ({ featuredProducts }) => {
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [itemsPerPage, setItemsPerPage] = useState(4);
// 	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

// 	const { addToCart } = useCartStore();

// 	useEffect(() => {
// 		const handleResize = () => {
// 			setWindowWidth(window.innerWidth);
// 			if (window.innerWidth < 640) setItemsPerPage(1);
// 			else if (window.innerWidth < 1024) setItemsPerPage(2);
// 			else if (window.innerWidth < 1280) setItemsPerPage(3);
// 			else setItemsPerPage(4);
// 		};

// 		handleResize();
// 		window.addEventListener("resize", handleResize);
// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	const nextSlide = () => {
// 		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
// 	};

// 	const prevSlide = () => {
// 		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
// 	};

// 	const isStartDisabled = currentIndex === 0;
// 	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

// 	const getTitleFontSize = () => {
// 		if (windowWidth >= 640) return "3.75rem";
// 		return "3rem";
// 	};

// 	return (
// 		<div style={{ paddingTop: "48px", paddingBottom: "48px" }}>
// 			<div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
// 				<h2 style={{ 
// 					textAlign: "center", 
// 					fontSize: getTitleFontSize(), 
// 					fontWeight: "bold", 
// 					color: "#34d399", 
// 					marginBottom: "16px" 
// 				}}>
// 					Featured
// 				</h2>
// 				<div style={{ position: "relative" }}>
// 					<div style={{ overflow: "hidden" }}>
// 						<div
// 							style={{
// 								display: "flex",
// 								transition: "transform 300ms ease-in-out",
// 								transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
// 							}}
// 						>
// 							{/* {featuredProducts?.map((product) => (
// 								<div 
// 									key={product._id} 
// 									style={{
// 										width: `${100 / itemsPerPage}%`,
// 										flexShrink: 0,
// 										padding: "0 8px"
// 									}}
// 								>
// 									<div style={{
// 										backgroundColor: "rgba(255, 255, 255, 0.1)",
// 										backdropFilter: "blur(4px)",
// 										borderRadius: "8px",
// 										boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
// 										overflow: "hidden",
// 										height: "100%",
// 										transition: "all 300ms",
// 										border: "1px solid rgba(16, 185, 129, 0.3)"
// 									}}
// 									onMouseEnter={(e) => {
// 										e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
// 									}}
// 									onMouseLeave={(e) => {
// 										e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
// 									}}
// 								>
// 									<div style={{ overflow: "hidden" }}>
// 										<img
// 											src={product.image}
// 											alt={product.name}
// 											style={{
// 												width: "100%",
// 												height: "192px",
// 												objectFit: "cover",
// 												transition: "transform 300ms ease-in-out"
// 											}}
// 											onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
// 											onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
// 										/>
// 									</div>
// 									<div style={{ padding: "16px" }}>
// 										<h3 style={{ 
// 											fontSize: "1.125rem", 
// 											fontWeight: 600, 
// 											marginBottom: "8px", 
// 											color: "white" 
// 										}}>
// 											{product.name}
// 										</h3>
// 										<p style={{ 
// 											color: "#6ee7b7", 
// 											fontWeight: 500, 
// 											marginBottom: "16px" 
// 										}}>
// 											${product.price.toFixed(2)}
// 										</p>
// 										<button
// 											onClick={() => addToCart(product)}
// 											style={{
// 												width: "100%",
// 												backgroundColor: "#059669",
// 												color: "white",
// 												fontWeight: 600,
// 												padding: "8px 16px",
// 												border: "none",
// 												borderRadius: "4px",
// 												transition: "background-color 300ms",
// 												display: "flex",
// 												alignItems: "center",
// 												justifyContent: "center",
// 												cursor: "pointer"
// 											}}
// 											onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#10b981"}
// 											onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#059669"}
// 										>
// 											<ShoppingCart style={{ width: "20px", height: "20px", marginRight: "8px" }} />
// 											Add to Cart
// 										</button>
// 									</div>
// 								</div>
// 						</div>
// 							))} */}
// 					</div>
					
// 					<button
// 						onClick={prevSlide}
// 						disabled={isStartDisabled}
// 						style={{
// 							position: "absolute",
// 							top: "50%",
// 							left: windowWidth >= 640 ? "-16px" : "-8px",
// 							transform: "translateY(-50%)",
// 							padding: windowWidth >= 640 ? "8px" : "6px",
// 							borderRadius: "9999px",
// 							transition: "background-color 300ms",
// 							border: "none",
// 							cursor: isStartDisabled ? "not-allowed" : "pointer",
// 							backgroundColor: isStartDisabled ? "#9ca3af" : "#059669",
// 							zIndex: 10
// 						}}
// 						onMouseEnter={(e) => {
// 							if (!isStartDisabled) e.currentTarget.style.backgroundColor = "#10b981";
// 						}}
// 						onMouseLeave={(e) => {
// 							if (!isStartDisabled) e.currentTarget.style.backgroundColor = "#059669";
// 						}}
// 					>
// 						<ChevronLeft style={{ 
// 							width: windowWidth >= 640 ? "24px" : "20px", 
// 							height: windowWidth >= 640 ? "24px" : "20px", 
// 							color: "white" 
// 						}} />
// 					</button>

// 					<button
// 						onClick={nextSlide}
// 						disabled={isEndDisabled}
// 						style={{
// 							position: "absolute",
// 							top: "50%",
// 							right: windowWidth >= 640 ? "-16px" : "-8px",
// 							transform: "translateY(-50%)",
// 							padding: windowWidth >= 640 ? "8px" : "6px",
// 							borderRadius: "9999px",
// 							transition: "background-color 300ms",
// 							border: "none",
// 							cursor: isEndDisabled ? "not-allowed" : "pointer",
// 							backgroundColor: isEndDisabled ? "#9ca3af" : "#059669",
// 							zIndex: 10
// 						}}
// 						onMouseEnter={(e) => {
// 							if (!isEndDisabled) e.currentTarget.style.backgroundColor = "#10b981";
// 						}}
// 						onMouseLeave={(e) => {
// 							if (!isEndDisabled) e.currentTarget.style.backgroundColor = "#059669";
// 						}}
// 					>
// 						<ChevronRight style={{ 
// 							width: windowWidth >= 640 ? "24px" : "20px", 
// 							height: windowWidth >= 640 ? "24px" : "20px", 
// 							color: "white" 
// 						}} />
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 		</div>
// 	);
// };
// export default FeaturedProducts;

import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  const getTitleFontSize = () => {
    if (windowWidth >= 640) return "3.75rem";
    return "3rem";
  };

  const handlePrevMouseEnter = (e) => {
    if (!isStartDisabled) e.currentTarget.style.backgroundColor = "#10b981";
  };

  const handlePrevMouseLeave = (e) => {
    if (!isStartDisabled) e.currentTarget.style.backgroundColor = "#059669";
  };

  const handleNextMouseEnter = (e) => {
    if (!isEndDisabled) e.currentTarget.style.backgroundColor = "#10b981";
  };

  const handleNextMouseLeave = (e) => {
    if (!isEndDisabled) e.currentTarget.style.backgroundColor = "#059669";
  };

  const handleProductMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
  };

  const handleProductMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
  };

  const handleImageMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleImageMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  const handleAddToCartClick = (product) => {
    addToCart(product);
  };

  const handleAddToCartMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = "#10b981";
  };

  const handleAddToCartMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = "#059669";
  };

  const styles = {
    section: {
      paddingTop: "48px",
      paddingBottom: "48px"
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 16px"
    },
    title: {
      textAlign: "center",
      fontSize: getTitleFontSize(),
      fontWeight: "bold",
      color: "#34d399",
      marginBottom: "16px"
    },
    carouselContainer: {
      position: "relative"
    },
    overflow: {
      overflow: "hidden"
    },
    slideTrack: {
      display: "flex",
      transition: "transform 300ms ease-in-out",
      transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
    },
    productWrapper: {
      width: `${100 / itemsPerPage}%`,
      flexShrink: 0,
      padding: "0 8px"
    },
    productCard: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(4px)",
      borderRadius: "8px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      height: "100%",
      transition: "all 300ms",
      border: "1px solid rgba(16, 185, 129, 0.3)"
    },
    imageContainer: {
      overflow: "hidden"
    },
    productImage: {
      width: "100%",
      height: "192px",
      objectFit: "cover",
      transition: "transform 300ms ease-in-out"
    },
    productInfo: {
      padding: "16px"
    },
    productName: {
      fontSize: "1.125rem",
      fontWeight: 600,
      marginBottom: "8px",
      color: "white"
    },
    productPrice: {
      color: "#6ee7b7",
      fontWeight: 500,
      marginBottom: "16px"
    },
    addToCartButton: {
      width: "100%",
      backgroundColor: "#059669",
      color: "white",
      fontWeight: 600,
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      transition: "background-color 300ms",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    },
    cartIcon: {
      width: "20px",
      height: "20px",
      marginRight: "8px"
    },
    navButton: (isDisabled, isLeft = true) => ({
      position: "absolute",
      top: "50%",
      left: isLeft ? (windowWidth >= 640 ? "-16px" : "-8px") : "auto",
      right: !isLeft ? (windowWidth >= 640 ? "-16px" : "-8px") : "auto",
      transform: "translateY(-50%)",
      padding: windowWidth >= 640 ? "8px" : "6px",
      borderRadius: "9999px",
      transition: "background-color 300ms",
      border: "none",
      cursor: isDisabled ? "not-allowed" : "pointer",
      backgroundColor: isDisabled ? "#9ca3af" : "#059669",
      zIndex: 10
    }),
    navIcon: {
      width: windowWidth >= 640 ? "24px" : "20px",
      height: windowWidth >= 640 ? "24px" : "20px",
      color: "white"
    }
  };

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        {/* <h2 style={styles.title}>
          Featured
        </h2> */}
        <div style={styles.carouselContainer}>
          <div style={styles.overflow}>
            <div style={styles.slideTrack}>
              {featuredProducts?.map((product) => (
                <div key={product._id} style={styles.productWrapper}>
                  <div
                    style={styles.productCard}
                    onMouseEnter={handleProductMouseEnter}
                    onMouseLeave={handleProductMouseLeave}
                  >
                    <div style={styles.imageContainer}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={styles.productImage}
                        onMouseEnter={handleImageMouseEnter}
                        onMouseLeave={handleImageMouseLeave}
                      />
                    </div>
                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>
                        {product.name}
                      </h3>
                      <p style={styles.productPrice}>
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleAddToCartClick(product)}
                        style={styles.addToCartButton}
                        onMouseEnter={handleAddToCartMouseEnter}
                        onMouseLeave={handleAddToCartMouseLeave}
                      >
                        <ShoppingCart style={styles.cartIcon} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            style={styles.navButton(isStartDisabled, true)}
            onMouseEnter={handlePrevMouseEnter}
            onMouseLeave={handlePrevMouseLeave}
          >
            <ChevronLeft style={styles.navIcon} />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            style={styles.navButton(isEndDisabled, false)}
            onMouseEnter={handleNextMouseEnter}
            onMouseLeave={handleNextMouseLeave}
          >
            <ChevronRight style={styles.navIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;