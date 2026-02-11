import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
