const mongoose = require('mongoose');

const gameplaySchema = new mongoose.Schema({
  champion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Champion',
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['Tutorial', 'Ranked', 'Highlight', 'Guide'],
    default: 'Guide',
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Gameplay', gameplaySchema);
