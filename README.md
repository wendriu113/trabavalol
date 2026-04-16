# 🎮 Enciclopédia Interativa de Campeões League of Legends

Projeto full-stack com **Backend Node.js/Express** e **Frontend React/Vite**, conectado ao **MongoDB Atlas** e preparado para deploy no **Vercel**.

---

## ✨ Features

- ⭐ **Sistema de Favoritos** — marcar/desmarcar campeões, página dedicada, contador automático
- 🔍 **Filtro Inteligente** — por função, dificuldade e busca por nome em tempo real
- 🌙 **Dark Mode** — toggle entre tema escuro e claro
- 🎥 **Player de Vídeo** — suporte a YouTube (embed automático) e MP4
- ✏️ **CRUD Completo** — criar, editar, visualizar e excluir campeões, habilidades e gameplays
- 📱 **Design Responsivo** — cards com animações, gradientes neon e hover effects

---

## 🏗️ Estrutura do Projeto

```
/trabavalol
├── backend/
│   ├── config/
│   │   └── database.js          # Conexão MongoDB Atlas
│   ├── controllers/             # Lógica da aplicação
│   ├── models/                  # Schemas Mongoose
│   ├── routes/                  # Endpoints da API
│   ├── app.js                   # Entry point (Express)
│   ├── seedData.js              # Script para popular o banco
│   ├── vercel.json              # Config de deploy Vercel
│   ├── .env                     # Variáveis de ambiente
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Home.jsx
│   │   │   ├── ChampionDetail.jsx
│   │   │   ├── FormChampion.jsx
│   │   │   ├── FormAbility.jsx
│   │   │   ├── FormGameplay.jsx
│   │   │   └── Favorites.jsx
│   │   ├── services/
│   │   │   └── api.js           # Axios config
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── extra.txt                    # Diferenciais do projeto
└── README.md
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (v14+)
- **npm**
- Conta no **MongoDB Atlas** (ou MongoDB local)

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor roda em **http://localhost:5000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O app abre em **http://localhost:3000**

### Popular o banco com dados de exemplo

```bash
cd backend
node seedData.js
```

---

## 📚 API Endpoints

### Champions
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/champions` | Lista com filtros (funcao, dificuldade, nome) |
| GET | `/champions/:id` | Detalhes |
| POST | `/champions` | Criar |
| PUT | `/champions/:id` | Atualizar |
| DELETE | `/champions/:id` | Deletar |

### Abilities
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/abilities` | Lista |
| GET | `/abilities/:id` | Detalhes |
| GET | `/abilities/champion/:id` | Habilidades de um campeão |
| POST | `/abilities` | Criar |
| PUT | `/abilities/:id` | Atualizar |
| DELETE | `/abilities/:id` | Deletar |

### Gameplays
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/gameplays` | Lista |
| GET | `/gameplays/:id` | Detalhes |
| GET | `/gameplays/champion/:id` | Gameplays de um campeão |
| POST | `/gameplays` | Criar |
| PUT | `/gameplays/:id` | Atualizar |
| DELETE | `/gameplays/:id` | Deletar |

### Favorites
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/favorites` | Lista de favoritos |
| GET | `/favorites/:championId/check` | Verifica se é favorito |
| POST | `/favorites/add` | Adicionar |
| DELETE | `/favorites/remove` | Remover |

---

## 🌐 Deploy no Vercel

### Backend
1. Criar projeto no Vercel apontando para a pasta `backend/`
2. Adicionar variável de ambiente: `MONGODB_URI`

### Frontend
1. Criar projeto no Vercel apontando para a pasta `frontend/`
2. Adicionar variável de ambiente: `VITE_API_URL` (URL do backend no Vercel)

### MongoDB Atlas
- Em **Network Access**, adicionar `0.0.0.0/0` para permitir acesso do Vercel

---

## 🛠️ Tecnologias

| Backend | Frontend |
|---------|----------|
| Node.js | React 18 |
| Express | React Router v6 |
| MongoDB + Mongoose | Axios |
| CORS | Vite |
| dotenv | CSS3 |

---

**Desenvolvido com ⚔️ e 🎮 para League of Legends fans**
