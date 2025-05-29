import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './immersive-rooftop.css';
import './immersive-blog-responsive.css';
import Footer from './Footer';

// Timeline phases content
const TIMELINE_PHASES = [
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    quote: 'The moment between anticipation and arrival',
    description: 'She steps onto stone tiles still warm from the day\'s sun. The city stretches gold beneath her - a landscape of light and possibility. Her dress moves like liquid, catching the last direct rays. The fabric remembers its freedom in every step.',
    visualNote: 'Flowing fabrics that hold the light, open silhouettes that breathe with the evening air',
    lookItems: [
      {
        name: 'Limoncello Spritz',
        emotion: 'Liquid sunlight in a glass, catching the day\'s last glow',
        image: '/limoncello.png'
      },
      {
        name: 'Amber-Tinted Sunglasses',
        emotion: 'The world is more beautiful through intention\'s filter',
        image: '/syzi.png'
      },
      {
        name: 'Nude Strappy Heels',
        emotion: 'Elevation made visible, the architecture of arrival',
        image: '/shtiklla.png'
      }
    ]
  },
  {
    id: 'blue-hour',
    title: 'Blue Hour',
    quote: 'Between daylight and darkness, we find our complexity',
    description: 'The sky deepens to indigo, the city lights begin their slow reveal. Her silhouette becomes more defined against the darkening horizon. The structured blazer frames her shoulders - architecture responding to architecture. Conversations deepen as the light fades. Her jewelry catches the first stars.',
    visualNote: 'Structured silhouettes that create presence, fabrics that hold their form as night falls',
    lookItems: [
      {
        name: 'Bronzed Highlighter',
        emotion: 'Capturing light and holding it against your skin',
        image: '/highlighter.png'
      },
      {
        name: 'Gold Hoop Earrings',
        emotion: 'Perfect circles that frame the face like punctuation',
        image: '/earrings.png'
      },
      {
        name: 'Silk Scarf',
        emotion: 'A whisper of color that moves with every gesture',
        image: '/scarf.png'
      }
    ]
  },
  {
    id: 'midnight',
    title: 'Midnight',
    quote: 'When time suspends and only presence remains',
    description: 'The night has settled into its deepest hour. City lights mirror the stars. Her silk camisole reflects both - a constellation close to skin. Movement becomes more intentional, more fluid. The minimal gold bracelet catches light only when she gestures, a perfect accent to midnight conversations. This is fashion as memory - what remains when everything unnecessary has been stripped away.',
    visualNote: 'Minimalism that speaks volumes, fabrics that move like second skin',
    lookItems: [
      {
        name: 'Classic Red Lipstick',
        emotion: 'The most ancient language, spoken without words',
        image: '/lipstick.png'
      },
      {
        name: 'Elegant Intriguing Perfume',
        emotion: 'Invisible aroma that follows you like memory',
        image: '/perfume.png'
      },
      {
        name: 'Black Satin Micro Clutch',
        emotion: 'What you carry when you need nothing but yourself',
        image: '/clutch.png'
      }
    ]
  }
];

export default function ImmersiveRooftopBlogPost() {
  const [activePhase, setActivePhase] = useState(0);
  // Using _ to indicate intentionally unused variable
  const [_, setScrollPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll position for potential future use
      setScrollPosition(window.scrollY);
      
      // Determine active phase based on scroll position
      if (timelineRef.current) {
        const timelineTop = timelineRef.current.offsetTop;
        const timelineHeight = timelineRef.current.offsetHeight;
        const phaseHeight = timelineHeight / TIMELINE_PHASES.length;
        
        const relativePosition = window.scrollY - timelineTop;
        if (relativePosition > 0) {
          const newActivePhase = Math.min(
            Math.floor(relativePosition / phaseHeight),
            TIMELINE_PHASES.length - 1
          );
          setActivePhase(newActivePhase);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="immersive-rooftop-post">
        <nav className="blog-breadcrumbs">
          <Link to="/" className="blog-breadcrumb">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <span className="blog-breadcrumb-current">Skyline Statements</span>
        </nav>
        
        {/* Immersive Hero Section */}
        <div className="rooftop-immersive-hero">
          <img
            className="rooftop-hero-video" 
            src="/rooftoplanding.png"
            alt="Rooftop Hero"
          />
          <div className="rooftop-hero-overlay"></div>
          <div className="rooftop-hero-content">
            <div className="rooftop-hero-date serif">May 27, 2025</div>
            <h1 className="rooftop-hero-title serif">Skyline Statements</h1>
            <div className="rooftop-hero-subtitle sans">Where Style Ascends</div>
          </div>
        </div>
        
        {/* Cinematic Intro */}
        <div className="rooftop-cinematic-intro">
          <p className="serif">She steps into the elevator, floor numbers ascending like heartbeats. The doors open to reveal not just a rooftop, but a threshold - between earth and sky, between the self she was on the street and the self that emerges in elevation. The city unfolds beneath her like a promise.</p>
        </div>
        
        {/* Timeline Navigation */}
        <div className="rooftop-timeline-nav">
          {TIMELINE_PHASES.map((phase, index) => (
            <button 
              key={phase.id}
              className={`timeline-nav-item ${activePhase === index ? 'active' : ''}`}
              onClick={() => {
                setActivePhase(index);
                const phaseElement = document.getElementById(phase.id);
                if (phaseElement) {
                  phaseElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {phase.title}
            </button>
          ))}
        </div>
        
        {/* Timeline Content */}
        <div className="rooftop-timeline" ref={timelineRef}>
          {TIMELINE_PHASES.map((phase, index) => (
            <div 
              id={phase.id} 
              key={phase.id} 
              className={`rooftop-phase ${activePhase === index ? 'active' : ''}`}
            >
              <div className="phase-quote serif">"{phase.quote}"</div>
              
              <div className="phase-content">
                <h2 className="phase-title serif">{phase.title}</h2>
                <p className="phase-description serif">{phase.description}</p>
                <div className="phase-visual-note sans">{phase.visualNote}</div>
              </div>
              
              {/* Style Vignette */}
              <div className="phase-style-vignette">
                {phase.lookItems.map((item, i) => (
                  <div className="vignette-item" key={i}>
                    <div className="vignette-image-container">
                      <img src={item.image} alt={item.name} className="vignette-image" />
                    </div>
                    <h3 className="vignette-title serif">{item.name}</h3>
                    <p className="vignette-emotion sans">{item.emotion}</p>
                  </div>
                ))}
              </div>
              
              <div className="phase-transition serif">
                Your skyline look begins here
              </div>
            </div>
          ))}
        </div>
        
        {/* Atmospheric Closing */}
        <div className="rooftop-closing">
          <div className="closing-image-container">
            <img src="/rooftop1.png" alt="Rooftop silhouette at night" className="closing-image" />
          </div>
          <p className="closing-text serif">The night eventually ends, but the elevation remains—in memory, in photographs, in the way fabric remembers the body. Above the city, we become the skyline.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
