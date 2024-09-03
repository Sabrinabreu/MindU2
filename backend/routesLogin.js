const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para buscar o login e senha necessários no login
router.post('/login/:login/:senha', async (req, res) => {
  const { login, senha } = req.params;

  try {
    const [results] = await connection.query('SELECT * FROM usuarios WHERE login = ? and senha = ?', [login, senha]);

    if (results.length === 0) {
      res.status(404).json({ error: 'Cadastro não encontrado' });
    } else {
      res.json(results);
    }
  } catch (err) {
    console.error('Erro ao buscar o registro do cadastro:', err);
    res.status(500).json({ error: 'Erro ao buscar o cadastro' });
  }
});

module.exports = router;

