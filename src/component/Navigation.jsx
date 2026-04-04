import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";

export const Navigation = () => {
	// const { user, logout } = useUserStore();
	// const isAdmin = user?.role === "admin";
	// const { cart } = useCartStore();

	const styles = {
		header: {
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			backgroundColor: "rgba(17, 24, 39, 0.9)",
			backdropFilter: "blur(8px)",
			boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
			zIndex: 40,
			transition: "all 0.3s",
			borderBottom: "1px solid #065f46"
		},
		container: {
			maxWidth: "1280px",
			margin: "0 auto",
			padding: "12px 16px"
		},
		flexContainer: {
			display: "flex",
			flexWrap: "wrap",
			justifyContent: "space-between",
			alignItems: "center"
		},
		logo: {
			fontSize: "1.5rem",
			fontWeight: "bold",
			color: "#34d399",
			display: "flex",
			alignItems: "center",
			gap: "8px",
			textDecoration: "none"
		},
		nav: {
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			gap: "16px"
		},
		navLink: {
			color: "#d1d5db",
			transition: "color 0.3s ease-in-out",
			textDecoration: "none"
		},
		cartLink: {
			position: "relative",
			color: "#d1d5db",
			transition: "color 0.3s ease-in-out",
			textDecoration: "none",
			display: "flex",
			alignItems: "center"
		},
		cartBadge: {
			position: "absolute",
			top: "-8px",
			left: "-8px",
			backgroundColor: "#10b981",
			color: "white",
			borderRadius: "9999px",
			padding: "2px 8px",
			fontSize: "0.75rem",
			transition: "background-color 0.3s ease-in-out"
		},
		dashboardLink: {
			backgroundColor: "#047857",
			color: "white",
			padding: "4px 12px",
			borderRadius: "6px",
			fontWeight: 500,
			transition: "background-color 0.3s ease-in-out",
			textDecoration: "none",
			display: "flex",
			alignItems: "center"
		},
		logoutButton: {
			backgroundColor: "#374151",
			color: "white",
			padding: "8px 16px",
			borderRadius: "6px",
			display: "flex",
			alignItems: "center",
			transition: "background-color 0.3s ease-in-out",
			border: "none",
			cursor: "pointer"
		},
		signupLink: {
			backgroundColor: "#059669",
			color: "white",
			padding: "8px 16px",
			borderRadius: "6px",
			display: "flex",
			alignItems: "center",
			transition: "background-color 0.3s ease-in-out",
			textDecoration: "none"
		},
		loginLink: {
			backgroundColor: "#374151",
			color: "white",
			padding: "8px 16px",
			borderRadius: "6px",
			display: "flex",
			alignItems: "center",
			transition: "background-color 0.3s ease-in-out",
			textDecoration: "none"
		}
	};

	return (
		<header style={styles.header}>
			<div style={styles.container}>
				<div style={styles.flexContainer}>
					<Link to='/' style={styles.logo}>
						{/* E-Commerce */}
						Subarno
					</Link>

					<nav style={styles.nav}>
						<Link
							to={"/"}
							style={styles.navLink}
							onMouseEnter={(e) => e.currentTarget.style.color = "#34d399"}
							onMouseLeave={(e) => e.currentTarget.style.color = "#d1d5db"}
						>
							Home
						</Link>
						<Link
							to={"/product"}
							style={styles.navLink}
							onMouseEnter={(e) => e.currentTarget.style.color = "#34d399"}
							onMouseLeave={(e) => e.currentTarget.style.color = "#d1d5db"}
						>
							Product
						</Link>
						<Link
							to={"/contact"}
							style={styles.navLink}
							onMouseEnter={(e) => e.currentTarget.style.color = "#34d399"}
							onMouseLeave={(e) => e.currentTarget.style.color = "#d1d5db"}
						>
							Contact
						</Link>
						
						{/* {user && (
							<Link
								to={"/cart"}
								style={styles.cartLink}
								onMouseEnter={(e) => e.currentTarget.style.color = "#34d399"}
								onMouseLeave={(e) => e.currentTarget.style.color = "#d1d5db"}
							>
								<ShoppingCart style={{ marginRight: "4px" }} size={20} />
								<span className="cart-text">Cart</span>
								
								{cart.length > 0 && (
									<span
										style={styles.cartBadge}
										onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#34d399"}
										onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#10b981"}
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						 */}
						{/* {isAdmin && (
							<Link
								style={styles.dashboardLink}
								to={"/secret-dashboard"}
								onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#059669"}
								onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#047857"}
							>
								<Lock style={{ marginRight: "4px" }} size={18} />
								<span className="dashboard-text">Dashboard</span>
							</Link>
						)} */}

						{/* {user ? (
							<button
								style={styles.logoutButton}
								onClick={logout}
								onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4b5563"}
								onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#374151"}
							>
								<LogOut size={18} />
								<span style={{ marginLeft: "8px" }} className="logout-text">Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									style={styles.signupLink}
									onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#047857"}
									onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#059669"}
								>
									<UserPlus style={{ marginRight: "8px" }} size={18} />
									<span className="signup-text">Sign Up</span>
								</Link>
								<Link
									to={"/login"}
									style={styles.loginLink}
									onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4b5563"}
									onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#374151"}
								>
									<LogIn style={{ marginRight: "8px" }} size={18} />
									<span className="login-text">Login</span>
								</Link>
							</>
						)} */}
					</nav>
				</div>
			</div>

			{/* Responsive styles for text visibility */}
			<style>
				{`
					@media (max-width: 640px) {
						.cart-text, .dashboard-text, .logout-text, .signup-text, .login-text {
							display: none;
						}
					}
					@media (min-width: 641px) {
						.cart-text, .dashboard-text, .logout-text, .signup-text, .login-text {
							display: inline;
						}
					}
				`}
			</style>
		</header>
	);
};
// export default Navbar;