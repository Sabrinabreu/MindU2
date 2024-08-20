const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotaempresa = require('./routesEmpresa');
const routesPsicologos = require('./routesPsicologos');
const rotaCadastropsi = require('./routesCadastropsi');

const app = express();
const port = 3001; // Defina a porta que deseja utilizar

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Middleware
app.use(cors()); // Adicione se você precisar permitir requisições de diferentes origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Usa as rotas do backend
app.use('/', rotaempresa);
app.use('/', routesPsicologos);
app.use('/', rotaCadastropsi);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});



