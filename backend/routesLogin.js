const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
const router = express.Router();

// Chave secreta para assinar o token
const SECRET_KEY = 'sua_chave_secreta';

// Rota para login
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca o usuário na tabela "usuarios"
    const [results] = await connection.query('SELECT * FROM usuarios WHERE login = ? AND senha = ?', [login, senha]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }

    const usuario = results[0];
    
    // Informações que serão armazenadas no token
    const payload = {
      id: usuario.id,
      tipo_usuario: usuario.tipo_usuario,
      id_referencia: usuario.id_referencia // Esse é o ID da empresa, psicólogo ou funcionário
    };

    // Gera o token JWT com uma duração de 1 hora
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token e outras informações relevantes
    res.json({ token, tipo_usuario: usuario.tipo_usuario, id_referencia: usuario.id_referencia });
  } catch (err) {
    console.error('Erro ao autenticar o usuário:', err);
    res.status(500).json({ error: 'Erro ao processar o login' });
  }
});

module.exports = router;
