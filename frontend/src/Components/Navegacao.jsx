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
import CadastroPsicólogos from '../Pages/CadastroPsicólogos';

const Navegacao = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { token, setToken } = useAuth();
  const decodedToken = token ? parseJwt(token) : null;
  const tipoUsuario = decodedToken?.tipo_usuario;

  const isActive = (path) => location.pathname === path;

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

  const links = [
    { nome: "Home", caminho: "/", auth: false },
    { nome: "Contato", caminho: "/contato", auth: false },
    { nome: "Planos", caminho: "/planos", auth: false },
    { nome: "Cadastre-se como psicólogo", caminho: "/cadastroPsicologos", auth: false },
    { nome: "Cadastro Empresa", caminho: "/cadastroEmpresa", auth: false, tiposPermitidos: ["guest"] },
    { nome: "Login", caminho: "/login", auth: false, tiposPermitidos: ["guest"] },
    { nome: "Acesso Funcionários", caminho: "/acessoFuncionarios", auth: true, tiposPermitidos: ["empresa"] },
    { nome: "Perfil", caminho: "/perfil", auth: true, tiposPermitidos: ["empresa", "psicologo", "funcionario"] },
    { nome: "Dashboard", caminho: "/dashboard", auth: true, tiposPermitidos: ["empresa"] },
  ];

    // Função para verificar se o link deve ser exibido
    const canAccessLink = (link) => {
      if (!link.auth) {
        // Se o link não exige autenticação, é sempre acessível
        return true;
      }
      // Se o link exige autenticação, verificar o token e o tipo de usuário
      return token && link.tiposPermitidos.includes(tipoUsuario);
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
            if (canAccessLink(link)) {
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