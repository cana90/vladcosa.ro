import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import GestaltPage from './components/GestaltPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/gestalt" element={<GestaltPage />} />
      </Routes>
    </Router>
  )
}

export default App
