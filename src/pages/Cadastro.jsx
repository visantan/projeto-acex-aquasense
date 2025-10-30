import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cadastro.css';

function Cadastro() {
  const [form, setForm] = useState({
    usuario: '',
    senha: '',
    email: '',
  });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('3.142.165.61:5000/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/dashboard/login');
      } else {
        const data = await response.json();
        setErro(data.mensagem || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErro('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>📝 Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuário:</label>
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Cadastrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
}

export default Cadastro;