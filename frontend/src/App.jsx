import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import DashboardGarcom from './pages/DashboardGarcom1';
import Menu from './pages/MenuMesa';
import DashboardCozinha from './pages/DashboardCozinha';
import Admin from './pages/Admin'; // 👈 Novo import

function App() {
  return (
    <div className="max-h-screen w-full bg-white">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/DashboardGarcom1" element={<DashboardGarcom />} />
          <Route path="/menu/:mesaId" element={<Menu />} />
          <Route path="/DashboardCozinha" element={<DashboardCozinha />} />
          <Route path="/admin" element={<Admin />} /> {/* 👈 Rota do admin */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
