const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para verificar se o email existe em uma das 3 tabelas
router.post('/verificar-email', async (req, res) => {
  const { email } = req.body;
  console.log("Email recebido no backend:", email);

  try {
    // Verifica se o email está na tabela de contaFuncionarios
    const [funcionarios] = await connection.execute('SELECT * FROM contaFuncionarios WHERE email = ?', [email]);
    if (funcionarios.length > 0) {
      return res.json({ success: true });
    }

    // Se não encontrado, verifica na tabela de cadastroempresa
    const [empresas] = await connection.execute('SELECT * FROM cadastroempresa WHERE email = ?', [email]);
    if (empresas.length > 0) {
      return res.json({ success: true });
    }

    // Se não encontrado, verifica na tabela de psicologos
    const [psicologos] = await connection.execute('SELECT * FROM psicologos WHERE email = ?', [email]);
    if (psicologos.length > 0) {
      return res.json({ success: true });
    }

    // Se não encontrado em nenhuma tabela, retorna falha
    return res.json({ success: false });
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});

module.exports = router;
