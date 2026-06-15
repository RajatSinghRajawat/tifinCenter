import React from 'react';
import { ChefHat, Heart, Globe, Share2, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer({ currentTab, setCurrentTab }) {
  const handleNavClick = (id) => {
    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        
        {/* Top Section */}
        <div style={styles.topRow}>
          
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <div style={styles.logoContainer} onClick={() => handleNavClick('home')}>
              <div style={styles.logoIconBg}>
                <ChefHat size={18} color="white" />
              </div>
              <span style={styles.logoText}>
                GharKa<span style={{ color: 'var(--primary)' }}>Khana</span>
              </span>
            </div>
            <p style={styles.brandDesc}>
              Healthy, hygienic, and home-cooked meals prepared with love by trained home chefs. Delivered piping hot daily.
            </p>
            <div style={styles.socials}>
              <a href="#facebook" className="btn-secondary btn-icon-only" style={styles.socialBtn} title="Facebook">
                <MessageCircle size={16} />
              </a>
              <a href="#instagram" className="btn-secondary btn-icon-only" style={styles.socialBtn} title="Instagram">
                <Globe size={16} />
              </a>
              <a href="#twitter" className="btn-secondary btn-icon-only" style={styles.socialBtn} title="Twitter">
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Directory */}
          <div style={styles.linksCol}>
            <h4 style={styles.columnTitle}>Quick Links</h4>
            <ul style={styles.ul}>
              {['home', 'menu', 'customizer', 'plans', 'dashboard', 'contact'].map((id) => (
                <li key={id} style={styles.li}>
                  <span 
                    onClick={() => handleNavClick(id)} 
                    style={styles.footerLink}
                  >
                    {id === 'home' && 'Home Dashboard'}
                    {id === 'menu' && 'Today\'s Special'}
                    {id === 'customizer' && 'Tiffin Customizer'}
                    {id === 'plans' && 'Subscription Plans'}
                    {id === 'dashboard' && 'Active Subscriber Hub'}
                    {id === 'contact' && 'Contact Support'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Guarantees & Accreditations */}
          <div style={styles.accreditCol}>
            <h4 style={styles.columnTitle}>Safety & Trust</h4>
            <p style={styles.accreditDesc}>
              All kitchens are FSSAI registered, pass surprise hygiene audits, and use bio-degradable eco-friendly boxes.
            </p>
            <div style={styles.accreditCard}>
              <ShieldCheck size={20} color="var(--veg)" />
              <span style={styles.accreditLabel}>FSSAI Certified Kitchens</span>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div style={styles.bottomRow}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} GharKaKhana Tiffin Services. All rights reserved.
          </p>
          <p style={styles.love}>
            Made with <Heart size={14} fill="var(--non-veg)" color="var(--non-veg)" /> for healthy Indian kitchens.
          </p>
        </div>

      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--bg-main)',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '60px',
    paddingBottom: '30px',
    marginTop: 'auto',
    transition: 'var(--transition)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    textAlign: 'left'
  },
  brandCol: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  logoIconBg: {
    background: 'var(--primary)',
    padding: '6px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },
  brandDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    maxWidth: '280px'
  },
  socials: {
    display: 'flex',
    gap: '10px'
  },
  socialBtn: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  linksCol: {
    flex: '1 1 180px'
  },
  columnTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '20px'
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  li: {
    fontSize: '0.88rem'
  },
  footerLink: {
    color: 'var(--text-muted)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'var(--transition)'
  },
  accreditCol: {
    flex: '1 1 250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px'
  },
  accreditDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  },
  accreditCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'var(--border-light)',
    padding: '10px 16px',
    borderRadius: '10px',
    border: '1px solid var(--border-color)'
  },
  accreditLabel: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  bottomRow: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  copyright: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)'
  },
  love: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
  }
};
export { styles }; // export for potential test reuse or documentation
