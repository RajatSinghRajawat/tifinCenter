import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    // Simulate API call
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-section" style={styles.section} className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={styles.header}>
          <span className="badge badge-primary">Get In Touch</span>
          <h2 style={styles.sectionTitle}>
            We'd Love to <span className="serif-title" style={{ color: 'var(--primary)' }}>Hear From You</span>
          </h2>
          <p style={styles.sectionSub}>
            Have dietary queries or want custom bulk packages? Drop us a line.
          </p>
        </div>

        <div style={styles.grid} className="contact-grid">
          {/* Left Column: Contact info cards */}
          <div style={styles.infoCol}>
            
            <div style={styles.infoCard}>
              <div style={styles.iconBox}>
                <MapPin size={24} color="var(--primary)" />
              </div>
              <div>
                <h4 style={styles.infoTitle}>Our Kitchen Head Office</h4>
                <p style={styles.infoDesc}>Sector-62, Block-C, Noida, UP, India - 201301</p>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.iconBox}>
                <Phone size={24} color="var(--primary)" />
              </div>
              <div>
                <h4 style={styles.infoTitle}>Helpline Numbers</h4>
                <p style={styles.infoDesc}>+91 98765 43210 / +91 120 445566</p>
              </div>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.iconBox}>
                <Mail size={24} color="var(--primary)" />
              </div>
              <div>
                <h4 style={styles.infoTitle}>Support Email</h4>
                <p style={styles.infoDesc}>support@gharkakhana.com</p>
              </div>
            </div>

            {/* Google map mock image container */}
            <div style={styles.mockMap}>
              <div style={styles.mapPin}>
                <span style={styles.pulseDot}></span>
                <span style={styles.mapPinLabel}>Central Kitchen</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card" style={styles.formCard}>
            {submitted ? (
              <div style={styles.successBlock} className="animate-fade">
                <CheckCircle2 size={56} color="var(--veg)" />
                <h3 style={{ color: 'var(--text-main)', fontWeight: '800' }}>Message Received!</h3>
                <p style={styles.successDesc}>
                  Thank you for writing to us. Our customer happiness champion will respond to your registered email address within 2-4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Rajat Singh" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Tell us about your query, customization needs, or feedback..." 
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ resize: 'none', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={styles.sendBtn}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-card)',
    borderTop: '1px solid var(--border-color)',
    transition: 'var(--transition)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '2.4rem',
    color: 'var(--text-main)'
  },
  sectionSub: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    maxWidth: '600px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '0.9fr 1.1fr',
    gap: '40px',
    alignItems: 'start'
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  infoCard: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textAlign: 'left'
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--border-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  infoTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  infoDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    marginTop: '2px'
  },
  mockMap: {
    height: '180px',
    borderRadius: '16px',
    backgroundColor: 'var(--border-light)',
    position: 'relative',
    backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 0)',
    backgroundSize: '20px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapPin: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'var(--bg-card)',
    borderRadius: '10px',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)'
  },
  pulseDot: {
    width: '10px',
    height: '10px',
    backgroundColor: 'var(--primary)',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulse-glow 1.5s infinite'
  },
  mapPinLabel: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  formCard: {
    padding: '30px',
    borderRadius: '24px',
    textAlign: 'left'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  sendBtn: {
    width: '100%',
    padding: '14px 20px',
    marginTop: '10px'
  },
  successBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
    gap: '16px'
  },
  successDesc: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    maxWidth: '320px'
  }
};
