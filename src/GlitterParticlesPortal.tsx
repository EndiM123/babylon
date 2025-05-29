import React from 'react';
import ReactDOM from 'react-dom';
import GlitterParticles from './GlitterParticles';
import { useGlitterParticlesBetweenSections } from './useGlitterParticlesBetweenSections';

/**
 * Renders the GlitterParticles canvas absolutely over the area between two DualPromoSections.
 * Uses a React portal to inject into document.body.
 */
export default function GlitterParticlesPortal() {
  const rect = useGlitterParticlesBetweenSections();
  if (!rect) return null;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const particleCount = isMobile ? 26 : 58;
  return ReactDOM.createPortal(
    <GlitterParticles
      top={rect.top}
      height={rect.height}
      width={rect.width}
      particleCount={particleCount}
    />,
    document.body
  );
}
