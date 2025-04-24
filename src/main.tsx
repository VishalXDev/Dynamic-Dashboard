import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Global styles for the project
import App from './App.tsx';  // Main App component

// Get the root element and render the app inside it
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Make sure you have a div with id 'root' in your HTML.");
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
