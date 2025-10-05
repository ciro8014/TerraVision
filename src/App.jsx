import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Sensors from './pages/Sensors';
import Impact from './pages/Impact';
import Data from './pages/Data';
import Solutions from './pages/Solutions';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;