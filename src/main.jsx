import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThankYouPage from './ThankYouPage.jsx'
import { initializeTrackingSession } from './lib/tracking'

initializeTrackingSession()

function getCurrentPageComponent() {
  const normalizedPathname = window.location.pathname.replace(/\/+$/, '')
  if (normalizedPathname.endsWith('/obrigado')) return ThankYouPage
  return App
}

const PageComponent = getCurrentPageComponent()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageComponent />
  </StrictMode>,
)
