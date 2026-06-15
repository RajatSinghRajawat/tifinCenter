import React, { useState, useEffect } from 'react';
import { ChefHat, Info, Plus, RotateCcw, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import customizerImg from '../assets/tiffin_customizer.png';

const OPTION_DATA = {
  breads: [
    { id: 'b1', name: 'Plain Phulka Roti', cal: 70, price: 0, group: 'bread' },
    { id: 'b2', name: 'Butter Tandoori Roti', cal: 110, price: 5, group: 'bread' },
    { id: 'b3', name: 'Laccha Paratha', cal: 180, price: 15, group: 'bread' },
    { id: 'b4', name: 'Gluten-Free Roti', cal: 80, price: 10, group: 'bread' }
  ],
  mains: [
    { id: 'm1', name: 'Paneer Butter Masala', cal: 220, price: 25, group: 'main' },
    { id: 'm2', name: 'Homestyle Mix Veg', cal: 120, price: 0, group: 'main' },
    { id: 'm3', name: 'Aloo Gobhi Adraki', cal: 110, price: 0, group: 'main' },
    { id: 'm4', name: 'Butter Chicken (Premium)', cal: 310, price: 45, group: 'main' }
  ],
  dals: [
    { id: 'd1', name: 'Yellow Dal Tadka', cal: 130, price: 0, group: 'dal' },
    { id: 'd2', name: 'Creamy Dal Makhani', cal: 210, price: 15, group: 'dal' },
    { id: 'd3', name: 'Punjabi Rajma Masala', cal: 160, price: 10, group: 'dal' },
    { id: 'd4', name: 'Kadhi Pakora', cal: 150, price: 5, group: 'dal' }
  ],
  rice: [
    { id: 'r1', name: 'Steamed Basmati Rice', cal: 160, price: 0, group: 'rice' },
    { id: 'r2', name: 'Jeera Rice', cal: 190, price: 5, group: 'rice' },
    { id: 'r3', name: 'Healthy Brown Rice', cal: 140, price: 10, group: 'rice' },
    { id: 'r4', name: 'Veg Pulav', cal: 200, price: 15, group: 'rice' }
  ],
  addons: [
    { id: 'a1', name: 'Sweet Gulab Jamun (1 pc)', cal: 150, price: 20 },
    { id: 'a2', name: 'Cucumber Mint Raita', cal: 60, price: 15 },
    { id: 'a3', name: 'Chilled Sweet Lassi', cal: 180, price: 30 },
    { id: 'a4', name: 'Fresh Cut Salad', cal: 30, price: 10 }
  ]
};

export default function Customizer({ onAddCustomTiffinToCart }) {
  // Selections
  const [selectedBread, setSelectedBread] = useState(OPTION_DATA.breads[0]);
  const [breadQty, setBreadQty] = useState(3);
  const [selectedMain, setSelectedMain] = useState(OPTION_DATA.mains[0]);
  const [selectedDal, setSelectedDal] = useState(OPTION_DATA.dals[0]);
  const [selectedRice, setSelectedRice] = useState(OPTION_DATA.rice[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Stats
  const [totalCal, setTotalCal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(119); // Base price ₹119
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Re-calculate macros and total price dynamically
  useEffect(() => {
    let calories = 0;
    let priceUpsell = 0;

    // Bread calculation
    calories += selectedBread.cal * breadQty;
    priceUpsell += selectedBread.price * breadQty;

    // Main curry
    calories += selectedMain.cal;
    priceUpsell += selectedMain.price;

    // Dal
    calories += selectedDal.cal;
    priceUpsell += selectedDal.price;

    // Rice
    calories += selectedRice.cal;
    priceUpsell += selectedRice.price;

    // Addons
    selectedAddons.forEach(addon => {
      calories += addon.cal;
      priceUpsell += addon.price;
    });

    setTotalCal(calories);
    setTotalPrice(119 + priceUpsell); // 119 is base price
  }, [selectedBread, breadQty, selectedMain, selectedDal, selectedRice, selectedAddons]);

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleReset = () => {
    setSelectedBread(OPTION_DATA.breads[0]);
    setBreadQty(3);
    setSelectedMain(OPTION_DATA.mains[0]);
    setSelectedDal(OPTION_DATA.dals[0]);
    setSelectedRice(OPTION_DATA.rice[0]);
    setSelectedAddons([]);
  };

  const handleAddToCart = () => {
    const customTiffinObj = {
      name: `Custom Lab Tiffin`,
      details: `${breadQty}x ${selectedBread.name}, ${selectedMain.name}, ${selectedDal.name}, ${selectedRice.name}${selectedAddons.length > 0 ? ', ' + selectedAddons.map(a => a.name).join(', ') : ''}`,
      price: totalPrice,
      calories: totalCal,
      isCustom: true
    };
    onAddCustomTiffinToCart(customTiffinObj);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 4000);
  };

  return (
    <section id="customizer-section" style={styles.section} className="section-padding">
      <div className="container">
        
        {/* Header */}
        <div style={styles.header}>
          <span className="badge badge-primary">Tiffin Lab</span>
          <h2 style={styles.sectionTitle}>
            Build Your <span className="serif-title" style={{ color: 'var(--primary)' }}>Own Tiffin</span>
          </h2>
          <p style={styles.sectionSub}>
            Customize your carbs, proteins, breads, and treats. Watch estimated calories update instantly in real-time.
          </p>
        </div>

        {/* Success Alert Banner */}
        {showSuccessAlert && (
          <div className="glass-card animate-fade" style={styles.successAlert}>
            <CheckCircle2 color="var(--veg)" size={22} />
            <div>
              <p style={{ fontWeight: '700', color: 'var(--text-main)' }}>Added to your order list!</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure subscriptions or quick order on the checkout screen.</p>
            </div>
          </div>
        )}

        <div style={styles.grid}>
          {/* Controls Column */}
          <div style={styles.controlsCol}>
            {/* Step 1: Select Breads */}
            <div style={styles.optionBox}>
              <h3 style={styles.optionTitle}>1. Select Bread Type & Quantity</h3>
              <div style={styles.radioGrid}>
                {OPTION_DATA.breads.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBread(b)}
                    style={{
                      ...styles.selectBtn,
                      borderColor: selectedBread.id === b.id ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: selectedBread.id === b.id ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: selectedBread.id === b.id ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <span>{b.name}</span>
                    <span style={styles.optionPrice}>{b.price > 0 ? `+₹${b.price}` : 'Free'}</span>
                  </button>
                ))}
              </div>
              <div style={styles.qtyContainer}>
                <span style={styles.qtyLabel}>Quantity:</span>
                <div style={styles.qtyControls}>
                  <button 
                    onClick={() => setBreadQty(Math.max(1, breadQty - 1))}
                    style={styles.qtyBtn}
                  >-</button>
                  <span style={styles.qtyNum}>{breadQty}</span>
                  <button 
                    onClick={() => setBreadQty(Math.min(6, breadQty + 1))}
                    style={styles.qtyBtn}
                  >+</button>
                </div>
              </div>
            </div>

            {/* Step 2: Main Curry */}
            <div style={styles.optionBox}>
              <h3 style={styles.optionTitle}>2. Choose Main Entree</h3>
              <div style={styles.radioGrid}>
                {OPTION_DATA.mains.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMain(m)}
                    style={{
                      ...styles.selectBtn,
                      borderColor: selectedMain.id === m.id ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: selectedMain.id === m.id ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: selectedMain.id === m.id ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <span>{m.name}</span>
                    <span style={styles.optionPrice}>{m.price > 0 ? `+₹${m.price}` : 'Free'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Lentils & Dals */}
            <div style={styles.optionBox}>
              <h3 style={styles.optionTitle}>3. Choose Lentil/Dal</h3>
              <div style={styles.radioGrid}>
                {OPTION_DATA.dals.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDal(d)}
                    style={{
                      ...styles.selectBtn,
                      borderColor: selectedDal.id === d.id ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: selectedDal.id === d.id ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: selectedDal.id === d.id ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <span>{d.name}</span>
                    <span style={styles.optionPrice}>{d.price > 0 ? `+₹${d.price}` : 'Free'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Basmati Rice */}
            <div style={styles.optionBox}>
              <h3 style={styles.optionTitle}>4. Choose Rice Portion</h3>
              <div style={styles.radioGrid}>
                {OPTION_DATA.rice.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRice(r)}
                    style={{
                      ...styles.selectBtn,
                      borderColor: selectedRice.id === r.id ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: selectedRice.id === r.id ? 'var(--primary-light)' : 'var(--bg-card)',
                      color: selectedRice.id === r.id ? 'var(--primary)' : 'var(--text-main)'
                    }}
                  >
                    <span>{r.name}</span>
                    <span style={styles.optionPrice}>{r.price > 0 ? `+₹${r.price}` : 'Free'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Treats & Add-ons */}
            <div style={styles.optionBox}>
              <h3 style={styles.optionTitle}>5. Sweet Delights & Sides (Optional)</h3>
              <div style={styles.radioGrid}>
                {OPTION_DATA.addons.map(a => {
                  const isChecked = !!selectedAddons.find(item => item.id === a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddon(a)}
                      style={{
                        ...styles.selectBtn,
                        borderColor: isChecked ? 'var(--primary)' : 'var(--border-color)',
                        backgroundColor: isChecked ? 'var(--primary-light)' : 'var(--bg-card)',
                        color: isChecked ? 'var(--primary)' : 'var(--text-main)'
                      }}
                    >
                      <span>{a.name}</span>
                      <span style={styles.optionPrice}>+₹{a.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Visual Display Summary Column */}
          <div style={styles.summaryCol}>
            <div className="glass-card" style={styles.summaryCard}>
              <div style={styles.visualTiffin}>
                <img 
                  src={customizerImg} 
                  alt="Delicious Indian food ingredients layout" 
                  style={styles.visualImg} 
                />
                <div style={styles.visualOverlay}>
                  <ChefHat size={32} color="white" />
                  <span style={styles.visualBadge}>Tiffin Builder Lab</span>
                </div>
              </div>

              {/* Nutrition Split */}
              <div style={styles.summaryHeader}>
                <div style={styles.calorieBadge}>
                  <Flame size={20} color="var(--primary)" />
                  <div>
                    <h4 style={styles.summaryTitle}>Est. Calories</h4>
                    <p style={styles.summaryValue}>{totalCal} Kcal</p>
                  </div>
                </div>
                <div style={styles.priceContainer}>
                  <h4 style={styles.summaryTitle}>Calculated Price</h4>
                  <p style={styles.summaryPrice}>₹{totalPrice}</p>
                </div>
              </div>

              {/* Selected List Breakdown */}
              <div style={styles.breakdownList}>
                <h4 style={styles.breakdownTitle}>Tiffin Recipe Box</h4>
                <ul style={styles.ul}>
                  <li style={styles.li}>
                    <span>{selectedBread.name} (Qty: {breadQty})</span>
                    <span>{selectedBread.cal * breadQty} cal</span>
                  </li>
                  <li style={styles.li}>
                    <span>{selectedMain.name}</span>
                    <span>{selectedMain.cal} cal</span>
                  </li>
                  <li style={styles.li}>
                    <span>{selectedDal.name}</span>
                    <span>{selectedDal.cal} cal</span>
                  </li>
                  <li style={styles.li}>
                    <span>{selectedRice.name}</span>
                    <span>{selectedRice.cal} cal</span>
                  </li>
                  {selectedAddons.map(a => (
                    <li key={a.id} style={{ ...styles.li, color: 'var(--veg)', fontWeight: '500' }}>
                      <span>{a.name}</span>
                      <span>{a.cal} cal</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Buttons */}
              <div style={styles.btnRow}>
                <button onClick={handleReset} className="btn btn-secondary" style={{ flex: '1' }}>
                  <RotateCcw size={16} /> Reset
                </button>
                <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: '2' }}>
                  <Plus size={16} /> Add Tiffin Box
                </button>
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
    backgroundColor: 'var(--bg-card)',
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
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 24px',
    borderRadius: '16px',
    backgroundColor: 'var(--secondary-light)',
    border: '1px solid var(--veg)',
    marginBottom: '32px',
    textAlign: 'left'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '40px',
    alignItems: 'start'
  },
  controlsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  optionBox: {
    textAlign: 'left',
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '24px'
  },
  optionTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '16px'
  },
  radioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  selectBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    border: '2px solid var(--border-color)',
    borderRadius: '12px',
    fontSize: '0.92rem',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'var(--transition)'
  },
  optionPrice: {
    fontSize: '0.82rem',
    opacity: 0.8
  },
  qtyContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '16px'
  },
  qtyLabel: {
    fontSize: '0.92rem',
    fontWeight: '600',
    color: 'var(--text-muted)'
  },
  qtyControls: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-main)',
    borderRadius: '8px',
    border: '1px solid var(--border-color)'
  },
  qtyBtn: {
    border: 'none',
    background: 'none',
    width: '36px',
    height: '36px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    color: 'var(--text-main)'
  },
  qtyNum: {
    width: '32px',
    textAlign: 'center',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  summaryCol: {
    position: 'sticky',
    top: '100px'
  },
  summaryCard: {
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    textAlign: 'left'
  },
  visualTiffin: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '20px',
    height: '180px'
  },
  visualImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  visualOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  visualBadge: {
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  summaryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--border-color)',
    marginBottom: '16px'
  },
  calorieBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  summaryTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  summaryValue: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--text-main)'
  },
  priceContainer: {
    textAlign: 'right'
  },
  summaryPrice: {
    fontSize: '1.6rem',
    fontWeight: '800',
    color: 'var(--primary)'
  },
  breakdownList: {
    marginBottom: '24px'
  },
  breakdownTitle: {
    fontSize: '0.92rem',
    color: 'var(--text-main)',
    marginBottom: '12px'
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.88rem',
    color: 'var(--text-muted)'
  },
  btnRow: {
    display: 'flex',
    gap: '12px'
  }
};
