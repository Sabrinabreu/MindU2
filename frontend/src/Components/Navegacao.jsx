import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Acessibilidade from "./Acessibilidade";
import "../css/Navbar.css";
import Logo from "../img/logo.png";
import { useAuth } from '../provider/AuthProvider';
 
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
      <Container className='navContainer'>
        <Acessibilidade />
        <Navbar.Brand as={Link} to="/">
        <img width={"30px"} src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link, index) => {
              // Renderiza apenas links públicos ou links privados se o usuário estiver autenticado
              if (link.auth === undefined || link.auth === !!token) {
                return (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={link.caminho}
                    className={isActive(link.caminho) ? "active" : ""}
                  >
                    {link.nome}
                  </Nav.Link>
                );
              }
              return null;
            })}
          </Nav>
        </Navbar.Collapse>
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
      </Container>
    </Navbar>
  );
};
 
export default Navegacao;