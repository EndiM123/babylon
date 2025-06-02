import React, { useRef, useEffect } from 'react';
import '../ProductTestimonials.css';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

const ProductTestimonials: React.FC = () => {
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Sample testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "The quality of this piece exceeded my expectations. The fabric feels luxurious against the skin.",
      author: "Sophia K."
    },
    {
      id: 2,
      quote: "Perfect fit and the color is exactly as shown. I've received so many compliments!",
      author: "James T."
    }
  ];

  // Determine order for mobile
  let orderedTestimonials = testimonials;
  if (typeof window !== 'undefined' && window.innerWidth <= 700) {
    // Always Sophia K. first, James T. second
    orderedTestimonials = [
      testimonials.find(t => t.author === 'Sophia K.')!,
      testimonials.find(t => t.author === 'James T.')!
    ];
  }

  useEffect(() => {
    // Set container to visible immediately
    const container = document.querySelector('.product-testimonials-container');
    if (container) {
      container.classList.add('visible');
    }

    // Add visible class to all testimonial cards with a slight delay
    testimonialRefs.current.forEach((ref, index) => {
      if (ref) {
        setTimeout(() => {
          ref.classList.add('visible');
        }, index * 150); // Stagger the animations
      }
    });
  }, []);

  return (
    <div className="product-testimonials-container">
      <h2 className="testimonials-title">WHAT OUR CUSTOMERS SAID</h2>
      <div className="testimonials-horizontal-wrapper" style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '1rem'}}>
        {orderedTestimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className="testimonial-card"
            style={{flex: '1 0 45%', display: 'inline-block'}}
            ref={(el) => { testimonialRefs.current[index] = el; }}
          >
            <div className="star-rating">
              <span>★★★★★</span>
            </div>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <p className="testimonial-author">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTestimonials;
