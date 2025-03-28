import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"; 
import "./App.css"; 
import App from './App.tsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" />
    <App />
  </StrictMode>,
)
