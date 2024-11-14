const express = require('express');
const connection = require('./db');
const router = express.Router();

router.post('/agendamentos', async (req, res) => {
    const { psicologo_id, nome_paciente, data, horario_inicio, tipo, assunto } = req.body;

    console.log('Dados recebidos:', { psicologo_id, nome_paciente, data, horario_inicio, tipo, assunto });

    if (!psicologo_id || !data || !horario_inicio || !tipo) {
        console.log('Dados inválidos:', { psicologo_id, data, horario_inicio, tipo, assunto });
        return res.status(400).json({ error: 'Os campos psicólogo, data, horário de início e tipo são obrigatórios.' });
    }    

    try {
        const [result] = await connection.query(
            'INSERT INTO agendamentos (psicologo_id, nome_paciente, data, horario_inicio, tipo, assunto) VALUES (?, ?, ?, ?, ?, ?)',
            [psicologo_id, nome_paciente, data, horario_inicio, tipo, assunto]
        );
        console.log('Agendamento criado com sucesso!', result);
        res.status(201).json({ message: 'Agendamento criado com sucesso!' });
    } catch (err) {
        console.error('Erro ao criar o agendamento:', err);
        res.status(500).json({ error: 'Erro ao criar o agendamento', details: err.message });
    }
});


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