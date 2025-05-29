import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './immersive-blog-responsive.css';
import './ColorPsychology.css';

// Color Psychology Blog Post
const COLOR_SECTIONS = [
  {
    color: 'red',
    title: 'Red: The Statement Maker',
    psychology: 'Red commands attention, signaling urgency, passion, and bold confidence.',
    perception: 'Others see you as assertive, powerful, and unafraid to take up space.',
    mood: 'Wearing red activates energy, courage, and a sense of purpose.',
    scenario: 'She walked into the café in that silk red wrap dress—and suddenly the room felt smaller. Warmer. Hungrier. Conversations paused, if only for a breath. Red never asks permission to be noticed.',
    product: 'Our Scarlet Silk Wrap Dress, €190 – for when you want to be remembered',
    image: '/red-moodboard.jpg'
  },
  {
    color: 'orange',
    title: 'Orange: The Mood Elevator',
    psychology: 'Orange radiates warmth, creativity, and spontaneous energy.',
    perception: 'Others perceive you as approachable, enthusiastic, and full of ideas.',
    mood: 'Wearing orange stimulates conversation, playfulness, and creative thinking.',
    scenario: 'The terracotta linen set made her feel like the embodiment of a sunset—impossible to ignore, yet soft enough to welcome anyone into her orbit. Her ideas flowed more freely, her laughter came more easily.',
    product: 'Our Terracotta Linen Two-Piece, €175 – when you need to ignite your creative spark',
    image: '/orange-moodboard.jpg'
  },
  {
    color: 'blue',
    title: 'Blue: The Quiet Strength',
    psychology: 'Blue evokes calm, reliability, and thoughtful leadership.',
    perception: 'Others trust you instinctively, seeing competence and depth.',
    mood: 'Wearing blue centers you, bringing clarity and composed confidence.',
    scenario: 'In her cobalt silk blouse, she didn\'t need to raise her voice to command the meeting. The color spoke of oceans and skies—things that endure. Her words carried weight not because they were loud, but because they were delivered with such steady certainty.',
    product: 'Our Cobalt Silk Blouse, €120 – for when you need to be both heard and trusted',
    image: '/blue-moodboard.jpg'
  },
  {
    color: 'green',
    title: 'Green: The Grounded Muse',
    psychology: 'Green symbolizes balance, renewal, and natural elegance.',
    perception: 'Others see you as balanced, thoughtful, and authentically yourself.',
    mood: 'Wearing green connects you to nature\'s wisdom and calm resilience.',
    scenario: 'The sage linen dress moved with her like a second skin. She felt rooted yet light, as if she\'d found the perfect balance between being present and being free. In a world of noise, green whispers secrets worth hearing.',
    product: 'Our Sage Linen Maxi Dress, €160 – for when you need to feel both centered and free',
    image: '/green-moodboard.jpg'
  },
  {
    color: 'yellow',
    title: 'Yellow: The Extroverted Soul',
    psychology: 'Yellow captures optimism, visibility, and joyful presence.',
    perception: 'Others are drawn to your warmth, seeing you as approachable and positive.',
    mood: 'Wearing yellow lifts your spirits, encouraging openness and connection.',
    scenario: 'She chose the buttercup silk camisole on the morning she needed courage disguised as joy. With each compliment came a conversation, with each conversation a connection. Yellow doesn\'t just reflect light—it generates it from within.',
    product: 'Our Buttercup Silk Camisole, €95 – when you need to both feel and spread joy',
    image: '/yellow-moodboard.jpg'
  }
];

export default function ColorPsychologyBlogPost() {
  const [activeQuizStep, setActiveQuizStep] = useState(0);
  const [quizResults, setQuizResults] = useState<string | null>(null);
  
  // Simple quiz logic
  const handleQuizAnswer = (colorType: string) => {
    setQuizResults(colorType);
    setActiveQuizStep(5); // Move to results
  };
  
  const resetQuiz = () => {
    setActiveQuizStep(0);
    setQuizResults(null);
  };

  return (
    <section className="blog-post-section immersive-blog-post">
      <nav className="blog-breadcrumbs">
        <Link to="/" className="blog-breadcrumb">Home</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <span className="blog-breadcrumb-current">The Color of Identity</span>
      </nav>
      
      {/* Hero Section */}
      <div className="immersive-hero-wrap">
        <img 
          src="/color-psychology-hero.jpg" 
          alt="Woman deciding between red and green clothing" 
          className="immersive-hero-image"
        />
        <video 
          src="/ngjyra1.mp4"
          className="immersive-hero-video"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
        />
        <div className="immersive-hero-overlay"></div>
        <div className="immersive-hero-meta">
          <div className="immersive-hero-category">Style Psychology</div>
          <h1 className="immersive-hero-title">The Color of Identity: How Your Palette Shapes Your Presence</h1>
          <div className="immersive-hero-date">May 26, 2025</div>
        </div>
      </div>
      
      {/* Cinematic Opener - Direct flow without containers */}
      <p className="immersive-intro">
        She stands before the mirror, two options held against her body—a crimson silk blouse and a sage green linen set. 
        The fit of both is impeccable, but her hesitation isn't about silhouette. It's about who she'll become when she walks out the door. 
        The red promises power, demands attention. The green offers balance, suggests wisdom. Her fingers hover between the two as she considers not just an outfit, but a temporary identity.
      </p>
      <div className="immersive-divider"></div>
      
      <p className="color-intro-text">
        What do the colors we wear say about who we are—or who we want to be? This isn't just a question of aesthetics, but of psychology, communication, and personal narrative. The palette we choose doesn't just complement our skin tone; it broadcasts our emotional state, shapes others' perceptions, and subtly influences our own behavior.
      </p>
      <p className="color-intro-text">
        Think of your wardrobe not as a collection of clothes, but as an emotional toolkit—where color becomes not a choice, but a language.
      </p>
          
      {/* Color Sections - Flowing Layout */}
      
      {/* Red and Orange side by side */}
      <div className="colors-row">
        <div className="color-column red-column">
          <h2 className="color-title">{COLOR_SECTIONS[0].title}</h2>
          <div className="color-psychology">
            <p>{COLOR_SECTIONS[0].psychology}</p>
            <p className="color-perception">{COLOR_SECTIONS[0].perception}</p>
          </div>
          <p className="scenario-text">"{COLOR_SECTIONS[0].scenario}"</p>
          <p className="color-product">{COLOR_SECTIONS[0].product}</p>
        </div>
        
        <div className="color-column orange-column">
          <h2 className="color-title">{COLOR_SECTIONS[1].title}</h2>
          <div className="color-psychology">
            <p>{COLOR_SECTIONS[1].psychology}</p>
            <p className="color-perception">{COLOR_SECTIONS[1].perception}</p>
          </div>
          <p className="scenario-text">"{COLOR_SECTIONS[1].scenario}"</p>
          <p className="color-product">{COLOR_SECTIONS[1].product}</p>
        </div>
      </div>
      
      {/* Interesting fact or image between color pairs */}
      <blockquote className="immersive-quote">
        Color is not just what we see—it's what we feel. The right hue can transform not just an outfit, but a mood, a room, a day.
      </blockquote>
      <img src="/ngjyra2.png" alt="Color wheel showing emotional connections" className="interlude-image" />
      
      {/* Blue and Green side by side */}
      <div className="colors-row">
        <div className="color-column blue-column">
          <h2 className="color-title">{COLOR_SECTIONS[2].title}</h2>
          <div className="color-psychology">
            <p>{COLOR_SECTIONS[2].psychology}</p>
            <p className="color-perception">{COLOR_SECTIONS[2].perception}</p>
          </div>
          <p className="scenario-text">"{COLOR_SECTIONS[2].scenario}"</p>
          <p className="color-product">{COLOR_SECTIONS[2].product}</p>
        </div>
        
        <div className="color-column green-column">
          <h2 className="color-title">{COLOR_SECTIONS[3].title}</h2>
          <div className="color-psychology">
            <p>{COLOR_SECTIONS[3].psychology}</p>
            <p className="color-perception">{COLOR_SECTIONS[3].perception}</p>
          </div>
          <p className="scenario-text">"{COLOR_SECTIONS[3].scenario}"</p>
          <p className="color-product">{COLOR_SECTIONS[3].product}</p>
        </div>
      </div>
      
      {/* Another interesting fact or visual element */}
      <div className="color-fact">
        <h3>Did you know?</h3>
        <p>Studies show that wearing a color for just 20 minutes can measurably alter your hormone levels and brain activity. What we wear doesn't just change how others see us—it literally changes our biology.</p>
      </div>
      
      {/* Yellow on its own */}
      <div className="color-single yellow-single">
        <h2 className="color-title">{COLOR_SECTIONS[4].title}</h2>
        <div className="color-psychology">
          <p>{COLOR_SECTIONS[4].psychology}</p>
          <p className="color-perception">{COLOR_SECTIONS[4].perception}</p>
        </div>
        <p className="scenario-text">"{COLOR_SECTIONS[4].scenario}"</p>
        <p className="color-product">{COLOR_SECTIONS[4].product}</p>
        <img src={COLOR_SECTIONS[4].image} alt="Yellow fashion moodboard" className="single-color-image" />
      </div>
      
      {/* Emotional Layer */}
      <h2 className="identity-title">Why Color Is Identity</h2>
      <p className="identity-text">
        Color is wearable emotion. We choose yellow when we need hope. We wear blue to build trust. We avoid red when we want to disappear. Our closets are a coded autobiography—each hue a chapter in our ongoing story.
      </p>
      <p className="identity-text">
        This isn't merely aesthetic preference; it's emotional strategy. The businesswoman who wears a touch of red to negotiations isn't just making a style choice—she's arming herself with visual confidence. The writer who wraps himself in deep blue isn't just coordinating an outfit—he's creating a cocoon of calm focus.
      </p>
      <p className="identity-text">
        Style is how we decorate our bodies; color is how we declare our energy.
      </p>
      <blockquote className="immersive-quote">
        We never wear red by accident. Every color choice is a silent announcement of how we wish to be received by the world.
      </blockquote>
          
      {/* Quiz Element */}
      <h2 className="quiz-title">What's Your Color Signature?</h2>
      <p className="quiz-intro">Discover which color energy dominates your personal style and emotional needs:</p>
      
      {activeQuizStep === 0 && (
        <div className="quiz-question">
          <h3>When you need to feel most confident, you reach for:</h3>
          <div className="quiz-options">
            <button onClick={() => setActiveQuizStep(1)}>Something bold and attention-grabbing</button>
            <button onClick={() => setActiveQuizStep(1)}>Something elegant and understated</button>
            <button onClick={() => setActiveQuizStep(1)}>Something comfortable and familiar</button>
          </div>
        </div>
      )}
      
      {activeQuizStep === 1 && (
        <div className="quiz-question">
          <h3>In social situations, you prefer to be:</h3>
          <div className="quiz-options">
            <button onClick={() => setActiveQuizStep(2)}>The center of attention</button>
            <button onClick={() => setActiveQuizStep(2)}>Part of meaningful conversations</button>
            <button onClick={() => setActiveQuizStep(2)}>A calm, observing presence</button>
          </div>
        </div>
      )}
      
      {activeQuizStep === 2 && (
        <div className="quiz-question">
          <h3>Your ideal environment makes you feel:</h3>
          <div className="quiz-options">
            <button onClick={() => setActiveQuizStep(3)}>Energized and inspired</button>
            <button onClick={() => setActiveQuizStep(3)}>Peaceful and grounded</button>
            <button onClick={() => setActiveQuizStep(3)}>Safe and comfortable</button>
          </div>
        </div>
      )}
      
      {activeQuizStep === 3 && (
        <div className="quiz-question">
          <h3>Choose your color energy:</h3>
          <div className="quiz-color-options">
            <button 
              className="color-option red" 
              onClick={() => handleQuizAnswer('red')}
              aria-label="Red"
            ></button>
            <button 
              className="color-option orange" 
              onClick={() => handleQuizAnswer('orange')}
              aria-label="Orange"
            ></button>
            <button 
              className="color-option blue" 
              onClick={() => handleQuizAnswer('blue')}
              aria-label="Blue"
            ></button>
            <button 
              className="color-option green" 
              onClick={() => handleQuizAnswer('green')}
              aria-label="Green"
            ></button>
            <button 
              className="color-option yellow" 
              onClick={() => handleQuizAnswer('yellow')}
              aria-label="Yellow"
            ></button>
          </div>
        </div>
      )}
      
      {activeQuizStep === 5 && quizResults && (
        <div className="quiz-results">
          <h3>Your Color Signature: {quizResults.charAt(0).toUpperCase() + quizResults.slice(1)}</h3>
          <p>
            {COLOR_SECTIONS.find(s => s.color === quizResults)?.psychology}<br/>
            {COLOR_SECTIONS.find(s => s.color === quizResults)?.mood}
          </p>
          <p className="quiz-product-recommendation">
            Try: {COLOR_SECTIONS.find(s => s.color === quizResults)?.product}
          </p>
          <button className="reset-quiz" onClick={resetQuiz}>Take Quiz Again</button>
        </div>
      )}
      
      {/* Call to Action */}
      <h2 className="cta-title">Wear Your Mood</h2>
      <p className="cta-text">
        Color isn't just seen—it's felt. Wear what you want the world to know about you. Your wardrobe is more than fabric; it's your visual voice in a crowded world.
      </p>
      <Link to="/shop" className="color-shop-link">Explore Our Color Your Identity Collection →</Link>
    </section>
  );
}
