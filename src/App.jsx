import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
// import Agendamento from './pages/Agendamento';
import Mapa from './pages/Mapa';
import Contatos from './pages/Contatos';
import Campanhas from './pages/Campanhas';
import Historico from './pages/Historico';
import Noticias from './pages/Noticias';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import DashboardAgendamentos from './pages/DashboardAgendamentos';
import  EnviarAgendamento from './pages/EnviarAgendamento';
 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          {/* <Route path="agendamento" element={<Agendamento />} /> */}
          <Route path="dashboard-agendamentos" element={<DashboardAgendamentos />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="contatos" element={<Contatos />} />
          <Route path="campanhas" element={<Campanhas />} />
          <Route path="historico" element={<Historico />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="enviar-agendamento" element={<EnviarAgendamento />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;