// // import React from 'react'

// export const Contact = () => {
//   return (
//     <div>Contact</div>
//     // create the 3d contact card of shop owner
//     // use framer motion 
//     // use multipler theme
//     // and alse create visiting cart theme
//   )
// }

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact = () => {
//   const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'visiting'>('light');
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const themes = {
    light: {
      cardBg: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      textPrimary: '#1a1a2e',
      textSecondary: '#16213e',
      accent: '#0f3460',
      iconBg: '#e94560',
      border: 'rgba(0,0,0,0.1)',
      shadow: '0 25px 45px -12px rgba(0,0,0,0.25)',
      glow: '0 0 20px rgba(233,69,96,0.3)'
    },
    dark: {
      cardBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      textPrimary: '#e0e0e0',
      textSecondary: '#b0b0b0',
      accent: '#e94560',
      iconBg: '#0f3460',
      border: 'rgba(255,255,255,0.1)',
      shadow: '0 25px 45px -12px rgba(0,0,0,0.5)',
      glow: '0 0 20px rgba(233,69,96,0.5)'
    },
    visiting: {
      cardBg: 'linear-gradient(135deg, #f5f0e1 0%, #e8dcc8 100%)',
      textPrimary: '#2c1810',
      textSecondary: '#5c3a2e',
      accent: '#c49a6c',
      iconBg: '#8b5e3c',
      border: 'rgba(139,94,60,0.2)',
      shadow: '0 25px 45px -12px rgba(0,0,0,0.3)',
      glow: '0 0 20px rgba(196,154,108,0.4)'
    }
  };

  const theme = themes[currentTheme];

  const contactInfo = {
    name: 'Subarno',
    // role: 'Shop Owner & Curator',
    role: 'Shop Owner',
    // email: 'atul4545@zohomail.in',
    phone: '+91 95045 02621',
    address: 'Khoraitha, Bikram 801104',
    // instagram: '@sarahsboutique',
    // hours: 'Mon - Sat: 10am - 7pm'
  };

  const handleThemeChange = () => {
    // const themeOrder: ('light' | 'dark' | 'visiting')[] = ['light', 'dark', 'visiting'];
    const themeOrder = ['light', 'dark', 'visiting'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setCurrentTheme(themeOrder[nextIndex]);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: currentTheme === 'light' 
          ? '#f0f2f5' 
          : currentTheme === 'dark' 
          ? '#0a0a0f' 
          : '#d4c5b0',
        padding: '20px',
        transition: 'background 0.3s ease'
      }}
    >
      <div style={{ perspective: '1500px' }}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          style={{
            width: '380px',
            height: '520px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            cursor: 'pointer'
          }}
          onClick={() => setIsFlipped(!isFlipped)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Front Side */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              borderRadius: '28px',
              background: theme.cardBg,
              boxShadow: isHovered ? theme.glow : theme.shadow,
              border: `1px solid ${theme.border}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s ease'
            }}
          >
            {/* Decorative elements */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: theme.accent,
                opacity: 0.08,
                borderRadius: '0 28px 0 100%',
                pointerEvents: 'none'
              }}
            />
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  style={{
                    width: '70px',
                    height: '70px',
                    background: theme.iconBg,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    transform: 'rotate(10deg)'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>👩‍💼</span>
                </motion.div>
                <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '26px', fontWeight: '700' }}>
                  {contactInfo.name}
                </h2>
                <p style={{ color: theme.accent, margin: '8px 0 0', fontSize: '14px', fontWeight: '500' }}>
                  {contactInfo.role}
                </p>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeChange();
                }}
                style={{
                  background: theme.accent,
                  border: 'none',
                  borderRadius: '40px',
                  padding: '8px 16px',
                  color: currentTheme === 'dark' ? '#fff' : '#fff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                <span>🎨</span> {currentTheme === 'light' ? 'Light' : currentTheme === 'dark' ? 'Dark' : 'Visiting'}
              </motion.button>
            </div>

            {/* Contact Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '8px' }}>
              {[
                // { icon: '📧', label: 'Email', value: contactInfo.email },
                { icon: '📱', label: 'Phone', value: contactInfo.phone },
                { icon: '📍', label: 'Address', value: contactInfo.address },
                // { icon: '📸', label: 'Instagram', value: contactInfo.instagram },
                // { icon: '⏰', label: 'Hours', value: contactInfo.hours }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '8px 12px',
                    background: currentTheme === 'visiting' ? 'rgba(139,94,60,0.08)' : 'rgba(0,0,0,0.02)',
                    borderRadius: '16px',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: theme.iconBg,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: theme.textSecondary, margin: 0, fontSize: '11px', fontWeight: '500' }}>
                      {item.label}
                    </p>
                    <p style={{ color: theme.textPrimary, margin: '2px 0 0', fontSize: '13px', fontWeight: '500' }}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Flip Hint */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                textAlign: 'center',
                marginTop: '16px',
                fontSize: '12px',
                color: theme.textSecondary,
                opacity: 0.6
              }}
            >
              🔄 Tap to flip
            </motion.div>
          </motion.div>

          {/* Back Side */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              borderRadius: '28px',
              background: theme.cardBg,
              boxShadow: theme.shadow,
              border: `1px solid ${theme.border}`,
              padding: '28px',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: theme.accent,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '40px'
                }}
              >
                🏪
              </div>
              <h3 style={{ color: theme.textPrimary, margin: 0 }}>Visit Our Shop</h3>
              <p style={{ color: theme.textSecondary, fontSize: '13px', marginTop: '8px' }}>
                We'd love to see you in person!
              </p>
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '24px'
              }}
            >
              {/* <div
                style={{
                  background: currentTheme === 'visiting' ? 'rgba(139,94,60,0.1)' : 'rgba(0,0,0,0.03)',
                  borderRadius: '20px',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <span>📅</span>
                  <div>
                    <strong style={{ color: theme.textPrimary }}>Best Time to Visit</strong>
                    <p style={{ color: theme.textSecondary, margin: '4px 0 0', fontSize: '12px' }}>
                      Weekdays 2-5 PM (Quiet hours)
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span>🎁</span>
                  <div>
                    <strong style={{ color: theme.textPrimary }}>Special Offers</strong>
                    <p style={{ color: theme.textSecondary, margin: '4px 0 0', fontSize: '12px' }}>
                      10% off on first in-store purchase
                    </p>
                  </div>
                </div>
              </div> */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: theme.accent,
                  border: 'none',
                  borderRadius: '40px',
                  padding: '14px',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://maps.google.com/?q=' + encodeURIComponent(contactInfo.address), '_blank');
                }}
              >
                🗺️ Get Directions
              </motion.button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '11px', color: theme.textSecondary, opacity: 0.6 }}>
              Tap anywhere to flip back
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Theme indicator dots */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          padding: '8px 20px',
          borderRadius: '40px'
        }}
      >
        {/* {(['light', 'dark', 'visiting'] as const).map((themeName) => ( */}
        {(['light', 'dark', 'visiting']).map((themeName) => (
          <button
            key={themeName}
            onClick={() => setCurrentTheme(themeName)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: currentTheme === themeName 
                ? themeName === 'light' ? '#e94560' : themeName === 'dark' ? '#e94560' : '#c49a6c'
                : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};