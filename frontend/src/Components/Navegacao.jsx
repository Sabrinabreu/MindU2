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
    { nome: "Home", caminho: "/", auth: false, tiposPermitidos: [] }, // Acessível para todos
    { nome: "Contato", caminho: "/contato", auth: false, tiposPermitidos: [] }, // Acessível para todos
    { nome: "Planos", caminho: "/planos", auth: false, tiposPermitidos: ["empresa"] }, // Acessível para empresas logadas
    { nome: "Cadastre-se como psicólogo", caminho: "/cadastroPsicologos", auth: false, tiposPermitidos: [""] }, // Acessível apenas para não logados
    { nome: "Cadastro Empresa", caminho: "/cadastroEmpresa", auth: false, tiposPermitidos: [""] }, // Acessível apenas para não logados
    { nome: "Login", caminho: "/login", auth: false, tiposPermitidos: [""] }, // Acessível apenas para não logados
    { nome: "Acesso Funcionários", caminho: "/acessoFuncionarios", auth: true, tiposPermitidos: ["empresa"] }, // Apenas empresa logada
    { nome: "Dashboard", caminho: "/dashboard", auth: true, tiposPermitidos: ["empresa"] }, // Apenas empresa logada
    { nome: "Disponibilidade", caminho: "/disponibilidade", auth: true, tiposPermitidos: ["psicologo"] }, // Apenas psicólogo logado
    { nome: "Perfil", caminho: "/perfil", auth: true, tiposPermitidos: ["psicologo", "funcionario"] }, // Psicólogos e funcionários logados
    { nome: "Agendar Consulta", caminho: "/agendarConsulta", auth: true, tiposPermitidos: ["psicologo", "funcionario"] }, // Psicólogos e funcionários logados
    { nome: "Saiba Mais", caminho: "/saibaMais", auth: true, tiposPermitidos: ["psicologo", "funcionario"] }, // Psicólogos e funcionários logados
  ];
  
  const canAccessLink = (link, token, tipoUsuario) => {
    // Links acessíveis para todos (auth: false e tiposPermitidos vazio)
    if (!link.auth && link.tiposPermitidos.length === 0) {
      return true;
    }
  
    // Links acessíveis apenas para não logados ou empresas (Planos)
    if (!link.auth && (!token || link.tiposPermitidos.includes(tipoUsuario))) {
      return true;
    }
  
    // Links acessíveis para usuários logados com tipos específicos
    if (token && link.auth && link.tiposPermitidos.includes(tipoUsuario)) {
      return true;
    }
  
    return false; // Não permitido
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
    // Oculta as páginas de login/cadastro se o usuário estiver logado
    if (token && (link.caminho === "/login" || link.caminho.includes("cadastro"))) {
      return null;
    }

    // Verifica se o link pode ser acessado pelo usuário atual
        if (canAccessLink(link, token, tipoUsuario)) {
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
    
        return null; // Não exibe o link se o usuário não tiver permissão
      })}
    </Nav>
</div>
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