import React, { useEffect, useState } from 'react';
import '../css/Noticias.css';

function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarNoticias = async () => {
      try {
        const response = await fetch('http://api-aquasense.ddns.net:5000/api/noticias');
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        setNoticias([]);
      } finally {
        setCarregando(false);
      }
    };

    buscarNoticias();
  }, []);

  return (
    <div className="noticias-container">
      <h2>📰 Notícias sobre Água em Santo André</h2>

      {carregando ? (
        <p>Carregando últimas notícias...</p>
      ) : noticias.length === 0 ? (
        <p>Nenhuma notícia encontrada no momento.</p>
      ) : (
        <ul className="lista-noticias">
          {noticias.map((n, i) => (
            <li key={i} className="noticia-item">
              <a href={n.link} target="_blank" rel="noopener noreferrer">
                <h3>{n.titulo}</h3>
                <p>{n.resumo}</p>
                <span>{new Date(n.data).toLocaleDateString('pt-BR')}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Noticias;