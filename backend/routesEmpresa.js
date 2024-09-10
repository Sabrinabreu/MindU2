const express = require('express');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Rota para listar todos os registros
router.get('/cadastroempresa', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM cadastroempresa');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar os registros:', err);
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

// Rota para buscar um registro específico pelo ID
router.get('/cadastroempresa/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query('SELECT * FROM cadastroempresa WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
      return;
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Erro ao buscar o registro:', err);
    res.status(500).json({ error: 'Erro ao buscar o registro' });
  }
});


// criar novo registro
router.post('/cadastroempresa', async (req, res) => {
  const { nome, empresa, telefone, email, departamento, qtdfuncionarios, planosaude, contato, senha } = req.body;

  try {
    const { email, senha, ...rest } = req.body;

      // Verifica se o email já está registrado
      const [existingUser] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Email já cadastrado. Por favor, escolha outro.' });
      }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const [result] = await connection.query(
      'INSERT INTO cadastroempresa (nome, empresa, telefone, email, departamento, qtdfuncionarios, planosaude, contato, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, empresa, telefone, email, departamento, qtdfuncionarios, planosaude, contato, hashedPassword]
    );

    res.status(201).json({ message: 'Empresa cadastrada com sucesso', id: result.insertId });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email já cadastrado. Por favor, use um email diferente.' });
    } else {
      console.error('Erro ao cadastrar a empresa:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
});



// app.post('/cadastrar-empresa', async (req, res) => {
//   const { nome, email, telefone, departamento, qtdfuncionarios, planosaude, contato } = req.body;
//   const [result] = await db.query(
//       `INSERT INTO empresa (nome, email, telefone, departamento, qtdfuncionarios, planosaude, contato)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`, [nome, email, telefone, departamento, qtdfuncionarios, planosaude, contato]
//   );
//   const empresaId = result.insertId;
//   await db.query(
//       `INSERT INTO usuarios (login, senha, tipo_usuario, id_referencia)
//        VALUES (?, ?, 'empresa', ?)`, [email, 'senha123', empresaId]
//   );
//   res.status(201).send('Empresa cadastrada com sucesso');
// });

// Rota para atualizar um registro existente pelo ID
router.put('/cadastroempresa/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato, senha } = req.body;
  try {
    await connection.query(
      'UPDATE cadastroempresa SET nome = ?, email = ?, telefone = ?, empresa = ?, departamento = ?, qtdfuncionarios = ?, planosaude = ?, contato = ? WHERE id = ?', 
      [nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato, id]
    );
    res.json({ message: 'Registro atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar o registro:', err);
    res.status(500).json({ error: 'Erro ao atualizar o registro' });
  }
});

// // Rota para atualizar um registro existente pelo ID
// router.put('/cadastroempresaUpdate/:id', (req, res) => {
//   const { id } = req.params;
//   const { telefone } = req.body;
//   connection.query('UPDATE cadastroempresa SET telefone = ? WHERE ID = ?', 
//     [telefone, id], (err, result) => {
//     if (err) {
//       console.error('Erro ao atualizar o registro:', err);
//       res.status(500).json({ error: 'Erro ao atualizar o registro' });
//       return;
//     }
//     res.json({ message: 'Registro atualizado com sucesso' });
//   });
// });

// Rota para excluir um registro pelo ID
router.delete('/cadastroempresa/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query('DELETE FROM cadastroempresa WHERE id = ?', [id]);
    res.json({ message: 'Registro excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir o registro:', err);
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

module.exports = router;