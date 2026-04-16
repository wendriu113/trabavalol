const Ability = require('../models/Ability');

const listarAbilidades = async (req, res) => {
  try {
    const { champion, tecla } = req.query;
    let filter = {};

    if (champion) filter.champion = champion;
    if (tecla) filter.tecla = tecla;

    const abilities = await Ability.find(filter)
      .populate('champion', 'nome')
      .sort({ tecla: 1 });

    res.json(abilities);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar habilidades", error: error.message });
  }
};

const obterAbilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const ability = await Ability.findById(id).populate('champion', 'nome');

    if (!ability) {
      return res.status(404).json({ msg: "Habilidade não encontrada" });
    }

    res.json(ability);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao obter habilidade", error: error.message });
  }
};

const obterAbilidadesChampion = async (req, res) => {
  try {
    const { id } = req.params;
    const abilities = await Ability.find({ champion: id }).sort({ tecla: 1 });

    res.json(abilities);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao listar habilidades do campeão", error: error.message });
  }
};

const criarAbilidade = async (req, res) => {
  try {
    const { nome, tecla, descricao, danoBase, champion } = req.body;

    if (!nome || !tecla || !descricao || danoBase === undefined || !champion) {
      return res.status(400).json({ msg: "Preencha todos os campos obrigatórios" });
    }

    const novaAbilidade = await Ability.create({
      nome,
      tecla,
      descricao,
      danoBase,
      champion,
    });

    await novaAbilidade.populate('champion', 'nome');

    res.status(201).json({ msg: "Habilidade criada com sucesso", ability: novaAbilidade });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar habilidade", error: error.message });
  }
};

const atualizarAbilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tecla, descricao, danoBase } = req.body;

    const ability = await Ability.findById(id);

    if (!ability) {
      return res.status(404).json({ msg: "Habilidade não encontrada" });
    }

    if (nome) ability.nome = nome;
    if (tecla) ability.tecla = tecla;
    if (descricao) ability.descricao = descricao;
    if (danoBase !== undefined) ability.danoBase = danoBase;

    await ability.save();
    await ability.populate('champion', 'nome');

    res.json({ msg: "Habilidade atualizada com sucesso", ability });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar habilidade", error: error.message });
  }
};

const deletarAbilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const ability = await Ability.findByIdAndDelete(id);

    if (!ability) {
      return res.status(404).json({ msg: "Habilidade não encontrada" });
    }

    res.json({ msg: "Habilidade deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar habilidade", error: error.message });
  }
};

module.exports = { listarAbilidades, obterAbilidade, obterAbilidadesChampion, criarAbilidade, atualizarAbilidade, deletarAbilidade };
