const express = require('express');
const connection = require('./db'); // A conexão deve ser um pool
const router = express.Router();

// Rota para criar um novo agendamento
router.post('/agendamentos', async (req, res) => {
    const { psicologo_id, data, horario, tipo, assunto } = req.body;

    console.log('Dados recebidos:', { psicologo_id, data, horario, tipo, assunto });

    // Validação dos campos obrigatórios
    if (!psicologo_id || !data || !horario || !tipo) {
        console.log('Dados inválidos:', { psicologo_id, data, horario, tipo, assunto });
        return res.status(400).json({ error: 'Os campos psicólogo, data, horário e tipo são obrigatórios.' });
    }

    try {
        const [result] = await connection.query(
            'INSERT INTO agendamentos (psicologo_id, data, horario, tipo, assunto) VALUES (?, ?, ?, ?, ?)',
            [psicologo_id, data, horario, tipo, assunto]
        );
        console.log('Agendamento criado com sucesso!', result);
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (err) {
        console.error('Erro ao criar o agendamento:', err);
        res.status(500).json({ error: 'Erro ao criar o agendamento' });
    }
});

// Rota para listar todos os agendamentos
router.get('/agendamentos', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM agendamentos');
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});

module.exports = router;