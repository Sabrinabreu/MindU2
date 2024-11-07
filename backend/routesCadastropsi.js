const express = require('express');
const multer = require('multer');
const path = require('path');
const connection = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const { error } = require('console');

const saltRounds = 10;

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Somente imagens e PDFs são permitidos.'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // Limite de tamanho do arquivo
});

// Rota para upload de arquivos
router.post('/psicologos/upload', upload.single('certificados'), (req, res) => {


  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    res.json({ message: 'Arquivo enviado com sucesso', filename: req.file.filename });
  } catch (err) {
    console.error('Erro ao enviar o arquivo:', err);
    res.status(500).json({ error: 'Erro ao enviar o arquivo' });
  }
});

// Rota para listar todos os registros
router.get('/psicologos', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM psicologos');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar os registros:', err);
    res.status(500).json({ error: 'Erro ao buscar os registros' });
  }
});

// Rota para buscar um registro específico pelo ID
router.get('/psicologos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Erro ao buscar o registro:', err);
    res.status(500).json({ error: 'Erro ao buscar o registro' });
  }
});

// Rota para atualizar um registro existente pelo ID
router.put('/psicologos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, dataNascimento, genero, telefone, email, CPF, crp, endereco, certificados, especialidade, preferenciaHorario, disponibilidade, localizacao, motivacao, objetivos, senha } = req.body;

  // Validação dos dados
  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  try {
    const updateFields = ['nome', 'dataNascimento', 'genero', 'telefone', 'email', 'CPF', 'crp', 'endereco', 'certificados', 'especialidade', 'preferenciaHorario', 'disponibilidade', 'localizacao', 'motivacao', 'objetivos'];
    const values = [nome, dataNascimento, genero, telefone, email, CPF, crp, endereco, certificados, especialidade, preferenciaHorario, disponibilidade, localizacao, motivacao, objetivos, id];

    if (senha) {
      // Criptografa a senha se fornecida
      const hashedPassword = await bcrypt.hash(senha, saltRounds);
      updateFields.push('senha');


      values.splice(-1, 1, hashedPassword); // Substitui o último valor (id) pelo hash da senha
    }

    const setClause = updateFields.map(field => `${field} = ?`).join(', ');

    const [result] = await connection.query(
      `UPDATE psicologos SET ${setClause} WHERE psicologo_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json({ message: 'Registro atualizado com sucesso' });
    }
  } catch (err) {
    console.error('Erro ao atualizar o registro:', err);
    res.status(500).json({ error: 'Erro ao atualizar o registro' });
  }
});

// Rota para excluir um registro pelo ID
router.delete('/psicologos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.query('DELETE FROM psicologos WHERE psicologo_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Registro não encontrado' });
    } else {
      res.json({ message: 'Registro excluído com sucesso' });
    }
  } catch (err) {
    console.error('Erro ao excluir o registro:', err);
    res.status(500).json({ error: 'Erro ao excluir o registro' });
  }
});

// Rota para criar um novo registro
router.post('/psicologos', upload.single('certificados'), async (req, res) => {
  const { nome, dataNascimento, genero, telefone, email, CPF, crp, endereco, especialidade, preferenciaHorario, disponibilidade, localizacao, motivacao, objetivos, senha } = req.body;
  const certificados = req.file ? req.file.filename : null; // Pega o nome do arquivo enviado

  // Validação dos dados
  if (!nome || !dataNascimento || !genero || !telefone || !email || !CPF || !crp || !especialidade || !preferenciaHorario || !disponibilidade || !localizacao || !motivacao || !objetivos || !senha) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const [result] = await connection.query(
      'INSERT INTO psicologos (nome, dataNascimento, genero, telefone, email, CPF, crp, endereco, especialidade, preferenciaHorario, disponibilidade, localizacao, motivacao, objetivos, senha, certificados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, dataNascimento, genero, telefone, email, CPF, crp, endereco, especialidade, preferenciaHorario, disponibilidade, localizacao, motivacao, objetivos, hashedPassword, certificados]
    );

    res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      // Verifica qual campo causou a duplicidade
      if (err.message.includes('CPF')) {
        return res.status(400).json({ error: 'CPF já cadastrado.' });

      }
    }

    console.error('Erro ao criar o registro:', err);
    res.status(500).json({ error: 'Erro ao criar o registro' });
  }

});



module.exports = router;
