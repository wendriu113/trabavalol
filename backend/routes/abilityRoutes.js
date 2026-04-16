const express = require('express');
const router = express.Router();
const { listarAbilidades, obterAbilidade, obterAbilidadesChampion, criarAbilidade, atualizarAbilidade, deletarAbilidade } = require('../controllers/abilityController');

router.get('/', listarAbilidades);
router.post('/', criarAbilidade);
router.get('/champion/:id', obterAbilidadesChampion);
router.get('/:id', obterAbilidade);
router.put('/:id', atualizarAbilidade);
router.delete('/:id', deletarAbilidade);

module.exports = router;
