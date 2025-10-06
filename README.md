# 🌊 Projeto AquaSense

AquaSense é uma iniciativa acadêmica voltada para o monitoramento e conscientização sobre o tratamento de água em Santo André. O sistema oferece dados atualizados, dicas de consumo consciente e um mapa interativo com pontos de vazamento.

---

## 🚀 Como rodar o projeto localmente

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [Git](https://git-scm.com/)
- Editor de código (ex: VS Code)

---

### 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/visantan/projeto-acex-aquasense.git
cd projeto-acex-aquasense
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o e-mail no .env**

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_FORM_EMAIL=seuemail@dominio.com
```

4. **Execute o projeto:**

```bash
npm run dev
```

---

## 📁 Estrutura do Projeto

```
src/
├── assets/           # Imagens e ícones
├── components/       # Componentes reutilizáveis
├── pages/            # Páginas principais (Dashboard, Mapa, etc)
├── css/              # Estilos separados por página
├── main.jsx          # Ponto de entrada
└── App.jsx           # Rotas principais
```