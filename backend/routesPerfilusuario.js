//routesPerfilusuario.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'sua_chave_secreta';  // Use a mesma chave secreta usada na geração do token de login

router.put('/', async (req, res) => {
    const { login, nome, senha, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca } = req.body;

    try {
        let hashedPassword;
        let query;
        const values = [nome, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca, login]; 
        
        if (senha) {
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
            values.unshift(hashedPassword); 
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

        connection.query(query, values, async (error, results) => {
            if (error) {
                console.error('Erro ao atualizar o perfil:', error);
                return res.status(500).json({ message: 'Erro ao atualizar o perfil' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Perfil não encontrado para o login fornecido' });
            }

            // Busca os dados atualizados do usuário para gerar um novo token
            const [updatedUserResult] = await connection.query('SELECT * FROM contaFuncionarios WHERE login = ?', [login]);
            const updatedUser = updatedUserResult[0];

            const payload = {
                id: updatedUser.id,
                tipo_usuario: 'funcionario',  // ou outro tipo dependendo da lógica
                id_referencia: updatedUser.id,
                perfil: {
                    nome: updatedUser.nome,
                    email: updatedUser.email,
                    cpf: updatedUser.cpf,
                    cargo: updatedUser.cargo,
                    telefone: updatedUser.telefone
                }
            };

            // Gera um novo token JWT com as informações atualizadas
            const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Perfil atualizado com sucesso',
                perfilAtualizado: updatedUser,
                token: newToken // Envia o novo token para o frontend
            });
        });

    } catch (error) {
        console.error('Erro ao processar a atualização:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});

module.exports = router;