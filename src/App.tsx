import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  )
}

export default App
