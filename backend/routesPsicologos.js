const express = require('express');
const router = express.Router();

// Rota para buscar psicólogos
const connection = require('./db');
router.get('/psicologos', (req, res) => {
  const { nome, especialidade, localizacao } = req.query;

  let sql = 'SELECT * FROM psicologos WHERE 1=1';
  const params = [];

  if (nome) {
    sql += ' AND nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (especialidade) {
    sql += ' AND especialidade LIKE ?';
    params.push(`%${especialidade}%`);
  }

  if (localizacao) {
    sql += ' AND localizacao LIKE ?';
    params.push(`%${localizacao}%`);
  }

  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar psicólogos' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
