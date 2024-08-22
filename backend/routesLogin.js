const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para criar novas contas de funcionarios
router.post('/contaPrvsFuncionarios', (req, res) => {
  const { login, senha } = req.body;
  connection.query('INSERT INTO contaPrvsFuncionarios () VALUES ()', 
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
router.get('/contaPrvsFuncionarios', (req, res) => {
  connection.query('SELECT * FROM contaPrvsFuncionarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/contaPrvsFuncionarios/:id', (req, res) => {
  const { id } = req.params;
  const { login, senha } = req.body;
  connection.query('UPDATE contaPrvsFuncionarios SET login = ?, senha = ? WHERE id = ?', 
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
router.delete('/contaPrvsFuncionarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM contaPrvsFuncionarios WHERE login = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

module.exports = router;