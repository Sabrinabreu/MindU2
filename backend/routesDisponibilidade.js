const express = require('express');
const router = express.Router();
const connection = require('./database'); // Verifique o caminho para sua configuração de banco de dados

router.get('/api/psicologo/:id/disponibilidade', (req, res) => {
    const psicologo_id = req.params.id; // Corrija aqui para usar req.params.id
    const sql = `SELECT data, horario FROM disponibilidadepsico WHERE psicologo_id = ?`;

    connection.query(sql, [psicologo_id], (err, results) => {
        if (err) {
            console.error('Erro ao consultar banco de dados:', err);
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }

        const eventos = results.map(evento => ({
            title: 'Disponível',
            start: `${evento.data}T${evento.horario}`,
            allDay: false
        }));
        
        res.json(eventos);
    });
});

module.exports = router;


/*const express = require('express');
const router = express.Router();
const connection = require('./db');

// Verifica a disponibilidade de um horário específico
router.post('/checarDisponibilidade', async (req, res) => {
    const { data, horario, psicologo } = req.body;

    try {
        const [results] = await connection.query(
            'SELECT * FROM disponibilidadepsico WHERE psicologo_id = ? AND data = ? AND horario = ?',
            [psicologo, data, horario]
        );

        const disponivel = results.length === 0;
        res.header('Content-Type', 'application/json');
        res.json({ disponivel });
    } catch (err) {
        console.error('Erro ao verificar disponibilidade:', err);
        res.status(500).json({ error: 'Erro ao verificar disponibilidade' });
    }
});

// Agenda uma nova consulta
router.post('/agendar', async (req, res) => {
    const { userId, data, horario, tipo, assunto, nomePsico } = req.body;

    try {
        // Verifica se o horário está disponível
        const [results] = await connection.query(
            'SELECT * FROM disponibilidadepsico WHERE psicologo_id = ? AND data = ? AND horario = ?',
            [nomePsico, data, horario]
        );

        if (results.length > 0) {
            res.json({ error: 'Horário não disponível' });
        } else {
            // Insere um novo registro na tabela de disponibilidade
            await connection.query(
                'INSERT INTO disponibilidadepsico (psicologo_id, data, horario) VALUES (?, ?, ?)',
                [nomePsico, data, horario]
            );

            // Agenda a consulta
            const [results] = await connection.query(
                'INSERT INTO agendamentos (userId, data, horario, tipo, assunto, psicologo) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, data, horario, tipo, assunto, nomePsico]
            );

            res.status(201).json({ message: 'Agendamento realizado com sucesso!', id: results.insertId });
        }
    } catch (err) {
        console.error('Erro ao agendar a consulta:', err);
        res.status(500).json({ error: 'Erro ao agendar a consulta' });
    }
});

// Atualiza um agendamento existente
router.put('/atualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { data, horario, tipo, assunto } = req.body;

    try {
        await connection.query(
            'UPDATE agendamentos SET data = ?, horario = ?, tipo = ?, assunto = ? WHERE id = ?',
            [data, horario, tipo, assunto, id]
        );
        res.json({ message: 'Agendamento atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar o agendamento:', err);
        res.status(500).json({ error: 'Erro ao atualizar o agendamento' });
    }
});

// Exclui um agendamento pelo ID
router.delete('/excluir/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await connection.query('DELETE FROM agendamentos WHERE id = ?', [id]);
        res.json({ message: 'Agendamento excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir o agendamento:', err);
        res.status(500).json({ error: 'Erro ao excluir o agendamento' });
    }
});

module.exports = router;*/