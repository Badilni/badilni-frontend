import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShowcasePage from '../src/components/common/test.jsx'
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShowcasePage />
    <App />
  </StrictMode>,
)
