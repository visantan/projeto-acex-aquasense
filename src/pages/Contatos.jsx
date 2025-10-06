import React, { useState } from 'react';
import '../css/Contatos.css';

const FORM_EMAIL = import.meta.env.VITE_FORM_EMAIL;


function Contatos() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    mensagem: '',
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
          Email: form.email,
          Mensagem: form.mensagem,
        }),
      });

      alert('Mensagem enviada com sucesso!');
      setForm({ nome: '', email: '', mensagem: '' });
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <div className="contatos-container">
      <h2>Contatos e Atendimento</h2>

      <section className="info-contato">
        <h3>Canais de Atendimento</h3>
        <ul>
          <li><strong>Telefone:</strong> 0800 123 456</li>
          <li><strong>E-mail:</strong> atendimento@aquasensebr.com</li>
          <li><strong>WhatsApp:</strong> (11) 91234-5678</li>
          <li><strong>Presencial:</strong> Rua Aqua Sense, 100 — Santo André</li>
        </ul>
      </section>

      <section className="mensagem-rapida">
        <h3>Envie uma mensagem</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Seu nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Seu e-mail"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensagem"
            placeholder="Digite sua mensagem..."
            rows="4"
            value={form.mensagem}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}

export default Contatos;