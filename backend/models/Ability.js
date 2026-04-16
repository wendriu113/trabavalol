const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  tecla: {
    type: String,
    enum: ['Q', 'W', 'E', 'R', 'Passiva'],
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  danoBase: {
    type: Number,
    required: true,
  },
  champion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Champion',
    required: true,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ability', abilitySchema);
