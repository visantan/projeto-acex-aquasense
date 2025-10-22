import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Oculta o menu lateral nas páginas de login e cadastro
  const ocultarSidebar = ['/dashboard/login', '/dashboard/cadastro'].includes(location.pathname);

  return (
    <div className="dashboard-container">
      {!ocultarSidebar && (
        <aside className="sidebar">
          <h2>AquaSense</h2>
          <nav>
            <ul>
              <li><Link className={isActive('/dashboard') ? 'active' : ''} to="/dashboard">Dashboard</Link></li>
              <li><Link to="/dashboard/dashboard-agendamentos">Agendamentos</Link></li>
              <li><Link to="/dashboard/mapa">Mapa</Link></li>
              <li><Link to="/dashboard/contatos">Contatos</Link></li>
              <li><Link to="/dashboard/campanhas">Campanhas</Link></li>
              <li><Link to="/dashboard/historico">Historico</Link></li>
              <li><Link to="/dashboard/noticias">Noticias</Link></li>
              {/* <li><Link to="/dashboard/login">Login</Link></li> */}
            </ul>
          </nav>
        </aside>
      )}

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;