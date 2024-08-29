const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', (req, res) => {
  const { userId, data, tipo, time, assunto } = req.body;
  console.log('Dados recebidos:', { userId, data, tipo, time, assunto });

  if (!userId || !data || !tipo || !time || !assunto) {
    console.log('Dados inválidos:', { userId, data, tipo, time, assunto });
    res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    return;
  }

  connection.query(
    'INSERT INTO agendamento (userId, data, time, tipo, assunto) VALUES (?, ?, ?, ?, ?)',
    [userId, data, time, tipo, assunto],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar o agendamento:', err);
        res.status(500).json({ error: 'Erro ao criar o agendamento' });
        return;
      }
      console.log('Agendamento criado com sucesso!');
      res.json({ message: 'Agendamento criado com sucesso!' });
    }
  );
});


router.get('/agendamentos', (req, res) => {
  connection.query('SELECT * FROM agendamentos', (err, results) => {
    if (err) {
      console.error('Erro ao buscar agendamentos:', err);
      res.status(500).json({ error: 'Erro ao buscar agendamentos' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
