const mongoose = require('mongoose');
const dns = require('dns');

// Usa o DNS do Google para resolver registros SRV do MongoDB Atlas (apenas localmente se necessário)
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
}
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lol-champions';
    
    await mongoose.connect(mongoURI);

    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

