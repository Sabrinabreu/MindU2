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


// Rota para verificar a resposta da pergunta de segurança
router.post('/verificar-resposta', async (req, res) => {
  const { email, respostaSeguranca } = req.body;
  console.log("Email e resposta recebidos no backend:", email, respostaSeguranca);

  try {
    // Verifica na tabela de contaFuncionarios
    const [funcionarios] = await connection.execute('SELECT * FROM contaFuncionarios WHERE email = ?', [email]);
    if (funcionarios.length > 0) {
      if (funcionarios[0].resposta_seguranca === respostaSeguranca) {
        return res.json({ success: true });
      }
    }

    // Se não encontrado, verifica na tabela de cadastroempresa
    const [empresas] = await connection.execute('SELECT * FROM cadastroempresa WHERE email = ?', [email]);
    if (empresas.length > 0) {
      if (empresas[0].resposta_seguranca === respostaSeguranca) {
        return res.json({ success: true });
      }
    }

    // Se não encontrado, verifica na tabela de psicologos
    const [psicologos] = await connection.execute('SELECT * FROM psicologos WHERE email = ?', [email]);
    if (psicologos.length > 0) {
      if (psicologos[0].resposta_seguranca === respostaSeguranca) {
        return res.json({ success: true });
      }
    }

    // resposta incorreta
    return res.json({ success: false });
  } catch (error) {
    console.error("Erro ao verificar resposta:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});


// Rota para redefinir a senha
router.post('/redefinir-senha', async (req, res) => {
  const { email, novaSenha } = req.body;
  console.log("Email e nova senha recebidos no backend:", email, novaSenha);

  try {
    // Atualiza a senha na tabela de contaFuncionarios
    const [resultFunc] = await connection.execute('UPDATE contaFuncionarios SET senha = ? WHERE email = ?', [novaSenha, email]);
    if (resultFunc.affectedRows > 0) {
      return res.json({ success: true });
    }

    // Atualiza a senha na tabela de cadastroempresa
    const [resultEmp] = await connection.execute('UPDATE cadastroempresa SET senha = ? WHERE email = ?', [novaSenha, email]);
    if (resultEmp.affectedRows > 0) {
      return res.json({ success: true });
    }

    // Atualiza a senha na tabela de psicologos
    const [resultPsi] = await connection.execute('UPDATE psicologos SET senha = ? WHERE email = ?', [novaSenha, email]);
    if (resultPsi.affectedRows > 0) {
      return res.json({ success: true });
    }

    // Se o email não foi encontrado em nenhuma tabela
    return res.json({ success: false });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});



module.exports = router;
