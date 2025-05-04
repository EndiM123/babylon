import React, { useState, createContext } from 'react';
import SoliraPreviewMenu from './components/SoliraPreviewMenu';
import './App.css';
import './global-video-override.css';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';
import GlitterParticlesPortal from './GlitterParticlesPortal';

// --- Cart Context ---
type CartContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

function App() {
  const [showSoliraPreview, setShowSoliraPreview] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth > 900 : true);
  const [cart, setCart] = useState<any[]>([]);

  React.useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 900);
      if (window.innerWidth <= 900) setShowSoliraPreview(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <>
      <GlitterParticlesPortal />
      <header className="babylon-header">
        <div className="babylon-header-inner">
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
