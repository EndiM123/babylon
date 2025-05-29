// PetalRain removed as requested.
// Warm, soft-edged petal SVGs (peach, blush, pale rose, muted coral)
const PETAL_COLORS = [
  'rgba(255, 209, 196, 0.72)', // Peach
  'rgba(255, 182, 193, 0.65)', // Blush
  'rgba(255, 236, 233, 0.62)', // Pale rose
  'rgba(245, 183, 177, 0.66)', // Muted coral
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function Petal({ style, color, delay }: { style: React.CSSProperties; color: string; delay: number }) {
  return (
    <svg
      className="petal"
      style={{ ...style, animationDelay: `${delay}s` }}
      width="32" height="38" viewBox="0 0 32 38" fill="none"
    >
      <ellipse
        cx="16" cy="19" rx="13" ry="18"
        fill={color}
        style={{ filter: 'blur(0.5px)' }}
      />
      <ellipse
        cx="16" cy="29" rx="4" ry="7"
        fill={color}
        opacity="0.36"
      />
    </svg>
  );
}
// PetalRain removed
export default function PetalRain() {
  return null;
}
