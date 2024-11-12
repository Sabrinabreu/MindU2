import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Acessibilidade from "./Acessibilidade";
import "../css/Navbar.css";
import Logo from "../img/logo.png";
import { useAuth } from '../provider/AuthProvider';
import { parseJwt } from './jwtUtils';

const Navegacao = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { token } = useAuth();
  const decodedToken = token ? parseJwt(token) : null;
  const tipoUsuario = decodedToken?.tipo_usuario;
  const loginMethod = decodedToken?.loginMethod;

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  };

  const links = [
    { nome: "Home", caminho: "/", auth: false, tiposPermitidos: [] },
    { nome: "Contato", caminho: "/contato", auth: false, tiposPermitidos: [] },
    { nome: "Planos", caminho: "/planos", auth: false, tiposPermitidos: ["empresa"] },
    { nome: "Cadastre-se como psicólogo", caminho: "/cadastroPsicologos", auth: false, tiposPermitidos: [""] },
    { nome: "Cadastro Empresa", caminho: "/cadastroEmpresa", auth: false, tiposPermitidos: [""] },
    { nome: "Login", caminho: "/login", auth: false, tiposPermitidos: [""] },
    { nome: "Acesso Funcionários", caminho: "/acessoFuncionarios", auth: true, tiposPermitidos: ["empresa"] },
    { nome: "Dashboard", caminho: "/dashboard", auth: true, tiposPermitidos: ["empresa"] },
    { nome: "Disponibilidade", caminho: "/disponibilidade", auth: true, tiposPermitidos: ["psicologo"] },
    { nome: "Perfil", caminho: "/perfil", auth: true, tiposPermitidos: ["psicologo", "funcionario"] },
    { nome: "Agendar Consulta", caminho: "/agendarConsulta", auth: true, tiposPermitidos: ["psicologo", "funcionario"] },
    { nome: "Quiz", caminho: "/quiz", auth: true, tiposPermitidos: ["funcionario"] },
  ];

  const canAccessLink = (link) => {
    if (!link.auth && link.tiposPermitidos.length === 0) {
      return true;
    }
    if (!link.auth && (!token || link.tiposPermitidos.includes(tipoUsuario))) {
      return true;
    }
    if (token && link.auth && link.tiposPermitidos.includes(tipoUsuario)) {
      return true;
    }
    return false;
  };

  return (
    <Navbar expand="lg" className={`custom-navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <Container className='navContainer'>
        <Acessibilidade toggleTheme={toggleTheme}/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='navCentro mx-auto'>
            <Navbar.Brand as={Link} to="/">
              <img width={"30px"} src={Logo} alt="Logo" />
            </Navbar.Brand>
            <Nav>
              {links.map((link, index) => {
                if (token && (link.caminho === "/login" || link.caminho.includes("cadastro"))) {
                  return null;
                }

                const isDisabled = loginMethod === 'login_temporario' && 
                  (link.caminho === '/quiz' || link.caminho === '/agendarConsulta');

                if (canAccessLink(link)) {
                  return (
                    <Nav.Link
                      key={index}
                      as={Link}
                      to={isDisabled ? "#" : link.caminho} // Redireciona para "#" se o link estiver desativado
                      className={`${isActive(link.caminho) ? "active" : ""} ${isDisabled ? "disabled-link" : ""}`}
                      aria-current={isActive(link.caminho) ? "page" : undefined}
                      tabIndex={isDisabled ? -1 : 0} // Remove o foco para links desativados
                    >
                      {link.nome}
                    </Nav.Link>
                  );
                }

                return null;
              })}
            </Nav>
          </div>
          <div className='button-toggle'>
            <label
              className="switch"
              tabIndex="0"
              aria-label={isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
              onKeyDown={handleKeyDown}
            >
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
                aria-pressed={isDarkMode ? "true" : "false"}
                tabIndex="0"
              />
              <span className="slider"></span>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacao;