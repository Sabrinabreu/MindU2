const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { login, nome, senha, email, cpf, cargo, telefone } = req.body;

    try {
        let hashedPassword;
        let query;
        const values = [nome, email, cpf, cargo, telefone];

        if (senha) {
            // Se uma nova senha for fornecida, criptografe-a
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
            query = `
                UPDATE contaFuncionarios 
                SET 
                    nome = ?, 
                    senha = ?, 
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
            values.splice(1, 0, hashedPassword);  // Insere a senha na posição correta no array
        } else {
            query = `
                UPDATE contaFuncionarios 
                SET 
                    nome = ?,
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
        }

        values.push(login);  // Adiciona o login no final do array

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o perfil:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
            }
            console.log('Resultados da atualização:', results);
        
            // Se a atualização foi bem-sucedida, envie o perfil atualizado no response
            const updatedPerfil = {
                login,
                nome,
                email,
                cpf,
                cargo,
                telefone,
                senha: senha ? hashedPassword : undefined,  // Opcionalmente enviar a senha
            };
        
            res.status(200).json({
                message: 'Perfil atualizado com sucesso',
                perfilAtualizado: updatedPerfil  // Retorna o perfil atualizado
            });
        });
        

    } catch (error) {
        console.error('Erro ao processar a atualização:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});

module.exports = router;