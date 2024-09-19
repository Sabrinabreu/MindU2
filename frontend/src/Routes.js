import React, { useEffect, useState } from "react";
import { useAuth } from "./provider/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import { parseJwt } from './Components/jwtUtils';


//Páginas
import Home from "./Pages/Home";  //todos
import Cadastroempresa from "./Pages/CadastroEmpresa"; //todos
import Contato from "./Pages/Contato"; //todos
import CadastroPsicólogos from './Pages/CadastroPsicólogos' //todos
import Agendarconsulta from "./Pages/AgendarConsulta"; //funcionario
import SaibaMais from './Pages/SaibaMais'; //todos autenticados
import Planos from './Pages/Planos'; //todos
import Perfil from './Pages/Perfil'; //funcionario e psicologo
import AcessoFuncionarios from './Pages/AcessoFuncionarios'; //empresa
import Login from './Pages/Login'; //não autenticado
import Disponibilidade from './Pages/Disponibilidade' //psicologo
import NotFound from "./Pages/NotFound"; //*
import Dashboard from "./Pages/Dashboard"; //empresa

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, setToken } = useAuth();

  const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      setToken(null);
      localStorage.removeItem('token');
    }
  }, [token, setToken]);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = parseJwt(token);
  const tipoUsuario = decodedToken?.tipo_usuario;

  // Verifica se o tipo de usuário está permitido para acessar a rota
  if (!allowedRoles.includes(tipoUsuario)) {
    return <Navigate to="/" replace />; // Redireciona para home ou outra página caso o usuário não tenha permissão
  }

  return children;
};

const Rotas = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/cadastroEmpresa" element={<Cadastroempresa />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/cadastroPsicologos" element={<CadastroPsicólogos />} />
          <Route path="/planos" element={<Planos />} />

      {/* Rotas não autenticados */}
      {!token && (
          <Route path="/login" element={<Login />} />
      )}

      {/* Rotas somente empresa */}
      <Route
        path="/acessoFuncionarios"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <AcessoFuncionarios />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rotas somente psicologos */}
      <Route
        path="/disponibilidade"
        element={
          <ProtectedRoute allowedRoles={['psicologo']}>
            <Disponibilidade />
          </ProtectedRoute>
        }
      />

      {/* Rotas somente funcionários */}

      {/* Rotas psicologo e funcionários */}


      {/* Rotas privadas para todos usuários*/}
      {token && (
        <>
          <Route
            path="/agendarConsulta"
            element={
              <ProtectedRoute allowedRoles={['empresa', 'psicologo', 'funcionario']}>
                <Agendarconsulta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute allowedRoles={['empresa', 'psicologo', 'funcionario']}>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saibaMais"
            element={
              <ProtectedRoute allowedRoles={['empresa', 'psicologo', 'funcionario']}>
                <SaibaMais />
              </ProtectedRoute>
            }
          />
          
        </>
      )}

      {/* Rota de fallback para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};


export default Rotas;