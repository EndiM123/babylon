import React, { useEffect, useState } from "react";

export default function SideOrnamentLines() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function updateHeight() {
      const section = document.querySelector('.babylon-content') as HTMLElement;
      const header = document.querySelector('.babylon-header') as HTMLElement;
      if (section && header) {
        const sectionRect = section.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        // Calculate the height from just below header to the end of .babylon-content
        const topOffset = headerRect.bottom;
        const sectionBottom = sectionRect.bottom + window.scrollY;
        const height = sectionBottom - topOffset;
        setHeight(height > 0 ? height : 0);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  // Only render on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 1200) return null;

  if (!height) return null;

  return (
    <>
      <div
        className="side-ornament-line left"
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          width: 0,
          height: height,
          zIndex: 10,
          borderLeft: '6px solid #A89B7C',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      />
      <div
        className="side-ornament-line right"
        style={{
          position: 'absolute',
          top: 80,
          right: 0,
          width: 0,
          height: height,
          zIndex: 10,
          borderRight: '6px solid #A89B7C',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      />
    </>
  );
}
