import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, Send } from 'lucide-react';

const SERVICEABLE_PINCODES = ['110001', '400001', '560001', '600001', '700001', '500001', '201301', '122001'];

export default function PincodeChecker() {
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState(null); // null, 'available', 'unavailable'
  const [email, setEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pin || pin.trim().length !== 6 || isNaN(pin)) {
      alert("Please enter a valid 6-digit postal code.");
      return;
    }

    const cleanedPin = pin.trim();
    if (SERVICEABLE_PINCODES.includes(cleanedPin)) {
      setStatus('available');
    } else {
      setStatus('unavailable');
    }
    setSubscribedEmail(false);
  };

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribedEmail(true);
    setEmail('');
  };

  return (
    <section style={styles.section} className="section-padding">
      <div className="container" style={styles.container}>
        <div className="glass-card" style={styles.checkerCard}>
          <div style={styles.leftCol}>
            <span className="badge badge-primary">Quick Check</span>
            <h2 style={styles.title}>Do We Serve In <span className="serif-title" style={{ color: 'var(--primary)' }}>Your Area?</span></h2>
            <p style={styles.desc}>
              We are constantly expanding our home-kitchen networks. Enter your 6-digit postal code to check live delivery eligibility.
            </p>

            <form onSubmit={handleCheck} style={styles.searchForm}>
              <input 
                type="text" 
                maxLength="6"
                placeholder="Enter 6-digit Pincode (e.g. 110001)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={styles.input}
              />
              <button type="submit" className="btn btn-primary" style={styles.searchBtn}>
                <Search size={18} /> Check
              </button>
            </form>

            <p style={styles.hintText}>
              Supported Demo Pincodes: 110001, 400001, 560001, 600001, 700001, 500001
            </p>
          </div>

          <div style={styles.rightCol}>
            {status === null && (
              <div style={styles.idleState} className="animate-fade">
                <p>Enter your pincode to check service availability.</p>
              </div>
            )}

            {status === 'available' && (
              <div style={styles.successState} className="animate-fade">
                <CheckCircle2 size={48} color="var(--veg)" />
                <h3 style={{ color: 'var(--veg)', fontWeight: '800' }}>We Deliver Here!</h3>
                <p style={styles.statusDesc}>
                  Hurrah! Fresh kitchen meals are active in your zone. Delivery is available for both lunch & dinner time slots.
                </p>
                <div style={styles.slotsBlock}>
                  <p style={styles.slotItem}>• Lunch delivery: 12:00 PM - 1:30 PM</p>
                  <p style={styles.slotItem}>• Dinner delivery: 7:30 PM - 9:00 PM</p>
                </div>
              </div>
            )}

            {status === 'unavailable' && (
              <div style={styles.errorState} className="animate-fade">
                {subscribedEmail ? (
                  <div style={styles.subscribedBlock}>
                    <CheckCircle2 size={40} color="var(--veg)" />
                    <h4 style={{ fontWeight: '800', color: 'var(--text-main)' }}>You're on the list!</h4>
                    <p style={styles.statusDesc}>We'll notify you as soon as our home chefs launch in your pin zone.</p>
                  </div>
                ) : (
                  <>
                    <AlertTriangle size={48} color="var(--non-veg)" />
                    <h3 style={{ color: 'var(--non-veg)', fontWeight: '800' }}>Coming Soon!</h3>
                    <p style={styles.statusDesc}>
                      Aww! We haven't reached your kitchen yet. We are recruiting home chefs in this area. Join the notification waitlist:
                    </p>
                    <form onSubmit={handleNotifyMe} style={styles.notifyForm}>
                      <input 
                        type="email" 
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.notifyInput}
                      />
                      <button type="submit" className="btn btn-secondary btn-icon-only" style={{ borderRadius: '12px' }}>
                        <Send size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-main)',
    transition: 'var(--transition)'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  checkerCard: {
    width: '100%',
    maxWidth: '960px',
    padding: '40px',
    borderRadius: '24px',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '40px',
    alignItems: 'center',
    textAlign: 'left'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px'
  },
  title: {
    fontSize: '2rem',
    color: 'var(--text-main)'
  },
  desc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '8px'
  },
  searchForm: {
    display: 'flex',
    width: '100%',
    gap: '12px'
  },
  input: {
    flex: '1',
    padding: '14px 18px',
    borderRadius: '12px',
    border: '2px solid var(--border-color)',
    outline: 'none',
    fontSize: '1rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-main)',
    transition: 'var(--transition)'
  },
  searchBtn: {
    padding: '0 24px',
    borderRadius: '12px'
  },
  hintText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)'
  },
  rightCol: {
    backgroundColor: 'var(--border-light)',
    borderRadius: '20px',
    padding: '30px',
    minHeight: '220px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px dashed var(--border-color)'
  },
  idleState: {
    color: 'var(--text-muted)',
    fontSize: '0.92rem'
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  errorState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  statusDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    maxWidth: '300px'
  },
  slotsBlock: {
    backgroundColor: 'var(--bg-card)',
    padding: '10px 16px',
    borderRadius: '12px',
    fontSize: '0.82rem',
    color: 'var(--text-main)',
    width: '100%',
    maxWidth: '280px',
    textAlign: 'left'
  },
  slotItem: {
    margin: '4px 0',
    fontWeight: '550'
  },
  notifyForm: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    maxWidth: '280px',
    marginTop: '6px'
  },
  notifyInput: {
    flex: '1',
    padding: '8px 12px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    outline: 'none',
    fontSize: '0.88rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-main)'
  },
  subscribedBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  }
};
