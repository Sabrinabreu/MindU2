const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { login, nome, senha, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca } = req.body;

    try {
        let hashedPassword;
        let query;
        const values = [nome, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca, login]; // Adiciona login no final para garantir o uso correto no WHERE
        
        if (senha) {
            // Se uma nova senha for fornecida, criptografe-a
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
            query = `
                UPDATE contaFuncionarios 
                SET 
                    senha = ?, 
                    nome = ?, 
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    pergunta_seguranca = ?, 
                    resposta_seguranca = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
            values.unshift(hashedPassword);  // Adiciona a senha no início para que os valores correspondam à query
        } else {
            query = `
                UPDATE contaFuncionarios 
                SET 
                    nome = ?, 
                    email = ?, 
                    cpf = ?, 
                    cargo = ?, 
                    telefone = ?, 
                    pergunta_seguranca = ?, 
                    resposta_seguranca = ?, 
                    loginMethod = 'email' 
                WHERE login = ?
            `;
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o perfil:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
            }

            // Se não houver nenhuma linha afetada, o login fornecido pode estar incorreto
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Perfil não encontrado para o login fornecido' });
            }
        
            // Se a atualização foi bem-sucedida, envie o perfil atualizado no response
            const updatedPerfil = {
                login,
                nome,
                email,
                cpf,
                cargo,
                telefone,
                senha: senha ? hashedPassword : undefined,  // Só inclui a senha se tiver sido atualizada
                pergunta_seguranca,
                resposta_seguranca,
            };
        
            res.status(200).json({
                message: 'Perfil atualizado com sucesso',
                perfilAtualizado: updatedPerfil
            });
        });

    } catch (error) {
        console.error('Erro ao processar a atualização:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});

module.exports = router;