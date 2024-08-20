const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para listar todos os registros
router.get('/cadastroempresa', (req, res) => {
  connection.query('SELECT * FROM cadastroempresa', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastroempresa/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cadastroempresa WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o registro:', err);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});


// Rota para criar um novo registro
router.post('/cadastroempresa', (req, res) => {
  const { nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato } = req.body;
  connection.query('INSERT INTO cadastroempresa (nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato], (err, result) => {
    if (err) {
      console.error('Erro ao criar o registro:', err);
      res.status(500).json({ error: 'Erro ao criar o registro' });
      return;
    }
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  });
});

// Rota para atualizar um registro existente pelo ID
router.put('/cadastroempresa/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato } = req.body;
  connection.query('UPDATE cadastroempresa SET nome = ?, email = ?, telefone = ?, empresa = ?,departamento = ?, qtdfuncionarios = ?, planosaude = ?, contato = ? WHERE ID = ?', 
    [nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o registro:', err);
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
      return;
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
});

// // Rota para atualizar um registro existente pelo ID
// router.put('/cadastroempresaUpdate/:id', (req, res) => {
//   const { id } = req.params;
//   const { telefone } = req.body;
//   connection.query('UPDATE cadastroempresa SET telefone = ? WHERE ID = ?', 
//     [telefone, id], (err, result) => {
//     if (err) {
//       console.error('Erro ao atualizar o registro:', err);
//       res.status(500).json({ error: 'Erro ao atualizar o registro' });
//       return;
//     }
//     res.json({ message: 'Registro atualizado com sucesso' });
//   });
// });

// Rota para excluir um registro pelo ID
router.delete('/cadastroempresa/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM cadastroempresa WHERE ID = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

module.exports = router;