import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Rabat from './pages/Rabat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rabat/>
  </StrictMode>,
)
