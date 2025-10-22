import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api-data-aquasense.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (response.ok && data.autenticado) {
        localStorage.setItem('usuarioLogado', usuario);
        localStorage.setItem('emailLogado', data.email || '');
        navigate('/dashboard');
      } else {
        setErro('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErro('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login para Dashboard</h2>
      <form onSubmit={handleLogin}>
        <label>Usuário:</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
}

export default Login;