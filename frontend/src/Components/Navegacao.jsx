import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../css/Navbar.css";
import Logo from "../img/logo.png";

const Navegacao = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { token } = useAuth();

  const isActive = (path) => location.pathname === path;

  const links = [
    { caminho: "/", nome: "Home" },
    { caminho: "/cadastroEmpresa", nome: "Para sua empresa" },
    { caminho: "/contato", nome: "Contato" },
    { caminho: "/cadastroPsicologos", nome: "Cadastre-se como Psicólogo" },
    { caminho: "/planos", nome: "Planos Empresariais" },
    { caminho: "/saibaMais", nome: "Saiba Mais", 
      // auth: true  por enquanto pública
    },
    { caminho: "/agendarConsulta", nome: "Agendar Consultas",
      //  auth: true
      },
    { caminho: "/acessoFuncionarios", nome: "Visão dos Funcionários",
      //  auth: true 
      },
    { caminho: "/perfil", nome: "Perfil",
      //  auth: true 
      },
    { caminho: "/login", nome: "Login", auth: false },
  ];

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <Navbar expand="lg" className={`custom-navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <Container>
        <div className='button-toggle'>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>

        <Navbar.Brand as={Link} to="/"><img src={Logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cadastroempresa" className={isActive("/cadastroempresa") ? "active" : ""}>
              Para sua empresa
            </Nav.Link>
            <Nav.Link as={Link} to="/contato" className={isActive("/contato") ? "active" : ""}>
              Contato
            </Nav.Link>
            <Nav.Link as={Link} to="/cadastroPsicologos" className={isActive("/cadastroPsicologos") ? "active" : ""}>
              Cadastro de psicólogos
            </Nav.Link>
            <Nav.Link as={Link} to="/listaUsuarios" className={isActive("/listaUsuarios") ? "active" : ""}>
              Lista de Usuários
            </Nav.Link>
            <Nav.Link as={Link} to="/agendarconsulta" className={isActive("/agendarconsulta") ? "active" : ""}>
              Agendar Consultas
            </Nav.Link>
            <Nav.Link as={Link} to="/planos" className={isActive("/planos") ? "active" : ""}>
              Planos Empresáriais
            </Nav.Link>
            <Nav.Link as={Link} to="/acessoFuncionarios" className={isActive("/acessoFuncionarios") ? "active" : ""}>
              Acesso Funcionarios
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil" className={isActive("/perfil") ? "active" : ""}>
              Perfil
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className={isActive("/login") ? "active" : ""}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navegacao;
