import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'

const BASENAME: string = import.meta.env.VITE_BASENAME ?? ''

const container = document.getElementById('root')

if (!container) {
  throw new Error(
    'Root element not found. Please ensure index.html contains <div id="root"></div>',
  )
}

const root = createRoot(container)

root.render(
  <StrictMode>
    <Router basename={BASENAME}>
      <App />
    </Router>
  </StrictMode>,
)
