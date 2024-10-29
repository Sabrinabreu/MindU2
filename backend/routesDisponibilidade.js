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

        // Formatar a resposta
        const formattedDisponibilidades = disponibilidades.map(item => {
            // Supondo que item.horario_inicio seja uma string no formato HH:mm:ss
            const horarioInicio = item.horario_inicio; // Ex: "14:30:00"
            const horarioFormatado = horarioInicio.substring(0, 5); // Extrai os primeiros 5 caracteres (HH:mm)
        
            return {
                data: item.data.toISOString().split('T')[0], // Formato YYYY-MM-DD
                horario_inicio: horarioFormatado // Formato HH:mm
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
router.post('/disponibilidade/psicologo', async (req, res) => {
    const { psicologo_id, data, horario_inicio, horario_fim } = req.body;

    // Verifique se a data já existe
    const [existingDisponibilidades] = await connection.query(
        'SELECT * FROM disponibilidadepsico WHERE psicologo_id = ? AND data = ?',
        [psicologo_id, data]
    );


    // Verifique se os dados foram enviados
    if (!Array.isArray(dataDisponibilidade) || dataDisponibilidade.length === 0) {
        console.log('Dados inválidos:', dataDisponibilidade);
        return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
    }

    // Insira a nova disponibilidade
    const query = 'INSERT INTO disponibilidadepsico (psicologo_id, data, horario_inicio, horario_fim) VALUES (?, ?, ?, ?)';
    connection.query(query, [psicologo_id, data, horario_inicio, horario_fim], (error, results) => {
        if (error) {
            console.error('Erro ao inserir dados:', error);
            return res.status(500).json({ error: 'Erro ao inserir dados' });
        }
        res.status(201).json({ message: 'Disponibilidade inserida com sucesso!' });
    });
});

// Rota para listar todas as disponibilidades
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