import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const styles = {
    container: {
      position: "relative",
      overflow: "hidden",
      height: "384px",
      width: "100%",
      borderRadius: "8px"
    },
    link: {
      textDecoration: "none"
    },
    content: {
      width: "100%",
      height: "100%",
      cursor: "pointer",
      position: "relative"
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to bottom, transparent, #111827)",
      opacity: 0.5,
      zIndex: 10,
      pointerEvents: "none"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 500ms ease-out"
    },
    textContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "16px",
      zIndex: 20,
      pointerEvents: "none"
    },
    title: {
      color: "white",
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "8px"
    },
    description: {
      color: "#e5e7eb",
      fontSize: "0.875rem"
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div style={styles.container}>
      <Link to={"/category" + category.href} style={styles.link}>
        <div style={styles.content}>
          {/* Gradient overlay */}
          <div style={styles.overlay} />
          
          <img
            src={category.imageUrl}
            alt={category.name}
            style={styles.image}
            loading='lazy'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          
          <div style={styles.textContainer}>
            <h3 style={styles.title}>
              {category.name}
            </h3>
            <p style={styles.description}>
              Explore {category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;