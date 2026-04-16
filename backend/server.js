const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api/champions', require('./routes/championRoutes'));
app.use('/api/abilities', require('./routes/abilityRoutes'));
app.use('/api/gameplays', require('./routes/gameplayRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// Rota de teste
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API de Campeões LOL!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🎮 Servidor rodando na porta ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`📚 API disponível em http://localhost:${PORT}/api\n`);
});
