import React from 'react';
import './DualPromoSection.css';

const summerImg = '/summer-collection-placeholder.png';
const saleImg = '/sale-collection-placeholder.png';

export default function DualPromoSection() {
  return (
    <section className="dual-promo-section">
      {/* Section 1: Text left, Image right */}
      <div className="promo-row">
        <div className="promo-content-block">
          <span className="promo-overline">New in Dresses</span>
          <h2 className="promo-main-title">Elevate Your Style</h2>
          <p className="promo-desc">Discover sophisticated silhouettes and luxurious fabrics, designed for timeless style</p>
          <button type="button" className="promo-cta-btn">Discover Collection</button>
        </div>
        <div className="promo-image-block">
          <img src={summerImg} alt="Elevate Your Style" className="promo-full-img" />
        </div>
      </div>
      {/* Section 2: Image left, Text right */}
      <div className="promo-row">
        <div className="promo-image-block">
          <img src={saleImg} alt="Redefine Casual Comfort" className="promo-full-img" />
        </div>
        <div className="promo-content-block">
          <span className="promo-overline">New in T-Shirts</span>
          <h2 className="promo-main-title">Redefine Casual Comfort</h2>
          <p className="promo-desc">Experience premium fabrics and modern fits, designed for effortless everyday style</p>
          <button type="button" className="promo-cta-btn">Discover Collection</button>
        </div>
      </div>
    </section>
  );
}
