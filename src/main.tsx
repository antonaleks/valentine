import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import App from './App'
import './index.css'

const Router = import.meta.env.PROD ? BrowserRouter : HashRouter
const basename = import.meta.env.PROD ? '/valentine' : undefined

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>,
)
