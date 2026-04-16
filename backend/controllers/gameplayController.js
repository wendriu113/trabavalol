const Gameplay = require('../models/Gameplay');

const listarGameplays = async (req, res) => {
  try {
    const { champion, tipo } = req.query;
    let filter = {};

    if (champion) filter.champion = champion;
    if (tipo) filter.tipo = tipo;

    const gameplays = await Gameplay.find(filter)
      .populate('champion', 'nome')
      .sort({ criadoEm: -1 });

    res.json(gameplays);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar gameplays", error: error.message });
  }
};

const obterGameplay = async (req, res) => {
  try {
    const { id } = req.params;
    const gameplay = await Gameplay.findById(id).populate('champion', 'nome');

    if (!gameplay) {
      return res.status(404).json({ msg: "Gameplay não encontrado" });
    }

    res.json(gameplay);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao obter gameplay", error: error.message });
  }
};

const obterGameplaysChampion = async (req, res) => {
  try {
    const { id } = req.params;
    const gameplays = await Gameplay.find({ champion: id }).sort({ criadoEm: -1 });

    res.json(gameplays);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar gameplays do campeão", error: error.message });
  }
};

const criarGameplay = async (req, res) => {
  try {
    const { champion, titulo, videoUrl, descricao, tipo } = req.body;

    if (!champion || !titulo || !videoUrl || !descricao) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios" });
    }

    const novoGameplay = await Gameplay.create({
      champion,
      titulo,
      videoUrl,
      descricao,
      tipo: tipo || 'Guide',
    });

    await novoGameplay.populate('champion', 'nome');

    res.status(201).json({ msg: "Gameplay criado com sucesso", gameplay: novoGameplay });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar gameplay", error: error.message });
  }
};

const atualizarGameplay = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, videoUrl, descricao, tipo } = req.body;

    const gameplay = await Gameplay.findById(id);

    if (!gameplay) {
      return res.status(404).json({ msg: "Gameplay não encontrado" });
    }

    if (titulo) gameplay.titulo = titulo;
    if (videoUrl) gameplay.videoUrl = videoUrl;
    if (descricao) gameplay.descricao = descricao;
    if (tipo) gameplay.tipo = tipo;

    await gameplay.save();
    await gameplay.populate('champion', 'nome');

    res.json({ msg: "Gameplay atualizado com sucesso", gameplay });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar gameplay", error: error.message });
  }
};

const deletarGameplay = async (req, res) => {
  try {
    const { id } = req.params;
    const gameplay = await Gameplay.findByIdAndDelete(id);

    if (!gameplay) {
      return res.status(404).json({ msg: "Gameplay não encontrado" });
    }

    res.json({ msg: "Gameplay deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar gameplay", error: error.message });
  }
};

module.exports = { listarGameplays, obterGameplay, obterGameplaysChampion, criarGameplay, atualizarGameplay, deletarGameplay };
