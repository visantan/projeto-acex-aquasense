import React, { useEffect, useState } from 'react';
import '../css/Historico.css';

function Historico() {
  const [historico, setHistorico] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const response = await fetch('https://api-data-aquasense.vercel.app/api/historico');
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    };

    fetchHistorico();
  }, []);

  const ruasAgrupadas = {};
  historico.forEach((registro) => {
    registro.ruas.forEach((rua) => {
      const id = rua.id;
      if (!ruasAgrupadas[id]) {
        ruasAgrupadas[id] = {
          nome: rua.nome,
          bairro: rua.bairro,
          registros: [],
        };
      }
      ruasAgrupadas[id].registros.push({
        timestamp: registro.timestamp,
        status: rua.status,
      });
    });
  });

  const ruasFiltradas = Object.entries(ruasAgrupadas).filter(([_, rua]) =>
    rua.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="historico-page">
      <h2>📊 Histórico de Consumo e Qualidade</h2>

      <div className="campo-busca">
        <input
          type="text"
          placeholder="🔍 Buscar rua..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="cards-container">
        {ruasFiltradas.map(([id, rua]) => (
          <div
            key={id}
            className={`card ${selecionada === id ? 'ativo' : ''}`}
            onClick={() => setSelecionada(selecionada === id ? null : id)}
          >
            <h3>{rua.nome}</h3>
            <p><strong>Bairro:</strong> {rua.bairro}</p>
            {selecionada === id && (
              <div className="historico-detalhes">
                {rua.registros.map((r, i) => (
                  <div key={i} className="registro">
                    <p><strong>{new Date(r.timestamp).toLocaleString()}</strong></p>
                    <p>Qualidade: {r.status.qualidade}</p>
                    <p>Consumo: {r.status.consumo_agua} L/min</p>
                    <p>Vazamento: {r.status.vazamento ? '🚨 Sim' : '✅ Não'}</p>
                    <p>Obra: {r.status.obra ? '🚧 Sim' : '✅ Não'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Historico;