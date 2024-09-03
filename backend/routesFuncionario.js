const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para criar novas contas de funcionários
router.post('/contaFuncionarios', async (req, res) => {
  const { login, senha, empresa_id, cpf, nome, cargo, telefone, email } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO contaFuncionarios (login, senha, empresa_id, cpf, nome, cargo, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [login, senha, empresa_id, cpf, nome, cargo, telefone, email]
    );
    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar o registro:', err);
    res.status(500).json({ error: 'Erro ao criar o registro' });
  }
});

// Rota para listar todos os registros de funcionários
router.get('/contaFuncionarios', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM contaFuncionarios');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar os registros:', err);
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

// Rota para atualizar um registro existente pelo ID
router.put('/contaFuncionarios/:id', async (req, res) => {
  const { id } = req.params;
  const { login, senha, cpf, nome, cargo, telefone, email, cadastrado, loginMethod } = req.body;
  try {
    await connection.query(
      'UPDATE contaFuncionarios SET login = ?, senha = ?, cpf = ?, nome = ?, cargo = ?, telefone = ?, email = ?, cadastrado = ?, loginMethod = ? WHERE id = ?',
      [login, senha, cpf, nome, cargo, telefone, email, cadastrado, loginMethod, id]
    );
    res.json({ message: 'Registro atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar o registro:', err);
    res.status(500).json({ error: 'Erro ao atualizar o registro' });
  }
});

// Rota para excluir um registro pelo ID
router.delete('/contaFuncionarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query('DELETE FROM contaFuncionarios WHERE id = ?', [id]);
    res.json({ message: 'Registro excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir o registro:', err);
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

module.exports = router;
