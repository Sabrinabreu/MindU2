const express = require('express');
const connection = require('./db'); // Ajuste o caminho conforme necessário
const router = express.Router();

// Rota para listar todos os registros
router.get('/cadastropsicologos', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM cadastropsicologos');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar os registros:', err);
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastropsicologos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query('SELECT * FROM cadastropsicologos WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Erro ao buscar o registro:', err);
    res.status(500).json({ error: 'Erro ao buscar o registro' });
  }
});

// Rota para atualizar um registro existente pelo ID
router.put('/cadastropsicologos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, senha } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE cadastropsicologos SET nome = ?, dataNascimento = ?, genero = ?, telefone = ?, email = ?, endereco = ?, formacaoAcademica = ?, areasInteresse = ?, preferenciaHorario = ?, disponibilidade = ?, localidades = ?, motivacao = ?, objetivos = ?, senha = ? WHERE id = ?',
      [nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, senha, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json({ message: 'Registro atualizado com sucesso' });
    }
  } catch (err) {
    console.error('Erro ao atualizar o registro:', err);
    res.status(500).json({ error: 'Erro ao atualizar o registro' });
  }
});

// Rota para excluir um registro pelo ID
router.delete('/cadastropsicologos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM cadastropsicologos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json({ message: 'Registro excluído com sucesso' });
    }
  } catch (err) {
    console.error('Erro ao excluir o registro:', err);
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

// Rota para criar um novo registro
router.post('/cadastropsicologos', async (req, res) => {
  const { nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, senha } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO cadastropsicologos (nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, senha]
    );
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar o registro:', err);
    res.status(500).json({ error: 'Erro ao criar o registro' });
  }
});

module.exports = router;
