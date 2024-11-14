const express = require('express');
const router = express.Router();
const connection = require('./db');

// Rota para buscar disponibilidades
router.get('/disponibilidades/:psicologo_id', async (req, res) => {
    const psicologoId = req.params.psicologo_id;

    try {
        const [disponibilidades] = await connection.query(
            'SELECT data, horario_inicio FROM disponibilidadepsico WHERE psicologo_id = ?',
            [psicologoId]
        );

        console.log('Disponibilidades encontradas:', disponibilidades); 

        const formattedDisponibilidades = disponibilidades.map(item => {
            let horarioFormatado = 'Hora não disponível';
            if (item.horario_inicio) {
                horarioFormatado = item.horario_inicio.substring(0, 5); 
            }

            return {
                data: item.data.toISOString().split('T')[0], 
                horario_inicio: horarioFormatado
            };
        });

        if (formattedDisponibilidades.length === 0) {
            return res.status(404).json({ message: 'Nenhuma disponibilidade encontrada.' });
        }

        res.json(formattedDisponibilidades);
    } catch (error) {
        console.error('Erro ao buscar disponibilidades:', error);
        res.status(500).json({ message: 'Erro ao buscar disponibilidades' });
    }
});

// Rota para inserir a disponibilidade de um psicólogo 
router.post('/disponibilidade/psicologo', (req, res) => {
    const dataDisponibilidade = req.body;

    console.log('Dados recebidos para inserção:', dataDisponibilidade);

    if (!Array.isArray(dataDisponibilidade) || dataDisponibilidade.length === 0) {
        console.log('Dados inválidos:', dataDisponibilidade);
        return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
    }

    const query = 'INSERT INTO disponibilidadepsico (psicologo_id, data, horario_inicio, horario_fim) VALUES ?';
    const values = dataDisponibilidade.map(item => [item.psicologo_id, item.data, item.horario_inicio, item.horario_fim]);

    connection.query(query, [values], (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: 'Erro ao inserir dados' });
        }
        console.log('Disponibilidades inseridas com sucesso!');
        res.status(201).json({ message: 'Disponibilidades inseridas com sucesso!', insertedCount: results.affectedRows });
    });
});

// Rota para listar todas as disponibilidades (opcional) 
router.get('/disponibilidade', (req, res) => {
    connection.query('SELECT * FROM disponibilidadepsico', (err, results) => {
        if (err) {
            console.error('Erro ao buscar disponibilidades:', err);
            return res.status(500).json({ error: 'Erro ao buscar disponibilidades' });
        }
        res.json(results);
    });
});

module.exports = router;