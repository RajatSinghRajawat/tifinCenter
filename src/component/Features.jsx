import React from 'react';
import { ShieldAlert, Calendar, HeartHandshake, Leaf, Truck } from 'lucide-react';

export default function Features() {
  const pillars = [
    {
      icon: <ShieldAlert size={32} color="var(--primary)" />,
      title: "Hygienic Home Kitchens",
      desc: "Cooked by trained home chefs who maintain rigorous hygiene standards and pass regular food safety checks."
    },
    {
      icon: <Calendar size={32} color="var(--primary)" />,
      title: "Super Flexible Plans",
      desc: "Going out of town? Pause your subscription easily from the subscriber hub. No cancellation charges."
    },
    {
      icon: <Leaf size={32} color="var(--primary)" />,
      title: "Zero Preservatives",
      desc: "We use only organic spices, cold-pressed oils, and fresh vegetables. Absolutely no MSG or artificial coloring."
    },
    {
      icon: <Truck size={32} color="var(--primary)" />,
      title: "Eco-Friendly Delivery",
      desc: "Delivered in food-grade insulated boxes or reusable hot stainless steel carriers to keep food fresh and nature clean."
    }
  ];

  return (
    <section style={styles.section} className="section-padding">
      <div className="container" style={styles.container}>
        
        {/* Section Header */}
        <div style={styles.header}>
          <span className="badge badge-primary">Why Choose Us</span>
          <h2 style={styles.sectionTitle}>
            Healthy Meals, <span className="serif-title" style={{ color: 'var(--primary)' }}>Zero Hassle</span>
          </h2>
          <p style={styles.sectionSub}>
            We combine the comfort of home-cooked flavors with the premium standards of modern logistics.
          </p>
        </div>

        {/* Features Grid */}
        <div style={styles.grid}>
          {pillars.map((item, idx) => (
            <div key={idx} className="premium-card" style={styles.card}>
              <div style={styles.iconContainer}>
                {item.icon}
              </div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-card)',
    borderTop: '1px solid var(--border-color)',
    borderBottom: '1px solid var(--border-color)',
    transition: 'var(--transition)'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '2.4rem',
    lineHeight: '1.2',
    color: 'var(--text-main)'
  },
  sectionSub: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    width: '100%'
  },
  card: {
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    borderRadius: '16px'
  },
  iconContainer: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    backgroundColor: 'var(--bg-main)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    transition: 'var(--transition)'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: 'var(--text-main)'
  },
  cardDesc: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5'
  }
};
