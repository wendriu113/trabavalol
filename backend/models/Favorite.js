const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  championId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Champion',
    required: true,
  },
  usuarioId: {
    type: String,
    default: 'default-user',
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
