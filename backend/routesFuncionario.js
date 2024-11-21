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

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send('Token não fornecido.');
  }

  console.log("Token recebido:", token); // Log do token recebido

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Falha ao autenticar token.');
    }

    req.empresaId = decoded.id_referencia;
    if (!req.empresaId) {
      return res.status(403).send('Empresa não identificada no token.');
    }

    next();
  });
};

// Rota para criar contas de funcionários
router.post('/contaFuncionarios', verifyToken, async (req, res) => {
  const { nomePlano, cpf, nome, cargo, telefone } = req.body;
  const empresa_id = req.empresaId;

  // console.log("Inserindo plano:", nomePlano);

  try {
      const [result] = await connection.query(
          'INSERT INTO contaFuncionarios (empresa_id, nomePlano, cpf, nome, cargo, telefone) VALUES (?, ?, ?, ?, ?, ?)',
          [empresa_id, nomePlano, cpf, nome, cargo, telefone]
      );
      res.status(201).json({ message: 'Conta de funcionário criada com sucesso', id: result.insertId });
  } catch (err) {
      console.error('Erro ao criar conta de funcionário:', err);
      res.status(500).json({ error: 'Erro ao criar conta de funcionário' });
  }
});


// Rota para listar registros de funcionários da empresa
router.get('/contaFuncionarios', verifyToken, async (req, res) => {
  try {
    const { loginMethod } = req.query; 
    const { empresaId } = req;

    // console.log('Empresa ID recebido na rota:', empresaId);
    // console.log('Filtro loginMethod:', loginMethod);

    let query = 'SELECT * FROM contaFuncionarios WHERE empresa_id = ?';
    const params = [empresaId];

    if (loginMethod) {
      query += ' AND loginMethod = ?';
      params.push(loginMethod);
    }

    const [results] = await connection.query(query, params);

    if (results.length === 0) {
      return res.status(404).json({ message: 'Nenhum funcionário encontrado para esta empresa.' });
    }

    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar os registros:', err);
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

  // Rota para buscar a quantidade de funcionários em cada plano da empresa
  router.get('/empresa/:empresaId/planos', async (req, res) => {
    const { empresaId } = req.params;
    try {
        const query = `
            SELECT nomePlano AS plano, COUNT(*) AS qtd_funcionarios
            FROM contaFuncionarios
            WHERE empresa_id = ?
            GROUP BY nomePlano
        `;
        const [results] = await connection.query(query, [empresaId]);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar os planos da empresa:', err);
        res.status(500).json({ error: 'Erro ao buscar os planos da empresa' });
    }
  });


// Rota para atualizar um registro existente pelo ID
router.put('/contaFuncionarios/:id', async (req, res) => {
  const { id } = req.params;
  const { login, senha, cpf, nome, cargo, telefone, cadastrado, loginMethod } = req.body;

  try {
    await connection.query(
      'UPDATE contaFuncionarios SET login = ?, senha = ?, cpf = ?, nome = ?, cargo = ?, telefone = ?, cadastrado = ?, loginMethod = ? WHERE id = ?',
      [login, senha, cpf, nome, cargo, telefone, cadastrado, loginMethod, id]
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