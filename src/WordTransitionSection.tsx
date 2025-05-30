import React, { useRef, useEffect, useState } from 'react';
import './WordTransitionSection.css';

const useResponsiveVideo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !videoRef.current) return;

    const video = videoRef.current;
    video.muted = true;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay was prevented, will play on interaction');
      });
    }
  }, [isMobile]);

  return { isMobile, videoRef };
};

export default function WordTransitionSection() {
  const { isMobile, videoRef } = useResponsiveVideo();
  
  return (
    <section className="word-transition-section">
      <div className="media-container">
        {isMobile ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            controlsList="nodownload nofullscreen noplaybackrate"
            className="background-media"
          >
            <source src="/endi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img 
            src="/endi.png" 
            alt="Babylon background" 
            className="background-media"
            loading="eager"
          />
        )}
        
        <div className="centered-title">
          <span className="word-transition-main">BABYLON</span>
          <p className="subtitle">Shaping the way the city looks since 2012</p>
        </div>
      </div>
    </section>
  );
}