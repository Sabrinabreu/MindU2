const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { login, nome, senha, email, cpf, cargo, telefone, perguntaSeguranca, respostaSeguranca } = req.body;

    try {
        let hashedPassword;
        const values = [nome, email, cpf, cargo, telefone];
        let query;

        if (senha) {
            // Se uma nova senha for fornecida, criptografe-a
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
            values.unshift(hashedPassword); 
            query = `
                UPDATE contaFuncionarios 
                SET 
                    senha = ?, 
                    nome = ?, 
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    perguntaSeguranca = ?, 
                    respostaSeguranca = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
            values.push(perguntaSeguranca, login);
        } else {
            query = `
                UPDATE contaFuncionarios 
                SET 
                    nome = ?, 
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    perguntaSeguranca = ?, 
                    respostaSeguranca = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
            values.push(perguntaSeguranca, login);
        }
        
         if (!senha) {
            values.unshift(null);
        }

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