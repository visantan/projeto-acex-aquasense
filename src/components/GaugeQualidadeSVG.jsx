// src/components/GaugeQualidadeSVG.jsx
import React from 'react';
import './GaugeQualidadeSVG.css';

function GaugeQualidadeSVG({ nivel }) {
  const angle = (nivel / 100) * 180; // 0 a 180 graus
  const rad = (angle * Math.PI) / 180;
  const ponteiroRaio = 65; // ajustado para não ultrapassar o arco
  const x = 100 + ponteiroRaio * Math.cos(Math.PI - rad);
  const y = 100 - ponteiroRaio * Math.sin(Math.PI - rad);

  return (
    <div className="gauge-container">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#f1c40f" />
            <stop offset="100%" stopColor="#e74c3c" />
          </linearGradient>
        </defs>

        {/* Arco com gradiente uniforme */}
        <path
          d="M20,100 A80,80 0 0,1 180,100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="20"
        />

        {/* Ponteiro */}
        <line x1="100" y1="100" x2={x} y2={y} stroke="black" strokeWidth="4" />
        <circle cx="100" cy="100" r="6" fill="black" />
      </svg>
      {/* <p className="gauge-label">{nivel}%</p> */}
    </div>
  );
}

export default GaugeQualidadeSVG;
