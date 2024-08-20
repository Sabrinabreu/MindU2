import React from 'react';
//bootstrap
import { Container, Row, Col } from "react-bootstrap";

const LoginForm = ({ cadastro, onDelete }) => {
  return (
    <Container>
        <Row>
            <Col>
                <div>
                  <input type="text" placeholder="login"></input>
                  <input type="password" placeholder="senha"></input>
                  <button type="submit">Entrar</button>
                </div>
            </Col>
        </Row>
    </Container>
  );
};

export default LoginForm;