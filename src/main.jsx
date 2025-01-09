import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Rabat from './pages/Rabat.jsx'
import AlHaouz from './pages/AlHaouz.jsx'
import Marrakech from './pages/Marrakech.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/rabat", element: <Rabat />},
  {path: "/alhaouz", element: <AlHaouz />}
  {path: "/marrakech", element: <Marrakech />}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
