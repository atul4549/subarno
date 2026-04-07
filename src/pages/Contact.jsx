// src/components/Contact/Contact.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import own from '../../public/subo.jpg'
// ============================================
// STYLES (Structured Inline CSS)
// ============================================
const styles = {
  // Main container styles
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    transition: 'background 0.3s ease',
  },
  containerLight: {
    background: '#f0f2f5',
  },
  containerDark: {
    background: '#0a0a0f',
  },
  containerVisiting: {
    background: '#d4c5b0',
  },

  // 3D perspective wrapper
  perspectiveWrapper: {
    perspective: '1500px',
  },

  // Card container (3D)
  cardContainer: {
    width: '380px',
    height: '520px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    cursor: 'pointer',
  },

  // Card face (front/back)
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '28px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s ease',
  },
  cardFront: {
    // Additional front-specific styles applied via style prop
  },
  cardBack: {
    transform: 'rotateY(180deg)',
    padding: '28px',
  },

  // Decorative elements
  decorativeCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '120px',
    height: '120px',
    opacity: 0.08,
    borderRadius: '0 28px 0 100%',
    pointerEvents: 'none',
  },

  // Header section
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    transform: 'rotate(10deg)',
  },
  name: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '700',
  },
  role: {
    margin: '8px 0 0',
    fontSize: '14px',
    fontWeight: '500',
  },
  themeButton: {
    border: 'none',
    borderRadius: '40px',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  },

  // Contact details section
  contactList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    marginTop: '8px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '8px 12px',
    borderRadius: '16px',
    transition: 'background 0.2s ease',
  },
  contactIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  },
  contactLabel: {
    margin: 0,
    fontSize: '11px',
    fontWeight: '500',
  },
  contactValue: {
    margin: '2px 0 0',
    fontSize: '13px',
    fontWeight: '500',
  },

  // Flip hint
  flipHint: {
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '12px',
    opacity: 0.6,
  },

  // Back side styles
  backHeader: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  shopIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    fontSize: '40px',
  },
  backTitle: {
    margin: 0,
  },
  backSubtitle: {
    fontSize: '13px',
    marginTop: '8px',
  },
  backContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '24px',
  },
  directionButton: {
    border: 'none',
    borderRadius: '40px',
    padding: '14px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  backFooter: {
    textAlign: 'center',
    fontSize: '11px',
    opacity: 0.6,
  },

  // Theme indicator dots
  themeDotsContainer: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px',
    backdropFilter: 'blur(8px)',
    padding: '8px 20px',
    borderRadius: '40px',
  },
  themeDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s ease',
  },
};

// ============================================
// THEME DEFINITIONS
// ============================================
const themes = {
  light: {
    cardBg: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    textPrimary: '#1a1a2e',
    textSecondary: '#16213e',
    accent: '#0f3460',
    iconBg: '#e94560',
    border: 'rgba(0,0,0,0.1)',
    shadow: '0 25px 45px -12px rgba(0,0,0,0.25)',
    glow: '0 0 20px rgba(233,69,96,0.3)',
  },
  dark: {
    cardBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    textPrimary: '#e0e0e0',
    textSecondary: '#b0b0b0',
    accent: '#e94560',
    iconBg: '#0f3460',
    border: 'rgba(255,255,255,0.1)',
    shadow: '0 25px 45px -12px rgba(0,0,0,0.5)',
    glow: '0 0 20px rgba(233,69,96,0.5)',
  },
  visiting: {
    cardBg: 'linear-gradient(135deg, #f5f0e1 0%, #e8dcc8 100%)',
    textPrimary: '#2c1810',
    textSecondary: '#5c3a2e',
    accent: '#c49a6c',
    iconBg: '#8b5e3c',
    border: 'rgba(139,94,60,0.2)',
    shadow: '0 25px 45px -12px rgba(0,0,0,0.3)',
    glow: '0 0 20px rgba(196,154,108,0.4)',
  },
};

// ============================================
// CONTACT INFO
// ============================================
const contactInfo = {
  name: 'Subarno Sharma',
  role: 'Shop Owner',
  phone: '+91 95045 02621',
  address: 'Khoraitha, Near Shiv Mandir Bikram, Patna - 801104 (Bihar)',
  gmail: 'shrishivshaktigraniteandtiles@gmail.com',
};

// ============================================
// COMPONENT
// ============================================
export const Contact = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const theme = themes[currentTheme];

  const getContainerStyle = () => ({
    ...styles.container,
    ...(currentTheme === 'light'
      ? styles.containerLight
      : currentTheme === 'dark'
      ? styles.containerDark
      : styles.containerVisiting),
  });

  const getContactItemStyle = () => ({
    ...styles.contactItem,
    background: currentTheme === 'visiting' ? 'rgba(139,94,60,0.08)' : 'rgba(0,0,0,0.02)',
  });

  const handleThemeChange = (e) => {
    e.stopPropagation();
    const themeOrder = ['light', 'dark', 'visiting'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentTheme(themeOrder[nextIndex]);
  };

  const handleGetDirections = (e) => {
    e.stopPropagation();
    window.open('https://maps.google.com/?q=' + encodeURIComponent(contactInfo.address), '_blank');
  };

  return (
    <div style={getContainerStyle()}>
      <div style={styles.perspectiveWrapper}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          style={styles.cardContainer}
          onClick={() => setIsFlipped(!isFlipped)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* ========== FRONT SIDE ========== */}
          <motion.div
            style={{
              ...styles.cardFace,
              ...styles.cardFront,
              background: theme.cardBg,
              boxShadow: isHovered ? theme.glow : theme.shadow,
              border: `1px solid ${theme.border}`,
            }}
          >
            {/* Decorative corner */}
            <div
              style={{
                ...styles.decorativeCorner,
                background: theme.accent,
              }}
            />

            {/* Header */}
            <div style={styles.header}>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                //   style={{
                //     ...styles.avatar,
                //     background: theme.iconBg,
                //   }}
                >
                    <img src={own} style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '5%'
                    }} />
                  {/* <span style={{ fontSize: '32px' }}>👩‍💼</span> */}
                </motion.div>
                <h2 style={{ ...styles.name, color: theme.textPrimary }}>{contactInfo.name}</h2>
                <p style={{ ...styles.role, color: theme.accent }}>{contactInfo.role}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleThemeChange}
                style={{
                  ...styles.themeButton,
                  background: theme.accent,
                  color: '#fff',
                }}
              >
                <span>🎨</span> {currentTheme === 'light' ? 'Light' : currentTheme === 'dark' ? 'Dark' : 'Visiting'}
              </motion.button>
            </div>

            {/* Contact Details */}
            <div style={styles.contactList}>
              {[
                { icon: '📱', label: 'Phone', value: contactInfo.phone },
                { icon: '📱', label: 'Mail', value: contactInfo.gmail },
                { icon: '📍', label: 'Address', value: contactInfo.address },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  style={getContactItemStyle()}
                >
                  <div
                    style={{
                      ...styles.contactIcon,
                      background: theme.iconBg,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ ...styles.contactLabel, color: theme.textSecondary }}>{item.label}</p>
                    <p style={{ ...styles.contactValue, color: theme.textPrimary }}>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flip Hint */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ ...styles.flipHint, color: theme.textSecondary }}
            >
              🔄 Tap to flip
            </motion.div>
          </motion.div>

          {/* ========== BACK SIDE ========== */}
          <motion.div
            style={{
              ...styles.cardFace,
              ...styles.cardBack,
              background: theme.cardBg,
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div style={styles.backHeader}>
              <div
                style={{
                  ...styles.shopIcon,
                  background: theme.accent,
                }}
              >
                🏪
              </div>
              <h3 style={{ ...styles.backTitle, color: theme.textPrimary }}>Visit Our Shop</h3>
              <p style={{ ...styles.backSubtitle, color: theme.textSecondary }}>We'd love to see you in person!</p>
            </div>

            <div style={styles.backContent}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...styles.directionButton,
                  background: theme.accent,
                  color: '#fff',
                }}
                onClick={handleGetDirections}
              >
                🗺️ Get Directions
              </motion.button>
            </div>

            <div style={{ ...styles.backFooter, color: theme.textSecondary }}>Tap anywhere to flip back</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Theme indicator dots */}
      <div
        style={{
          ...styles.themeDotsContainer,
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        {['light', 'dark', 'visiting'].map((themeName) => (
          <button
            key={themeName}
            onClick={() => setCurrentTheme(themeName)}
            style={{
              ...styles.themeDot,
              background:
                currentTheme === themeName
                  ? themeName === 'light'
                    ? '#e94560'
                    : themeName === 'dark'
                    ? '#e94560'
                    : '#c49a6c'
                  : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;