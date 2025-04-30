import React from 'react';
import './DualPromoSection.css';

const summerImg = '/summer-collection-placeholder.png';
const saleImg = '/sale-collection-placeholder.png';

export default function DualPromoSection() {
  return (
    <section className="dual-promo-section">
      {/* Section 1: Text left, Image right */}
      <div className="promo-row">
        <div className="promo-content-block" style={{ fontFamily: "'Wolmer', 'Inter', Arial, sans-serif" }}>
          <span className="promo-overline">Summer Collection</span>
          <h2 className="promo-main-title">Bask in Summer Elegance</h2>
          <p className="promo-desc">Step into the new season with sun-drenched colors, breezy silhouettes, and effortless style. Our Summer Collection blends modern luxury with a fresh, editorial spirit—perfect for every sunlit moment.</p>
          <button type="button" className="promo-cta-btn">Shop Summer</button>
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
        <div className="promo-content-block" style={{ fontFamily: "'Wolmer', 'Inter', Arial, sans-serif" }}>
          <span className="promo-overline">Seasonal Sale</span>
          <h2 className="promo-main-title">Up to 40% Off Summer Icons</h2>
          <p className="promo-desc">Refresh your wardrobe with exclusive offers on our most-loved summer pieces. Limited-time savings on signature styles, effortless essentials, and bold accessories—shop the edit before it’s gone.</p>
          <button type="button" className="promo-cta-btn">Shop Sale</button>
        </div>
      </div>
    </section>
  );
}
