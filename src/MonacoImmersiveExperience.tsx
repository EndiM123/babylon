import React, { useState } from 'react';
import './MonacoImmersiveExperience.css';

const MonacoImmersiveExperience: React.FC = () => {
  const [activeAudioLayer, setActiveAudioLayer] = useState('track');
  const [isExploring, setIsExploring] = useState(false);
  const [showVelocityEdit, setShowVelocityEdit] = useState(false);
  const [activeColorMode, setActiveColorMode] = useState('yacht-white');
  const [showEndPhrase, setShowEndPhrase] = useState(true);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Sound layer toggle handler
  const toggleAudioLayer = (layer: string) => {
    setActiveAudioLayer(layer);
    // Here we would also trigger the appropriate audio
  };

  // Velocity Edit gallery toggle
  const toggleVelocityEdit = () => {
    setShowVelocityEdit(!showVelocityEdit);
  };

  // Handle color mode change for the vertical collage
  const changeColorMode = (mode: string) => {
    setActiveColorMode(mode);
  };

  // Show end phrase on click
  const revealEndPhrase = () => {
    setShowEndPhrase(true);
    setTimeout(() => setShowEndPhrase(false), 5000); // Hide after 5 seconds
  };

  // Handle hover for text reveals
  const handleSectionHover = (section: string | null) => {
    setHoveredSection(section);
  };

  return (
    <div className="monaco-immersive-container">
      {/* Opening full-viewport motion sequence */}
      <section className="motion-sequence">
        <div className="motion-overlay">
          <img src="/formula1.png" className="background-image" alt="Formula 1 Monaco Grand Prix" />
          <div className="whisper-text">
            <p>This is not a recap. This is acceleration, dressed.</p>
          </div>
        </div>
      </section>

      {/* Vroom text between sections */}
      <div className="vroom-text-container">
        <div className="vroom-text">vruuuummm......</div>
      </div>

      {/* Images with responsive container and hover text */}
      <div className="image-container">
        {window.innerWidth >= 768 && (
          <div className="image-wrapper">
            <img 
              src="/mixi.png" 
              alt="Racing texture closeup" 
              onMouseEnter={() => handleSectionHover('texture')}
              onMouseLeave={() => handleSectionHover(null)}
            />
            {hoveredSection === 'texture' && (
              <div className="hover-text">
                <p>Carbon fiber. Kevlar. Silk. Leather. The vocabulary of velocity.</p>
              </div>
            )}
          </div>
        )}
        {window.innerWidth >= 768 ? (
          <div className="image-wrapper">
            <img 
              src="/lando.png" 
              alt="Driver in racing gear" 
              onMouseEnter={() => handleSectionHover('driver')}
              onMouseLeave={() => handleSectionHover(null)}
            />
            {hoveredSection === 'driver' && (
              <div className="hover-text">
                <p>Where protection meets projection. Racing suits as second skin.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mobile-placeholder" />
        )}
      </div>

      {/* Rotating carousel of detail shots */}
      <section className="detail-carousel">
        <div className="carousel-title">
          <span>Details in Motion</span>
        </div>
        <div className="carousel-container">
          <div className="carousel-item">
            <img src="/f1.png" alt="Perforated racing gloves" />
          </div>
          <div className="carousel-item">
            <img src="/f2.png" alt="Gold watch reflection" />
          </div>
          <div className="carousel-item">
            <img src="/f3.png" alt="Racing grip closeup" />
          </div>
          <div className="carousel-item">
            <img src="/f4.png" alt="Visor reflection" />
          </div>
        </div>
      </section>

      {/* Dark mode interface with zoomable layers */}
      <section className="dark-interface">
        <div className="map-title">
          <h2>RACE MAP</h2>
        </div>
        <div className="monaco-map">
          <div className="map-container">
            <img src="/map.png" alt="Monaco circuit map" />
          </div>
        </div>
      </section>

      {/* Full-bleed vertical collage */}
      <section className="vertical-collage">
        <div className={`collage-container ${activeColorMode}`}>
          <div className="collage-controls">
            <button 
              className={`color-toggle ${activeColorMode === 'yacht-white' ? 'active' : ''}`}
              onClick={() => changeColorMode('yacht-white')}
            >
              Yacht White
            </button>
            <button 
              className={`color-toggle ${activeColorMode === 'grandstand-red' ? 'active' : ''}`}
              onClick={() => changeColorMode('grandstand-red')}
            >
              Grandstand Red
            </button>
            <button 
              className={`color-toggle ${activeColorMode === 'pit-chrome' ? 'active' : ''}`}
              onClick={() => changeColorMode('pit-chrome')}
            >
              Pit Chrome
            </button>
          </div>
          <div className="collage-images">
            <div className="collage-image">
              <img src="/sku1.png " alt="Fashion collage piece" />
            </div>
            <div className="collage-image">
              <img src="/sku2.png" alt="Fashion collage piece" />
            </div>
            <div className="collage-image">
              <img src="/sku3.png" alt="Fashion collage piece" />
            </div>
            <div className="collage-image">
              <img src="/sku4.png" alt="Fashion collage piece" />
            </div>
          </div>
          <div className="collage-caption">
            {activeColorMode === 'yacht-white' && (
              <p>Studied nonchalance. Invisible luxury that speaks in whispers.</p>
            )}
            {activeColorMode === 'grandstand-red' && (
              <p>Bold statements. Team colors reimagined as personal manifestos.</p>
            )}
            {activeColorMode === 'pit-chrome' && (
              <p>Technical precision. Function elevated to art through material innovation.</p>
            )}
          </div>
        </div>
      </section>

      {/* Ending sequence */}
      <section className="ending-sequence">
        <div className="tire-marks"></div>
        <div className="heat-shimmer"></div>
        <div className="end-phrase">
          <p>Maybe fashion isn't walking anymore. It's cornering.</p>
        </div>
      </section>

      {/* Hidden call to action */}
      <div className="hidden-cta" onClick={toggleVelocityEdit}>
        <div className="cta-symbol"></div>
      </div>

      {/* The Velocity Edit gallery */}
      {showVelocityEdit && (
        <div className="velocity-edit">
          <div className="velocity-header">
            <h2>The Velocity Edit</h2>
            <button className="close-button" onClick={toggleVelocityEdit}>×</button>
          </div>
          <div className="emotion-filters">
            <button className="emotion-filter">Friction</button>
            <button className="emotion-filter">Fuel</button>
            <button className="emotion-filter">Weightlessness</button>
          </div>
          <div className="velocity-grid">
            <div className="velocity-item">
              <img src="/f11.png" alt="Fashion item inspired by racing" />
              <div className="item-details">
                <h3>Carbon Silk Drape</h3>
                <p>Inspired by the aerodynamic flow of F1 bodywork</p>
              </div>
            </div>
            <div className="velocity-item">
              <img src="/f22.png" alt="Fashion item inspired by racing" />
              <div className="item-details">
                <h3>Titanium Weave Jacket</h3>
                <p>Structural elements echo suspension geometry</p>
              </div>
            </div>
            <div className="velocity-item">
              <img src="/f33.png" alt="Fashion item inspired by racing" />
              <div className="item-details">
                <h3>Ceramic Accent Piece</h3>
                <p>Heat-resistant materials from brake technology</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonacoImmersiveExperience;
