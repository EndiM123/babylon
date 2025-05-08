import React from 'react';
import './DualPromoSection.css';
import FlowingWordTransition from './FlowingWordTransition';

// Removed unused PetalRain import

const summerImg = '/summer-collection-placeholder.png';
const saleImg = '/sale-collection-placeholder.png';

export default function DualPromoSection() {
  return (
    <section className="dual-promo-section" data-testid="dual-promo-section">
      {/* Section 1: Text left, Image right */}
      <div className="promo-row DualPromoSection--Summer">
        <div className="promo-content-block" style={{ fontFamily: "'Wolmer', 'Inter', Arial, sans-serif" }}>
          <span className="promo-overline">Summer Collection</span>
          <h2 className="promo-main-title">Bask in Summer Elegance</h2>
          <p className="promo-desc">Step into the new season with sun-drenched colors, breezy silhouettes, and effortless style. Our Summer Collection blends modern luxury with a fresh, editorial spirit—perfect for every sunlit moment.</p>
          <button type="button" className="promo-cta-btn">Shop Summer</button>
        </div>
        <div className="promo-image-block" data-component-name="DualPromoSection">
          <img alt="Elevate Your Style" className="promo-full-img" src={summerImg} data-component-name="DualPromoSection" />
        </div>
      </div>

      {/* Glitter video band directly between the two promo containers */}
      <div className="glitter-video-word-wrap" data-component-name="DualPromoSection" style={{position: 'relative', width: '100%', height: '100%'}}>
        <img
          src="/glitter.gif"
          alt="Shimmering glitter animation"
          style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
        />
        <div className="glitter-word-transition-overlay" data-component-name="DualPromoSection" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
          <FlowingWordTransition />
        </div>
      </div>

      <div className="promo-row DualPromoSection--Sale">
        <div className="promo-image-block" data-component-name="DualPromoSection" style={{}}>
          <img alt="Redefine Casual Comfort" className="promo-full-img" src={saleImg} data-component-name="DualPromoSection" />
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
