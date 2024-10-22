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
    const { nome, senha, email, telefone, tipoUsuario, ...restoDados } = req.body;

    console.log('Dados recebidos:', req.body);

    try {
        let query;
        let params = [];
        let hashedPassword;
        const tabela = tipoUsuario === 'psicologo' ? 'psicologos' : 'contaFuncionarios';
        const identificadorCampo = tipoUsuario === 'psicologo' ? 'email' : 'id';

        // Atualizando dados comuns
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
                WHERE psicologo_id = ?;
            `;
            params.push(
                nome, email, telefone, restoDados.pergunta_seguranca, 
                restoDados.resposta_seguranca, restoDados.cpf, restoDados.endereco,
                restoDados.crp, restoDados.preferenciaHorario, restoDados.disponibilidade,
                restoDados.localizacao, restoDados.motivacao, restoDados.objetivos, 
                restoDados.psicologo_id
            );

        } else if (tipoUsuario === 'funcionario') {
            query = `
                UPDATE contaFuncionarios SET
                    login = ?,
                    email = ?,
                    telefone = ?,
                    cargo = ?
                WHERE id = ?;
            `;
            params.push(
                restoDados.login, email, telefone, 
                restoDados.cargo, restoDados.id
            );
        }

        // Verificando se a senha deve ser atualizada
        if (senha) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
            console.log('Senha criptografada:', hashedPassword);

            query = query.replace('WHERE', 'senha = ?, WHERE');
            params.unshift(hashedPassword);
        }

        console.log('Query:', query);
        console.log('Valores:', params);

        const [results] = await connection.query(query, params);
        console.log('Resultados da atualização:', results);

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado para o identificador fornecido' });
        }

        const identificadorValor = tipoUsuario === 'psicologo' ? email : restoDados.id;
        const [userResults] = await connection.query(
            `SELECT * FROM ${tabela} WHERE ${identificadorCampo} = ?`,
            [identificadorValor]
        );

        console.log('Tabela:', tabela);
        console.log('IdentificadorCampo:', identificadorCampo);
        console.log('IdentificadorValor:', identificadorValor);


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