import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function ColorSchemesExample() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cadastroempresa">
              Para sua empresa
            </Nav.Link>
            <Nav.Link as={Link} to="/contato">
              Contato
            </Nav.Link>
            <Nav.Link as={Link} to="/cadastro">
              Cadastro
            </Nav.Link>
            <Nav.Link as={Link} to="/cadastroPsicologos">
              Cadastro de psicólogos
            </Nav.Link>
            <Nav.Link as={Link} to="/listaUsuarios">
              Lista de Usuários
            </Nav.Link>
            <Nav.Link as={Link} to="/agendarconsulta">
              Agendar Consultas
            </Nav.Link>
            <Nav.Link as={Link} to="/planos">
              Planos Empresáriais
            </Nav.Link>
            <Nav.Link as={Link} to="/acessoFuncionarios">
              Acesso Funcionarios
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Perfil
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;