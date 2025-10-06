import React, { useState } from 'react';
import '../css/Agendamento.css';

const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL;

function Agendamento() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    tipo: '',
    dataHora: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Nome: form.nome,
          Telefone: form.telefone,
          Tipo: form.tipo,
          Data_Hora: form.dataHora,
          Observações: form.observacoes,
        }),
      });

      alert('Solicitação enviada com sucesso!');
      setForm({
        nome: '',
        telefone: '',
        tipo: '',
        dataHora: '',
        observacoes: '',
      });
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    }
  };

  return (
    <div className="agendamento-container">
      <h2>Solicitar Análise de Água</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

        <label>Telefone:</label>
        <input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required />

        <label>Tipo de Análise:</label>
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="qualidade">Qualidade da Água</option>
          <option value="vazamento">Verificação de Vazamento</option>
          <option value="consumo">Consumo Excessivo</option>
        </select>

        <label>Data e Horário:</label>
        <input type="datetime-local" name="dataHora" value={form.dataHora} onChange={handleChange} required />

        <label>Observações:</label>
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

        <button type="submit">Enviar Solicitação</button>
      </form>
    </div>
  );
}

export default Agendamento;