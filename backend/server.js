const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rotaempresa = require('./routesEmpresa');
const routesPsicologos = require('./routesPsicologos');
const rotaCadastropsi = require('./routesCadastropsi');
const rotaLogin = require('./routesLogin');
const rotaFuncionario = require('./routesFuncionario');
const agendamentoRoutes = require('./routesAgendamento');
const router = require('./routesCadastropsi');
const routaDisponibilidade = require('./routesDisponibilidade');

const app = express();
const port = 3001; // Defina a porta que deseja utilizar

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa as rotas do backend
app.use('/', rotaLogin);
app.use('/', rotaempresa);
app.use('/', routesPsicologos);
app.use('/', rotaCadastropsi);
app.use('/', rotaFuncionario);
app.use('/api/agendamento', agendamentoRoutes);
app.use('/', routaDisponibilidade);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});

module.exports = router;