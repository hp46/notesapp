import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Rabat from './pages/Rabat.jsx'
import AlHaouz from './pages/AlHaouz.jsx'
import Marrakech from './pages/Marrakech.jsx'
import Temara from './pages/Temara.jsx'
import Sale from './pages/Sale.jsx'
import Azour from './pages/Azour.jsx'
import ElJadida from './pages/ElJadida.jsx'
import Ouarzazate from './pages/Ouarzazate.jsx'
import Khemisset from './pages/Khemisset.jsx'
import Casablanca from './pages/Casablanca.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/rabat", element: <Rabat />},
  {path: "/alhaouz", element: <AlHaouz />},
  {path: "/marrakech", element: <Marrakech />},
  {path: "/temara", element: <Temara />},
  {path: "/sale", element: <Sale />},
  {path: "/azour", element: <Azour />},
  {path: "/eljadida", element: <ElJadida />},
  {path: "/ouarzazate", element: <Ouarzazate />},
  {path: "/khemisset", element: <Khemisset />},
  {path: "/casablanca", element: <Casablanca />},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
