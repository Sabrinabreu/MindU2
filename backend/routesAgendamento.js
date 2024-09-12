const express = require('express');
const connection = require('./db');
const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', (req, res) => {
    const { usuario_id, psicologo_id, data, horario, tipo, assunto } = req.body;

    console.log('Dados recebidos:', { usuario_id, psicologo_id, data, horario, tipo, assunto });

    if (!usuario_id || !psicologo_id || !data || !horario || !tipo) {
        console.log('Dados inválidos:', { usuario_id, psicologo_id, data, horario, tipo, assunto });
        return res.status(400).json({ error: 'Todos os campos obrigatórios são necessários.' });
    }

    connection.query(
        'INSERT INTO agendamentos (usuario_id, psicologo_id, data, horario, tipo, assunto) VALUES (?, ?, ?, ?, ?, ?)',
        [usuario_id, psicologo_id, data, horario, tipo, assunto],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar o agendamento:', err);
                return res.status(500).json({ error: 'Erro ao criar o agendamento' });
            }
            console.log('Agendamento criado com sucesso!');
            res.status(201).json({ message: 'Agendamento criado com sucesso!' });
        }
    );    
});

// Rota para listar todos os agendamentos
router.get('/', (req, res) => {
    connection.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
        }
        res.json(results);
    });
});

module.exports = router;

