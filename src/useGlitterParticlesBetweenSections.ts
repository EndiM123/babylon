import { useEffect, useState } from 'react';

/**
 * Custom hook to compute the top, height, and width for the particle field between two DualPromoSection elements.
 * Returns null if not found or zero height.
 */
export function useGlitterParticlesBetweenSections() {
  const [rect, setRect] = useState<{ top: number; height: number; width: number } | null>(null);

  useEffect(() => {
    function updateRect() {
      const allSections = Array.from(document.querySelectorAll('section.dual-promo-section'));
      if (allSections.length < 2) {
        setRect(null);
        return;
      }
      const first = allSections[0] as HTMLElement;
      const second = allSections[1] as HTMLElement;
      if (!first || !second) {
        setRect(null);
        return;
      }
      const firstRect = first.getBoundingClientRect();
      const secondRect = second.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const top = Math.round(firstRect.bottom + scrollY);
      const bottom = Math.round(secondRect.top + scrollY);
      const height = Math.max(0, bottom - top);
      const width = window.innerWidth;
      setRect(height > 0 ? { top, height, width } : null);
    }
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  return rect;
}
