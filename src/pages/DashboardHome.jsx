import React, { useState, useEffect, useRef } from 'react';
import '../css/Dashboard.css';
import GaugeQualidadeSVG from '../components/GaugeQualidadeSVG';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL;


const enviarAlertaEmail = async (dados) => {
  try {
    await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        Nome: 'Alerta Automático',
        Email: 'sistema@aquasensebr.com',
        Mensagem: `⚠️ Qualidade crítica detectada\n\nRua: ${dados.nome}\nBairro: ${dados.bairro}\nQualidade: ${dados.status.qualidade}`,
      }),
    });
    console.log('Alerta enviado via FormSubmit');
  } catch (error) {
    console.error('Erro ao enviar alerta automático:', error);
  }
};


function DashboardHome() {
  const [ruaBusca, setRuaBusca] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historicoConsumo, setHistoricoConsumo] = useState([]);
  const intervaloRef = useRef(null);
  const alertaEnviadoRef = useRef(false);

  const buscarRua = async () => {
    if (!ruaBusca.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/rua/${encodeURIComponent(ruaBusca.trim())}`);
      if (!response.ok) {
        setResultado({
          nome: ruaBusca,
          bairro: '—',
          status: {
            vazamento: null,
            obra: null,
            qualidade: null,
            consumo_agua: null,
          },
        });
        return;
      }

      const data = await response.json();
      if (data.status?.qualidade > 90 && !alertaEnviadoRef.current) {
          await enviarAlertaEmail(data);
          alertaEnviadoRef.current = true;
        }

      if (data.status?.qualidade <= 90) {
          alertaEnviadoRef.current = false;
        }
      
      setResultado(data);

      if (data.status?.consumo_agua !== undefined) {
        setHistoricoConsumo((prev) => [...prev.slice(-19), data.status.consumo_agua]);
      }
    } catch (error) {
      console.error('Erro ao buscar rua:', error);
    }
  };

  const iniciarLoop = () => {
    buscarRua(); // primeira chamada imediata
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(buscarRua, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  const qualidadeValor = resultado?.status?.qualidade;
  const qualidadeTexto =
    qualidadeValor < 30
      ? 'Boa'
      : qualidadeValor <= 70
      ? 'Regular'
      : qualidadeValor > 70
      ? 'Crítica'
      : '—';

  const consumoValor = resultado?.status?.consumo_agua;

  const consumoData = {
    labels: historicoConsumo.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Consumo (L/min)',
        data: historicoConsumo,
        borderColor: '#0077cc',
        backgroundColor: 'rgba(0, 119, 204, 0.2)',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
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
        <button onClick={iniciarLoop}>Buscar</button>

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
          <GaugeQualidadeSVG nivel={qualidadeValor || 0} />
          <p>{qualidadeTexto}</p>
        </div>
        <div className="card">
          <h3>Consumo de Água</h3>
          <p>{consumoValor ? `${consumoValor} L/min` : '—'}</p>
          {historicoConsumo.length > 1 && (
            <div style={{ height: '150px' }}>
              <Line data={consumoData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;