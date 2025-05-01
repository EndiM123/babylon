import React from 'react';

export default function About() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7EFE5', color: '#A67899', fontFamily: 'Wolmer, serif', fontSize: '2rem', letterSpacing: '0.01em' }}>
      <div>
        <h1 style={{ fontSize: '2.6rem', marginBottom: '0.5em' }}>About Babylon</h1>
        <p style={{ maxWidth: 600, lineHeight: 1.7 }}>
          Babylon is a modern, luxury fashion house inspired by editorial minimalism and timeless elegance. Our collections are designed to elevate everyday moments with premium materials, mindful craftsmanship, and a signature color palette. We believe in beauty without excess—where every detail is purposeful and every piece tells a story.
        </p>
      </div>
    </div>
  );
}
