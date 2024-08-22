// routes/cadastroPsicologosRoutes.js
const express = require('express');
const connection = require('./db'); // Ajuste o caminho conforme necessário
const router = express.Router();

// Rota para listar todos os registros
router.get('/cadastropsicologos', (req, res) => {
  connection.query('SELECT * FROM cadastropsicologos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar os registros:', err);
      res.status(500).json({ error: 'Erro ao buscar os registros' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastropsicologos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM cadastropsicologos WHERE id = ?', [id], (err, results) => {
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

// Rota para atualizar um registro existente pelo ID
router.put('/cadastropsicologos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos } = req.body;
  connection.query('UPDATE cadastropsicologos SET nome = ?, dataNascimento = ?, genero = ?, telefone = ?, email = ?, endereco = ?, formacaoAcademica = ?, areasInteresse = ?, preferenciaHorario = ?, disponibilidade = ?, localidades = ?, motivacao = ?, objetivos = ? WHERE id = ?',
    [nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, id], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar o registro:', err);
        res.status(500).json({ error: 'Erro ao atualizar o registro' });
        return;
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    });
});

// Rota para excluir um registro pelo ID
router.delete('/cadastropsicologos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM cadastropsicologos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o registro:', err);
      res.status(500).json({ error: 'Erro ao excluir o registro' });
      return;
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
});

// Rota para criar um novo registro
router.post('/cadastropsicologos', (req, res) => {
  const { nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos } = req.body;
  connection.query(
    'INSERT INTO cadastropsicologos (nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    }
  );
});

module.exports = router;
