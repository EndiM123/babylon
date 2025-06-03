import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './global-video-override.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

// Get the root element
const rootElement = document.getElementById('root');

// Make sure the element exists before creating the root
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  // Wrap with error boundary for production
  root.render(
    <ErrorBoundary>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

reportWebVitals();

