import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <img
          src="/aquasense-logo.png"
          alt="Logo AquaSense"
          className="home-logo"
        />
        <h1>Projeto AquaSense</h1>
      </div>

      <p>
        Bem-vindo ao AquaSense:  
        Uma iniciativa acadêmica voltada para o monitoramento e conscientização sobre o tratamento de água em Santo André.  
        Aqui você encontrará dados atualizados, dicas de consumo consciente e um mapa interativo com pontos de vazamento.
      </p>

      <Link to="/dashboard">
        <button className="home-button">Acessar Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;