import React from 'react';
import './BrandValues.css';

const BrandValues = () => {
  // Define the exact colors for the diamonds
  const colors = [
    '#1E3932', // Dark green
    '#3D2F4C', // Purple
    '#1E3932'   // Dark green
  ] as const;

  // Function to get the style with specified color
  const getIconStyle = (color: string) => ({
    '--diamond-color': color,
    '--diamond-hover': color === '#1E3932' ? '#2A4B42' : '#4D405C' // Slightly lighter on hover
  } as React.CSSProperties);

  return (
    <section className="brand-values-section">
      <div className="brand-values-container">
        <h2 className="brand-values-title">Made in Prishtina, Kosovo</h2>
        
        <div className="brand-values-grid">
          {/* Column 1 - Dark Green */}
          <div className="brand-value-item">
            <div className="brand-value-icon">
              <div 
                className="brand-value-icon-square" 
                style={getIconStyle(colors[0])} 
                data-color="dark-green"
              />
            </div>
            <h3 className="brand-value-heading">Free Shipping</h3>
            <p className="brand-value-description">Enjoy free shipping on all orders—no minimum required</p>
          </div>
          
          {/* Column 2 - Purple */}
          <div className="brand-value-item">
            <div className="brand-value-icon">
              <div 
                className="brand-value-icon-square" 
                style={getIconStyle(colors[1])} 
                data-color="purple"
              />
            </div>
            <h3 className="brand-value-heading">25 Years of Tradition</h3>
            <p className="brand-value-description">Established legacy of craftsmanship and design since 1999</p>
          </div>
          
          {/* Column 3 - Dark Green */}
          <div className="brand-value-item">
            <div className="brand-value-icon">
              <div 
                className="brand-value-icon-square" 
                style={getIconStyle(colors[2])} 
                data-color="dark-green"
              />
            </div>
            <h3 className="brand-value-heading">Trend-Curated Fashion</h3>
            <p className="brand-value-description">Every piece in our collection reflects the latest global styles</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandValues;
