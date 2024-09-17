import React, { useEffect } from 'react';
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
    {
      caminho: "/saibaMais", nome: "Saiba Mais",
      // auth: true  por enquanto pública
    },
    {
      caminho: "/disponibilidade", nome: "Disponibilidade",
      // auth: true  por enquanto pública
    },
    {
      caminho: "/agendarConsulta", nome: "Agendar Consultas",
      //  auth: true
    },
    {
      caminho: "/acessoFuncionarios", nome: "Visão dos Funcionários",
      //  auth: true
    },
    {
      caminho: "/perfil", nome: "Perfil",
       auth: true
    },
    { caminho: "/login", nome: "Login", auth: false },
  ];

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('dark-mode', isDarkMode);
  }, [isDarkMode]);

  // Função para alternar o modo escuro ao pressionar a tecla Espaço
  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Impede o comportamento padrão da tecla Espaço
      toggleTheme(); // Alterna o tema
    }
  };

  return (
    <Navbar expand="lg" className={`custom-navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <Container className='navContainer'>
        <Acessibilidade />
        <Navbar.Brand as={Link} to="/">
          <img width={"30px"} src={Logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link, index) => {
              if (link.auth === undefined || link.auth === !!token) {
                return (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={link.caminho}
                    className={isActive(link.caminho) ? "active" : ""}
                    aria-current={isActive(link.caminho) ? "page" : undefined}
                  >
                    {link.nome}
                  </Nav.Link>
                );
              }
              return null;
            })}
          </Nav>
          <div className='button-toggle'>
            <label
              className="switch"
              tabIndex="0"
              aria-label={isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
              onKeyDown={handleKeyDown} // Adiciona a funcionalidade de tecla
            >
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
                aria-pressed={isDarkMode ? "true" : "false"}
                tabIndex="0" // Adiciona o tabIndex para navegação com teclado
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




