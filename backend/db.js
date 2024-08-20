const mysql = require('mysql2');

// Configuração das credenciais de acesso ao banco de dados
const dbConfig = {
  host: 'localhost', // Host do banco de dados
  user: 'root', // Usuário do banco de dados
  password: 'Desenvolvedor@123', // Senha do banco de dados
  database: 'aula' // Nome do banco de dados
};

// Criação da conexão com o banco de dados
const connection = mysql.createConnection(dbConfig);

// Verifica se a conexão foi bem-sucedida
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

module.exports = connection;
