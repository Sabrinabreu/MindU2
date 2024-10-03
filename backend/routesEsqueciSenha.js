const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./db');
const router = express.Router();

// Rota para verificar se o email existe em uma das três tabelas
router.post('/verificar-email', (req, res) => {
  const { email } = req.body;
  // Verifica se o email está na tabela de contaFuncionarios
  connection.query('SELECT pergunta_seguranca, tipo_usuario FROM contaFuncionarios WHERE email = ?', [email], (error, results) => {
    if (results.length > 0) {
      return res.json({ success: true, perguntaSeguranca: results[0].pergunta_seguranca });
    }
    
    // Se não encontrou, verifica na tabela de cadastroempresa
    connection.query('SELECT pergunta_seguranca, tipo_usuario FROM cadastroempresa WHERE email = ?', [email], (error, results) => {
      if (results.length > 0) {
        return res.json({ success: true, perguntaSeguranca: results[0].pergunta_seguranca });
      }

      // Se não encontrou, verifica na tabela de cadastropsicologos
      connection.query('SELECT pergunta_seguranca, tipo_usuario FROM cadastropsicologos WHERE email = ?', [email], (error, results) => {
        if (results.length > 0) {
          return res.json({ success: true, perguntaSeguranca: results[0].pergunta_seguranca });
        }

        // Se não encontrou em nenhuma tabela
        return res.json({ success: false });
      });
    });
  });
});

// Rota para verificar se a resposta da pergunta de segurança está certa
router.post('/verificar-resposta', (req, res) => {
  const { email, respostaSeguranca } = req.body;
  
  // Aqui você precisaria verificar a resposta na tabela correta de acordo com o tipo de usuário que foi encontrado
  connection.query('SELECT resposta_seguranca FROM contaFuncionarios WHERE email = ?', [email], (error, results) => {
    if (results.length > 0) {
      const isMatch = respostaSeguranca === results[0].resposta_seguranca; // Você pode usar bcrypt.compare se a resposta estiver criptografada
      return res.json({ success: isMatch });
    }

    // Verifique nas outras tabelas da mesma forma

    // Se não encontrou em nenhuma tabela
    return res.json({ success: false });
  });
});

// Rota para redefinir a senha
router.post('/redefinir-senha', (req, res) => {
  const { email, novaSenha } = req.body;
  const hashedPassword = bcrypt.hashSync(novaSenha, 10); // Criptografa a nova senha

  // Aqui você precisaria atualizar a senha na tabela correspondente
  connection.query('UPDATE contaFuncionarios SET senha = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
    if (error) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
