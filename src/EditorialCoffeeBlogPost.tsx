import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './editorial-coffee.css';
import './editorial-coffee-mobile.css';
import './immersive-blog-responsive.css';
import Footer from './Footer';

// Define archetype ID type for type safety
type ArchetypeId = 'mirror-drinker' | 'ceremony-keeper' | 'conversation-artist' | 'twilight-lingerer';

// Define archetype interface for type safety
interface CoffeeArchetype {
  id: ArchetypeId;
  name: string;
  quote: string;
  description: string;
  image: string;
  styleItems: Array<{
    name: string;
    image: string;
  }>;
}

// Coffee identity archetypes
const COFFEE_ARCHETYPES: CoffeeArchetype[] = [
  {
    id: 'mirror-drinker',
    name: 'The Mirror Drinker',
    quote: 'She watches the world through reflections, never directly. Her presence is felt before it is seen.',
    description: 'She sits with her back to the wall, angled just so. Her espresso arrives and she lets it cool, untouched, while she observes the room in her compact mirror. When she finally lifts the cup, she leaves a perfect crescent of red on its edge. Her bag rests open, just enough to reveal what she chooses.',
    image: '/mirrordrinker.png',
    styleItems: [
      { name: 'Oversized Sunglasses', image: '/1.png' },
      { name: 'Red Matte Lipstick', image: '/2.png' },
      { name: 'Structured Leather Bag', image: '/3.png' }
    ]
  },
  {
    id: 'ceremony-keeper',
    name: 'The Ceremony Keeper',
    quote: 'For her, each movement is ritual. Each sip, a moment preserved in memory.',
    description: 'Her fingers trace the rim of her cup three times before the first taste. She wears no watch but keeps perfect time. The silk of her scarf moves like water when she turns her head. She writes in a leather journal, each page filled with perfect script, never looking down at her hands.',
    image: '/ceremony.png',
    styleItems: [
      { name: 'Silk Neck Scarf', image: '/scarfito.png' },
      { name: 'Gold Bracelet Watch', image: '/gold.png' },
      { name: 'Leather-Bound Journal', image: '/leathernote.png' }
    ]
  },
  {
    id: 'conversation-artist',
    name: 'The Conversation Artist',
    quote: 'Her words are carefully chosen, like her accessories. Neither are ever excessive.',
    description: 'She laughs with her whole body but speaks with precision. Her cappuccino arrives with a design that she admires but never photographs. Her earrings catch light when she listens, head tilted just so. She leaves her chair exactly as she found it, but the table remembers her perfume.',
    image: '/conversation.png',
    styleItems: [
      { name: 'Statement Earrings', image: '/votht.png' },
      { name: 'Cashmere Wrap', image: '/wrap.png' },
      { name: 'Signature Perfume', image: '/fimi.png' }
    ]
  }
];

const EditorialCoffeeBlogPost: React.FC = () => {
  const [activeArchetype, setActiveArchetype] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [showStyleItemOverlay, setShowStyleItemOverlay] = useState<boolean>(false);
  const [selectedStyleItem, setSelectedStyleItem] = useState<{archetypeIndex: number, itemIndex: number} | null>(null);
  const [openingVisible, setOpeningVisible] = useState<boolean>(false);
  
  const archetypeRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Handle scroll to update active archetype and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine which archetype is currently in view
      const currentPosition = window.scrollY + window.innerHeight / 2;
      
      archetypeRefs.current.forEach((ref, index) => {
        if (ref) {
          const { top, bottom } = ref.getBoundingClientRect();
          const refTop = top + window.scrollY;
          const refBottom = bottom + window.scrollY;
          
          if (currentPosition >= refTop && currentPosition <= refBottom) {
            setActiveArchetype(index);
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Show opening caption after a delay
    const timer = setTimeout(() => {
      setOpeningVisible(true);
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  const handleStyleItemClick = (archetypeIndex: number, itemIndex: number) => {
    setSelectedStyleItem({archetypeIndex, itemIndex});
    setShowStyleItemOverlay(true);
  };
  
  const closeOverlay = () => {
    setShowStyleItemOverlay(false);
    setSelectedStyleItem(null);
  };
  
  return (
    <div className="editorial-coffee-post">
      <div className="coffee-opening-scene">
        <div className="coffee-scene-image">
          <img src="/espresso.png" alt="Coffee culture opening scene" />
        </div>
        <div className={`coffee-opening-caption ${openingVisible ? 'visible' : ''}`}>
          <p className="serif">The way she drinks her coffee tells you everything you need to know about her.</p>
        </div>
      </div>
      
      {COFFEE_ARCHETYPES.map((archetype, index) => (
        <div 
          key={archetype.id}
          ref={(el: HTMLDivElement | null) => { archetypeRefs.current[index] = el; }}
          className={`coffee-archetype ${activeArchetype === index ? 'active' : ''}`}
        >
          <div className="archetype-container">
            <div className="archetype-header">
              <h2 className="archetype-name serif">{archetype.name}</h2>
              <p className="archetype-quote serif">"{archetype.quote}"</p>
            </div>
            
            <div className="archetype-content">
              {archetype.id === 'conversation-artist' ? (
                <>
                  <div className="archetype-image-container">
                    <img 
                      src={archetype.image} 
                      alt={archetype.name} 
                      className="archetype-image"
                      style={{
                        /* transform removed to keep image fixed */
                        opacity: activeArchetype === index ? 1 : 0.7
                      }}
                    />
                  </div>
                  <div className="archetype-description">
                    <p className="sans">{archetype.description}</p>
                    <div className="style-row">
                      {archetype.styleItems.map((item, i) => (
                        <div className="style-item-container" key={i}>
                          <div className="style-circle">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <p className="style-item-label serif">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="archetype-description">
                    <p className="sans">{archetype.description}</p>
                    <div className="style-row">
                      {archetype.styleItems.map((item, i) => (
                        <div className="style-item-container" key={i}>
                          <div className="style-circle">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <p className="style-item-label serif">{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="archetype-image-container">
                    <img 
                      src={archetype.image} 
                      alt={archetype.name} 
                      className="archetype-image"
                      style={{
                        /* transform removed to keep image fixed */
                        opacity: activeArchetype === index ? 1 : 0.7
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            
            {/* Style items section removed */}
          </div>
        </div>
      ))}
      
      <div className="coffee-closing">
        <div className="closing-quote serif">
          "The ritual of coffee is as much about identity as it is about taste. It's a performance we perfect over time."
        </div>
        
        <div className="closing-cta">
          <Link to="/editorial" className="cta-link serif">Explore more editorials</Link>
        </div>
      </div>
      
      {showStyleItemOverlay && selectedStyleItem && (
        <div className="style-item-overlay" onClick={closeOverlay}>
          <div className="style-item-overlay-content" onClick={e => e.stopPropagation()}>
            <button className="close-overlay" onClick={closeOverlay}>×</button>
            <div className="overlay-image-container">
              <img 
                src={COFFEE_ARCHETYPES[selectedStyleItem.archetypeIndex].styleItems[selectedStyleItem.itemIndex].image} 
                alt={COFFEE_ARCHETYPES[selectedStyleItem.archetypeIndex].styleItems[selectedStyleItem.itemIndex].name} 
              />
            </div>
            <h3 className="overlay-item-name serif">
              {COFFEE_ARCHETYPES[selectedStyleItem.archetypeIndex].styleItems[selectedStyleItem.itemIndex].name}
            </h3>
            <p className="overlay-item-description sans">
              A signature piece for {COFFEE_ARCHETYPES[selectedStyleItem.archetypeIndex].name}.
            </p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default EditorialCoffeeBlogPost;
