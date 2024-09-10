const express = require('express');
const connection = require('./db');
const router = express.Router();

router.post('/', (req, res) => {
    const { userId, data, tipo, time, assunto, nomePsico } = req.body;
    console.log('Dados recebidos:', { userId, data, tipo, time, assunto, nomePsico });

    if (!userId || !data || !tipo || !time || !assunto || !nomePsico) {
        console.log('Dados inválidos:', { userId, data, tipo, time, assunto, nomePsico });
        res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        return;
    }

    connection.query(
        'INSERT INTO agendamento (userId, data, time, tipo, assunto, nomePsico) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, data, time, tipo, assunto, nomePsico],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar o agendamento:', err);
                res.status(500).json({ error: 'Erro ao criar o agendamento' });
                return;
            }
            console.log('Agendamento criado com sucesso!'); // Log de sucesso no backend
            console.log('Antes de responder com sucesso'); // Log para ver se esta linha é atingida
            res.status(200).json({ message: 'Agendamento criado com sucesso!' });
        }
    );    
});


router.get('/', (req, res) => {
    connection.query('SELECT * FROM agendamento', (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            res.status(500).json({ error: 'Erro ao buscar agendamentos' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
