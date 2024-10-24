const express = require('express');
const router = express.Router();
const connection = require('./db');

// Rota para deletar uma empresa
router.delete('/cadastroempresa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM cadastroempresa WHERE id = ?', [id]);
        res.json({ message: 'Empresa e funcionários associados excluídos com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir a empresa:', err);
        res.status(500).json({ error: 'Erro ao excluir a empresa' });
    }
});

module.exports = router;
