import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ChevronRight, X, CreditCard, Clock, MapPin, ShieldCheck } from 'lucide-react';

const SERVICEABLE_PINCODES = ['110001', '400001', '560001', '600001', '700001', '500001', '201301', '122001'];

export default function Plans({ onSubscribeSuccess, cartItems }) {
  // Plan Configurations
  const [duration, setDuration] = useState('monthly'); // 'weekly' or 'monthly'
  const [dietType, setDietType] = useState('veg'); // 'veg' or 'nonveg'
  const [mealTime, setMealTime] = useState('both'); // 'lunch', 'dinner', 'both'
  const [daysPerWeek, setDaysPerWeek] = useState(6); // 5 or 6 or 7
  const [addons, setAddons] = useState({
    salad: false,
    sweet: false,
    extraRoti: false
  });

  // Derived price stats
  const [totalMeals, setTotalMeals] = useState(24);
  const [pricePerMeal, setPricePerMeal] = useState(110);
  const [totalCost, setTotalCost] = useState(2640);

  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Delivery Details, 2: Payment
  
  // Checkout Form Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [timeSlot, setTimeSlot] = useState('12:30 PM - 1:30 PM');
  const [pincodeError, setPincodeError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Recalculate price
  useEffect(() => {
    // 1. Calculate number of meals
    const weeks = duration === 'weekly' ? 1 : 4;
    const mealsCount = weeks * daysPerWeek * (mealTime === 'both' ? 2 : 1);
    setTotalMeals(mealsCount);

    // 2. Base price per meal
    let base = dietType === 'veg' ? 100 : 130;

    // Discount for single meal duration vs monthly
    if (duration === 'weekly') {
      base += 10; // short term tax
    } else {
      base -= 5; // monthly discount
    }

    // Both meals discount
    if (mealTime === 'both') {
      base -= 5; // bulk discount
    }

    // 3. Addon increments per meal
    let addonUpsell = 0;
    if (addons.salad) addonUpsell += 15;
    if (addons.sweet) addonUpsell += 20;
    if (addons.extraRoti) addonUpsell += 10;

    const finalMealPrice = base + addonUpsell;
    setPricePerMeal(finalMealPrice);
    setTotalCost(finalMealPrice * mealsCount);
  }, [duration, dietType, mealTime, daysPerWeek, addons]);

  const handleToggleAddon = (key) => {
    setAddons({ ...addons, [key]: !addons[key] });
  };

  const handleOpenCheckout = () => {
    setShowCheckout(true);
    setCheckoutStep(1);
    setPincodeError('');
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert("Please fill in all fields.");
      return;
    }
    if (!SERVICEABLE_PINCODES.includes(pincode.trim())) {
      setPincodeError("Sorry, we do not deliver to this pincode yet. Try 110001 or 400001.");
      return;
    }
    setPincodeError('');
    setCheckoutStep(2);
  };

  const handleSubscribe = () => {
    const activeSubObj = {
      planName: `${duration.toUpperCase()} ${dietType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Subscription`,
      mealTime: mealTime === 'both' ? 'Lunch & Dinner' : mealTime.toUpperCase(),
      daysPerWeek: `${daysPerWeek} days/week`,
      deliveryTime: timeSlot,
      address: `${address}, Pin - ${pincode}`,
      totalMeals: totalMeals,
      price: totalCost,
      status: 'Active',
      userName: name
    };
    onSubscribeSuccess(activeSubObj);
    setShowCheckout(false);
  };

  return (
    <section id="plans-section" style={styles.section} className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={styles.header}>
          <span className="badge badge-primary">Pricing Plans</span>
          <h2 style={styles.sectionTitle}>
            Choose Your <span className="serif-title" style={{ color: 'var(--primary)' }}>Meal Subscription</span>
          </h2>
          <p style={styles.sectionSub}>
            No kitchen cleanup, no grocery runs. Customize a package that fits your work/study schedule.
          </p>
        </div>

        {/* Dynamic Calculator Form */}
        <div style={styles.calcGrid}>
          {/* Config Controls */}
          <div className="premium-card" style={styles.configCard}>
            <h3 style={styles.calcHeader}>Configure Subscription</h3>

            {/* Config Option: Duration */}
            <div style={styles.configBlock}>
              <span style={styles.configLabel}>Subscription Duration</span>
              <div style={styles.toggleRow}>
                <button 
                  onClick={() => setDuration('weekly')}
                  style={{
                    ...styles.toggleBtn,
                    backgroundColor: duration === 'weekly' ? 'var(--text-main)' : 'var(--bg-main)',
                    color: duration === 'weekly' ? 'white' : 'var(--text-main)',
                    borderColor: duration === 'weekly' ? 'var(--text-main)' : 'var(--border-color)'
                  }}
                >
                  Weekly (7 Days)
                </button>
                <button 
                  onClick={() => setDuration('monthly')}
                  style={{
                    ...styles.toggleBtn,
                    backgroundColor: duration === 'monthly' ? 'var(--text-main)' : 'var(--bg-main)',
                    color: duration === 'monthly' ? 'white' : 'var(--text-main)',
                    borderColor: duration === 'monthly' ? 'var(--text-main)' : 'var(--border-color)'
                  }}
                >
                  Monthly (28 Days) <span style={styles.discountBadge}>SAVE 10%</span>
                </button>
              </div>
            </div>

            {/* Config Option: Diet Type */}
            <div style={styles.configBlock}>
              <span style={styles.configLabel}>Dietary Choice</span>
              <div style={styles.toggleRow}>
                <button 
                  onClick={() => setDietType('veg')}
                  style={{
                    ...styles.toggleBtn,
                    backgroundColor: dietType === 'veg' ? 'var(--veg)' : 'var(--bg-main)',
                    color: dietType === 'veg' ? 'white' : 'var(--text-main)',
                    borderColor: dietType === 'veg' ? 'var(--veg)' : 'var(--border-color)'
                  }}
                >
                  Pure Vegetarian
                </button>
                <button 
                  onClick={() => setDietType('nonveg')}
                  style={{
                    ...styles.toggleBtn,
                    backgroundColor: dietType === 'nonveg' ? 'var(--non-veg)' : 'var(--bg-main)',
                    color: dietType === 'nonveg' ? 'white' : 'var(--text-main)',
                    borderColor: dietType === 'nonveg' ? 'var(--non-veg)' : 'var(--border-color)'
                  }}
                >
                  Non-Vegetarian (Incl. Egg/Chicken)
                </button>
              </div>
            </div>

            {/* Config Option: Meal Time */}
            <div style={styles.configBlock}>
              <span style={styles.configLabel}>Meals Delivered Per Day</span>
              <div style={styles.toggleRow}>
                {['lunch', 'dinner', 'both'].map((time) => (
                  <button 
                    key={time}
                    onClick={() => setMealTime(time)}
                    style={{
                      ...styles.toggleBtn,
                      backgroundColor: mealTime === time ? 'var(--primary)' : 'var(--bg-main)',
                      color: mealTime === time ? 'white' : 'var(--text-main)',
                      borderColor: mealTime === time ? 'var(--primary)' : 'var(--border-color)'
                    }}
                  >
                    {time === 'lunch' && 'Lunch Only'}
                    {time === 'dinner' && 'Dinner Only'}
                    {time === 'both' && 'Lunch & Dinner'}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Option: Days Per Week */}
            <div style={styles.configBlock}>
              <span style={styles.configLabel}>Frequency Per Week</span>
              <div style={styles.toggleRow}>
                {[5, 6, 7].map((num) => (
                  <button 
                    key={num}
                    onClick={() => setDaysPerWeek(num)}
                    style={{
                      ...styles.toggleBtn,
                      backgroundColor: daysPerWeek === num ? 'var(--text-main)' : 'var(--bg-main)',
                      color: daysPerWeek === num ? 'white' : 'var(--text-main)',
                      borderColor: daysPerWeek === num ? 'var(--text-main)' : 'var(--border-color)'
                    }}
                  >
                    {num} Days / Week {num === 5 && '(Mon-Fri)'} {num === 6 && '(Mon-Sat)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Option: Add-ons */}
            <div style={styles.configBlock}>
              <span style={styles.configLabel}>Premium Nutrition Add-ons (Per Meal Upgrade)</span>
              <div style={styles.addonsColumn}>
                <label style={styles.addonLabel}>
                  <input 
                    type="checkbox" 
                    checked={addons.salad} 
                    onChange={() => handleToggleAddon('salad')}
                    style={styles.checkbox}
                  />
                  <div>
                    <span style={styles.addonText}>Fresh Cut Green Salad (+₹15/meal)</span>
                    <span style={styles.addonSub}>Highly recommended for active metabolism.</span>
                  </div>
                </label>
                
                <label style={styles.addonLabel}>
                  <input 
                    type="checkbox" 
                    checked={addons.sweet} 
                    onChange={() => handleToggleAddon('sweet')}
                    style={styles.checkbox}
                  />
                  <div>
                    <span style={styles.addonText}>Homestyle Sweet/Dessert (+₹20/meal)</span>
                    <span style={styles.addonSub}>Delicious traditional kheer, gulab jamun, or halwa.</span>
                  </div>
                </label>
                
                <label style={styles.addonLabel}>
                  <input 
                    type="checkbox" 
                    checked={addons.extraRoti} 
                    onChange={() => handleToggleAddon('extraRoti')}
                    style={styles.checkbox}
                  />
                  <div>
                    <span style={styles.addonText}>Extra Butter Roti (+₹10/meal)</span>
                    <span style={styles.addonSub}>Adds 1 additional whole-wheat chapati per box.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Pricing Box Summary */}
          <div style={styles.summaryCol}>
            <div className="glass-card animate-fade" style={styles.summaryCard}>
              <div style={styles.priceHeader}>
                <span className="badge badge-primary">Subscription Breakdown</span>
                <h3 style={styles.summaryTitle}>{duration === 'weekly' ? 'Weekly' : 'Monthly'} Smart Plan</h3>
              </div>
              
              <div style={styles.costBlock}>
                <p style={styles.costSub}>Estimated Cost per meal</p>
                <p style={styles.costPerMeal}>₹{pricePerMeal}</p>
                <div style={styles.mealLine}>
                  <span>Total Meals: {totalMeals}</span>
                  <span>•</span>
                  <span>{daysPerWeek} days/week</span>
                </div>
              </div>

              <div style={styles.priceDetailsList}>
                <div style={styles.priceDetailItem}>
                  <span>Base food cost</span>
                  <span>₹{dietType === 'veg' ? (duration === 'weekly' ? 110 : 95) : (duration === 'weekly' ? 140 : 125)} / meal</span>
                </div>
                {(addons.salad || addons.sweet || addons.extraRoti) && (
                  <div style={styles.priceDetailItem}>
                    <span>Add-ons upgrade</span>
                    <span>
                      +₹{
                        (addons.salad ? 15 : 0) + 
                        (addons.sweet ? 20 : 0) + 
                        (addons.extraRoti ? 10 : 0)
                      } / meal
                    </span>
                  </div>
                )}
                <div style={styles.priceDetailItem}>
                  <span>Doorstep delivery charge</span>
                  <span style={{ color: 'var(--veg)', fontWeight: '600' }}>FREE</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Grand Total</span>
                  <span style={styles.finalTotal}>₹{totalCost}</span>
                </div>
              </div>

              <button 
                onClick={handleOpenCheckout}
                className="btn btn-primary animate-glow" 
                style={styles.subscribeBtn}
              >
                Proceed to Subscribe <ChevronRight size={18} />
              </button>

              <div style={styles.guarantees}>
                <div style={styles.guaranteeItem}>
                  <ShieldCheck size={16} color="var(--veg)" />
                  <span>Pause subscription anytime</span>
                </div>
                <div style={styles.guaranteeItem}>
                  <Clock size={16} color="var(--veg)" />
                  <span>Refund remaining balance easily</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHECKOUT MODAL WINDOW */}
        {showCheckout && (
          <div style={styles.modalOverlay} className="animate-fade">
            <div className="glass-card" style={styles.modalContent}>
              {/* Modal Header */}
              <div style={styles.modalHeader}>
                <div>
                  <h3 style={styles.modalTitle}>Order Subscription Checkout</h3>
                  <p style={styles.modalSub}>Step {checkoutStep} of 2 • Confirming order details</p>
                </div>
                <button onClick={() => setShowCheckout(false)} style={styles.closeBtn}>
                  <X size={20} />
                </button>
              </div>

              {/* Step 1: Address & Slots Form */}
              {checkoutStep === 1 ? (
                <form onSubmit={handleNextStep} style={styles.form}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Rajat Singh" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="e.g. 9876543210" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Delivery Street Address</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Flat No, Society, Landmark" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Pincode</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. 110001" 
                        maxLength="6"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                      />
                      {pincodeError && <p style={styles.errorText}>{pincodeError}</p>}
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Preferred Time Slot</label>
                      <select 
                        className="form-control"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        style={{ height: '54px' }}
                      >
                        {mealTime !== 'dinner' && <option value="12:00 PM - 1:00 PM">Lunch (12:00 - 1:00 PM)</option>}
                        {mealTime !== 'dinner' && <option value="12:30 PM - 1:30 PM">Lunch (12:30 - 1:30 PM)</option>}
                        {mealTime !== 'lunch' && <option value="7:30 PM - 8:30 PM">Dinner (7:30 - 8:30 PM)</option>}
                        {mealTime !== 'lunch' && <option value="8:15 PM - 9:15 PM">Dinner (8:15 - 9:15 PM)</option>}
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Continue to Payment
                  </button>
                </form>
              ) : (
                /* Step 2: Payment Simulator */
                <div style={styles.form}>
                  <div style={styles.summaryBadge}>
                    <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>Subscribing to {duration.toUpperCase()} {dietType === 'veg' ? 'Veg' : 'NonVeg'} Plan</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>Pay Total: ₹{totalCost}</p>
                  </div>

                  <div style={styles.paymentSelector}>
                    <span className="form-label">Select Payment Method</span>
                    
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      style={{
                        ...styles.payBtn,
                        borderColor: paymentMethod === 'upi' ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: paymentMethod === 'upi' ? 'var(--primary-light)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Clock size={18} />
                        <span>UPI (GooglePay / PhonePe)</span>
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>Popular</span>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('card')}
                      style={{
                        ...styles.payBtn,
                        borderColor: paymentMethod === 'card' ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CreditCard size={18} />
                        <span>Credit / Debit Card</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      style={{
                        ...styles.payBtn,
                        borderColor: paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: paymentMethod === 'cod' ? 'var(--primary-light)' : 'var(--bg-card)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <MapPin size={18} />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-control" placeholder="4111 •••• •••• 1111" required />
                      </div>
                      <div style={styles.formRow}>
                        <input type="text" className="form-control" placeholder="MM/YY" style={{ flex: 1 }} required />
                        <input type="password" className="form-control" placeholder="CVV" style={{ flex: 1 }} required />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="animate-fade" style={{ marginBottom: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">UPI ID</label>
                        <input type="text" className="form-control" placeholder="username@okhdfcbank" required />
                      </div>
                    </div>
                  )}

                  <div style={styles.checkoutBtns}>
                    <button onClick={() => setCheckoutStep(1)} className="btn btn-secondary" style={{ flex: 1 }}>
                      Back
                    </button>
                    <button onClick={handleSubscribe} className="btn btn-primary" style={{ flex: 2 }}>
                      Pay & Activate Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'var(--bg-main)',
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
  calcGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '40px',
    alignItems: 'start'
  },
  configCard: {
    padding: '30px',
    borderRadius: '24px',
    textAlign: 'left'
  },
  calcHeader: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '12px'
  },
  configBlock: {
    marginBottom: '24px'
  },
  configLabel: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: '12px',
    letterSpacing: '0.5px'
  },
  toggleRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  toggleBtn: {
    flex: '1 1 auto',
    padding: '12px 18px',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '0.88rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition)',
    position: 'relative'
  },
  discountBadge: {
    position: 'absolute',
    top: '-8px',
    right: '8px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    fontSize: '0.62rem',
    fontWeight: '800',
    padding: '2px 6px',
    borderRadius: '4px'
  },
  addonsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  addonLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '14px',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'var(--transition)'
  },
  checkbox: {
    marginTop: '4px',
    accentColor: 'var(--primary)',
    width: '18px',
    height: '18px'
  },
  addonText: {
    display: 'block',
    fontSize: '0.92rem',
    fontWeight: '600',
    color: 'var(--text-main)'
  },
  addonSub: {
    display: 'block',
    fontSize: '0.78rem',
    color: 'var(--text-muted)'
  },
  summaryCol: {
    position: 'sticky',
    top: '100px'
  },
  summaryCard: {
    padding: '30px',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    textAlign: 'left'
  },
  priceHeader: {
    marginBottom: '20px',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '16px'
  },
  summaryTitle: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'var(--text-main)',
    marginTop: '6px'
  },
  costBlock: {
    backgroundColor: 'var(--border-light)',
    padding: '18px',
    borderRadius: '16px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  costSub: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  costPerMeal: {
    fontSize: '2.4rem',
    fontWeight: '800',
    color: 'var(--primary)',
    lineHeight: '1.1'
  },
  mealLine: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginTop: '4px'
  },
  priceDetailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  priceDetailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'var(--text-muted)'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px dashed var(--border-color)',
    paddingTop: '14px',
    marginTop: '6px'
  },
  finalTotal: {
    fontSize: '1.8rem',
    fontWeight: '900',
    color: 'var(--text-main)'
  },
  subscribeBtn: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '1.05rem',
    boxShadow: '0 6px 20px 0 rgba(var(--primary-rgb), 0.3)',
    marginBottom: '18px'
  },
  guarantees: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  guaranteeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.82rem',
    color: 'var(--text-muted)'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '16px'
  },
  modalContent: {
    width: '100%',
    maxWidth: '520px',
    padding: '30px',
    borderRadius: '24px',
    textAlign: 'left',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '16px',
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: 'var(--text-main)'
  },
  modalSub: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-muted)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formRow: {
    display: 'flex',
    gap: '16px'
  },
  errorText: {
    color: 'var(--non-veg)',
    fontSize: '0.78rem',
    marginTop: '4px'
  },
  summaryBadge: {
    backgroundColor: 'var(--border-light)',
    padding: '16px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  paymentSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  payBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '0.92rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition)'
  },
  checkoutBtns: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px'
  }
};
