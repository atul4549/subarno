import { motion, AnimatePresence } from "framer-motion";
import { 
    MapPin, 
    CheckCircle, 
    User,
    Phone,
    Home,
    Lock,
    AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { create } from 'zustand';
import axiosInstance from '../lib/axios'; // Update path as needed
import { toast } from 'react-hot-toast';

const useCheckoutStore = create((set) => ({
    shippingAddress: null,
    paymentMethod: 'cod', // Default to Cash on Delivery
    orderDetails: null,
    isLoading: false,
    error: null,
    setShippingAddress: (address) => set({ shippingAddress: address }),
    setPaymentMethod: (method) => set({ paymentMethod: method }),
    setOrderDetails: (details) => set({ orderDetails: details }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    resetCheckout: () => set({ 
        shippingAddress: null, 
        orderDetails: null, 
        isLoading: false, 
        error: null 
    })
}));

export const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { productId, quantity = 1, product } = location.state || {};
    
    // Address form state
    const [addressForm, setAddressForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        saveAddress: false
    });
    
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    
    const { 
        shippingAddress, 
        paymentMethod, 
        orderDetails,
        isLoading,
        error,
        setShippingAddress,
        setPaymentMethod,
        setOrderDetails,
        setLoading,
        setError,
        resetCheckout
    } = useCheckoutStore();
    
    // Handle address form input changes
    const handleAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        const updatedForm = { 
            ...addressForm, 
            [name]: type === 'checkbox' ? checked : value 
        };
        setAddressForm(updatedForm);
        setShippingAddress(updatedForm);
    };
    
    // Create order function
    const createOrder = async () => {
        if (!shippingAddress) {
            throw new Error("Please provide shipping address");
        }
        
        if (!product) {
            throw new Error("Product information missing");
        }
        
        const orderData = {
            // productId: productId || product._id,
            quantity: quantity,
            // shippingAddress: {
            //     fullName: shippingAddress.fullName,
            //     email: shippingAddress.email,
            //     addressLine1: shippingAddress.addressLine1,
            //     addressLine2: shippingAddress.addressLine2,
            //     city: shippingAddress.city,
            //     state: shippingAddress.state,
            //     zipCode: shippingAddress.zipCode,
            //     country: shippingAddress.country
            // },
            // paymentMethod: 'cod',
            price: product.price,
            total: product.price * quantity,
            username: shippingAddress.fullName,
            phone: shippingAddress.phone,
            streetAddress: shippingAddress.addressLine1,
            city: shippingAddress.city,
            pincode: shippingAddress.zipCode,
            product_name: product.name
        };
        
        const response = await axiosInstance.post('/orders', orderData);
        return response.data;
    };
    
    // Clear cart function (if you have cart functionality)
    const clearCart = () => {
        // Implement based on your cart management
        // For single product checkout, you might not need this
        localStorage.removeItem('cart');
        // If using Zustand for cart, add clearCart action
    };
    
    // Handle cash on delivery
    const handleCashOnDelivery = async () => {
        try {
            setIsProcessingPayment(true);
            setError(null);
            
            // Validate shipping address
            if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || 
                !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.zipCode) {
                toast.error("Please fill in all required address fields");
                return;
            }
            
            // Create order
            const order = await createOrder();
            
            // Update order status for COD
            // await axiosInstance.patch(`/orders/${order._id}/status`, {
            //     status: 'confirmed',
            //     paymentStatus: 'pending'
            // });
            
            toast.success("Order placed successfully!");
            
            // Clear cart and reset checkout
            clearCart();
            resetCheckout();
            
            // Navigate to success page
            navigate('/order-success', {
                state: {
                    orderId: order.orderId || order._id,
                    amount: product.price * quantity,
                    items: [product],
                    quantity: quantity
                }
            });
            
        } catch (error) {
            console.error("Order error:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to place order");
            setError(error.response?.data?.message || error.message || "Failed to place order");
        } finally {
            setIsProcessingPayment(false);
        }
    };
    
    // Handle place order based on payment method
    const handlePlaceOrder = async () => {
        if (paymentMethod === 'cod') {
            await handleCashOnDelivery();
        } else {
            // Handle other payment methods here
            toast.info("Other payment methods coming soon!");
        }
    };
    
    // Calculate totals
    const subtotal = product ? product.price * quantity : 0;
    const shippingCost = 0; // Free shipping
    const taxRate = 0; // 10% tax
    const taxAmount = subtotal * taxRate;
    const finalTotal = subtotal + taxAmount + shippingCost;
    
    // Check if address form is valid
    const isAddressValid = addressForm.fullName && addressForm.phone && 
                          addressForm.addressLine1 && addressForm.city && addressForm.zipCode;
    
    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>Secure Checkout</h1>
            </div>
            <div style={checkoutContainerStyle}>
                {/* Error Display */}
                {error && (
                    <div style={errorDisplayStyle}>
                        <AlertCircle size={20} color="#f87171" />
                        <span style={{ color: "#fca5a5" }}>{error}</span>
                    </div>
                )}
                <div style={mainContentStyle}>
                    {/* Left Column - Address Form */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            style={sectionContainerStyle}
                        >
                            <>
                                <div style={sectionHeaderStyle}>
                                    <MapPin style={sectionIconStyle} />
                                    <h2 style={sectionTitleStyle}>Delivery Address</h2>
                                </div>
                                
                                <div style={formGridStyle}>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>
                                            <User size={16} />
                                            username *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={addressForm.fullName}
                                            onChange={handleAddressChange}
                                            placeholder="username"
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    
                                    {/* <div style={inputGroupStyle}>
                                        <label style={labelStyle}>
                                            <User size={16} />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={addressForm.email}
                                            onChange={handleAddressChange}
                                            placeholder="john@example.com"
                                            style={inputStyle}
                                            required
                                        />
                                    </div> */}
                                    
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>
                                            <Phone size={16} />
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={addressForm.phone}
                                            onChange={handleAddressChange}
                                            placeholder="phone"
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>
                                            <Home size={16} />
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={addressForm.addressLine1}
                                            onChange={handleAddressChange}
                                            placeholder="123 Main Street"
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>
                                            <Home size={16} />
                                            Apartment, Suite, etc. (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={addressForm.addressLine2}
                                            onChange={handleAddressChange}
                                            placeholder="Apt 4B"
                                            style={inputStyle}
                                        />
                                    </div>
                                    
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={addressForm.city}
                                                onChange={handleAddressChange}
                                                placeholder="patna"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>
                                        
                                        {/* <div style={inputGroupStyle}>
                                            <label style={labelStyle}>State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={addressForm.state}
                                                onChange={handleAddressChange}
                                                placeholder="NY"
                                                style={inputStyle}
                                                required
                                            />
                                        </div> */}
                                    {/* </div> */}
                                    
                                    {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}> */}
                                        <div style={inputGroupStyle}>
                                            <label style={labelStyle}>PIN Code *</label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={addressForm.zipCode}
                                                onChange={handleAddressChange}
                                                placeholder="123456"
                                                style={inputStyle}
                                                required
                                            />
                                        </div>
                                        
                                        {/* <div style={inputGroupStyle}>
                                            <label style={labelStyle}>Country *</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={addressForm.country}
                                                onChange={handleAddressChange}
                                                placeholder="United States"
                                                style={inputStyle}
                                                required
                                            />
                                        </div> */}
                                    </div>
                                    
                                    <div style={checkboxStyle}>
                                        <input
                                            type="checkbox"
                                            name="saveAddress"
                                            checked={addressForm.saveAddress}
                                            onChange={handleAddressChange}
                                            style={{ width: "1rem", height: "1rem" }}
                                        />
                                        <span style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                                            Save this address for future purchases
                                        </span>
                                    </div>
                                </div>
                            </>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Right Column - Order Summary */}
                    <div style={sectionContainerStyle}>
                        <div style={sectionHeaderStyle}>
                            <CheckCircle style={sectionIconStyle} />
                            <h2 style={sectionTitleStyle}>Order Summary</h2>
                        </div>
                        
                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{
                                backgroundColor: "#374151",
                                borderRadius: "0.5rem",
                                padding: "1rem",
                                marginBottom: "1rem"
                            }}>
                                {product && (
                                    <>
                                        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "0.5rem" }} 
                                            />
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{product.name}</div>
                                                <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Quantity: {quantity}</div>
                                            </div>
                                        </div>
                                        <div style={priceRowStyle}>
                                            <span style={{ color: "#d1d5db" }}>Price</span>
                                            <span>Rs {product.price.toFixed(2)}</span>
                                        </div>
                                        <div style={priceRowStyle}>
                                            <span style={{ color: "#d1d5db" }}>Quantity</span>
                                            <span>{quantity}</span>
                                        </div>
                                    </>
                                )}
                                
                                {/* <div style={priceRowStyle}>
                                    <span style={{ color: "#d1d5db" }}>Subtotal</span>
                                    <span>Rs {subtotal.toFixed(2)}</span>
                                </div> */}
                                {/* <div style={priceRowStyle}>
                                    <span style={{ color: "#d1d5db" }}>Shipping</span>
                                    <span style={{ color: "#10b981", fontWeight: 500 }}>FREE</span>
                                </div> */}
                                {/* <div style={priceRowStyle}>
                                    <span style={{ color: "#d1d5db" }}>Tax (10%)</span>
                                    <span>${taxAmount.toFixed(2)}</span>
                                </div> */}
                                <div style={totalRowStyle}>
                                    <span>Total</span>
                                    {/* <span>Rs {subtotal * quantity}</span> */}
                                    <span>Rs {finalTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        {shippingAddress && shippingAddress.fullName && (
                            <div style={{
                                backgroundColor: "#374151",
                                borderRadius: "0.5rem",
                                padding: "1rem",
                                marginTop: "1rem"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                                    <MapPin size={18} style={{ color: "#3b82f6" }} />
                                    <h3 style={{ fontWeight: 600, color: "#f8fafc" }}>Delivery Address</h3>
                                </div>
                                <div style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                                    <div>{shippingAddress.fullName}</div>
                                    <div>{shippingAddress.email}</div>
                                    <div>{shippingAddress.addressLine1}</div>
                                    {shippingAddress.addressLine2 && <div>{shippingAddress.addressLine2}</div>}
                                    <div>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</div>
                                    {/* <div>{shippingAddress.country}</div> */}
                                    <div style={{ marginTop: "0.5rem" }}>
                                        📞 {shippingAddress.phone}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessingPayment || isLoading || !isAddressValid}
                            style={{
                                ...placeOrderButtonStyle,
                                opacity: (isProcessingPayment || isLoading || !isAddressValid) ? 0.7 : 1,
                                cursor: (isProcessingPayment || isLoading || !isAddressValid) ? "not-allowed" : "pointer"
                            }}
                            onMouseEnter={(e) => {
                                if (!isProcessingPayment && !isLoading && isAddressValid) {
                                    e.currentTarget.style.backgroundColor = "#059669";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isProcessingPayment && !isLoading && isAddressValid) {
                                    e.currentTarget.style.backgroundColor = "#10b981";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            {(isProcessingPayment || isLoading) ? (
                                <>
                                    <div style={{
                                        width: "1rem",
                                        height: "1rem",
                                        border: "2px solid white",
                                        borderTop: "2px solid transparent",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite"
                                    }}></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    Place Order ( Rs{finalTotal.toFixed(2)} )
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    ::-webkit-scrollbar {
                        width: 8px;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background: #374151;
                        border-radius: 4px;
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: #4b5563;
                        border-radius: 4px;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: #6b7280;
                    }
                    
                    input:focus, select:focus, textarea:focus {
                        outline: none;
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    }
                `}
            </style>
        </div>
    );
};

// Styles
const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: "2rem 1rem"
};

const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem"
};

const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
};

const checkoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "2rem"
};

const mainContentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem"
};

const sectionContainerStyle = {
    backgroundColor: "#1f2937",
    borderRadius: "0.75rem",
    padding: "2rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
};

const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid rgba(59, 130, 246, 0.3)"
};

const sectionIconStyle = {
    color: "#3b82f6",
    width: "2rem",
    height: "2rem"
};

const sectionTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#f8fafc"
};

const formGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "1rem"
};

const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
};

const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#d1d5db",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
};

const inputStyle = {
    padding: "0.75rem 1rem",
    backgroundColor: "#374151",
    border: "1px solid #4b5563",
    borderRadius: "0.5rem",
    color: "#f8fafc",
    fontSize: "1rem",
    transition: "all 0.2s ease"
};

const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer"
};

const priceRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid #4b5563"
};

const totalRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    fontWeight: 600,
    fontSize: "1.125rem",
    color: "#f8fafc"
};

const errorDisplayStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444",
    borderRadius: "0.5rem",
    padding: "1rem",
    marginBottom: "1rem"
};

const buttonStyle = {
    padding: "0.875rem 2rem",
    borderRadius: "0.5rem",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
};

const placeOrderButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#10b981",
    color: "white",
    width: "100%",
    justifyContent: "center",
    marginTop: "1.5rem"
};