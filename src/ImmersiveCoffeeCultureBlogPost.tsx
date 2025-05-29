import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './immersive-coffee.css';
import './immersive-blog-responsive.css';
import Footer from './Footer';

// Coffee moments data
const COFFEE_MOMENTS = [
  {
    id: 'morning-statement',
    title: 'The Morning Statement',
    description: 'A solo espresso in sunglasses, silk scarf, and a structured bag on the table. The first coffee is never about caffeine—it\'s about intention.',
    poeticCaption: 'The day begins not with sunrise, but with the first sip.',
    image: '/espresso.png',
    styleItem: {
      name: 'Structured Leather Tote',
      note: 'For the woman who carries possibilities',
      image: '/leather-tote.png'
    }
  },
  {
    id: 'midday-interlude',
    title: 'The Midday Interlude',
    description: 'A cappuccino in linen, conversation in gold hoops, notebooks left open. Midday light catches on jewelry, on porcelain, on ideas exchanged.',
    poeticCaption: 'Between appointments, we find ourselves.',
    image: '/coffee-midday.png',
    styleItem: {
      name: 'Gold Hoop Earrings',
      note: 'The punctuation of every sentence spoken',
      image: '/gold-hoops.png'
    }
  },
  {
    id: 'post-work-pause',
    title: 'The Post-Work Pause',
    description: 'Heels kicked off, coffee cooling, blazer draped on the chair, laughter soft. The macchiato that marks the transition from professional to personal.',
    poeticCaption: 'In the space between work and evening, we exhale.',
    image: '/coffee-afternoon.png',
    styleItem: {
      name: 'Tailored Linen Blazer',
      note: 'Structure that remembers to breathe',
      image: '/linen-blazer.png'
    }
  },
  {
    id: 'evening-ritual',
    title: 'The Evening Espresso Martini',
    description: 'A change of lipstick, candlelight on skin, espresso glass glinting near a clutch. Night transforms coffee into celebration, into connection.',
    poeticCaption: 'As daylight fades, intention crystallizes.',
    image: '/coffee-evening.png',
    styleItem: {
      name: 'Satin Evening Clutch',
      note: 'What you carry when the night holds everything else',
      image: '/evening-clutch.png'
    }
  }
];

export default function ImmersiveCoffeeCultureBlogPost() {
  const [activeMoment, setActiveMoment] = useState(0);
  // Using _ to indicate intentionally unused variable
  const [_, setScrollPosition] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const momentsRef = useRef<HTMLDivElement>(null);
  
  // Handle initial fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active moment based on scroll position
      if (momentsRef.current) {
        const momentsTop = momentsRef.current.offsetTop;
        const momentsHeight = momentsRef.current.offsetHeight;
        const momentHeight = momentsHeight / COFFEE_MOMENTS.length;
        
        const relativePosition = window.scrollY - momentsTop;
        if (relativePosition > 0) {
          const newActiveMoment = Math.min(
            Math.floor(relativePosition / momentHeight),
            COFFEE_MOMENTS.length - 1
          );
          setActiveMoment(newActiveMoment);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="immersive-coffee-post">
        <nav className="blog-breadcrumbs">
          <Link to="/" className="blog-breadcrumb">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <span className="blog-breadcrumb-current">Espresso & Elegance</span>
        </nav>
        
        {/* Opening Scene */}
        <div className="coffee-opening-scene">
          <div className="coffee-scene-image">
            <img src="/coffee-opening.png" alt="Morning coffee scene" />
          </div>
          <div className={`coffee-opening-caption ${fadeIn ? 'visible' : ''}`}>
            <p className="serif">In Kosovo, we don't just drink coffee. We arrive with it.</p>
          </div>
        </div>
        
        {/* Introduction */}
        <div className="coffee-intro">
          <p className="serif">The ritual begins with the first morning light and lingers until stars appear. Coffee in Kosovo is not consumption—it\'s a performance, a statement, a language of presence. Each cup marks a moment in the day\'s unfolding story, each setting a stage for self-expression.</p>
        </div>
        
        {/* Coffee Moments Navigation */}
        <div className="coffee-moments-nav">
          {COFFEE_MOMENTS.map((moment, index) => (
            <button 
              key={moment.id}
              className={`moment-nav-item ${activeMoment === index ? 'active' : ''}`}
              onClick={() => {
                setActiveMoment(index);
                const momentElement = document.getElementById(moment.id);
                if (momentElement) {
                  momentElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {moment.title}
            </button>
          ))}
        </div>
        
        {/* Coffee Moments Content */}
        <div className="coffee-moments" ref={momentsRef}>
          {COFFEE_MOMENTS.map((moment, index) => (
            <div 
              id={moment.id} 
              key={moment.id} 
              className={`coffee-moment ${activeMoment === index ? 'active' : ''}`}
            >
              <div className="moment-image-container">
                <img src={moment.image} alt={moment.title} className="moment-image" />
                <div className="moment-poetic-caption serif">"{moment.poeticCaption}"</div>
              </div>
              
              <div className="moment-content">
                <h2 className="moment-title serif">{moment.title}</h2>
                <p className="moment-description serif">{moment.description}</p>
                
                <div className="moment-style-item">
                  <div className="style-item-image-container">
                    <img src={moment.styleItem.image} alt={moment.styleItem.name} className="style-item-image" />
                  </div>
                  <div className="style-item-details">
                    <h3 className="style-item-name serif">{moment.styleItem.name}</h3>
                    <p className="style-item-note sans">{moment.styleItem.note}</p>
                  </div>
                </div>
                
                <div className="moment-transition serif">
                  {index === 0 ? 'Your table is waiting' : 
                   index === 1 ? 'Style is in the pour' : 
                   index === 2 ? 'Every detail speaks' : 
                   'The night awaits your presence'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Closing Reflection */}
        <div className="coffee-closing">
          <div className="closing-image-container">
            <img src="/coffee-closing.png" alt="Evening coffee scene" className="closing-image" />
          </div>
          <p className="closing-text serif">From morning light to evening shadow, Kosovo's coffee ritual is our daily exhibition of self. Each cup, each gesture, each carefully chosen accessory—all part of a cultural performance that turns the ordinary into art. In the space between sips, we find our reflection.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
