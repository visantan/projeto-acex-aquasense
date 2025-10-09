import React, { useState, useEffect } from 'react';
import '../css/Campanhas.css';

function Campanhas() {
  const campanhas = [
    {
      imagem: '/img/campanha-1.jpg',
      titulo: 'Um Dia no Parque',
      link: 'https://web.santoandre.sp.gov.br/portal/noticias/0/3/19028/campanha-um-dia-no-parque-promove-atividades-gratuitas-em-unidades-de-conservacao-de-santo-andre',
    },
    {
      imagem: '/img/campanha-2.jpg',
      titulo: 'Projeto Água é Vida',
      link: 'https://www.sabesp.com.br/site/interna/Default.aspx?secaoId=65',
    },
    {
      imagem: '/img/campanha-3.jpg',
      titulo: 'Desperdício Zero',
      link: 'https://www.ana.gov.br/educacaoambiental',
    },
  ];

  const [indexAtual, setIndexAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % campanhas.length);
    }, 5000); // troca a cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);

  const campanhaAtual = campanhas[indexAtual];

  return (
    <div className="campanhas-container">
      <h2>🌎 Campanhas de Conscientização</h2>

      <div className="carrossel">
        <a
          href={campanhaAtual.link}
          target="_blank"
          rel="noopener noreferrer"
          className="carrossel-item ativo"
        >
          <img src={campanhaAtual.imagem} alt={campanhaAtual.titulo} />
          <div className="carrossel-legenda">{campanhaAtual.titulo}</div>
        </a>
      </div>

      <section className="instrucoes">
        <h3>Por que economizar água?</h3>
        <p>
          A água é um recurso essencial e limitado. Mesmo em regiões com abundância, o desperdício afeta o meio ambiente,
          a saúde pública e o futuro das próximas gerações.
        </p>
        <ul>
          <li>🚿 Reduzir o tempo de banho pode economizar até 90 litros por dia</li>
          <li>🪣 Reutilizar água da chuva ajuda na irrigação e limpeza</li>
          <li>🔧 Vazamentos domésticos podem representar até 30% do consumo</li>
          <li>🌱 Plantas nativas exigem menos irrigação e ajudam na retenção de água</li>
        </ul>
        <p>
          Participe das campanhas, compartilhe conhecimento e seja um agente da mudança. Cada atitude conta!
        </p>
      </section>
    </div>
  );
}

export default Campanhas;