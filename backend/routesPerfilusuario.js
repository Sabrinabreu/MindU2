// routesPerfilUsuario.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para gerar um novo token JWT
function gerarNovoToken(usuario, tipoUsuario) {
  const payload = {
    id: usuario.id,
    tipo_usuario: tipoUsuario,
    id_referencia: usuario.id_referencia,
    perfil: { ...usuario }
  };

  // Gera um novo token com as informações atualizadas
  return jwt.sign(payload, 'chave_secreta', { expiresIn: '1h' });
}

router.put('/', async (req, res) => {
    const {
        id, nome, senha, email, login, telefone, pergunta_seguranca, resposta_seguranca,
        cpf, cargo, endereco, crp, preferenciaHorario, disponibilidade,
        localizacao, motivacao, objetivos, tipoUsuario, psicologo_id
    } = req.body;

    console.log('Dados recebidos:', req.body);

    try {
        let query;
        let params = [];
        const tabela = tipoUsuario === 'psicologo' ? 'psicologos' : 'contaFuncionarios';
        const identificadorCampo = tipoUsuario === 'psicologo' ? 'email' : 'id';

        // Lógica para psicólogo
        if (tipoUsuario === 'psicologo') {
            query = `
                UPDATE psicologos SET
                    nome = ?,
                    email = ?,
                    telefone = ?,
                    pergunta_seguranca = ?,
                    resposta_seguranca = ?,
                    cpf = ?,
                    endereco = ?,
                    crp = ?,
                    preferenciaHorario = ?,
                    disponibilidade = ?,
                    localizacao = ?,
                    motivacao = ?,
                    objetivos = ?
            `;

            params = [
                nome, email, telefone, pergunta_seguranca, resposta_seguranca,
                cpf, endereco, crp, preferenciaHorario, disponibilidade,
                localizacao, motivacao, objetivos
            ];

            // Verifica se uma nova senha foi fornecida
            if (senha) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(senha, saltRounds);
                console.log('Senha criptografada:', hashedPassword);

                query += `, senha = ?`; // Adiciona campo 'senha'
                params.push(hashedPassword);
            }

            query += ` WHERE psicologo_id = ?`; // Finaliza a query
            params.push(psicologo_id);
        } 
        // Lógica para funcionário
        else if (tipoUsuario === 'funcionario') {
            query = `
                UPDATE contaFuncionarios SET
                    nome = ?,
                    login = ?,
                    cpf = ?,
                    telefone = ?,
                    cargo = ?,
                    pergunta_seguranca = ?,
                    resposta_seguranca = ?,
                    loginMethod = 'email'
            `;

            params = [
                nome, login, cpf, telefone, cargo, pergunta_seguranca,
                resposta_seguranca
            ];

            if (senha) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(senha, saltRounds);
                console.log('Senha criptografada:', hashedPassword);

                query += `, senha = ?`; // Adiciona campo 'senha'
                params.push(hashedPassword);
            }

            query += ` WHERE id = ?`; // Finaliza a query
            params.push(id);
        }

        console.log('Query:', query);
        console.log('Valores:', params);

        const [results] = await connection.query(query, params);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado para o identificador fornecido' });
        }

        const identificadorValor = tipoUsuario === 'psicologo' ? email : id;
        const [userResults] = await connection.query(
            `SELECT * FROM ${tabela} WHERE ${identificadorCampo} = ?`,
            [identificadorValor]
        );

        if (userResults.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const updatedUser = userResults[0];
        console.log('Usuário atualizado:', updatedUser);

        const novoToken = gerarNovoToken(updatedUser, tipoUsuario);

        return res.status(200).json({
            message: 'Perfil atualizado com sucesso',
            perfilAtualizado: updatedUser,
            token: novoToken,
        });

    } catch (error) {
        console.error('Erro ao processar a atualização:', error);
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }
});
  
  module.exports = router;  