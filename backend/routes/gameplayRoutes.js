const express = require('express');
const router = express.Router();
const { listarGameplays, obterGameplay, obterGameplaysChampion, criarGameplay, atualizarGameplay, deletarGameplay } = require('../controllers/gameplayController');

router.get('/', listarGameplays);
router.post('/', criarGameplay);
router.get('/champion/:id', obterGameplaysChampion);
router.get('/:id', obterGameplay);
router.put('/:id', atualizarGameplay);
router.delete('/:id', deletarGameplay);

module.exports = router;
