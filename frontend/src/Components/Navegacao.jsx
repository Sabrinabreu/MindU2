import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../css/Navbar.css";
import Logo from "../img/logo.png";

function ColorSchemesExample() {
  const location = useLocation(); // Obtém a localização atual

  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;
  return (
    <Navbar expand="lg" className="custom-navbar" >
      <Container>
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
            <Nav.Link as={Link} to="/cadastroPsicologos"  className={isActive("/cadastroPsicologos") ? "active" : ""}>
              Cadastro de psicólogos
            </Nav.Link>
            <Nav.Link as={Link} to="/listaUsuarios" className={isActive("/listaUsuarios") ? "active" : ""}>
              Lista de Usuários
            </Nav.Link>
            <Nav.Link as={Link} to="/agendarconsulta"  className={isActive("/agendarconsulta") ? "active" : ""}>
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
}

export default ColorSchemesExample;