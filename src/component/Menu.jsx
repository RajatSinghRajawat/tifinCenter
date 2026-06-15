import React, { useState } from 'react';
import { Sparkles, CalendarDays, Filter, Info, Star } from 'lucide-react';

const menuData = {
  today: [
    {
      id: 'm1',
      name: "Classic Paneer Thali",
      isVeg: true,
      price: 139,
      rating: 4.8,
      calories: 620,
      macros: { p: '22g', c: '75g', f: '18g' },
      items: ["Paneer Butter Masala", "Dal Fry", "3 Butter Rotis", "Jeera Rice", "Salad", "Sweet Seviyan"],
      label: "Chef's Choice"
    },
    {
      id: 'm2',
      name: "Delhi Butter Chicken Thali",
      isVeg: false,
      price: 169,
      rating: 4.9,
      calories: 780,
      macros: { p: '38g', c: '82g', f: '26g' },
      items: ["Butter Chicken (Boneless)", "Dal Makhani", "3 Butter Rotis", "Veg Pulav", "Salad", "Gulab Jamun"],
      label: "Bestseller"
    },
    {
      id: 'm3',
      name: "Light & Fit Tiffin",
      isVeg: true,
      price: 119,
      rating: 4.6,
      calories: 480,
      macros: { p: '16g', c: '58g', f: '10g' },
      items: ["Mixed Veg Curry", "Lauki Dal", "3 Plain Phulkas", "Brown Rice", "Sprouted Salad"],
      label: "Healthy Active"
    },
    {
      id: 'm4',
      name: "Homestyle Egg Curry Thali",
      isVeg: false,
      price: 149,
      rating: 4.7,
      calories: 650,
      macros: { p: '26g', c: '70g', f: '19g' },
      items: ["Double Egg Curry", "Aloo Jeera", "3 Rotis", "Steamed Rice", "Salad", "Raita"],
      label: "High Protein"
    }
  ],
  weekly: [
    { day: "Monday", veg: "Kadhai Paneer + Black Dal + 3 Roti + Basmati Rice", nonVeg: "Chicken Masala + Black Dal + 3 Roti + Basmati Rice" },
    { day: "Tuesday", veg: "Aloo Gobhi Adraki + Yellow Chana Dal + 3 Roti + Basmati Rice", nonVeg: "Egg Curry + Yellow Dal + 3 Roti + Basmati Rice" },
    { day: "Wednesday", veg: "Mutton Style Soya Chaap + Dal Tadka + 3 Roti + Rice", nonVeg: "Mutton Keema Curry + Dal Tadka + 3 Roti + Rice" },
    { day: "Thursday", veg: "Paneer Bhurji + Mix Dal Panchmel + 3 Roti + Rice", nonVeg: "Chicken Keema Masala + Mix Dal + 3 Roti + Rice" },
    { day: "Friday", veg: "Classic Punjabi Rajma + Jeera Aloo + 3 Roti + Rice", nonVeg: "Chicken Korma + Jeera Aloo + 3 Roti + Rice" },
    { day: "Saturday", veg: "Special Shahi Paneer + Dal Makhani + 3 Roti + Pulav", nonVeg: "Mughlai Butter Chicken + Dal Makhani + 3 Roti + Pulav" },
    { day: "Sunday", veg: "Dum Veg Biryani + Paneer Tikka (2pc) + Raita", nonVeg: "Dum Chicken Biryani + Chicken Seekh (2pc) + Raita" }
  ]
};

export default function Menu({ onSelectQuickMeal }) {
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'weekly'
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'nonveg'

  const filteredTodayMeals = menuData.today.filter(meal => {
    if (dietFilter === 'veg') return meal.isVeg;
    if (dietFilter === 'nonveg') return !meal.isVeg;
    return true;
  });

  return (
    <section id="menu-section" style={styles.section} className="section-padding">
      <div className="container" style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <span className="badge badge-primary">Our Fresh Menu</span>
          <h2 style={styles.sectionTitle}>
            Delightful Dishes <span className="serif-title" style={{ color: 'var(--primary)' }}>Made Daily</span>
          </h2>
          <p style={styles.sectionSub}>
            We plan a new menu every week to keep your meals diverse, healthy, and exciting.
          </p>
        </div>

        {/* Navigation Tabs (Today's Menu vs Weekly Schedule) */}
        <div style={styles.tabBar}>
          <button 
            onClick={() => setActiveTab('today')}
            style={{ 
              ...styles.tabBtn, 
              backgroundColor: activeTab === 'today' ? 'var(--primary)' : 'var(--bg-main)',
              color: activeTab === 'today' ? 'white' : 'var(--text-main)',
              borderColor: activeTab === 'today' ? 'var(--primary)' : 'var(--border-color)'
            }}
            className="btn btn-secondary"
          >
            <Sparkles size={18} /> Today's Menu
          </button>
          <button 
            onClick={() => setActiveTab('weekly')}
            style={{ 
              ...styles.tabBtn, 
              backgroundColor: activeTab === 'weekly' ? 'var(--primary)' : 'var(--bg-main)',
              color: activeTab === 'weekly' ? 'white' : 'var(--text-main)',
              borderColor: activeTab === 'weekly' ? 'var(--primary)' : 'var(--border-color)'
            }}
            className="btn btn-secondary"
          >
            <CalendarDays size={18} /> Weekly Menu Board
          </button>
        </div>

        {/* Menu Content */}
        {activeTab === 'today' ? (
          <div>
            {/* Filter controls */}
            <div style={styles.filterBar}>
              <div style={styles.filterTitle}>
                <Filter size={16} /> <span>Filter by:</span>
              </div>
              <div style={styles.filterBtns}>
                {['all', 'veg', 'nonveg'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setDietFilter(filter)}
                    style={{
                      ...styles.filterBtn,
                      backgroundColor: dietFilter === filter ? 'var(--text-main)' : 'var(--bg-card)',
                      color: dietFilter === filter ? 'var(--bg-card)' : 'var(--text-main)',
                      fontWeight: dietFilter === filter ? '600' : '400'
                    }}
                  >
                    {filter === 'all' && 'All Meals'}
                    {filter === 'veg' && 'Veg Only'}
                    {filter === 'nonveg' && 'Non-Veg Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Meals Cards Grid */}
            <div style={styles.grid}>
              {filteredTodayMeals.map((meal) => (
                <div key={meal.id} className="premium-card animate-fade" style={styles.card}>
                  {/* Top Header details */}
                  <div style={styles.cardHeader}>
                    <div style={styles.badgeRow}>
                      <span className={meal.isVeg ? "veg-dot" : "nonveg-dot"} title={meal.isVeg ? "Veg" : "Non Veg"}></span>
                      <span className="badge badge-primary" style={styles.miniLabel}>{meal.label}</span>
                    </div>
                    <div style={styles.rating}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <span>{meal.rating}</span>
                    </div>
                  </div>

                  {/* Meal Title */}
                  <h3 style={styles.cardTitle}>{meal.name}</h3>

                  {/* Meal contents */}
                  <p style={styles.itemString}>
                    {meal.items.join(' • ')}
                  </p>

                  {/* Nutrition details */}
                  <div style={styles.nutritionBlock}>
                    <div style={styles.nutritionItem}>
                      <span style={styles.nutriValue}>{meal.calories}</span>
                      <span style={styles.nutriLabel}>Kcal</span>
                    </div>
                    <div style={styles.nutritionItem}>
                      <span style={styles.nutriValue}>{meal.macros.p}</span>
                      <span style={styles.nutriLabel}>Prot</span>
                    </div>
                    <div style={styles.nutritionItem}>
                      <span style={styles.nutriValue}>{meal.macros.c}</span>
                      <span style={styles.nutriLabel}>Carbs</span>
                    </div>
                    <div style={styles.nutritionItem}>
                      <span style={styles.nutriValue}>{meal.macros.f}</span>
                      <span style={styles.nutriLabel}>Fat</span>
                    </div>
                  </div>

                  {/* Pricing and Action CTA */}
                  <div style={styles.cardFooter}>
                    <div>
                      <p style={styles.priceLabel}>Trial Box Price</p>
                      <p style={styles.priceValue}>₹{meal.price}</p>
                    </div>
                    <button 
                      onClick={() => onSelectQuickMeal(meal)} 
                      className="btn btn-primary btn-sm"
                      style={styles.orderBtn}
                    >
                      Quick Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Weekly Schedule Table Board */
          <div className="glass-card animate-fade" style={styles.weeklyBoard}>
            <div style={styles.boardHeader}>
              <Info size={18} color="var(--primary)" />
              <p style={styles.boardInfo}>
                Menu cycle rotates every Sunday. Orders cut off at 9:00 PM for next day delivery.
              </p>
            </div>
            
            <div style={styles.tableResponsive}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.trHead}>
                    <th style={styles.th}>Day</th>
                    <th style={styles.th}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="veg-dot"></span> Vegetarian Menu
                      </div>
                    </th>
                    <th style={styles.th}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="nonveg-dot"></span> Non-Vegetarian Menu
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {menuData.weekly.map((row, idx) => (
                    <tr key={idx} style={{ 
                      ...styles.trBody, 
                      backgroundColor: idx % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-main)' 
                    }}>
                      <td style={{ ...styles.td, fontWeight: '700', color: 'var(--primary)' }}>{row.day}</td>
                      <td style={styles.td}>{row.veg}</td>
                      <td style={styles.td}>{row.nonVeg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  container: {
    display: 'flex',
    flexDirection: 'column'
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
  tabBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '32px'
  },
  tabBtn: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid var(--border-color)',
    padding: '12px 24px',
    borderRadius: 'var(--radius-full)',
    transition: 'var(--transition)'
  },
  filterBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '32px',
    flexWrap: 'wrap'
  },
  filterTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-muted)'
  },
  filterBtns: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'var(--border-light)',
    padding: '4px',
    borderRadius: 'var(--radius-full)'
  },
  filterBtn: {
    border: 'none',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'var(--transition)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    width: '100%'
  },
  card: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: '20px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  badgeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  miniLabel: {
    fontSize: '0.7rem',
    padding: '3px 8px'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.88rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  cardTitle: {
    fontSize: '1.35rem',
    fontWeight: '750',
    textAlign: 'left',
    marginBottom: '8px',
    color: 'var(--text-main)'
  },
  itemString: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    textAlign: 'left',
    marginBottom: '20px',
    lineHeight: '1.4'
  },
  nutritionBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--border-light)',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '24px'
  },
  nutritionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nutriValue: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  nutriLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase'
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px dashed var(--border-color)',
    paddingTop: '16px',
    marginTop: 'auto'
  },
  priceLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textAlign: 'left'
  },
  priceValue: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'var(--primary)',
    lineHeight: '1'
  },
  orderBtn: {
    padding: '8px 18px',
    fontSize: '0.85rem'
  },
  weeklyBoard: {
    padding: '30px',
    borderRadius: '24px',
    border: '1px solid var(--border-color)',
    width: '100%'
  },
  boardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 18px',
    borderRadius: '12px',
    backgroundColor: 'var(--border-light)',
    marginBottom: '24px'
  },
  boardInfo: {
    fontSize: '0.9rem',
    color: 'var(--text-main)',
    textAlign: 'left'
  },
  tableResponsive: {
    overflowX: 'auto',
    width: '100%'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    minWidth: '600px'
  },
  trHead: {
    borderBottom: '2px solid var(--border-color)'
  },
  th: {
    padding: '16px 20px',
    fontSize: '0.95rem',
    fontWeight: '700',
    color: 'var(--text-main)'
  },
  trBody: {
    borderBottom: '1px solid var(--border-light)',
    transition: 'var(--transition)'
  },
  td: {
    padding: '18px 20px',
    fontSize: '0.92rem',
    color: 'var(--text-main)',
    lineHeight: '1.4'
  }
};
