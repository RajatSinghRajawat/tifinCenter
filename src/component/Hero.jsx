import React from 'react';
import { ArrowRight, Star, Heart, Flame } from 'lucide-react';
import heroImg from '../assets/tiffin_hero_meal.png';

export default function Hero({ onViewMenu, onViewPlans }) {
  return (
    <header style={styles.heroSection}>
      <div className="container hero-grid">
        
        {/* Left Column: Heading and CTAs */}
        <div style={styles.heroContent} className="animate-fade hero-content-responsive">
          <div style={styles.trustBadge}>
            <span className="badge badge-primary">
              <Star size={12} fill="var(--primary)" color="var(--primary)" />
              &nbsp;#1 Home Tiffin Service in Town
            </span>
          </div>
          
          <h1 style={styles.heroTitle} className="hero-title-responsive">
            Taste of <span className="serif-title" style={{ color: 'var(--primary)' }}>Home</span>, <br />
            Delivered <span style={styles.highlightText}>Fresh Daily</span>
          </h1>
          
          <p style={styles.heroDescription}>
            Say goodbye to cooking stress and unhealthy fast food. Enjoy hygienic, zero-preservative, nutritious meals prepared by home chefs and delivered piping hot to your doorstep.
          </p>
          
          {/* Action CTAs */}
          <div style={styles.ctaGroup} className="cta-group-responsive">
            <button onClick={onViewPlans} className="btn btn-primary animate-glow" style={styles.ctaBtn}>
              Subscribe Now <ArrowRight size={18} />
            </button>
            <button onClick={onViewMenu} className="btn btn-secondary" style={styles.ctaBtn}>
              View Today's Menu
            </button>
          </div>
          
          {/* Stats Badges */}
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)' }}>
                <Flame size={20} />
              </div>
              <div>
                <h4 style={styles.statValue}>100% Hot</h4>
                <p style={styles.statLabel}>Fresh Delivery</p>
              </div>
            </div>
            
            <div style={styles.statCard}>
              <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--veg)' }}>
                <Heart size={20} />
              </div>
              <div>
                <h4 style={styles.statValue}>Homemade</h4>
                <p style={styles.statLabel}>Healthy Ingredients</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Hero Image with animations */}
        <div style={styles.heroImageContainer} className="animate-fade">
          <div style={styles.imageWrapper} className="animate-float">
            <img 
              src={heroImg} 
              alt="Delicious home cooked meal tiffin set" 
              style={styles.heroImage} 
            />
            {/* Visual Glass floating badges */}
            <div className="glass-card floating-card-mob1" style={styles.floatingCard1}>
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <div>
                <p style={styles.floatingTextTitle}>4.9/5 Rating</p>
                <p style={styles.floatingTextSub}>15,000+ reviews</p>
              </div>
            </div>

            <div className="glass-card floating-card-mob2" style={styles.floatingCard2}>
              <span style={styles.floatingDot}></span>
              <div>
                <p style={styles.floatingTextTitle}>Piping Hot</p>
                <p style={styles.floatingTextSub}>Packed in thermal packs</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

const styles = {
  heroSection: {
    padding: '60px 0',
    backgroundColor: 'var(--bg-main)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    transition: 'var(--transition)'
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '40px',
    alignItems: 'center'
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  trustBadge: {
    marginBottom: '18px'
  },
  heroTitle: {
    fontSize: '3.6rem',
    lineHeight: '1.15',
    fontWeight: '800',
    letterSpacing: '-1.5px',
    color: 'var(--text-main)',
    marginBottom: '20px'
  },
  highlightText: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 1
  },
  heroDescription: {
    fontSize: '1.15rem',
    color: 'var(--text-muted)',
    marginBottom: '32px',
    maxWidth: '540px'
  },
  ctaGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '40px',
    width: '100%'
  },
  ctaBtn: {
    flex: '0 1 auto',
    minWidth: '160px'
  },
  statsContainer: {
    display: 'flex',
    gap: '30px',
    width: '100%',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '24px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statValue: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  statLabel: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)'
  },
  heroImageContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '450px'
  },
  heroImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '30px',
    boxShadow: 'var(--shadow-lg)',
    border: '4px solid var(--bg-card)'
  },
  floatingCard1: {
    position: 'absolute',
    bottom: '40px',
    left: '-30px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    borderRadius: '16px',
    zIndex: 2,
    boxShadow: 'var(--shadow-md)'
  },
  floatingCard2: {
    position: 'absolute',
    top: '30px',
    right: '-20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    borderRadius: '16px',
    zIndex: 2,
    boxShadow: 'var(--shadow-md)'
  },
  floatingTextTitle: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    margin: 0
  },
  floatingTextSub: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    margin: 0
  },
  floatingDot: {
    width: '10px',
    height: '10px',
    backgroundColor: '#10B981',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse-glow 1.5s infinite'
  }
};
