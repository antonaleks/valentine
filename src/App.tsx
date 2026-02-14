import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import NastyaPage from './pages/NastyaPage'
import NastyaSuccessPage from './pages/NastyaSuccessPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/nastya" element={<NastyaPage />} />
      <Route path="/nastya/success" element={<NastyaSuccessPage />} />
    </Routes>
  )
}

export default App
