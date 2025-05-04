import React from 'react';
import './SoliraPreviewMenu.css';

const SOLIRA_PRODUCTS = [
  {
    id: 1,
    name: 'Salt Veil Dress',
    image: '/solira1.png',
    price: 540,
    limited: true,
  },
  {
    id: 2,
    name: 'Luminance Top',
    image: '/solira2.png',
    price: 320,
    limited: false,
  },
  {
    id: 3,
    name: 'Sunlit Trench',
    image: '/solira3.png',
    price: 690,
    limited: true,
  },
  {
    id: 4,
    name: 'Mediterranean Skirt',
    image: '/solira4.png',
    price: 410,
    limited: false,
  },
];

export default function SoliraPreviewMenu() {
  return (
    <div className="solira-preview-menu">
      <div className="solira-preview-info">
        <div className="solira-preview-title">Solira Collection</div>
        <div className="solira-preview-desc">
          Discover sun-soaked elegance and limited pieces inspired by Mediterranean summers.
        </div>
        <a className="solira-preview-link" href="/about">
          Browse collection &rarr;
        </a>
      </div>
      <div className="solira-preview-image-col">
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src="/solira1.png"
            alt="Solira featured"
            className="solira-preview-img"
          />
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '2.2rem',
            textShadow: '0 4px 16px rgba(0,0,0,0.25)',
            letterSpacing: '0.01em',
          }}>
            Solira 2025
          </div>
        </div>
      </div>
    </div>
  );
}
