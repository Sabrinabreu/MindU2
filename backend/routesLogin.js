const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');

const SECRET_KEY = 'sua_chave_secreta';

// Rota para login
router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca o usuário pelo login
    const [userResult] = await connection.query('SELECT * FROM usuarios WHERE login = ?', [login]);

    if (userResult.length === 0) {
      return res.status(404).json({ error: 'Usuário ou senha incorretos' });
    }


    console.log('Dados do usuário: ', userResult);


    const usuario = userResult[0];
    let userData = {};

    // Verificação específica para funcionários
    if (usuario.tipo_usuario === 'funcionario') {
      const [funcionarioResult] = await connection.query(
        'SELECT loginMethod FROM contaFuncionarios WHERE id = ?',
        [usuario.id_referencia]
      );

      // Se loginMethod for 'login_temporario', a comparação é simples
      if (funcionarioResult[0].loginMethod === 'login_temporario') {
        if (senha !== usuario.senha) {
          return res.status(404).json({ error: 'Usuário ou senha incorretos' });
        }
      } else {
        // Caso contrário, usa bcrypt para comparar senha criptografada
        const match = await bcrypt.compare(senha, usuario.senha);
        if (!match) {
          return res.status(404).json({ error: 'Usuário ou senha incorretos' });
        }
      }
    } else {
      // Para outros usuários (empresa e psicólogo), usa bcrypt diretamente
      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) {
        return res.status(404).json({ error: 'Usuário ou senha incorretos' });
        
      }
    }

    // Verifica o tipo de usuário e busca as informações adicionais
    if (usuario.tipo_usuario === 'empresa') {
      const [empresaData] = await connection.query('SELECT * FROM cadastroempresa WHERE ID = ?', [usuario.id_referencia]);
      userData = empresaData[0];
    } else if (usuario.tipo_usuario === 'funcionario') {
      const [funcionarioData] = await connection.query('SELECT * FROM contaFuncionarios WHERE id = ?', [usuario.id_referencia]);
      userData = funcionarioData[0];
    } else if (usuario.tipo_usuario === 'psicologo') {
      const [psicologoData] = await connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [usuario.id_referencia]);
      userData = psicologoData[0];
    }

    // Informações que serão armazenadas no token
    const payload = {
      id: usuario.id,
      tipo_usuario: usuario.tipo_usuario,
      id_referencia: usuario.id_referencia,
      perfil: userData  // Informações adicionais do perfil
    };

    // Gera um novo token JWT
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token e as informações adicionais para o frontend
    res.json({ token, perfil: userData });
  } catch (err) {
    console.error('Erro ao autenticar o usuário:', err);
    res.status(500).json({ error: 'Erro ao processar o login' });
  }

});

module.exports = router;