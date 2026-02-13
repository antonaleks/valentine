import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App'
import './index.css'

try {
  const root = document.getElementById('root')
  if (!root) {
    console.error('Root element not found!')
  } else {
    console.log('Root found, rendering app...')
    const reactRoot = ReactDOM.createRoot(root)
    reactRoot.render(
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  }
} catch (error) {
  console.error('Error rendering app:', error)
}
