const express = require('express');
const connection = require('./db'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Rota para listar todas as compras
router.get('/compras', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM compras');
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar as compras:', err);
        res.status(500).json({ error: 'Erro ao buscar as compras' });
    }
});

router.get('/planos', async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM planos');
        // Verifique se a consulta retornou resultados
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum plano encontrado' });
        }
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar os planos:', err);
        res.status(500).json({ error: 'Erro ao buscar os planos' });
    }
});


// Rota para criar uma nova compra
router.post('/compras', async (req, res) => {
    const { id_empresa, id_plano, qtd_funcionarios } = req.body;

    try {
        const [result] = await connection.query(
            'INSERT INTO compras (id_empresa, id_plano, qtd_funcionarios) VALUES (?, ?, ?)',
            [id_empresa, id_plano, qtd_funcionarios]
        );

        res.status(201).json({ message: 'Compra registrada com sucesso', id: result.insertId });
    } catch (err) {
        console.error('Erro ao registrar a compra:', err);
        res.status(500).json({ error: 'Erro ao registrar a compra' });
    }
});

// Rota para buscar uma compra específica pelo ID
router.get('/compras/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await connection.query('SELECT * FROM compras WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Compra não encontrada' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Erro ao buscar a compra:', err);
        res.status(500).json({ error: 'Erro ao buscar a compra' });
    }
});

// Rota para excluir uma compra pelo ID
router.delete('/compras/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM compras WHERE id = ?', [id]);
        res.json({ message: 'Compra excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir a compra:', err);
        res.status(500).json({ error: 'Erro ao excluir a compra' });
    }
});

module.exports = router;