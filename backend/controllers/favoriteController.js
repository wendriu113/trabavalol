const Favorite = require('../models/Favorite');
const Champion = require('../models/Champion');

const obterFavoritos = async (req, res) => {
  try {
    const usuarioId = req.query.usuarioId || 'default-user';

    const favorites = await Favorite.find({ usuarioId }).populate('championId');

    res.json(favorites.map(fav => fav.championId));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao obter favoritos", error: error.message });
  }
};

const adicionarFavorito = async (req, res) => {
  try {
    const { championId, usuarioId = 'default-user' } = req.body;

    if (!championId) {
      return res.status(400).json({ msg: "championId é obrigatório" });
    }

    const champion = await Champion.findById(championId);
    if (!champion) {
      return res.status(404).json({ msg: "Campeão não encontrado" });
    }

    const existingFavorite = await Favorite.findOne({ championId, usuarioId });
    if (existingFavorite) {
      return res.status(400).json({ msg: "Este campeão já é um favorito" });
    }

    const novoFavorito = await Favorite.create({ championId, usuarioId });
    await Champion.findByIdAndUpdate(championId, { $inc: { favoritos: 1 } });

    res.status(201).json({ msg: "Campeão adicionado aos favoritos", favorite: novoFavorito });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao adicionar favorito", error: error.message });
  }
};

const removerFavorito = async (req, res) => {
  try {
    const { championId } = req.body;
    const usuarioId = req.query.usuarioId || 'default-user';

    if (!championId) {
      return res.status(400).json({ msg: "championId é obrigatório" });
    }

    const favorite = await Favorite.findOneAndDelete({ championId, usuarioId });

    if (!favorite) {
      return res.status(404).json({ msg: "Favorito não encontrado" });
    }

    await Champion.findByIdAndUpdate(championId, { $inc: { favoritos: -1 } });

    res.json({ msg: "Campeão removido dos favoritos" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao remover favorito", error: error.message });
  }
};

const verificarFavorito = async (req, res) => {
  try {
    const { championId } = req.params;
    const usuarioId = req.query.usuarioId || 'default-user';

    const favorite = await Favorite.findOne({ championId, usuarioId });

    res.json({
      isFavorito: !!favorite,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao verificar favorito", error: error.message });
  }
};

module.exports = { obterFavoritos, adicionarFavorito, removerFavorito, verificarFavorito };
