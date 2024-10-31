const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importa as rotas
const rotaCadastropsi = require('./routesCadastropsi');
const rotaLogin = require('./routesLogin');
const rotaempresa = require('./routesEmpresa');
const rotaFuncionario = require('./routesFuncionario');
const rotaPsicologos = require('./routesPsicologos');
const agendamentoRoutes = require('./routesAgendamento');
const rotaPerfilsuario = require('./routesPerfilusuario');
const disponibilidadesRoutes = require('./routesDisponibilidade');
const rotaPlanos = require('./routesPlanos');
const rotaEsqueciSenha = require('./routesEsqueciSenha');
const rotaDelete = require('./routesDelete');

// Cria uma instância do Express
const app = express();
const port = 3001; // Define a porta que deseja utilizar

// Configura o body-parser e o CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


// Usa as rotas do backend
app.use('/', rotaLogin);
app.use('/', rotaCadastropsi);
app.use('/', rotaempresa);
app.use('/', rotaFuncionario);
app.use('/api', rotaPsicologos);
app.use('/api/', rotaPlanos);
app.use('/api', agendamentoRoutes);
app.use('/api/atualizarPerfil', rotaPerfilsuario);
app.use('/api', disponibilidadesRoutes);
app.use('/api', rotaEsqueciSenha);
app.use('/', rotaDelete);

// Remove rotas não definidas (ajustar ou remover se não houver)
app.use('/', (req, res) => {
  res.status(404).send('Rota não encontrada');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});


module.exports = app;