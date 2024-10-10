// routesPerfilusuario.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Função para gerar um novo token JWT
function gerarNovoToken(usuario) {
    const payload = {
        id: usuario.id,
        tipo_usuario: 'funcionario',
        id_referencia: usuario.id_referencia,
        perfil: {
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf,
            cargo: usuario.cargo,
            telefone: usuario.telefone,
            empresa_id: usuario.empresa_id,
            loginMethod: usuario.loginMethod,
            pergunta_seguranca: usuario.pergunta_seguranca,
            resposta_seguranca: usuario.resposta_seguranca
        }
    };

    // Gere um novo token com o payload atualizado
    const novoToken = jwt.sign(payload, 'chave_secreta', { expiresIn: '1h' });
    return novoToken;
}

router.put('/', async (req, res) => {
    const { login, nome, senha, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca } = req.body;

    try {
        let hashedPassword;
        let query;
        const values = [nome, email, cpf, cargo, telefone, pergunta_seguranca, resposta_seguranca, login];
        const { idFuncionario, novosDados } = req.body;
    
        // Atualiza os dados no banco de dados
        if (senha) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(senha, saltRounds);
            console.log('Senha criptografada:', hashedPassword); // Verifique se a senha está sendo corretamente criptografada
            
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
    
        // Testa a conexão com o banco de dados
        // const connectionTest = await connection.promise().query('SELECT 1');
        // console.log('Conexão com o banco de dados está funcionando:', connectionTest);
    
        // Executa a query de atualização
        const [results] = await connection.query(query, values);

        console.log('Resultados da atualização:', results);
    
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado para o login fornecido' });
        }
    
        // Busca os dados atualizados do usuário para gerar um novo token
        const [userResults] = await connection.query('SELECT * FROM contaFuncionarios WHERE login = ?', [login]);
    
        if (userResults.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    
        const updatedUser = userResults[0];
        console.log('Usuário atualizado:', updatedUser);
    
        // Gera um novo token com as informações atualizadas
        const novoToken = gerarNovoToken(updatedUser);
    
        // Envia o perfil atualizado e o novo token para o frontend
        return res.status(200).json({
            message: 'Perfil atualizado com sucesso',
            perfilAtualizado: updatedUser,
            token: novoToken // Envia o novo token para o frontend
        });
    
    } catch (error) {
        console.error('Erro ao processar a atualização:', error); // Detalhe o erro
        res.status(500).json({ message: 'Erro ao atualizar o perfil' });
    }    
    
});

module.exports = router;