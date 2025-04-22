import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Assuming your global styles are here
import App from './App.tsx';  // Main app component

// Getting the root element and rendering the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found!");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
