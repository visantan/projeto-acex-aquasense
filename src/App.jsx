import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Agendamento from './pages/Agendamento';
import Mapa from './pages/Mapa';
import Contatos from './pages/Contatos';
import Campanhas from './pages/Campanhas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="contatos" element={<Contatos />} />
          <Route path="campanhas" element={<Campanhas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;