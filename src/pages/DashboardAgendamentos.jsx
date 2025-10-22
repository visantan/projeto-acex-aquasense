import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/DashboardAgendamentos.css';

function DashboardAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [statusEdits, setStatusEdits] = useState({});
  const [mensagemEmail, setMensagemEmail] = useState('');
  const navigate = useNavigate();
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const filtrados = usuarioLogado === 'admin'
      ? todos
      : todos.filter((a) => a.usuario === usuarioLogado);
    setAgendamentos(filtrados);
  }, [usuarioLogado]);

  const limparAgendamentos = () => {
    const todos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const restantes = todos.filter((a) => a.usuario !== usuarioLogado);
    localStorage.setItem('agendamentos', JSON.stringify(restantes));
    setAgendamentos([]);
  };

  const irParaEnvio = () => {
    navigate('/dashboard/enviar-agendamento');
  };

  const handleStatusChange = (index, novoStatus) => {
    setStatusEdits({ ...statusEdits, [index]: novoStatus });
  };

  const enviarEmailStatus = async (email, nome, status) => {
    // if (!email) {
    //   setMensagemEmail(`❌ Email não informado para ${nome}`);
    //   return;
    // }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AquaSense',
          message: `Olá ${nome}, o status do seu agendamento foi atualizado para: ${status}.`,
          _subject: 'Atualização de Agendamento',
        }),
      });

      // if (response.ok) {
      //   setMensagemEmail(`✅ Email enviado para ${nome} (${email})`);
      // } else {
      //   setMensagemEmail(`❌ Falha ao enviar email para ${nome}`);
      // }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setMensagemEmail(`❌ Erro ao enviar email para ${nome}`);
    }
  };

  const salvarStatus = (index) => {
    const todos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const agendamentoOriginal = agendamentos[index];
    const globalIndex = todos.findIndex((a) =>
      a.usuario === agendamentoOriginal.usuario &&
      a.nome === agendamentoOriginal.nome &&
      a.dataHora === agendamentoOriginal.dataHora
    );

    if (globalIndex !== -1) {
      const novoStatus = statusEdits[index] || todos[globalIndex].status;
      todos[globalIndex].status = novoStatus;
      localStorage.setItem('agendamentos', JSON.stringify(todos));

      enviarEmailStatus(todos[globalIndex].email, todos[globalIndex].nome, novoStatus);

      const atualizados = usuarioLogado === 'admin'
        ? todos
        : todos.filter((a) => a.usuario === usuarioLogado);
      setAgendamentos(atualizados);
      setStatusEdits({ ...statusEdits, [index]: undefined });
    }
  };

  return (
    <div className="dashboard-agendamentos">
      <h2>📋 Agendamentos de {usuarioLogado}</h2>

      <button onClick={irParaEnvio}>➕ Novo Agendamento</button>

      {mensagemEmail && <p className="email-status">{mensagemEmail}</p>}

      {agendamentos.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <>
          <ul>
            {agendamentos.map((a, i) => (
              <li key={i}>
                <strong>{a.nome}</strong> — {a.tipo}<br />
                📞 {a.telefone} | 🕒 {new Date(a.dataHora).toLocaleString()}<br />
                📝 {a.observacoes}<br />
                📧 {a.email || 'Email não informado'}<br />
                🧾 Status:{' '}
                {usuarioLogado === 'admin' ? (
                  <>
                    <select
                      value={statusEdits[i] ?? a.status}
                      onChange={(e) => handleStatusChange(i, e.target.value)}
                    >
                      <option value="Em Análise">Em Análise</option>
                      <option value="Negado">Negado</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                    <button onClick={() => salvarStatus(i)}>💾 Salvar status</button>
                  </>
                ) : (
                  a.status
                )}
              </li>
            ))}
          </ul>
          {usuarioLogado !== 'admin' && (
            <button onClick={limparAgendamentos}>🗑️ Limpar meus agendamentos</button>
          )}
        </>
      )}
    </div>
  );
}

export default DashboardAgendamentos;