// src/pages/Dashboard.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>AquaSense</h2>
        <nav>
          <ul>
            <li><Link className={isActive('/dashboard') ? 'active' : ''} to="/dashboard">Dashboard</Link></li>
            <li><Link to="/dashboard/agendamento">Agendamento</Link></li>
            <li><Link to="/dashboard/mapa">Mapa</Link></li>
            <li><Link to="/dashboard/contatos">Contatos</Link></li>
            <li><Link to="/dashboard/campanhas">Campanhas</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;