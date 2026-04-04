import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    // console.log(product.category)
    const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	
	const handleQuantityChange = (e) => {
		const value = parseInt(e.target.value);
		if (value >= 1) {
			setQuantity(value);
		}
	};

	const incrementQuantity = () => {
		setQuantity(prev => prev + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	const handleBuyNow = async () => {
        try {
			navigate("/checkout", {
				state: {
					quantity: quantity,
					product: product
				}
			});
		} catch (error) {
			toast.error("Failed to proceed to checkout. Please try again.");
			console.error("Buy now error:", error);
		}
	};

	return (
		<div style={styles.card}>
			<div style={styles.imageContainer}>
				<img 
					style={styles.image} 
					src={product.image} 
					alt='product image' 
				/>
				<div style={styles.imageOverlay} />
			</div>

			<div style={styles.content}>
				<h5 style={styles.title}>
					{product.name}
				</h5>
                
				<div style={styles.priceContainer}>
						{/* <span style={styles.price}>	
							 {product.category}
						</span> */}
					<p>
						<span style={styles.price}>	
							Rs {product.price}
						</span>
					</p>
				</div>
				
				{/* Quantity Selector */}
				<div style={styles.quantityWrapper}>
					<button 
						style={styles.quantityButton}
						onClick={decrementQuantity}
						onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4b5563"}
						onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#374151"}
					>
						-
					</button>
					<input 
						type="number" 
						min="1" 
						value={quantity} 
						onChange={handleQuantityChange}
						style={styles.quantityInput} 
					/>
					<button 
						style={styles.quantityButton}
						onClick={incrementQuantity}
						onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4b5563"}
						onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#374151"}
					>
						+
					</button>
				</div>
				
				<button
					style={styles.button}
					onClick={handleBuyNow}
					onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#047857"}
					onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#059669"}
					onFocus={(e) => {
						e.currentTarget.style.outline = "2px solid #10b981";
						e.currentTarget.style.outlineOffset = "2px";
					}}
					onBlur={(e) => {
						e.currentTarget.style.outline = "none";
					}}
				>
					Buy Now
				</button>
			</div>
		</div>
	);
};

const styles = {
    card: {
        display: "flex",
        width: "100%",
        position: "relative",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid #374151",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    },
    imageContainer: {
        position: "relative",
        margin: "12px 12px 0 12px",
        height: "240px",
        overflow: "hidden",
        borderRadius: "12px"
    },
    image: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    imageOverlay: {
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    content: {
        marginTop: "16px",
        padding: "0 20px 20px 20px"
    },
    title: {
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "-0.025em",
        color: "white"
    },
    priceContainer: {
        marginTop: "8px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    price: {
        fontSize: "1.875rem",
        fontWeight: "bold",
        color: "#34d399"
    },
    quantityWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
        justifyContent: "center"
    },
    quantityButton: {
        backgroundColor: "#374151",
        color: "white",
        border: "none",
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        fontSize: "1.25rem",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s"
    },
    quantityInput: {
        width: "60px",
        height: "36px",
        textAlign: "center",
        borderRadius: "8px",
        border: "1px solid #374151",
        backgroundColor: "#1f2937",
        color: "white",
        fontSize: "1rem",
        fontWeight: "500"
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "#059669",
        padding: "10px 20px",
        width: "100%",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "white",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.2s"
    },
    buttonIcon: {
        marginRight: "8px"
    }
};


export default ProductCard;


