const mysql = require('mysql2/promise');

// Configuração das credenciais de acesso ao banco de dados
const dbConfig = {
  host: 'localhost', // Host do banco de dados
  user: 'root', // Usuário do banco de dados
  password: 'Desenvolvedor@123', // Senha do banco de dados
  database: 'bancomindu' // Nome do banco de dados
};

// Criação do pool de conexões com o banco de dados
const connection = mysql.createPool(dbConfig);

// Exporta o pool de conexões para uso em outras partes da aplicação
module.exports = connection;

