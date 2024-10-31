const express = require('express');
const router = express.Router();
const connection = require('./db');
const cors = require('cors');
router.use(cors());

// Rota para criar um novo psicólogo
router.post('/', (req, res) => {
    const { nome, especialidade, localizacao } = req.body;

    if (!nome || !especialidade || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    connection.query(
        'INSERT INTO psicologos (nome, especialidade, localizacao) VALUES (?, ?, ?)',
        [nome, especialidade, localizacao],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao criar psicólogo' });
            }
            res.status(201).json({ message: 'Psicólogo criado com sucesso!' });
        }
    );
});

// Rota para listar todos os psicólogos ou filtrar por nome, especialidade e localização
router.get('/psicologos', (req, res) => {
    const { nome, especialidade, localizacao } = req.query;

    let sql = 'SELECT * FROM psicologos WHERE 1=1';
    const params = [];

    if (nome) {
        sql += ' AND nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (especialidade) {
        sql += ' AND especialidade LIKE ?';
        params.push(`%${especialidade}%`);
    }

    if (localizacao) {
        sql += ' AND localizacao LIKE ?';
        params.push(`%${localizacao}%`);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar psicólogos:', err);
            return res.status(500).json({ error: 'Erro ao buscar psicólogos' });
        }
        res.json(results);
    });
});

// API para buscar um psicólogo por ID
router.get('/psicologos/:psicologo_id', (req, res) => {
    console.log(`Requisição recebida para ID: ${req.params.psicologo_id}`);
    const id = req.params.psicologo_id;
    connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [psicologo_id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o registro:', err);
            return res.status(500).json({ error: 'Erro ao buscar o registro' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json(results[0]);
    });
});
router.post('/', (req, res) => {
    const { nome, especialidade, localizacao, crp } = req.body;

    if (!nome || !especialidade || !localizacao || !crp) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    connection.query(
        'INSERT INTO psicologos (nome, especialidade, localizacao, crp) VALUES (?, ?, ?, ?)',
        [nome, especialidade, localizacao, crp],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao criar psicólogo' });
            }
            res.status(201).json({ message: 'Psicólogo criado com sucesso!' });
        }
    );
});

// // Rota para atualizar um psicólogo existente pelo ID
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { nome, especialidade, localizacao } = req.body;

//     connection.query(
//         'UPDATE psicologos SET nome = ?, especialidade = ?, localizacao = ? WHERE psicologo_id = ?',
//         [nome, especialidade, localizacao, id],
//         (err, result) => {
//             if (err) {
//                 console.error('Erro ao atualizar o psicólogo:', err);
//                 return res.status(500).json({ error: 'Erro ao atualizar o psicólogo' });
//             }
//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ error: 'Psicólogo não encontrado' });
//             }
//             res.json({ message: 'Psicólogo atualizado com sucesso' });
//         }
//     );
// });

// Rota para excluir um psicólogo pelo ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM psicologos WHERE psicologo_id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o psicólogo:', err);
            return res.status(500).json({ error: 'Erro ao excluir o psicólogo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json({ message: 'Psicólogo excluído com sucesso' });
    });
});

// Rota para buscar um psicólogo pelo nome
router.get('/by-name', (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ error: 'O nome do psicólogo é obrigatório.' });
    }

    connection.query('SELECT psicologo_id FROM psicologos WHERE nome = ?', [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o psicólogo pelo nome:', err);
            return res.status(500).json({ error: 'Erro ao buscar o psicólogo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json(results[0]);
    });
});

module.exports = router;



/*const express = require('express');
const router = express.Router();
const connection = require('./db');
const cors = require('cors');

router.use(cors());

// Rota para criar um novo psicólogo
router.post('/', (req, res) => {
    const { nome, especialidade, localizacao } = req.body;

    if (!nome || !especialidade || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    connection.query(
        'INSERT INTO psicologos (nome, especialidade, localizacao) VALUES (?, ?, ?)',
        [nome, especialidade, localizacao],
        (err, result) => {
            if (err) {
                console.error('Erro ao criar psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao criar psicólogo' });
            }
            res.status(201).json({ message: 'Psicólogo criado com sucesso!' });
        }
    );
});

// Rota para cards 

router.get('/psicologos', async (req, res) => {
    console.log('Requisição GET para /psicologos');
    
    try {
        const [results] = await connection.query('SELECT * FROM psicologos');
        console.log('Dados recuperados:', results);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar os registros:', err);
        res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
});
  
  // API para buscar um psicólogo por ID
  router.get('/psicologos/:id', (req, res) => {
    console.log('Requisição GET para /psicologos/:id');
    const id = req.params.id;
    connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao buscar o registro:', err);
        res.status(500).json({ error: 'Erro ao buscar o registro' });
        return;
      }
      console.log('Dados recuperados:', results);
      res.json(results);
    });
  });


// Rota para listar todos os psicólogos ou filtrar por nome, especialidade e localização
router.get('/', (req, res) => {
    const { nome, especialidade, localizacao } = req.query;

    let sql = 'SELECT * FROM psicologos WHERE 1=1';
    const params = [];

    if (nome) {
        sql += ' AND nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (especialidade) {
        sql += ' AND especialidade LIKE ?';
        params.push(`%${especialidade}%`);
    }

    if (localizacao) {
        sql += ' AND localizacao LIKE ?';
        params.push(`%${localizacao}%`);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar psicólogos:', err);
            return res.status(500).json({ error: 'Erro ao buscar psicólogos' });
        }
        res.json(results);
    });
});

// Rota para buscar um psicólogo específico pelo ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    console.log(`Buscando psicólogo com ID: ${id}`);

    router.get('/:psicologo_id', (req, res) => {
        const { psicologo_id } = req.params;
        connection.query('SELECT * FROM psicologos WHERE psicologo_id = ?', [psicologo_id], (err, results) => {
            if (err) {
                console.error('Erro ao buscar o psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao buscar o psicólogo' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Psicólogo não encontrado' });
            }
            res.json(results[0]);
        });
    });    
});

// Rota para atualizar um psicólogo existente pelo ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especialidade, localizacao } = req.body;

    connection.query(
        'UPDATE psicologos SET nome = ?, especialidade = ?, localizacao = ? WHERE psicologo_id = ?',
        [nome, especialidade, localizacao, id],
        (err, result) => {
            if (err) {
                console.error('Erro ao atualizar o psicólogo:', err);
                return res.status(500).json({ error: 'Erro ao atualizar o psicólogo' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Psicólogo não encontrado' });
            }
            res.json({ message: 'Psicólogo atualizado com sucesso' });
        }
    );
});

// Rota para excluir um psicólogo pelo ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM psicologos WHERE psicologo_id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir o psicólogo:', err);
            return res.status(500).json({ error: 'Erro ao excluir o psicólogo' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json({ message: 'Psicólogo excluído com sucesso' });
    });
});

// Rota para buscar um psicólogo pelo nome
router.get('/by-name', (req, res) => {
    const { nome } = req.query;

    if (!nome) {
        return res.status(400).json({ error: 'O nome do psicólogo é obrigatório.' });
    }

    connection.query('SELECT psicologo_id FROM psicologos WHERE nome = ?', [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar o psicólogo pelo nome:', err);
            return res.status(500).json({ error: 'Erro ao buscar o psicólogo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Psicólogo não encontrado' });
        }
        res.json(results[0]);
    });
});

module.exports = router;*/