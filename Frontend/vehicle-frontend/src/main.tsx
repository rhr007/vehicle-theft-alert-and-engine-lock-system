
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import 'leaflet/dist/leaflet.css';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
