
// routes/cadastroPsicologosRoutes.js
const express = require('express');
const connection = require('./db'); // Ajuste o caminho conforme necessário
const router = express.Router();
const upload = require('../middlewares/multerConfig');

// Rota para criar um novo psicólogo com upload de arquivo
router.post('/cadastropsicologos', upload.single('certificados'), (req, res) => {
  const { nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos } = req.body;
  const arquivo = req.file; // Arquivo enviado

  let certificados = null;
  if (arquivo) {
    certificados = arquivo.path; // Caminho do arquivo no servidor
  }

  connection.query(
    'INSERT INTO cadastropsicologos (nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, caminhoArquivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, dataNascimento, genero, telefone, email, endereco, formacaoAcademica, areasInteresse, preferenciaHorario, disponibilidade, localidades, motivacao, objetivos, caminhoArquivo],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar o registro:', err);
        res.status(500).json({ error: 'Erro ao criar o registro' });
        return;
      }
      res.status(201).json({ message: 'Registro criado com sucesso', id: result.insertId });
    }
  );
});

module.exports = router;
