// src/pages/Campanhas.jsx
import React from 'react';
import '../css/Campanhas.css';

function Campanhas() {
  const dicas = [
    'Feche a torneira enquanto escova os dentes.',
    'Reaproveite a água da máquina de lavar para limpar o quintal.',
    'Verifique vazamentos regularmente em torneiras e encanamentos.',
    'Use balde em vez de mangueira para lavar o carro.',
    'Instale redutores de pressão nas torneiras e chuveiros.',
    'Regue plantas no início da manhã ou à noite para evitar evaporação.',
    'Evite banhos longos — 5 minutos são suficientes.',
    'Capte água da chuva para usos não potáveis.',
  ];

  return (
    <div className="campanhas-container">
      <h2>Campanhas de Conscientização</h2>
      <p>Confira algumas dicas simples para economizar água no dia a dia e contribuir com o meio ambiente:</p>
      <ul>
        {dicas.map((dica, index) => (
          <li key={index}>💧 {dica}</li>
        ))}
      </ul>
    </div>
  );
}

export default Campanhas;