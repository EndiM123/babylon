import React from 'react';
import './BirdsGlide.css';

// Pastel tones, soft opacity
const BIRD_COLORS = [
  'rgba(248, 244, 240, 0.18)', // Ivory
  'rgba(234, 229, 237, 0.19)', // Mist
  'rgba(240, 218, 224, 0.22)', // Blush
  'rgba(232, 231, 241, 0.16)', // Pearl
];

// Abstract bird SVG (minimalist, organic curve)
function BirdSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 72 32" width="72" height="32" fill="none">
      <path
        d="M4 28 Q18 4 36 16 Q54 28 68 4"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 20 Q28 10 36 16 Q44 22 50 12"
        stroke={color}
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.7"
        fill="none"
      />
    </svg>
  );
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const BIRDS_PER_SIDE = 4;

export default function BirdsGlide() {
  // Generate birds for each side
  const birdsLeft = Array.from({ length: BIRDS_PER_SIDE }).map((_, i) => {
    const color = BIRD_COLORS[i % BIRD_COLORS.length];
    const size = randomBetween(1.08, 1.48);
    const duration = randomBetween(8, 15);
    const delay = randomBetween(0, 7);
    const opacity = randomBetween(0.22, 0.32);
    const drift = randomBetween(-12, 14); // px
    return (
      <span
        key={`left-bird-${i}`}
        className="bird-glide bird-left"
        style={{
          left: '-52px',
          bottom: '-36px',
          opacity,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          transform: `scale(${size}) translateX(${drift}px)`
        }}
      >
        <BirdSVG color={color} />
      </span>
    );
  });
  const birdsRight = Array.from({ length: BIRDS_PER_SIDE }).map((_, i) => {
    const color = BIRD_COLORS[(i + 1) % BIRD_COLORS.length];
    const size = randomBetween(1.08, 1.38);
    const duration = randomBetween(9, 16);
    const delay = randomBetween(1, 8);
    const opacity = randomBetween(0.22, 0.32);
    const drift = randomBetween(-14, 12); // px
    return (
      <span
        key={`right-bird-${i}`}
        className="bird-glide bird-right"
        style={{
          right: '-52px',
          bottom: '-36px',
          opacity,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          transform: `scale(${size}) translateX(${drift}px)`
        }}
      >
        <BirdSVG color={color} />
      </span>
    );
  });

  return (
    <div className="birds-glide-container" aria-hidden="true">
      {birdsLeft}
      {birdsRight}
    </div>
  );
}
