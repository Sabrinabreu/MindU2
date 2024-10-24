const express = require('express');
const router = express.Router();
const connection = require('./db');

router.delete('/empresa/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Deletar funcionários associados à empresa
        await connection.query('DELETE FROM contaFuncionarios WHERE empresa_id = ?', [id]);
        // Deletar a empresa
        await connection.query('DELETE FROM cadastroempresa WHERE id = ?', [id]);
        res.json({ message: 'Empresa e funcionários associados excluídos com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir a empresa:', err);
        res.status(500).json({ error: 'Erro ao excluir a empresa' });
    }
});


// Rota para deletar um psicologo
router.delete('/psicologos/delete/:psicologo_id', async (req, res) => {
    const { psicologo_id } = req.params;
    try {
        await connection.query('DELETE FROM psicologos WHERE psicologo_id = ?', [psicologo_id]); // Use psicologo_id
        res.json({ message: 'Conta de psicólogo excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir o psicólogo:', err);
        res.status(500).json({ error: 'Erro ao excluir o psicólogo' });
    }
});

// Rota para deletar uma empresa
router.delete('/funcionarios/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('DELETE FROM contaFuncionarios WHERE id = ?', [id]);
        res.json({ message: 'Conta de psicólogo excluída com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir a empresa:', err);
        res.status(500).json({ error: 'Erro ao excluir o psicólogo' });
    }
});

module.exports = router;
