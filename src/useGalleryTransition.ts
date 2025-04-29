import { useEffect, useState } from 'react';

/**
 * Custom hook that returns true if the gallery is out of view (scrolled past),
 * and false otherwise. Used to trigger the BABYLON logo transition.
 */
export function useGalleryTransition(galleryRef: React.RefObject<HTMLElement | null>) {
  const [logoTransition, setLogoTransition] = useState(false);

  useEffect(() => {
    if (!galleryRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setLogoTransition(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [galleryRef]);

  return logoTransition;
}
