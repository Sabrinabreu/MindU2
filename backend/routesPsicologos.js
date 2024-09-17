const express = require('express');
const router = express.Router();
const connection = require('./db');

// Rota para criar um novo psicólogo
router.post('/', (req, res) => {
    const { nome, especialidade, localizacao } = req.body;

    if (!nome || !especialidade || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    connection.query(
        'INSERT INTO psicologos (nome, especialidade, localizacao) VALUES (?, ?, ?)',
        [nome, especialidade, localizacao],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao criar psicólogo' });
            }
            res.status(201).json({ message: 'Psicólogo criado com sucesso!' });
        }
    );
});

// Rota para listar todos os psicólogos ou filtrar por nome, especialidade e localização
router.get('/', (req, res) => {
    const { nome, especialidade, localizacao } = req.query;

    let sql = 'SELECT * FROM psicologos WHERE 1=1';
    const params = [];

    if (nome) {
        sql += ' AND nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (especialidade) {
        sql += ' AND especialidade LIKE ?';
        params.push(`%${especialidade}%`);
    }

    if (localizacao) {
        sql += ' AND localizacao LIKE ?';
        params.push(`%${localizacao}%`);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar psicólogos:', err);
            return res.status(500).json({ error: 'Erro ao buscar psicólogos' });
        }
        res.json(results);
    });
});

// Rota para buscar um psicólogo específico pelo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM psicologos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o psicólogo:', err);
            return res.status(500).json({ error: 'Erro ao buscar o psicólogo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json(results[0]);
    });
});

// Rota para atualizar um psicólogo existente pelo ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especialidade, localizacao } = req.body;

    connection.query(
        'UPDATE psicologos SET nome = ?, especialidade = ?, localizacao = ? WHERE id = ?',
        [nome, especialidade, localizacao, id],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao atualizar o psicólogo' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Psicólogo não encontrado' });
            }
            res.json({ message: 'Psicólogo atualizado com sucesso' });
        }
    );
});

// Rota para excluir um psicólogo pelo ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM psicologos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o psicólogo:', err);
            return res.status(500).json({ error: 'Erro ao excluir o psicólogo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json({ message: 'Psicólogo excluído com sucesso' });
    });
});

// Rota para buscar um psicólogo pelo nome
router.get('/by-name', (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ error: 'O nome do psicólogo é obrigatório.' });
    }

    connection.query('SELECT id FROM psicologos WHERE nome = ?', [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o psicólogo pelo nome:', err);
            return res.status(500).json({ error: 'Erro ao buscar o psicólogo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json(results[0]);
    });
});


module.exports = router;
