const mongoose = require('mongoose');

const championSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  funcao: {
    type: String,
    enum: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'],
    required: true,
  },
  dificuldade: {
    type: String,
    enum: ['Fácil', 'Médio', 'Difícil'],
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  favoritos: {
    type: Number,
    default: 0,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Champion', championSchema);
