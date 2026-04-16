const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/champions', require('./routes/championRoutes'));
app.use('/abilities', require('./routes/abilityRoutes'));
app.use('/gameplays', require('./routes/gameplayRoutes'));
app.use('/favorites', require('./routes/favoriteRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Campeões LOL!' });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\nServidor rodando: http://localhost:${PORT}`);
  });
}

// Exportar para o Vercel (serverless)
module.exports = app;