import React, { useEffect } from "react";
import { useAuth } from "./provider/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import { parseJwt } from './Components/jwtUtils';

//Páginas
import Home from "./Pages/Home";  //todos
import Contato from "./Pages/Contato"; //todos
import EsqueciSenha from "./Pages/EsqueciSenha"; //todos
import Cadastroempresa from "./Pages/CadastroEmpresa"; //não logados
import CadastroPsicólogos from './Pages/CadastroPsicólogos' //não logados
import Agendarconsulta from "./Pages/AgendarConsulta"; //funcionario e psicologo
import SaibaMais from './Pages/SaibaMais'; //funcionario e psicologo
import Perfil from './Pages/Perfil'; //funcionario e psicologo
import Planos from './Pages/Planos'; //empresa e usuários nn logados
import PerfilEmpresa from './Pages/PerfilEmpresa' //empresa
import AcessoFuncionarios from './Pages/TabelaFuncionarios'; //empresa
import Dashboard from "./Pages/Dashboard"; //empresa
import SeuPlano from "./Pages/SeuPlano"; //empresa
import Login from './Pages/Login'; //não autenticado
import Disponibilidade from './Pages/Disponibilidade' //psicologo
import AddFuncionarios from "./Pages/AddFuncionario";
import Quiz from "./Pages/Quiz";
import Privacidade from "./Pages/Privacidade";
import NotFound from "./Pages/NotFound";
import Termosuso from "./Pages/TermosUso";

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
    return <Navigate to="/" replace />; // Redireciona para home caso o usuário não tenha permissão
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
      <Route path="/EsqueciSenha" element={<EsqueciSenha />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="/termosdeuso" element={<Termosuso />} />

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

      <Route
        path="/dashboard/seuplano"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <SeuPlano />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/addfuncionario"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <AddFuncionarios />
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

      <Route
        path="/quiz"
        element={
          <ProtectedRoute allowedRoles={['funcionario']}>
            <Quiz />
          </ProtectedRoute>
        }
      />
      {/* Rotas psicologo e funcionários */}


      {/* Rotas privadas para todos usuários*/}
      {token && (
        <>

          <Route
            path="/agendarConsulta"
            element={
              <ProtectedRoute allowedRoles={['psicologo', 'funcionario']}>
                <Agendarconsulta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute allowedRoles={['psicologo', 'funcionario']}>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="perfilempresa"
            element={
              <ProtectedRoute allowedRoles={['empresa']}>
                <PerfilEmpresa />
              </ProtectedRoute>
            }
          />

          <Route
            path="/psicologo/:psicologo_id"
            element={
              <ProtectedRoute allowedRoles={['psicologo', 'funcionario']}>
                <SaibaMais />
              </ProtectedRoute>
            }
          />
        </>
      )}

      {/* Rotas privadas para todos usuários*/}

      {/* Rota de fallback para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Rotas;