const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { nome, senha, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca, id_referencia } = req.body;

    try {
        let query;
        const values = [nome, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca, id_referencia];

        // Verifica se a senha foi fornecida e, se sim, criptografa-a
        if (senha) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            values.unshift(hashedPassword); // Adiciona a senha no início para que os valores correspondam à query
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
                    resposta_seguranca = ? 
                WHERE id = ?;
            `;
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
                    resposta_seguranca = ? 
                WHERE id = ?;
            `;
        }

        // Executa a query de atualização
        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o perfil:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
            }

            // Se não houver nenhuma linha afetada, o usuário pode não existir
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Perfil não encontrado' });
            }

            // Se a atualização foi bem-sucedida, envie o perfil atualizado no response
            const updatedPerfil = {
                id_referencia,
                nome,
                email,
                cpf,
                cargo,
                telefone,
                senha: senha ? hashedPassword : undefined, // Só inclui a senha se tiver sido atualizada
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