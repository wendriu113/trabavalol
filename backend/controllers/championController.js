const Champion = require('../models/Champion');

const listarChampions = async (req, res) => {
  try {
    const { funcao, dificuldade, nome } = req.query;
    let filter = {};

    if (funcao) filter.funcao = funcao;
    if (dificuldade) filter.dificuldade = dificuldade;
    if (nome) filter.nome = { $regex: nome, $options: 'i' };

    const champions = await Champion.find(filter).sort({ criadoEm: -1 });

    res.json(champions);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar campeões", error: error.message });
  }
};

const obterChampionPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const champion = await Champion.findById(id);

    if (!champion) {
      return res.status(404).json({ msg: "Campeão não encontrado" });
    }

    res.json(champion);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao obter campeão", error: error.message });
  }
};

const criarChampion = async (req, res) => {
  try {
    const { nome, funcao, dificuldade, descricao, imagem } = req.body;

    if (!nome || !funcao || !dificuldade || !descricao || !imagem) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios" });
    }

    const novoChampion = await Champion.create({
      nome,
      funcao,
      dificuldade,
      descricao,
      imagem,
    });

    res.status(201).json({ msg: "Campeão criado com sucesso", champion: novoChampion });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar campeão", error: error.message });
  }
};

const atualizarChampion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, funcao, dificuldade, descricao, imagem } = req.body;

    const champion = await Champion.findById(id);

    if (!champion) {
      return res.status(404).json({ msg: "Campeão não encontrado" });
    }

    if (nome) champion.nome = nome;
    if (funcao) champion.funcao = funcao;
    if (dificuldade) champion.dificuldade = dificuldade;
    if (descricao) champion.descricao = descricao;
    if (imagem) champion.imagem = imagem;

    await champion.save();

    res.json({ msg: "Campeão atualizado com sucesso", champion });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar campeão", error: error.message });
  }
};

const deletarChampion = async (req, res) => {
  try {
    const { id } = req.params;
    const champion = await Champion.findByIdAndDelete(id);

    if (!champion) {
      return res.status(404).json({ msg: "Campeão não encontrado" });
    }

    res.json({ msg: "Campeão deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar campeão", error: error.message });
  }
};

module.exports = { listarChampions, obterChampionPorId, criarChampion, atualizarChampion, deletarChampion };
