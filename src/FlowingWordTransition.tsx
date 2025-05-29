import React, { useEffect, useState } from 'react';
import './FlowingWordTransition.css';

const WORDS = ['ELEGANCE', 'CHIC', 'SOFTNESS', 'UNIQUE', 'CONFIDENCE', 'LUXURY'];

export default function FlowingWordTransition() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % WORDS.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [idx]);

  return (
    <span
      className={`flowing-word${fade ? ' entering' : ' exiting'}`}
      style={{
        fontFamily: 'Wolmer, Montserrat, Inter, Arial, sans-serif',
        fontWeight: 1500,
        fontSize: '5vw',
        color: '#A67899',
        letterSpacing: '0.18em',
        textAlign: 'center',
        filter: 'drop-shadow(0 2px 8px #cbb6a6)',
        padding: '0 1vw',
        width: '100%',
        overflow: 'hidden',
        transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)',
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0)' : 'translateY(1.2em)',
        display: 'block',
      }}
    >
      {WORDS[idx]}
    </span>
  );
}
