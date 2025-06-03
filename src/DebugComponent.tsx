import React, { useEffect, useState } from 'react';

const DebugComponent: React.FC = () => {
  const [info, setInfo] = useState<{
    windowWidth: number;
    windowHeight: number;
    userAgent: string;
    path: string;
    timestamp: string;
  }>({
    windowWidth: 0,
    windowHeight: 0,
    userAgent: '',
    path: '',
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      setInfo({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        userAgent: navigator.userAgent,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });

      // Log to console for debugging
      console.log('Debug component mounted');
      console.log('Window dimensions:', window.innerWidth, 'x', window.innerHeight);
      console.log('User agent:', navigator.userAgent);
      console.log('Current path:', window.location.pathname);
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      padding: '20px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      zIndex: 9999,
      fontFamily: 'monospace',
      fontSize: '14px',
    }}>
      <h1>Babylon Fashion - Debug Mode</h1>
      <p>If you're seeing this, React is rendering correctly!</p>
      <p>Window: {info.windowWidth} x {info.windowHeight}</p>
      <p>Path: {info.path}</p>
      <p>Time: {info.timestamp}</p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          padding: '8px 16px',
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Go Home
      </button>
      <button 
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
        }}
        style={{
          padding: '8px 16px',
          backgroundColor: '#fff',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Clear Storage & Reload
      </button>
    </div>
  );
};

export default DebugComponent;
