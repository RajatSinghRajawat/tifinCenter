import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ChefHat, User, ShoppingBag } from 'lucide-react';

export default function Navbar({ currentTab, setCurrentTab, theme, toggleTheme, hasActiveSubscription, cartItemsCount }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'customizer', label: 'Tiffin Lab' },
    { id: 'plans', label: 'Weekly/Monthly Plans' },
    { id: 'dashboard', label: 'Subscriber Hub' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    setCurrentTab(id);
    setIsOpen(false);
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="glass-nav" style={styles.nav}>
      <div className="container" style={styles.navContainer}>
        {/* Brand Logo */}
        <div style={styles.logoContainer} onClick={() => handleNavClick('home')}>
          <div style={styles.logoIconBg}>
            <ChefHat size={22} color="white" />
          </div>
          <span style={styles.logoText}>
            GharKa<span style={{ color: 'var(--primary)' }}>Khana</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="desktop-nav-links">
          {navLinks.map((link) => (
            <span
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`nav-link ${currentTab === link.id ? 'active' : ''}`}
              style={{
                ...styles.link,
                fontWeight: currentTab === link.id ? '700' : '500',
                borderBottom: currentTab === link.id ? '2px solid var(--primary)' : '2px solid transparent'
              }}
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Action Controls (Theme, Cart/Dashboard, Burger) */}
        <div style={styles.controls}>
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            style={styles.controlBtn} 
            className="btn-secondary btn-icon-only"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Subscription / Cart Status */}
          <button 
            onClick={() => handleNavClick(hasActiveSubscription ? 'dashboard' : 'plans')}
            style={styles.statusBtn} 
            className={hasActiveSubscription ? "btn btn-veg btn-sm" : "btn btn-primary btn-sm"}
          >
            {hasActiveSubscription ? (
              <>
                <User size={16} />
                <span>Active Plan</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Order Now {cartItemsCount > 0 && `(${cartItemsCount})`}</span>
              </>
            )}
          </button>

          {/* Burger Menu Button (Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="btn-secondary btn-icon-only burger-menu-btn"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Links */}
      {isOpen && (
        <div className="glass-card animate-fade" style={styles.mobileNav}>
          {navLinks.map((link) => (
            <span
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`nav-link ${currentTab === link.id ? 'active' : ''}`}
              style={{
                ...styles.mobileLink,
                fontWeight: currentTab === link.id ? '700' : '500',
                color: currentTab === link.id ? 'var(--primary)' : 'var(--text-main)',
                backgroundColor: currentTab === link.id ? 'var(--border-light)' : 'transparent'
              }}
            >
              {link.label}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'var(--bg-nav)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border-color)',
    transition: 'var(--transition)'
  },
  navContainer: {
    height: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoIconBg: {
    background: 'var(--primary)',
    padding: '8px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px 0 rgba(var(--primary-rgb), 0.25)'
  },
  logoText: {
    fontSize: '1.45rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    fontFamily: 'var(--font-sans)'
  },
  desktopNav: {
    display: 'flex',
    gap: '28px',
    alignItems: 'center',
    '@media (maxWidth: 900px)': {
      display: 'none'
    }
  },
  link: {
    cursor: 'pointer',
    padding: '6px 0',
    transition: 'var(--transition)'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  controlBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  statusBtn: {
    cursor: 'pointer'
  },
  burgerBtn: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  mobileNav: {
    position: 'absolute',
    top: '76px',
    left: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    gap: '8px',
    zIndex: 999
  },
  mobileLink: {
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'var(--transition)'
  }
};

// CSS media query adjustments handled natively by browser layout or inline window listener
// To hide/show hamburger items cleanly, we will inject a small stylesheet rule in index.css
