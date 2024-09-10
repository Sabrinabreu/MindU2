const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Chave secreta para assinar o token
const SECRET_KEY = 'sua_chave_secreta';

// Rota para login
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Verifica se o usuário é um funcionário, psicólogo ou empresa
    const [userResult] = await connection.query('SELECT * FROM usuarios WHERE login = ? AND senha = ?', [login, senha]);

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }

    const usuario = userResult[0];
    let userData = {};

    // Verifica o tipo de usuário e busca as informações adicionais
    if (usuario.tipo_usuario === 'empresa') {
      const [empresaData] = await connection.query('SELECT * FROM cadastroempresa WHERE ID = ?', [usuario.id_referencia]);
      userData = empresaData[0];
    } else if (usuario.tipo_usuario === 'funcionario') {
      const [funcionarioData] = await connection.query('SELECT * FROM contaFuncionarios WHERE id = ?', [usuario.id_referencia]);
      userData = funcionarioData[0];
    } else if (usuario.tipo_usuario === 'psicologo') {
      const [psicologoData] = await connection.query('SELECT * FROM cadastropsicologos WHERE id = ?', [usuario.id_referencia]);
      userData = psicologoData[0];
    }

    // Informações que serão armazenadas no token
    const payload = {
      id: usuario.id,
      tipo_usuario: usuario.tipo_usuario,
      id_referencia: usuario.id_referencia,  // ID relacionado ao tipo de usuário (empresa, funcionário ou psicólogo)
      perfil: userData  // Informações adicionais do perfil (empresa, funcionário ou psicólogo)
    };

    // Gera o token JWT com uma duração de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token e as informações adicionais para o frontend
    res.json({ token, perfil: userData });
  } catch (err) {
    console.error('Erro ao autenticar o usuário:', err);
    res.status(500).json({ error: 'Erro ao processar o login' });
  }
});


module.exports = router;
