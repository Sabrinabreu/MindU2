const express = require('express');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Rota para verificar se o email existe em uma das 3 tabelas
router.post('/verificar-email', async (req, res) => {
  const { email } = req.body;

  try {
    const [funcionarios] = await connection.execute('SELECT * FROM contaFuncionarios WHERE login = ?', [email]);
    if (funcionarios.length > 0) {
      return res.json({ success: true });
    }
    const [empresas] = await connection.execute('SELECT * FROM cadastroempresa WHERE email = ?', [email]);
    if (empresas.length > 0) {
      return res.json({ success: true });
    }
    const [psicologos] = await connection.execute('SELECT * FROM psicologos WHERE email = ?', [email]);
    if (psicologos.length > 0) {
      return res.json({ success: true });
    }
    return res.json({ success: false });
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});


// Rota para verificar a resposta da pergunta de segurança em todas as tabelas
router.post('/verificar-resposta', async (req, res) => {
  const { email, respostaSeguranca } = req.body;

  try {
    const [funcionarios] = await connection.execute('SELECT resposta_seguranca FROM contaFuncionarios WHERE login = ?', [email]);
    if (funcionarios.length > 0 && funcionarios[0].resposta_seguranca === respostaSeguranca) {
      return res.json({ success: true });
    }
    const [empresas] = await connection.execute('SELECT resposta_seguranca FROM cadastroempresa WHERE email = ?', [email]);
    if (empresas.length > 0 && empresas[0].resposta_seguranca === respostaSeguranca) {
      return res.json({ success: true });
    }
    const [psicologos] = await connection.execute('SELECT resposta_seguranca FROM psicologos WHERE email = ?', [email]);
    if (psicologos.length > 0 && psicologos[0].resposta_seguranca === respostaSeguranca) {
      return res.json({ success: true });
    }
    return res.json({ success: false, message: 'Resposta incorreta.' });
  } catch (error) {
    console.error("Erro ao verificar resposta de segurança:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

router.post('/redefinir-senha', async (req, res) => {
  const { email, novaSenha } = req.body;

  try {
    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(novaSenha, saltRounds);

    const [resultFunc] = await connection.execute('UPDATE contaFuncionarios SET senha = ? WHERE login = ?', [hashedPassword, email]);
    if (resultFunc.affectedRows > 0) {
      return res.json({ success: true });
    }
    const [resultEmp] = await connection.execute('UPDATE cadastroempresa SET senha = ? WHERE email = ?', [hashedPassword, email]);
    if (resultEmp.affectedRows > 0) {
      return res.json({ success: true });
    }
    const [resultPsi] = await connection.execute('UPDATE psicologos SET senha = ? WHERE email = ?', [hashedPassword, email]);
    if (resultPsi.affectedRows > 0) {
      return res.json({ success: true });
    }

    return res.json({ success: false });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});



module.exports = router;
