import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, MapPin, Play, Pause, Compass, Flame, Smile, AlertTriangle, ArrowRight } from 'lucide-react';

export default function Dashboard({ activeSub, onCancelSubscription, onViewPlans }) {
  const [deliveryPaused, setDeliveryPaused] = useState(false);
  const [pausedSuccessMsg, setPausedSuccessMsg] = useState('');
  
  // Delivery rider status step
  const [riderStep, setRiderStep] = useState(1); // 1: Preparing, 2: Insulated Packing, 3: Out for Delivery, 4: Arrived
  const trackingStages = [
    { title: "Chef preparing meals", desc: "Hygienically cooking in home kitchen" },
    { title: "Insulated pack", desc: "Sealed in bio-degradable thermal boxes" },
    { title: "Out for delivery", desc: "Rider Rajesh is en route to your place" },
    { title: "Arrived at doorstep", desc: "Fresh box left at your secure spot" }
  ];

  // Auto-advance rider location for demonstration
  useEffect(() => {
    if (deliveryPaused || !activeSub) return;
    const interval = setInterval(() => {
      setRiderStep((prev) => (prev < 4 ? prev + 1 : 1));
    }, 9000);
    return () => clearInterval(interval);
  }, [deliveryPaused, activeSub]);

  const handlePauseToggle = () => {
    if (deliveryPaused) {
      setDeliveryPaused(false);
      setPausedSuccessMsg('Welcome back! Your hot tiffin box is scheduled for today.');
    } else {
      setDeliveryPaused(true);
      setPausedSuccessMsg('Vacation mode activated! Today\'s meal paused. Remaining subscription balance extended by 1 day.');
      setRiderStep(1); // Reset rider tracking
    }
    setTimeout(() => setPausedSuccessMsg(''), 5000);
  };

  const handleCancelSub = () => {
    if (window.confirm("Are you sure you want to cancel your tiffin subscription? We will refund remaining balance to your original payment mode.")) {
      onCancelSubscription();
    }
  };

  // State: No Subscription
  if (!activeSub) {
    return (
      <section style={styles.section} className="section-padding">
        <div className="container" style={styles.container}>
          <div className="glass-card" style={styles.noSubCard}>
            <AlertTriangle size={56} color="var(--primary)" />
            <h2 style={styles.noSubTitle}>No Active Subscription</h2>
            <p style={styles.noSubDesc}>
              Unlock this premium dashboard by subscribing to any weekly or monthly tiffin plan. Track your deliveries, pause meals on vacation, and track your nutrient intake in real-time.
            </p>
            <button onClick={onViewPlans} className="btn btn-primary" style={styles.browseBtn}>
              Browse Pricing Plans <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={styles.section} className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={styles.header}>
          <span className="badge badge-veg">Subscriber Hub</span>
          <h2 style={styles.sectionTitle}>
            Welcome, <span className="serif-title" style={{ color: 'var(--primary)' }}>{activeSub.userName || 'Healthy Eater'}</span>
          </h2>
          <p style={styles.sectionSub}>
            Manage your daily home food shipments, schedules, and active orders.
          </p>
        </div>

        {/* Pause/Vacation Success Notice */}
        {pausedSuccessMsg && (
          <div className="glass-card animate-fade" style={deliveryPaused ? styles.pausedAlert : styles.resumedAlert}>
            <Smile size={20} />
            <p style={{ fontWeight: '600', margin: 0 }}>{pausedSuccessMsg}</p>
          </div>
        )}

        <div style={styles.grid} className="dashboard-grid">
          {/* Left Column: Tracking and Pause controls */}
          <div style={styles.leftCol}>
            
            {/* Vacation Mode Panel */}
            <div className="premium-card" style={styles.dashCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Vacation Mode Control</h3>
                <span className={`badge ${deliveryPaused ? 'badge-nonveg' : 'badge-veg'}`}>
                  {deliveryPaused ? 'Paused' : 'Active Delivery'}
                </span>
              </div>
              <p style={styles.cardDesc}>
                Going out of town or dining out today? Switch off delivery. We'll roll over today's meal credit to the end of your plan.
              </p>
              
              <button 
                onClick={handlePauseToggle} 
                className="btn btn-primary" 
                style={{
                  ...styles.pauseBtn,
                  backgroundColor: deliveryPaused ? 'var(--veg)' : 'var(--non-veg)',
                  boxShadow: deliveryPaused ? '0 4px 14px 0 rgba(34,197,94, 0.4)' : '0 4px 14px 0 rgba(239,68,68, 0.4)'
                }}
              >
                {deliveryPaused ? (
                  <>
                    <Play size={18} fill="white" />
                    <span>Resume Daily Deliveries</span>
                  </>
                ) : (
                  <>
                    <Pause size={18} fill="white" />
                    <span>Pause Meal For Today</span>
                  </>
                )}
              </button>
            </div>

            {/* Rider Tracking Timeline */}
            <div className="premium-card" style={styles.dashCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Today's Delivery Timeline</h3>
                <span className="badge badge-primary">
                  <Compass size={14} className="animate-float" />
                  &nbsp;Live Tracking
                </span>
              </div>
              
              {deliveryPaused ? (
                <div style={styles.pausedTimelineState}>
                  <Pause size={32} color="var(--text-muted)" />
                  <p style={{ marginTop: '10px', fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                    Shipment paused today due to vacation mode settings.
                  </p>
                </div>
              ) : (
                <div style={styles.timeline}>
                  {trackingStages.map((stage, idx) => {
                    const stepNum = idx + 1;
                    const isActive = riderStep === stepNum;
                    const isCompleted = riderStep > stepNum;
                    
                    return (
                      <div key={idx} style={styles.timelineItem}>
                        <div style={styles.timelineIndicator}>
                          <div style={{
                            ...styles.timelineDot,
                            backgroundColor: isActive ? 'var(--primary)' : (isCompleted ? 'var(--veg)' : 'var(--border-color)'),
                            boxShadow: isActive ? '0 0 0 6px rgba(249,115,22,0.2)' : 'none'
                          }}>
                            {isCompleted && <ShieldCheck size={12} color="white" />}
                          </div>
                          {idx < 3 && <div style={{
                            ...styles.timelineLine,
                            backgroundColor: isCompleted ? 'var(--veg)' : 'var(--border-color)'
                          }}></div>}
                        </div>
                        <div style={styles.timelineContent}>
                          <h4 style={{ 
                            ...styles.timelineTitle,
                            color: isActive ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: isActive ? '800' : '650'
                          }}>{stage.title}</h4>
                          <p style={styles.timelineDesc}>{stage.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Plan Details and Nutrition Streak */}
          <div style={styles.rightCol}>
            
            {/* Active Plan details card */}
            <div className="premium-card" style={styles.dashCard}>
              <h3 style={styles.cardTitle}>Plan Details</h3>
              <div style={styles.detailsList}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Subscription</span>
                  <span style={styles.detailValue}>{activeSub.planName}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Meals</span>
                  <span style={styles.detailValue}>{activeSub.mealTime}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Frequency</span>
                  <span style={styles.detailValue}>{activeSub.daysPerWeek}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Slot Time</span>
                  <span style={styles.detailValue}>{activeSub.deliveryTime}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Address</span>
                  <span style={styles.detailValue}>{activeSub.address}</span>
                </div>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Total cost paid</span>
                  <span style={{ ...styles.detailValue, color: 'var(--primary)', fontWeight: '850' }}>₹{activeSub.price}</span>
                </div>
              </div>

              <button onClick={handleCancelSub} className="btn btn-secondary" style={styles.cancelBtn}>
                Cancel Subscription
              </button>
            </div>

            {/* Nutrition consumption streak card */}
            <div className="premium-card" style={styles.dashCard}>
              <h3 style={styles.cardTitle}>Healthy Meal Streak</h3>
              <div style={styles.streakBlock}>
                <div style={styles.streakIconContainer}>
                  <Flame size={32} fill="var(--primary)" color="var(--primary)" className="animate-float" />
                  <span style={styles.streakNumber}>14</span>
                </div>
                <div>
                  <h4 style={styles.streakLabel}>Days Eating Clean</h4>
                  <p style={styles.streakDesc}>You have consumed 14 home-cooked boxes consecutively this month. Keep it up!</p>
                </div>
              </div>

              <div style={styles.calGrid}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} style={styles.calDayBox}>
                    <span style={styles.calDayName}>{day}</span>
                    <span style={{
                      ...styles.calDayDot,
                      backgroundColor: idx < 5 ? 'var(--veg)' : 'var(--border-color)' // completed week days
                    }}></span>
                  </div>
                ))}
              </div>
            </div>

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
  noSubCard: {
    padding: '50px 40px',
    borderRadius: '24px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    maxWidth: '640px'
  },
  noSubTitle: {
    fontSize: '2rem',
    color: 'var(--text-main)'
  },
  noSubDesc: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6'
  },
  browseBtn: {
    padding: '14px 28px'
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
  pausedAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 24px',
    borderRadius: '16px',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--non-veg)',
    color: 'var(--non-veg)',
    marginBottom: '32px',
    textAlign: 'left'
  },
  resumedAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 24px',
    borderRadius: '16px',
    backgroundColor: 'var(--secondary-light)',
    border: '1px solid var(--veg)',
    color: 'var(--veg)',
    marginBottom: '32px',
    textAlign: 'left'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    alignItems: 'start'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  dashCard: {
    padding: '30px',
    borderRadius: '24px',
    textAlign: 'left'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--text-main)'
  },
  cardDesc: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  pauseBtn: {
    width: '100%',
    padding: '14px 20px',
    color: 'white',
    fontSize: '0.95rem'
  },
  pausedTimelineState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px'
  },
  timelineItem: {
    display: 'flex',
    gap: '20px',
    minHeight: '64px'
  },
  timelineIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  timelineDot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: 'var(--transition)'
  },
  timelineLine: {
    width: '3px',
    flex: '1',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: '2px',
    transition: 'var(--transition)'
  },
  timelineContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingBottom: '16px'
  },
  timelineTitle: {
    fontSize: '0.95rem',
    lineHeight: '1.2'
  },
  timelineDesc: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    marginTop: '2px'
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
    marginTop: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '8px'
  },
  detailLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  },
  detailValue: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    maxWidth: '220px',
    textAlign: 'right'
  },
  cancelBtn: {
    width: '100%',
    borderColor: 'var(--border-color)',
    color: 'var(--text-muted)'
  },
  streakBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    margin: '20px 0'
  },
  streakIconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  streakNumber: {
    position: 'absolute',
    fontSize: '0.88rem',
    fontWeight: '800',
    color: 'white',
    top: '12px'
  },
  streakLabel: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  streakDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4'
  },
  calGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--border-light)',
    padding: '12px 18px',
    borderRadius: '16px'
  },
  calDayBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px'
  },
  calDayName: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-muted)'
  },
  calDayDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  }
};
