import React, { useState, useEffect } from 'react';
import Navbar from './component/Navbar.jsx';
import Hero from './component/Hero.jsx';
import Features from './component/Features.jsx';
import Menu from './component/Menu.jsx';
import Customizer from './component/Customizer.jsx';
import Plans from './component/Plans.jsx';
import PincodeChecker from './component/PincodeChecker.jsx';
import Dashboard from './component/Dashboard.jsx';
import Contact from './component/Contact.jsx';
import Footer from './component/Footer.jsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'menu', 'customizer', 'plans', 'dashboard', 'contact'
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Subscription State
  const [activeSub, setActiveSub] = useState(() => {
    const saved = localStorage.getItem('activeSub');
    return saved ? JSON.parse(saved) : null;
  });

  // Cart/Tiffin State
  const [cartItems, setCartItems] = useState([]);

  // Theme synchronization effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync subscription state to storage
  useEffect(() => {
    if (activeSub) {
      localStorage.setItem('activeSub', JSON.stringify(activeSub));
    } else {
      localStorage.removeItem('activeSub');
    }
  }, [activeSub]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSelectQuickMeal = (meal) => {
    // Redirect to plans with cart pre-filled or open subscription directly
    alert(`Starting order for ${meal.name}! Redirecting to subscription customizer...`);
    setCurrentTab('plans');
  };

  const handleAddCustomTiffinToCart = (tiffin) => {
    setCartItems([...cartItems, tiffin]);
  };

  const handleSubscribeSuccess = (subDetails) => {
    setActiveSub(subDetails);
    setCartItems([]); // Clear cart upon subscription
    alert("Subscription Successful! Redirecting to your active subscriber dashboard.");
    setCurrentTab('dashboard');
  };

  const handleCancelSubscription = () => {
    setActiveSub(null);
    alert("Subscription cancelled successfully. Refund will be processed shortly.");
    setCurrentTab('plans');
  };

  return (
    <>
      {/* Global Sticky Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        hasActiveSubscription={!!activeSub}
        cartItemsCount={cartItems.length}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentTab === 'home' && (
          <div className="animate-fade">
            <Hero 
              onViewMenu={() => setCurrentTab('menu')} 
              onViewPlans={() => setCurrentTab('plans')} 
            />
            <Features />
            <PincodeChecker />
            <Contact />
          </div>
        )}

        {currentTab === 'menu' && (
          <Menu onSelectQuickMeal={handleSelectQuickMeal} />
        )}

        {currentTab === 'customizer' && (
          <Customizer onAddCustomTiffinToCart={handleAddCustomTiffinToCart} />
        )}

        {currentTab === 'plans' && (
          <Plans 
            onSubscribeSuccess={handleSubscribeSuccess} 
            cartItems={cartItems}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard 
            activeSub={activeSub} 
            onCancelSubscription={handleCancelSubscription}
            onViewPlans={() => setCurrentTab('plans')}
          />
        )}

        {currentTab === 'contact' && (
          <Contact />
        )}
      </main>

      {/* Global Footer */}
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  );
}
