import React, { useRef, useEffect } from 'react';

// Particle color palette: soft whites, golds, pastels
const PARTICLE_COLORS = [
  'rgba(255,255,255,0.24)', // soft white
  'rgba(255, 240, 210, 0.19)', // light gold
  'rgba(255, 250, 230, 0.16)', // pale gold
  'rgba(247, 236, 255, 0.17)', // pastel lavender
  'rgba(255, 220, 245, 0.15)', // pastel pink
  'rgba(230, 255, 250, 0.13)', // pastel aqua
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

interface Particle {
  x: number;
  y: number;
  r: number;
  baseR: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface GlitterParticlesProps {
  top: number;
  height: number;
  width: number;
  particleCount: number;
}

const isLowPerformance = () => {
  // Simple heuristic: low device memory or slow CPU
  // (could use navigator.deviceMemory, hardwareConcurrency, etc.)
  if (typeof navigator !== 'undefined') {
    // @ts-ignore
    if (navigator.deviceMemory && navigator.deviceMemory < 4) return true;
    // @ts-ignore
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  }
  return false;
};

const fallbackImg = '/particle-fallback.png'; // Optional: add a soft PNG fallback

const GlitterParticles: React.FC<GlitterParticlesProps> = ({ top, height, width, particleCount }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLowPerformance()) return; // fallback handled below
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    particles.current = Array.from({ length: particleCount }).map(() => {
      const r = randomBetween(1.5, 4.5);
      return {
        x: randomBetween(r, width - r),
        y: randomBetween(r, height - r),
        r,
        baseR: r,
        vx: randomBetween(-0.04, 0.04),
        vy: randomBetween(-0.09, 0.09),
        opacity: randomBetween(0.12, 0.49),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: randomBetween(0.005, 0.018),
      };
    });

    let lastTime = performance.now();
    function animate(now: number) {
      if (!ctx) return;
      const dt = Math.min((now - lastTime) / 16.67, 2.5); // ~60fps, clamp delta
      lastTime = now;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles.current) {
        // Update position
        p.x += p.vx * dt * (0.8 + Math.abs(p.vx));
        p.y += p.vy * dt * (0.8 + Math.abs(p.vy));
        // Gentle upward or downward drift
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
        // Wrap horizontally
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        // Pulse
        p.pulse += p.pulseSpeed * dt;
        const pulseScale = 0.92 + 0.18 * Math.sin(p.pulse);
        const r = p.baseR * pulseScale;
        const opacity = Math.max(0.1, Math.min(0.6, p.opacity + 0.18 * Math.sin(p.pulse * 0.8)));
        if (!ctx) continue;
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        ctx.globalAlpha = opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = r * 2.2;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(now => animate(now));
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [width, height, particleCount]);

  if (isLowPerformance()) {
    // Fallback: static shimmer PNG or low-density shimmer
    return (
      <div style={{ width, height, top, left: 0, position: 'absolute', pointerEvents: 'none', zIndex: 3, background: `url(${fallbackImg}) center/cover no-repeat`, opacity: 0.7, borderRadius: '1.5em' }} />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        left: 0,
        top,
        width: width,
        height: height,
        pointerEvents: 'none',
        zIndex: 3,
        display: 'block',
        borderRadius: '1.5em',
      }}
      aria-hidden="true"
    />
  );
};

export default GlitterParticles;
