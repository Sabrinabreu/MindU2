import React from "react";
import { useAuth } from "./provider/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";

//Páginas
import Home from "./Pages/Home";  //todos
import Cadastroempresa from "./Pages/CadastroEmpresa"; //todos
import Contato from "./Pages/Contato"; //todos
import CadastroPsicólogos from './Pages/CadastroPsicólogos' //todos
import Agendarconsulta from "./Pages/AgendarConsulta"; //funcionários
import SaibaMais from './Pages/SaibaMais'; //todos
import Planos from './Pages/Planos'; //todos
import Perfil from './Pages/Perfil'; //funcionarios e psicólogos
import AcessoFuncionarios from './Pages/AcessoFuncionarios'; //empresa
import Login from './Pages/Login'; //todos
import Disponibilidade from './Pages/Disponibilidade' //psicologo
import NotFound from "./Pages/NotFound"; //*
import Dashboard from "./Pages/Dashboard";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const Rotas = () => {
  const { token } = useAuth();
  return (
    <Routes>
      {/* Rotas públicas */}
      <>
          <Route path="/" element={<Home />} />
          <Route path="/cadastroEmpresa" element={<Cadastroempresa />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/cadastroPsicologos" element={<CadastroPsicólogos />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/login" element={<Login />} />

          {/* Rotas temporariamente públicas */}
          <Route path="/agendarConsulta" element={<Agendarconsulta />} />
          <Route path="/acessoFuncionarios" element={<AcessoFuncionarios />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/psicologo/:psicologo_id" element={<SaibaMais />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/disponibilidade" element={<Disponibilidade/>} />
        </>

      {/* Rotas não autenticados */}
      {!token && (
        <>
        </>
      )}

      {/* Rotas privadas */}
      {token && (
        <>
          <Route path="/agendarConsulta" element={<ProtectedRoute><Agendarconsulta /></ProtectedRoute>} />
          <Route path="/acessoFuncionarios" element={<ProtectedRoute><AcessoFuncionarios /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          {<Route path="/saibaMais" element={<ProtectedRoute><SaibaMais /></ProtectedRoute>} />}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        </>
      )}

      {/* Rota de fallback para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default Rotas;