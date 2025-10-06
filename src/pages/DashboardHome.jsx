import React, { useState } from 'react';
import '../css/Dashboard.css';
import ruas from '../data/ruas';
import GaugeQualidadeSVG from '../components/GaugeQualidadeSVG';


function DashboardHome() {
  const [ruaBusca, setRuaBusca] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarRua = () => {
    const ruaEncontrada = ruas.find((r) =>
      r.nome.toLowerCase() === ruaBusca.trim().toLowerCase()
    );
    setResultado(
      ruaEncontrada || {
        nome: ruaBusca,
        bairro: '—',
        status: {
          vazamento: null,
          obra: null,
          qualidade: '—',
        },
      }
    );
  };


  return (
    <div className="dashboard-home">
      <div className="busca-rua">
        <h3>🔍 Consultar status por rua</h3>
        <input
          type="text"
          placeholder="Digite o nome da rua"
          value={ruaBusca}
          onChange={(e) => setRuaBusca(e.target.value)}
        />
        <button onClick={buscarRua}>Buscar</button>

        {resultado && (
          <div className="resultado-rua">
            <p><strong>{resultado.nome}</strong></p>
            <p><strong>Bairro:</strong> {resultado.bairro}</p>
          </div>
        )}
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Vazamento</h3>
          <p>
            {resultado
              ? resultado.status.vazamento === true
                ? '🚨 Vazamento detectado'
                : resultado.status.vazamento === false
                ? '✅ Sem vazamentos'
                : '—'
              : '—'}
          </p>
        </div>
        <div className="card">
          <h3>Obra na Região</h3>
          <p>
            {resultado
              ? resultado.status.obra === true
                ? '🚧 Obra em andamento'
                : resultado.status.obra === false
                ? '✅ Nenhuma obra registrada'
                : '—'
              : '—'}
          </p>
        </div>
        <div className="card">
        <h3>Qualidade da Água</h3>
            <GaugeQualidadeSVG
                nivel={
                resultado?.status.qualidade === 'Crítica'
                    ? 95
                    : resultado?.status.qualidade === 'Regular'
                    ? 50
                    : resultado?.status.qualidade === 'Boa'
                    ? 20
                    : 0
                }
            />
            <p>{resultado?.status.qualidade}</p>
        </div>

      </div>
    </div>
  );
}

export default DashboardHome;