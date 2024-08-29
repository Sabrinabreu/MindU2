const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para criar novas contas de funcionarios
router.post('/login', (req, res) => {
  const { login, senha } = req.body;
  connection.query('INSERT INTO usuarios () VALUES ()', 
    [login, senha], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});


// Rota para listar todos os registros de funcionários
router.get('/login', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/login/:id', (req, res) => {
  const { id } = req.params;
  const { login, senha } = req.body;
  connection.query('UPDATE usuarios SET login = ?, senha = ? WHERE id = ?', 
    [login, senha, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// Rota para excluir um registro pelo login
router.delete('/login/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE login = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

module.exports = router;