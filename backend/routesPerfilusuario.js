const express = require('express');
const router = express.Router();
const connection = require('./db');

router.put('/', (req, res) => {
    const { login, nome, senha, email } = req.body;

    const query = `
        UPDATE contaFuncionarios 
        SET nome = ?, senha = ?, email = ? 
        WHERE login = ?
    `;

    console.log(`Executando a query: ${query}`);
    console.log(`Valores: ${nome}, ${senha}, ${email}, ${login}`);

    connection.query(query, [nome, senha, email, login], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar o perfil:', error);
            return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
        }
        console.log('Resultados da atualização:', results);
        res.status(200).json({ message: 'Perfil atualizado com sucesso' });
    });
});


module.exports = router;
