const express = require('express');
const router = express.Router();
const { listarChampions, obterChampionPorId, criarChampion, atualizarChampion, deletarChampion } = require('../controllers/championController');

router.get('/', listarChampions);
router.get('/:id', obterChampionPorId);
router.post('/', criarChampion);
router.put('/:id', atualizarChampion);
router.delete('/:id', deletarChampion);

module.exports = router;
