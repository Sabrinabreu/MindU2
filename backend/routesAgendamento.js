const express = require('express');
const connection = require('./db');
const jwt = require('jsonwebtoken'); // Para verificar o token JWT
const router = express.Router();

// Função para verificar o token JWT e obter o ID do usuário
const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Ajuste para sua chave secreta
        return decodedToken.id; // Retorna o ID do usuário do token
    } catch (err) {
        console.error('Erro ao verificar token:', err);
        return null;
    }
};

// Rota para criar um novo agendamento
router.post('/agendamentos', async (req, res) => {
    const { usuario_id, psicologo_id, data, horario_inicio, tipo, assunto } = req.body;

    console.log('Dados recebidos:', { usuario_id, psicologo_id, data, horario_inicio, tipo, assunto });

    // Validação dos campos obrigatórios
    if (!usuario_id || !psicologo_id || !data || !horario_inicio || !tipo) {
        console.log('Dados inválidos:', { usuario_id, psicologo_id, data, horario_inicio, tipo, assunto });
        return res.status(400).json({ error: 'Os campos usuário, psicólogo, data, horário de início e tipo são obrigatórios.' });
    }

    try {
        // Insere o agendamento no banco de dados
        const [result] = await connection.query(
            'INSERT INTO agendamentos (usuario_id, psicologo_id, data, horario_inicio, tipo, assunto) VALUES (?, ?, ?, ?, ?, ?)',
            [usuario_id, psicologo_id, data, horario_inicio, tipo, assunto]
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
    const token = req.headers['authorization']?.split(' ')[1];
    const decodedToken = parseJwt(token);
    const usuario_id = decodedToken?.id;

    if (!usuario_id) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
        const [results] = await connection.query('SELECT * FROM agendamentos WHERE usuario_id = ?', [usuario_id]);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});


module.exports = router;
