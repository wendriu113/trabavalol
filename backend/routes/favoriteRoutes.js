const express = require('express');
const router = express.Router();
const { obterFavoritos, adicionarFavorito, removerFavorito, verificarFavorito } = require('../controllers/favoriteController');

router.get('/', obterFavoritos);
router.post('/add', adicionarFavorito);
router.delete('/remove', removerFavorito);
router.get('/:championId/check', verificarFavorito);

module.exports = router;
