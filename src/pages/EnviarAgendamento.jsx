import React, { useState, useEffect } from 'react';
import '../css/EnviarAgendamento.css';

function EnviarAgendamento() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    tipo: '',
    dataHora: '',
    observacoes: '',
  });

  useEffect(() => {
    const usuario = localStorage.getItem('usuarioLogado');
    if (!usuario) {
      alert('Você precisa estar logado para agendar.');
      window.location.href = '/dashboard/login';
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarEmailDicas = async (email, nome, tipo) => {
    if (!email) return;

    let mensagem = '';
    let assunto = 'Dicas para sua análise de água';

    if (tipo === 'qualidade') {
      mensagem = `Olá ${nome}! 👋

Enquanto aguardamos a visita de inspeção da qualidade da água, seguem algumas dicas importantes:

💧 Dica: Evite consumir a água diretamente da torneira. Se possível, ferva a água por pelo menos 5 minutos antes de utilizá-la para beber ou cozinhar. Isso ajuda a eliminar possíveis microrganismos e garante mais segurança até a análise ser concluída.

Assim que a visita for realizada, enviaremos o retorno com os resultados e orientações detalhadas.

Atenciosamente,
Equipe Aquasense`;
    } else if (tipo === 'vazamento') {
      mensagem = `Olá ${nome}! 👋

Enquanto aguardamos a visita para verificação de possível vazamento, seguem algumas orientações que podem ajudar:

💧 Dica: Feche todas as torneiras e desligue os aparelhos que usam água. Em seguida, observe o hidrômetro — se ele continuar girando, mesmo com tudo fechado, isso indica possível vazamento interno.
Caso perceba um aumento repentino no consumo ou manchas úmidas em paredes e pisos, evite adiar o conserto, pois o problema pode se agravar rapidamente.

Assim que a visita for realizada, enviaremos um relatório com as constatações e próximos passos.

Atenciosamente,
Equipe Aquasense`;
    } else if (tipo === 'consumo') {
      mensagem = `Olá ${nome}! 👋

Enquanto aguardamos a visita para verificar o consumo excessivo de água, seguem algumas orientações que podem ajudar:

💧 Dica: Verifique se há torneiras pingando, descargas com vazamento ou registros parcialmente abertos, pois esses pequenos problemas podem aumentar bastante o consumo.
Também vale observar o hidrômetro em horários de pouco uso — se ele continuar girando, pode haver consumo oculto ou vazamento interno.

Essas verificações simples ajudam a evitar desperdício até a nossa equipe realizar a inspeção.

Atenciosamente,
Equipe Aquasense`;
    }

    try {
      await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AquaSense',
          message: mensagem,
          _subject: assunto,
        }),
      });
    } catch (error) {
      console.error('Erro ao enviar email de dicas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const emailLogado = localStorage.getItem('emailLogado');
    const agendamentosSalvos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const novoAgendamento = {
      ...form,
      usuario: usuarioLogado,
      email: emailLogado,
      status: 'Em análise',
    };

    localStorage.setItem('agendamentos', JSON.stringify([...agendamentosSalvos, novoAgendamento]));

    await enviarEmailDicas(emailLogado, form.nome, form.tipo);

    alert('Solicitação salva com sucesso! Dicas enviadas por e-mail.');
    setForm({
      nome: '',
      telefone: '',
      tipo: '',
      dataHora: '',
      observacoes: '',
    });
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

export default EnviarAgendamento;