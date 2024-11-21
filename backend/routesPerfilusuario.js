// routesPerfilUsuario.js
const express = require('express');
const router = express.Router();
const connection = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Função para gerar um novo token JWT
function gerarNovoToken(usuario, tipoUsuario) {
    const payload = {
        id: usuario.id,
        tipo_usuario: tipoUsuario,
        id_referencia: tipoUsuario === 'empresa' ? usuario.ID : (tipoUsuario === 'psicologo' ? usuario.psicologo_id : usuario.id),
        // id_referencia: usuario.id_referencia,
        perfil: { ...usuario }
    };

    console.log("id_referencia: ", usuario.id_referencia)
    console.log("payload :", payload)

    // Gera um novo token com as informações atualizadas
    return jwt.sign(payload, 'sua_chave_secreta', { expiresIn: '24h' });
}


// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post('/upload-foto', upload.single('fotoPerfil'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    const fotoUrl = `${req.file.filename}`;
    const { tipoUsuario, id, psicologo_id, ID } = req.body;

    try {
        let query;
        const params = [fotoUrl];

        if (tipoUsuario === 'empresa') {
            query = `UPDATE cadastroempresa SET foto_perfil = ? WHERE ID = ?`;
            params.push(ID);
        } else if (tipoUsuario === 'funcionario') {
            query = `UPDATE contaFuncionarios SET foto_perfil = ? WHERE id = ?`;
            params.push(id);
        } else if (tipoUsuario === 'psicologo') {
            query = `UPDATE psicologos SET foto_perfil = ? WHERE psicologo_id = ?`;
            params.push(psicologo_id);
        }

        const [results] = await connection.query(query, params);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }

        res.status(200).json({ message: 'Foto de perfil atualizada com sucesso', url: `/${fotoUrl}` });
    } catch (error) {
        console.error('Erro ao atualizar a foto de perfil:', error);
        res.status(500).json({ message: 'Erro ao atualizar a foto de perfil' });
    }
});


router.get('/dados-perfil', async (req, res) => {
    const { tipoUsuario, id, psicologo_id } = req.query;

    if (!tipoUsuario || !id || !psicologo_id) {
        return res.status(400).json({ message: 'Tipo de usuário ou ID ausente' });
    }

    try {
        let query;
        const params = [id];

        if (tipoUsuario === 'psicologo') {
            query = `SELECT * FROM psicologos WHERE psicologo_id = ?`;
        } else if (tipoUsuario === 'funcionario') {
            query = `SELECT * FROM contaFuncionarios WHERE id = ?`;
        } else if (tipoUsuario === 'empresa') {
            query = `SELECT * FROM cadastroempresa WHERE ID = ?`;
        } else {
            return res.status(400).json({ message: 'Tipo de usuário inválido' });
        }

        const [results] = await connection.query(query, params);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado' });
        }

        // res.status(200).json(results[0]);
        res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
        res.status(200).json(results[0]); // Retorna os dados completos do perfil
        console.log("dadossssss: ", psicologo_id, id)


    } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        res.status(500).json({ message: 'Erro ao carregar dados do perfil' });
    }
});
// Certifique-se de que o diretório "uploads" existe
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}


router.put('/', async (req, res) => {
    const {
        id, ID, nome, senha, email, login, telefone, pergunta_seguranca, resposta_seguranca,
        cpf, cargo, endereco, crp, preferenciaHorario, disponibilidade,
        localizacao, motivacao, objetivos, tipoUsuario, psicologo_id, empresa, departamento, qtdfuncionarios, planosaude, contato
    } = req.body;

    console.log('Dados recebidos:', req.body);

    try {
        let query;
        let params = [];
        let tabela;
        let identificadorCampo;

        // Define tabela e campo identificador conforme o tipo de usuário
        if (tipoUsuario === 'psicologo') {
            tabela = 'psicologos';
            identificadorCampo = 'email';
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
            if (senha) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(senha, saltRounds);
                query += `, senha = ?`;
                params.push(hashedPassword);
            }
            query += ` WHERE psicologo_id = ?`;
            params.push(psicologo_id);
        } else if (tipoUsuario === 'funcionario') {
            tabela = 'contaFuncionarios';
            identificadorCampo = 'id';
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
                query += `, senha = ?`;
                params.push(hashedPassword);
            }
            query += ` WHERE id = ?`;
            params.push(id);
        } else if (tipoUsuario === 'empresa') {
            tabela = 'cadastroempresa';
            identificadorCampo = 'email';
            query = `
                UPDATE cadastroempresa SET
                    nome = ?,
                    email = ?,
                    telefone = ?,
                    empresa = ?,
                    departamento = ?,
                    qtdfuncionarios = ?,
                    planosaude = ?,
                    contato = ?,
                    pergunta_seguranca = ?,
                    resposta_seguranca = ?
            `;
            params = [
                nome, email, telefone, empresa, departamento, qtdfuncionarios, planosaude, contato,
                pergunta_seguranca, resposta_seguranca
            ];
            if (senha) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(senha, saltRounds);
                query += `, senha = ?`;
                params.push(hashedPassword);
            }
            query += ` WHERE ID = ?`;
            params.push(ID);
        }

        console.log('Query:', query);
        console.log('Valores:', params);

        const [results] = await connection.query(query, params);
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Perfil não encontrado para o identificador fornecido' });
        }

        const identificadorValor = tipoUsuario === 'empresa' ? email : (tipoUsuario === 'psicologo' ? email : id);
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