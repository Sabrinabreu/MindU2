const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
const router = express.Router();
const SECRET_KEY = 'sua_chave_secreta';

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).send('Token não fornecido.');
  }

  // Extrai o token do cabeçalho Authorization no formato 'Bearer <token>'
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('Token não fornecido.');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Falha ao autenticar token.');
    }
    // Armazena os dados do token decodificado (por exemplo, empresa_id)
    console.log("Token decodificado:", decoded); // Verifica o conteúdo do token
    req.userId = decoded.id;
    req.empresaId = decoded.id_referencia; // `id_referencia` é o `empresa_id`
    next();
  });
};


// Rota para criar contas de funcionários
router.post('/contaFuncionarios', verifyToken, async (req, res) => {
  const { cpf, nome, cargo, telefone, email } = req.body;
  const empresa_id = req.empresaId; // Pega o empresa_id do token

  try {
    const [result] = await connection.query(
      'INSERT INTO contaFuncionarios (login, senha, empresa_id, cpf, nome, cargo, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [null, null, empresa_id, cpf, nome, cargo, telefone, email]
    );
    res.status(201).json({ message: 'Conta de funcionário criada com sucesso', id: result.insertId });
  } catch (err) {
    console.error('Erro ao criar conta de funcionário:', err);
    res.status(500).json({ error: 'Erro ao criar conta de funcionário' });
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

// Rota para excluir um registro pelo login
router.delete('/contaFuncionarios/:login', async (req, res) => {
  const { login } = req.params; // Pega o login do funcionário

  try {
    await connection.query('DELETE FROM contaFuncionarios WHERE login = ?', [login]);
    res.json({ message: 'Registro excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir o registro:', err);
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

module.exports = router;