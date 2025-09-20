import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"; 
import "./App.css"; 
import App from './App.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster 
      position="top-center" 
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#ffffff',
          border: '1px solid #374151',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          padding: '16px 20px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        },
      }}
    />
    <App />
  </StrictMode>,
)
