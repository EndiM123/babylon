import React, { useState, useEffect, createContext } from 'react';
import SoliraPreviewMenu from './components/SoliraPreviewMenu';
import './App.css';
import './global-video-override.css';
import './desktop-styles.css';
import AppRoutes from './AppRoutes';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GlitterParticlesPortal from './GlitterParticlesPortal';
import ScrollStorySection from './ScrollStorySection';
import FeaturedProductCarousel from './FeaturedProductCarousel';

// --- Cart Context ---
type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  addToCart: (item: any) => void;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
  addToCart: () => {},
});


function App() {


  const [showSoliraPreview, setShowSoliraPreview] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth > 900 : true);
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Save current path to localStorage when it changes
  useEffect(() => {
    if (location.pathname) {
      localStorage.setItem('lastPath', location.pathname);
    }
  }, [location.pathname]);
  
  // Restore last path on app initialization
  useEffect(() => {
    // Only redirect if we're on the home page and there's a saved path
    if (location.pathname === '/' && location.pathname !== localStorage.getItem('lastPath')) {
      const lastPath = localStorage.getItem('lastPath');
      if (lastPath) {
        console.log('Restoring last path:', lastPath);
        // Use replace instead of navigate to avoid adding to history stack
        navigate(lastPath, { replace: true });
      }
    }
    
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
  }, [location.pathname, navigate]);

  const addToCart = (newItem: any) => {
    setCart(prevCart => {
      // Check if item with same product ID, size and color already exists in cart
      const existingItemIndex = prevCart.findIndex(
        item => 
          item.product.id === newItem.product.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, newItem];
      }
    });
  };

  // Used to trigger scroll after navigation
  const [pendingLandingScroll, setPendingLandingScroll] = useState(false);

  function handleLogoClick(e?: React.MouseEvent | React.KeyboardEvent) {
    e?.preventDefault();
    if (location.pathname === '/') {
      // Already on home, scroll to landing
      const el = document.getElementById('video-banner');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setPendingLandingScroll(true);
      navigate('/');
    }
  }

  // After navigation to home, scroll to landing if pending
  React.useEffect(() => {
    if (pendingLandingScroll && location.pathname === '/') {
      const el = document.getElementById('video-banner');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setPendingLandingScroll(false);
      } else {
        // Try again on next tick if element not found
        setTimeout(() => {
          const el2 = document.getElementById('video-banner');
          if (el2) {
            el2.scrollIntoView({ behavior: 'smooth' });
            setPendingLandingScroll(false);
          }
        }, 100);
      }
    }
  }, [pendingLandingScroll, location.pathname]);

  // Scroll to top on blog page/post navigation
  React.useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  React.useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 900);
      if (window.innerWidth <= 900) setShowSoliraPreview(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      <>
        <GlitterParticlesPortal />
        <header className="babylon-header">
          <div className="babylon-header-inner">
            {isDesktop && (
              <span
                className="babylon-header-logo"
                style={{ textDecoration: 'none', cursor: 'pointer' }}
                onClick={handleLogoClick}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleLogoClick(e); }}
              >
                Babylon
              </span>
            )}
            <div className="babylon-header-logo-space"></div>
            <nav className="babylon-nav">
              <Link to="/" className="babylon-nav-item">HOME</Link>
              <Link to="/shop" className="babylon-nav-item">SHOP</Link>
              <div
                onMouseEnter={isDesktop ? () => setShowSoliraPreview(true) : undefined}
                onMouseLeave={isDesktop ? () => setShowSoliraPreview(false) : undefined}
                style={{ display: 'inline-block' }}
              >
                <Link to="/about" className="babylon-nav-item">SOLIRA</Link>
              </div>
              <Link to="/blog" className="babylon-nav-item">BLOG</Link>
              <Link to="/checkout" className="babylon-nav-item">CART</Link>
            </nav>
          </div>
        </header>
        {isDesktop && showSoliraPreview && (
          <div
            onMouseEnter={() => setShowSoliraPreview(true)}
            onMouseLeave={() => setShowSoliraPreview(false)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              position: 'fixed',
              left: 0,
              zIndex: 120,
              background: 'transparent',
              margin: 0,
              padding: 0,
            }}
            className="solira-preview-popover"
          >
            <SoliraPreviewMenu />
          </div>
        )}
        <AppRoutes />
      </>
    </CartContext.Provider>
  );
}

export default App;
