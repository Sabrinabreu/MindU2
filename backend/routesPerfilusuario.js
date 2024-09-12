const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { login, nome, senha, email } = req.body;

    try {
        let hashedPassword;

        if (senha) {
            // Se uma nova senha for fornecida, criptografe-a
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
        }

        const query = `
            UPDATE contaFuncionarios 
            SET nome = ?, ${senha ? 'senha = ?,' : ''} email = ? 
            WHERE login = ?
        `;

        const values = [nome];
        if (senha) values.push(hashedPassword);
        values.push(email, login);

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o perfil:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
            }
            console.log('Resultados da atualização:', results);
            res.status(200).json({ message: 'Perfil atualizado com sucesso' });
        });
    } catch (error) {
        console.error('Erro ao processar a atualização:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});

module.exports = router;
